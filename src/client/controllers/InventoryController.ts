import { Controller, OnStart } from "@flamework/core";
import { Players, UserInputService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { store } from "client/react/store/store";
import { getInventoryFolder } from "shared/utils/playertils";
import { MessageController } from "./MessageController";
import { Message } from "discord.js";
import { MESSAGE } from "shared/types/messages";
import { Events } from "client/network";

const player = Players.LocalPlayer;

const keyMap: Record<string, number> = {
	One: 1,
	Two: 2,
	Three: 3,
	Four: 4,
	Five: 5,
	Six: 6,
	Seven: 7,
	Eight: 8,
	Nine: 9,
};

@Controller({})
export class InventoryController implements OnStart {
	constructor(private readonly messageController: MessageController) {}

	private inventoryFolder?: Instance;

	onStart() {
		//keyboard manager for hotbar
		UserInputService.InputBegan.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.Keyboard) {
				const state = store.getState();

				if (state.windowManager.windows.hud !== true) {
					//dont do shit if the hotbar slots arent visible
					return;
				}

				const layoutKey = keyMap[input.KeyCode.Name];

				if (
					!t.number(layoutKey) ||
					layoutKey >
						state.inventory.inventory.filter((val) => val.GetAttribute("equip") !== undefined).size()
				) {
					return;
				}

				store.setInputKey(layoutKey);
			}
		});

		Events.onDataLoaded.connect(() => {
			this.inventoryFolder = getInventoryFolder(player);
			if (this.inventoryFolder) this.setupTracking();
		});
	}

	setupTracking() {
		const inventoryFolder = this.inventoryFolder as Folder;

		inventoryFolder.ChildAdded.Connect((child) => {
			if (!child.IsA("NumberValue")) {
				return;
			}

			store.setInventory(inventoryFolder.GetChildren() as NumberValue[]);
			this.trackHouseForEquip(child);
		});

		inventoryFolder.ChildRemoved.Connect((child) => {
			if (!child.IsA("NumberValue")) {
				return;
			}

			store.setInventory(inventoryFolder.GetChildren() as NumberValue[]);
			this.trackHouseForEquip(child);
		});

		store.setInventory(inventoryFolder.GetChildren() as NumberValue[]);
		inventoryFolder.GetChildren().forEach((child) => this.trackHouseForEquip(child as NumberValue));
	}

	trackHouseForEquip(houseid: NumberValue) {
		const inventoryFolder = this.inventoryFolder as Folder;

		//how we check if house was put in hotbar
		houseid.GetAttributeChangedSignal("equip").Connect(() => {
			store.setInventory(inventoryFolder.GetChildren() as NumberValue[]);
		});
		// houseid.Changed.Connect(() => {
		// 	this.messageController.sendMessage(MESSAGE.INVENTORY, 1 + "", houseid.Name);
		// });
	}
}
