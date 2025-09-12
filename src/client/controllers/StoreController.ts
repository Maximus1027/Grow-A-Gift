import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Events } from "client/network";
import { store } from "client/react/store/store";
import { MessageController } from "./MessageController";
import { MESSAGE } from "shared/types/messages";

const player = Players.LocalPlayer;

@Controller({})
export class StoreController implements OnStart {
	constructor(private readonly messageController: MessageController) {}

	onStart() {
		Events.onStock.connect((payload: Record<string, number>) => {
			//stonks update
			store.setStock(payload);
		});

		store.setLastStock(player.GetAttribute("laststock") as number);
		this.messageController.sendMessage(MESSAGE.STOCKRESET);
		player.AttributeChanged.Connect((attribute) => {
			//update when timer changes
			if (attribute === "laststock") {
				store.setLastStock(player.GetAttribute("laststock") as number);

				this.messageController.sendMessage(MESSAGE.STOCKRESET);
			}
		});
	}
}
