import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Events } from "client/network";
import { store } from "client/react/store/store";

const player = Players.LocalPlayer;

@Controller({})
export class StoreController implements OnStart {
	onStart() {
		Events.onStock.connect((payload: Record<string, number>) => {
			//stonks update
			store.setStock(payload);
		});

		store.setLastStock(player.GetAttribute("laststock") as number);

		player.AttributeChanged.Connect((attribute) => {
			//update when timer changes
			print("updating", attribute);
			if (attribute === "laststock") {
				store.setLastStock(player.GetAttribute("laststock") as number);
			}
		});
	}
}
