import { Controller, OnStart } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { t } from "@rbxts/t";
import { Events } from "client/network";
import { store } from "client/react/store/store";
import { MESSAGE } from "shared/types/messages";
import { getMessageConfig } from "shared/utils/configtils";

@Controller({})
export class MessageController implements OnStart {
	onStart() {
		this.sendMessage(MESSAGE.INVENTORY, "5", "Igloo");

		Events.onMessage.connect((reason: MESSAGE, ...args: string[]) => {
			if (!t.string(reason)) {
				return;
			}

			this.sendMessage(reason, ...args);
		});
	}

	sendMessage(reason: MESSAGE, ...args: string[]) {
		const messageData = getMessageConfig()[reason];

		if (!messageData) {
			return;
		}

		let i = 0;
		const [formattedMessage] = messageData.message.gsub("%%[sd]", () => {
			const val = args[i];
			i++;
			return tostring(val);
		});

		store.sendMessage(formattedMessage);
	}
}
