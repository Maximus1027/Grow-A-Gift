import { OnInit, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import Object from "@rbxts/object-utils";

import * as MinersConfig from "shared/config/miners.json";
import { getRandomOre } from "shared/utils/oresutils";

interface Attributes {
	drill: string;
}

@Component({
	tag: "Drill",
})
export class Drill extends BaseComponent<Attributes> implements OnInit, OnStart, OnTick {
	private drillRate?: number;
	private lastDrillTick: number = tick();
	private drillId: string = this.attributes.drill;

	onInit() {
		const foundOres = new Instance("Folder");
		foundOres.Name = "Ores";
		foundOres.Parent = this.instance;
	}

	onStart() {
		const foundDrill = Object.entries(MinersConfig).find((val) => {
			print(val[0], this.drillId);
			return val[0] === this.drillId;
		});

		this.drillRate = foundDrill?.[1].rate;
	}

	onTick(dt: number): void {
		const currentTick = tick();

		if (currentTick - this.lastDrillTick >= (this.drillRate ?? 1)) {
			this.drill();
			this.lastDrillTick = currentTick;
		}
	}

	/**
	 * Called every drill rate period
	 */
	private drill() {
		print("drill");
		const randomFind = getRandomOre("", "");
		print("found", randomFind);
	}
}
