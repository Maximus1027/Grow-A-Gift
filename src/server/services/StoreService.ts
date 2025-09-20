import { Service, OnStart, Dependency } from "@flamework/core";
import { DataService } from "./DataService";
import { getHouseDisplayName, getItemCost } from "shared/utils/houseutils";
import { Events } from "server/network";
import { t } from "@rbxts/t";
import { Players, RunService } from "@rbxts/services";
import Object from "@rbxts/object-utils";
import { timeToStock } from "shared/config/main.json";
import * as HouseConfig from "shared/config/house.json";
import { InventoryService } from "./InventoryService";
import { MESSAGE } from "shared/types/messages";
import { getCrateConfig } from "shared/utils/loot";

@Service({})
export class StoreService implements OnStart {
	private playerStock = new Map<Player, Record<string, number>>();

	constructor(private readonly inventoryService: InventoryService) {}

	onStart() {
		Events.onStoreAction.connect((player: Player, action: unknown, id: unknown) => {
			if (!t.string(action) || !t.string(id)) {
				return;
			}

			switch (action) {
				case "house": {
					this.onHousePurchase(player, id);
					break;
				}
				case "crate": {
					this.onCratePurchase(player, id);
					break;
				}
			}
		});

		this.setupPlayerStockLoop();

		const setupPlayer = (player: Player) => {
			this.playerStock.set(player, {});
			//this.onStockRefresh(player);
		};

		//initiate players
		Players.PlayerAdded.Connect((player) => setupPlayer(player));
		Players.GetPlayers().forEach((player) => setupPlayer(player));
		//remove players
		Players.PlayerRemoving.Connect((player) => this.playerStock.delete(player));
	}

	/**
	 * Sets up indefinite cycle for resetting shop stock
	 */
	setupPlayerStockLoop() {
		const heartbeat = RunService.Heartbeat.Connect(() => {
			for (const [player, stock] of this.playerStock) {
				if (os.time() - ((player.GetAttribute("laststock") as number) ?? 0) >= (timeToStock as number)) {
					this.onStockRefresh(player);
				}
			}
		});
	}

	/**
	 * Update stock values and let player know
	 * @param player
	 */
	onStockRefresh(player: Player) {
		const stockTable: Record<string, number> = {};

		Object.entries(HouseConfig).forEach((house) => (stockTable[house[0]] = house[1].stock));

		//update player and server with new values
		this.playerStock.set(player, stockTable);

		player.SetAttribute("laststock", os.time());

		//let client know (add record to store)
		Events.onStock.fire(player, stockTable);
	}

	/**
	 * Purchase house
	 * @param player
	 * @param houseid
	 * @returns
	 */
	onHousePurchase(player: Player, houseid: string) {
		const getHousePrice = getItemCost(houseid);

		if (getHousePrice === undefined || !this.playerStock.has(player)) {
			return;
		}

		const stock = this.playerStock.get(player) as Record<string, number>;

		if (stock[houseid] === undefined || stock[houseid] <= 0) {
			Events.onMessage.fire(player, MESSAGE.NOSTOCK);
			return;
		}

		const playerValue = player.stats.Money;

		if (!playerValue) {
			return;
		}

		if (playerValue.Value >= getHousePrice) {
			this.inventoryService.addHouseToInventory(player, houseid, 1, true);
			playerValue.Value -= getHousePrice;
			stock[houseid] -= 1;

			this.playerStock.set(player, stock);

			Events.onStock.fire(player, stock);
			Events.onMessage.fire(player, MESSAGE.INVENTORY, 1 + "", getHouseDisplayName(houseid));
			return;
		}

		Events.onMessage.fire(player, MESSAGE.NOMONEY);
	}

	onCratePurchase(player: Player, crateid: string) {
		const getCrateCost = getItemCost(crateid);

		const playerValue = player.stats.Money;

		if (!playerValue || !t.number(getCrateCost)) {
			return;
		}

		if (playerValue.Value >= getCrateCost) {
			this.inventoryService.addHouseToInventory(player, crateid, 1, true);
			playerValue.Value -= getCrateCost;

			Events.onMessage.fire(player, MESSAGE.INVENTORY, 1 + "", getCrateConfig()[crateid].displayName);
		}
	}
}
