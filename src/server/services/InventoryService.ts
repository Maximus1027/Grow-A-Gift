import { Service, OnStart } from "@flamework/core";
import { t } from "@rbxts/t";
import { Events } from "server/network";
import {
	getHotbarFolder,
	getInventoryFolder,
	getNextAvailableHotbarSlot,
	getPlayerHouseObject,
	getPlayerHouseObjectHotbar,
} from "shared/utils/playertils";

@Service({})
export class InventoryService implements OnStart {
	onStart() {
		Events.onInventoryAction.connect((player: Player, action: unknown, ...args: unknown[]) => {
			//Ensure correct event formatting
			if (!t.string(action) || args.size() < 1 || !t.string(args[0])) {
				return;
			}

			const houseid = args[0];

			switch (action) {
				case "addHotbar": {
					//check if slot was passed
					const slot = args.size() >= 2 ? (args[1] as number) : undefined;

					this.moveHouseToHotbar(player, houseid, slot);
					break;
				}
				case "addInventory": {
					this.moveHouseToInventory(player, houseid);
					break;
				}
			}
		});
	}

	/**
	 * Moves house item to hotbar from inventory, if no slot then it will replace first slot and send the last slot into the inventory.
	 * @param player
	 * @param houseid
	 * @param slot
	 */
	moveHouseToHotbar(player: Player, houseid: string, slot?: number) {
		const hotbarFolder = getHotbarFolder(player);

		const houseValue = getPlayerHouseObject(player, houseid);

		if (!houseValue) {
			warn(`${player} does not own ${houseid} or it is already in hotbar`);
			return;
		}

		const nextSlot = slot ?? getNextAvailableHotbarSlot(player);

		//if item in slot already move it to inventory first
		const sameSlotHouse = hotbarFolder.GetChildren().find((house) => {
			return house.GetAttribute("slot") === nextSlot;
		});

		if (sameSlotHouse) {
			this.moveHouseToInventory(player, sameSlotHouse.Name);
		}

		houseValue.SetAttribute("slot", nextSlot);
		houseValue.Parent = hotbarFolder;
	}

	/**
	 * Move house object from hotbar to inventory
	 * @param player
	 * @param houseid
	 * @returns
	 */
	moveHouseToInventory(player: Player, houseid: string) {
		const inventoryFolder = getInventoryFolder(player);

		const houseValue = getPlayerHouseObjectHotbar(player, houseid);

		if (!houseValue) {
			warn(`Could not find ${houseid} in ${player}'s hotbar`);
			return;
		}

		houseValue.Parent = inventoryFolder;
		houseValue.SetAttribute("slot", undefined);
	}
}
