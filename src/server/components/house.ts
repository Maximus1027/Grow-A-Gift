import { Dependency, OnInit, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import Object from "@rbxts/object-utils";
import * as HouseConfig from "shared/config/house.json";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { NPC } from "shared/npc/pernpc";
import {
	convertChanceToStringMarkup,
	getHouseConfig,
	getLootTable,
	getNPCConfig,
	RarityLootTable,
	returnRandomNPC,
	returnRandomRarity,
} from "shared/utils/loot";
import { Rarity } from "shared/enums/Rarity";
import Abbreviator from "@rbxts/abbreviate";
import {
	abbreviateNumber,
	calculateGoalTime,
	getPlayerPlotFolder,
	getRandomSpawnLocation,
	getSpawnLocations,
	tick,
} from "shared/utils/generictils";
import { Boost } from "shared/enums/Boost";
import { bool } from "@rbxts/react/src/prop-types";
import { t } from "@rbxts/t";
import { ObjectPool } from "shared/utils/objectpool";
import { ClientNPC } from "shared/types/entity";
import { EntityService } from "server/services/EntityService";
import { getPresentValue } from "shared/utils/presentutils";
import { PlotFolder } from "shared/types/plot";
import { PlotService } from "server/services/PlotService";
import { NPCData } from "shared/types/config";

interface Attributes {
	houseid?: string;
	owner?: string;
	avg?: number;
}

const sharedAssets = ReplicatedStorage.WaitForChild("assets") as Folder;
const npcModel = sharedAssets.WaitForChild("npc")!.WaitForChild("default") as ClientNPC;

@Component({
	tag: "House",
})
export class House extends BaseComponent<Attributes, Model> implements OnStart, OnTick {
	private spawnRate?: number;
	private lastSpawnTick: number = 0;
	private houseId: string = this.attributes.houseid as string;
	private NPCfolder = this.instance.Parent?.Parent?.FindFirstChild("NPC") as Folder;
	private spawn?: BasePart;
	private end: BasePart = this.instance.FindFirstChild("drop") as BasePart & { cash: ParticleEmitter };
	private owner?: Player;
	private lootTable?: RarityLootTable;
	private attributeChanged?: RBXScriptConnection;
	private spawnLocations?: Vector3[];

	private lastIncome: number[] = new Array<number>();

	constructor(private readonly entityService: EntityService, private readonly plotservice: PlotService) {
		super();
	}

	onStart() {
		this.owner = Players.GetPlayers().find((player) => player.Name === this.attributes.owner);

		const plot = this.plotservice.getPlayerPlot(this.owner as Player);

		if (plot) {
			this.spawnLocations = plot.getSpawnLocations();
		}

		const foundHouse = getHouseConfig()[this.houseId];

		const npcSpeedAttr = this.owner?.GetAttribute(Boost.NPCSpeed);
		const npcSpeed = t.number(npcSpeedAttr) ? npcSpeedAttr : 1;
		this.spawnRate = (foundHouse.rate as number) / npcSpeed;

		//random timer offset so when people load a save, npcs arent synchronised
		this.lastSpawnTick = tick() - math.random(1, 5);

		const spawnPoint = this.instance.Parent?.Parent?.GetDescendants().filter((child) => child.HasTag("Spawn"))[0];

		this.spawn = spawnPoint as BasePart;

		this.lootTable = getLootTable(this.houseId) as RarityLootTable;

		this.attributeChanged = this.owner?.AttributeChanged.Connect((attribute) => {
			if (attribute === Boost.NPCSpeed) {
				const npscpeed = this.owner?.GetAttribute(attribute);
				if (!t.number(npscpeed)) {
					this.spawnRate = foundHouse.rate;
					this.lastSpawnTick = tick() - math.random(1, 5);
					return;
				}

				this.spawnRate = foundHouse.rate / npscpeed;
			}
		});
	}

	onTick(dt: number): void {
		const currentTick = tick();

		if (currentTick - this.lastSpawnTick >= (this.spawnRate ?? 1)) {
			this.drill();
			this.lastSpawnTick = currentTick;
		}
	}

	/**
	 * Called every drill rate period
	 */
	private drill() {
		if (!this.lootTable || !this.owner) {
			return;
		}

		const luck = this.owner?.GetAttribute(Boost.GiftLuck) ?? 1;

		const randomRarity = returnRandomRarity(this.lootTable, this.houseId, luck as number);

		const spawnLocation =
			this.spawnLocations !== undefined ? getRandomSpawnLocation(this.spawnLocations) : this.spawn!.Position;

		const chanceDisplay = convertChanceToStringMarkup(randomRarity, this.houseId);

		const moneyBoost = (this.owner?.GetAttribute(Boost.Income) as number) ?? 1;

		const randomNPC = returnRandomNPC();

		const npcData = getNPCConfig()[randomNPC] as NPCData;

		const presentWorth = getPresentValue(randomRarity);
		const finalWorth = math.random(presentWorth!.min, presentWorth!.max) * moneyBoost * npcData!.multiplier;

		this.entityService.spawnNPC(
			this.owner,
			new Vector3(spawnLocation.X, this.spawn?.Position.Y, spawnLocation.Z),
			this.end.Position,
			finalWorth,
			randomRarity,
			this.houseId,
			tick(),
			randomNPC,
		);
		const goaltime = calculateGoalTime(spawnLocation, this.end.Position, npcData.walkspeed);

		task.delay(goaltime, () => {
			if (this.instance === undefined || !this.instance.IsDescendantOf(game)) {
				return;
			}

			this.owner!.stats.Money.Value += finalWorth;
			this.lastIncome.insert(0, finalWorth);
			if (this.lastIncome.size() > 10) this.lastIncome.pop();

			this.calculateAverage();
		});
	}

	private spawnNPC() {}

	private calculateAverage() {
		let total = 0;

		this.lastIncome.forEach((n) => (total += n));

		const average = total / this.lastIncome.size();

		this.attributes.avg = math.ceil(average) / (this.spawnRate ?? 1);
	}

	destroy(): void {
		this.attributeChanged?.Disconnect();
		this.instance.Destroy();
	}
}
