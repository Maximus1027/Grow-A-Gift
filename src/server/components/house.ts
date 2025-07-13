import { OnInit, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import Object from "@rbxts/object-utils";
import * as HouseConfig from "shared/config/house.json";
import { Players } from "@rbxts/services";
import { NPC } from "shared/npc/npc";
import { convertChanceToStringMarkup, getLootTable, LootTable, returnRandomRarity } from "shared/utils/loot";
import { Rarity } from "shared/enums/Rarity";

interface Attributes {
	houseid?: string;
	owner?: string;
}

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
	private lootTable?: LootTable;

	onStart() {
		this.owner = Players.GetPlayers().find((player) => player.Name === this.attributes.owner);

		const foundHouse = Object.entries(HouseConfig).find((val) => {
			return val[0] === this.houseId;
		});

		print(foundHouse?.[0]);

		this.spawnRate = foundHouse?.[1].rate as number;

		//random timer offset so when people load a save, npcs arent synchronised
		this.lastSpawnTick = tick() - math.random(1, 5);

		this.spawn = (
			(this.instance.Parent?.Parent!.FindFirstChild("plot") as Model).FindFirstChild("spawn") as Model
		).PrimaryPart;

		this.lootTable = getLootTable(this.houseId);
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

		const randomRarity = returnRandomRarity(this.lootTable, this.houseId);

		const spawnLocation = this.spawn!.Position;

		const chanceDisplay = convertChanceToStringMarkup(randomRarity, this.houseId);

		if (this.owner) {
			new NPC(this.NPCfolder, spawnLocation, this.end.Position, randomRarity, chanceDisplay, this.owner);
		}
	}

	destroy(): void {}
}
