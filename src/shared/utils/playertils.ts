import * as mainConfig from "shared/config/main.json";

export const getMoneyStat = (player: Player): NumberValue => {
	return player.FindFirstChild("stats")?.FindFirstChild("Money") as NumberValue;
};

export const getInventoryFolder = (player: Player): Folder => {
	return player.WaitForChild("stats").WaitForChild("inventory") as Folder;
};

export const getHotbarFolder = (player: Player): Folder => {
	return player.WaitForChild("stats").WaitForChild("hotbar") as Folder;
};

export const doesPlayerOwnHouse = (player: Player, houseId: string) => {
	return getPlayerHouseObject(player, houseId) !== undefined;
};

export const getPlayerHouseObject = (player: Player, houseId: string) => {
	return getInventoryFolder(player).FindFirstChild(houseId);
};

export const getPlayerHouseObjectHotbar = (player: Player, houseId: string) => {
	return getHotbarFolder(player).FindFirstChild(houseId);
};
