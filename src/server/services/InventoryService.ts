import { Service, OnStart } from "@flamework/core";
import { t } from "@rbxts/t";
import { Events } from "server/network";
import { doesPlayerOwnHouse, getInventoryFolder, getPlayerHouseObject } from "shared/utils/playertils";

import MainConfig from "shared/config/main.json";
import { DataService } from "./DataService";
import Object from "@rbxts/object-utils";
import Signal from "@rbxts/lemon-signal";
import { Workspace } from "@rbxts/services";

@Service({
	loadOrder: 1,
})
export class InventoryService implements OnStart {
	constructor(private readonly dataService: DataService) {}

	public PlayerLoaded = new Signal<Player>();

	onStart() {
		this.dataService.PlayerLoaded.Connect((player, profile) => {
			const equippedHouses = profile.Data.equipped;

			for (const [houseid, amount] of Object.entries(profile.Data.inventory)) {
				const wasEquipped = equippedHouses.includes(houseid);

				this.addHouseToInventory(
					player,
					houseid,
					amount,
					wasEquipped,
					wasEquipped ? equippedHouses.indexOf(houseid) : undefined,
				);
			}

			this.PlayerLoaded.Fire(player);
			//Events.onDataLoaded.fire(player);

			//this.addHouseToInventory(player, "basic", 5);
		});

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

					this.equipHouse(player, houseid, true);
					break;
				}
				case "addInventory": {
					this.unequipHouse(player, houseid);
					break;
				}
			}
		});
	}

	/**
	 * Adds a house to the player's inventory
	 * @param player
	 * @param houseId
	 * @param amount
	 * @param hotbar if true, house is automatically placed in hotbar
	 * @returns
	 */
	public addHouseToInventory(
		player: Player,
		houseid: string,
		amount?: number,
		hotbar?: boolean,
		customTime?: number,
	) {
		//	print("adding house", houseid);
		if (doesPlayerOwnHouse(player, houseid)) {
			const object = getPlayerHouseObject(player, houseid) as NumberValue;
			object.Value += amount ?? 1;

			//this.inventoryService.equipHouse(player, houseid, equipHouse);

			return;
		}

		const house = new Instance("NumberValue");
		house.Name = houseid;
		house.Value = amount ?? 1;

		house.Parent = getInventoryFolder(player);

		if (hotbar) this.equipHouse(player, houseid, true, customTime);
	}

	/**
	 * Removes a house to the player's inventory
	 * @param player
	 * @param houseId
	 * @param amount
	 * @returns
	 */
	public removeHouseFromInventory(player: Player, houseid: string, amount?: number) {
		//	print("adding house", houseid);
		if (doesPlayerOwnHouse(player, houseid)) {
			const object = getPlayerHouseObject(player, houseid) as NumberValue;
			object.Value -= amount ?? 1;

			if (object.Value <= 0) {
				object.Destroy();
			}

			//this.inventoryService.equipHouse(player, houseid, equipHouse);

			return;
		}
	}

	/**
	 * Sets the house amount in player's inventory
	 * @param player
	 * @param houseId
	 * @param amount
	 * @returns
	 */
	public setHouseInInventory(player: Player, houseid: string, amount: number) {
		//	print("adding house", houseid);
		if (doesPlayerOwnHouse(player, houseid)) {
			const object = getPlayerHouseObject(player, houseid) as NumberValue;
			object.Value = amount;

			if (object.Value <= 0) {
				object.Destroy();
			}

			//this.inventoryService.equipHouse(player, houseid, equipHouse);

			return;
		}
	}

	/**
	 * Equip or unequip House
	 * @param player
	 * @param houseid
	 * @param doEquip true to equip, false to unequip
	 * @returns
	 */
	public equipHouse(player: Player, houseid: string, doEquip: boolean, customSlot?: number) {
		const houseValue = getPlayerHouseObject(player, houseid) as NumberValue;

		if (!houseValue) {
			return;
		}

		if (!doEquip) {
			houseValue.SetAttribute("equip", undefined);
			return;
		}

		//If already equipped
		if (houseValue.GetAttribute("equip") !== undefined) {
			return;
		}

		if (this.getEquippedHouses(player).size() >= MainConfig.hotbar) {
			const lastSlotItem = this.findLastEquippedHouse(player);

			if (lastSlotItem !== undefined) {
				this.unequipHouse(player, lastSlotItem);
			}
		}

		//equip or unequip -> attribute
		houseValue.SetAttribute("equip", os.time() - (customSlot ?? 0));
	}

	/**
	 * Unequip house from hotbar
	 * @param player
	 * @param houseid
	 */
	public unequipHouse(player: Player, houseid: string) {
		this.equipHouse(player, houseid, false);
	}

	/**
	 * Remove the last house to be equipped (last slot)
	 * @param player
	 * @returns
	 */
	private findLastEquippedHouse(player: Player) {
		const inventoryFolder = getInventoryFolder(player);

		const lastItem = inventoryFolder
			.GetChildren()
			.filter((child) => child.GetAttribute("equip") !== undefined)
			.sort((a, b) => (a.GetAttribute("equip") as number) > (b.GetAttribute("equip") as number))
			.pop();

		return lastItem ? lastItem.Name : undefined;
	}

	/**
	 * Get houses in hotbar
	 * @param player
	 * @returns
	 */
	private getEquippedHouses(player: Player) {
		const inventoryFolder = getInventoryFolder(player);

		const equipped = inventoryFolder.GetChildren().filter((child) => child.GetAttribute("equip") !== undefined);

		return equipped;
	}
}
