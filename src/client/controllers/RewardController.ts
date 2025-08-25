import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Events } from "client/network";
import { store } from "client/react/store/store";

@Controller({})
export class RewardController implements OnStart {
	onStart() {
		const player = Players.LocalPlayer;

		Events.onRewardsAction.connect((action: "unlock" | "claim", id: number) => {
			if (action === "unlock") {
				store.setUnlocked(id);
			} else if (action === "claim") {
				store.setClaimed([...store.getState().rewards.claimed, id]);
			}
		});

		player.AttributeChanged.Connect((attribute) => {
			const value = player.GetAttribute(attribute);
			if (!t.number(value)) return;
		});
	}
}
