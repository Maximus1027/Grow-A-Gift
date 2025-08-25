import { Controller, OnStart } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Events } from "client/network";
import { store } from "client/react/store/store";
import { Boost, optionalBoost, TimedBoost } from "shared/enums/Boost";

const player = Players.LocalPlayer;

@Controller({})
export class BoostsController implements OnStart {
	onStart() {
		Events.onDataLoaded.connect(() => {
			//	this.setupBoosterListener();
			this.refreshBoosters();
		});
		Events.onBoost.connect(() => this.refreshBoosters());
	}

	refreshBoosters() {
		const boosts: optionalBoost[] = [];

		const boostFolder = player.stats.boosts;

		if (boostFolder === undefined) {
			return;
		}

		for (const boost of boostFolder.GetChildren()) {
			const boostType = boost.GetAttribute("boost");

			if (!boost.IsA("NumberValue") || !t.string(boostType)) {
				continue;
			}

			const endtick = boost.GetAttribute("endtick");

			const timedBoost: optionalBoost = {
				namespace: boost.Name,
				boostValue: boost.Value,
				boostType: boostType as Boost,
				endtick: t.number(endtick) ? endtick : undefined,
			};

			boosts.push(timedBoost);
		}

		store.setBoosters(boosts);
	}

	setupBoosterListener() {
		//player.AttributeChanged.Connect(() => this.refreshBoosters());
		const boostfolder = player.stats.boosts;
		boostfolder.ChildAdded.Connect(() => this.refreshBoosters());
		boostfolder.ChildRemoved.Connect(() => this.refreshBoosters());
	}
}
