import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Events } from "client/network";
import { store } from "client/react/store/store";

@Controller({})
export class RewardController implements OnStart {
	onStart() {
		const player = Players.LocalPlayer;

		Events.onRewardsAction.connect((action: "unlock" | "claim" | "start", id: number) => {
			switch (action) {
				case "unlock":
					store.setUnlocked(id);
					break;
				case "claim":
					store.setClaimed([...store.getState().rewards.claimed, id]);
					break;
				case "start":
					store.setTick(id);
					break;
			}
		});

		player.AttributeChanged.Connect((attribute) => {
			const value = player.GetAttribute(attribute);
			if (!t.number(value)) return;
		});
	}
}
