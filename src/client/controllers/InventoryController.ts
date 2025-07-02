import { Controller, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { store } from "client/react/store/store";
import { getInventoryFolder } from "shared/utils/playertils";

const player = Players.LocalPlayer;
const inventoryFolder = getInventoryFolder(player);
@Controller({})
export class InventoryController implements OnStart {
	onStart() {
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
		//how we check if house was put in hotbar
		houseid.GetAttributeChangedSignal("equip").Connect(() => {
			store.setInventory(inventoryFolder.GetChildren() as NumberValue[]);
		});
	}
}
