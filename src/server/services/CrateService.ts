import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "server/network";
import { getPlayerPlotFolder } from "shared/utils/generictils";
import { convertChanceToString, getCrateLootTable, returnRandomRarity } from "shared/utils/loot";
import { getPlayerHouseObject } from "shared/utils/playertils";
import { InventoryService } from "./InventoryService";

@Service({})
export class CrateService implements OnStart {
	onStart() {}

	constructor(readonly inventoryService: InventoryService) {}

	/**
	 * Open crate using player's crate type
	 * @param player
	 * @param crateid
	 */
	openCrate(player: Player, crate: string) {
		const lootTable = getCrateLootTable(crate);

		if (lootTable === undefined) {
			warn("Could not find loot table for crate", crate);
			return;
		}

		const reward = returnRandomRarity(lootTable, crate);

		Events.onReward.fire(player, crate, reward);

		this.inventoryService.addHouseToInventory(player, reward, 1, false);
	}
}
