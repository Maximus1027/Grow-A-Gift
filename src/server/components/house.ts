import { Dependency, OnInit, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import Object from "@rbxts/object-utils";

import * as HouseConfig from "shared/config/house.json";
import { HttpService, Players } from "@rbxts/services";
import { Ore } from "shared/enums/Ore";
import { StatsService } from "server/services/DataService";
import { t } from "@rbxts/t";
import { NPC } from "shared/npc/npc";
import { getLootTable, returnRandomRarity } from "shared/utils/loot";
import { Rarity } from "shared/enums/Rarity";
import React from "@rbxts/react";

interface Attributes {
	houseid?: string;
	owner?: string;
}

@Component({
	tag: "House",
})
export class House extends BaseComponent<Attributes, Model> implements OnStart, OnTick {
	private spawnRate?: number;
	private lastSpawnTick: number = tick();
	private houseId: string = this.attributes.houseid as string;
	private NPCfolder = this.instance.Parent?.Parent?.FindFirstChild("NPC") as Folder;
	private spawn?: BasePart;
	private end: BasePart = this.instance.FindFirstChild("drop") as BasePart;
	private statsService = Dependency<StatsService>();
	private owner?: Player;

	onStart() {
		this.owner = Players.GetPlayers().find((player) => player.Name === this.attributes.owner);

		const foundHouse = Object.entries(HouseConfig).find((val) => {
			return val[0] === this.houseId;
		});

		this.spawnRate = foundHouse?.[1].rate;

		this.spawn = (
			(this.instance.Parent?.Parent!.FindFirstChild("plot") as Model).FindFirstChild("spawn") as Model
		).PrimaryPart;
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
		const lootTable = getLootTable(this.houseId);
		const randomRarity = returnRandomRarity(lootTable);

		const spawnLocation = this.spawn!.Position;

		if (this.owner) {
			new NPC(this.NPCfolder, spawnLocation, this.end.Position, randomRarity, this.owner);
		}
	}
}
