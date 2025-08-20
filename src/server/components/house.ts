import { OnInit, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import Object from "@rbxts/object-utils";
import * as HouseConfig from "shared/config/house.json";
import { Players } from "@rbxts/services";
import { NPC } from "shared/npc/npc";
import {
	convertChanceToStringMarkup,
	getHouseConfig,
	getLootTable,
	RarityLootTable,
	returnRandomRarity,
} from "shared/utils/loot";
import { Rarity } from "shared/enums/Rarity";
import Abbreviator from "@rbxts/abbreviate";
import { tick } from "shared/utils/generictils";

interface Attributes {
	houseid?: string;
	owner?: string;
	avg?: string;
}

const abv = new Abbreviator();

@Component({
	tag: "House",
})
export class House extends BaseComponent<Attributes, Model> implements OnStart, OnTick {
	private spawnRate?: number;
	private lastSpawnTick: number = 0;
	private houseId: string = this.attributes.houseid as string;
	private NPCfolder = this.instance.Parent?.Parent?.FindFirstChild("NPC") as Folder;
	private spawn?: BasePart;
	private end: BasePart = this.instance.FindFirstChild("drop") as BasePart;
	private owner?: Player;
	private lootTable?: RarityLootTable;

	private lastIncome: number[] = new Array<number>();

	onStart() {
		this.owner = Players.GetPlayers().find((player) => player.Name === this.attributes.owner);

		const foundHouse = getHouseConfig()[this.houseId];

		this.spawnRate = foundHouse.rate as number;

		//random timer offset so when people load a save, npcs arent synchronised
		this.lastSpawnTick = tick() - math.random(1, 5);

		const spawnPoint = this.instance.Parent?.Parent?.GetDescendants().filter((child) => child.HasTag("Spawn"))[0];

		this.spawn = spawnPoint as BasePart;

		this.lootTable = getLootTable(this.houseId) as RarityLootTable;
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
		if (!this.lootTable) {
			return;
		}

		const randomRarity = returnRandomRarity(this.lootTable, this.houseId, 1000);

		const spawnLocation = this.spawn!.Position;

		const chanceDisplay = convertChanceToStringMarkup(randomRarity, this.houseId);

		if (this.owner) {
			const npc = new NPC(
				this.NPCfolder,
				spawnLocation,
				this.end.Position,
				randomRarity,
				chanceDisplay,
				this.owner,
			);

			task.delay(1, () => {
				this.lastIncome.insert(0, npc.getPresentWorth());
				if (this.lastIncome.size() > 10) this.lastIncome.pop();

				this.calculateAverage();
			});
		}
	}

	private calculateAverage() {
		let total = 0;

		this.lastIncome.forEach((n) => (total += n));

		const average = total / this.lastIncome.size();

		this.attributes.avg = abv.commify(math.ceil(average));
	}

	destroy(): void {}
}
