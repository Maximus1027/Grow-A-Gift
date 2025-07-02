import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { doesPlayerOwnHouse, getPlayerHouseObject } from "shared/utils/playertils";

@Service({})
export class DataService implements OnStart {
	onStart() {
		Players.PlayerAdded.Connect((player) => this.setupPlayer(player));
		Players.GetPlayers().forEach((player) => this.setupPlayer(player));
	}

	private setupPlayer(player: Player) {
		const dataFolder = new Instance("Folder");
		dataFolder.Name = "stats";
		dataFolder.Parent = player;

		const money = new Instance("NumberValue");
		money.Name = "Money";
		money.Parent = dataFolder;

		const inventory = new Instance("Folder");
		inventory.Name = "inventory";
		inventory.Parent = dataFolder;

		const hotbar = new Instance("Folder");
		hotbar.Name = "hotbar";
		hotbar.Parent = dataFolder;

		this.addHouseToInventory(player, "tiki", 5, true);
		this.addHouseToInventory(player, "trailer", 5);
	}

	public getMoneyStat(player: Player): NumberValue {
		return player.FindFirstChild("stats")?.FindFirstChild("Money") as NumberValue;
	}

	public getInventoryFolder(player: Player): Folder {
		return player.WaitForChild("stats").WaitForChild("inventory") as Folder;
	}

	public getHotbarInventory(player: Player): Folder {
		return player.WaitForChild("stats").WaitForChild("hotbar") as Folder;
	}

	/**
	 * Adds a house to the player's inventory
	 * @param player
	 * @param houseId
	 * @param amount
	 * @param hotbar if true, house is automatically placed in hotbar
	 * @returns
	 */
	public addHouseToInventory(player: Player, houseId: string, amount?: number, hotbar?: boolean) {
		if (doesPlayerOwnHouse(player, houseId)) {
			const object = getPlayerHouseObject(player, houseId) as NumberValue;
			object.Value += amount ?? 1;

			return;
		}

		const house = new Instance("NumberValue");
		house.Name = houseId;

		house.Value = amount ?? 1;

		house.SetAttribute("equip", hotbar);

		house.Parent = this.getInventoryFolder(player);
	}
}
