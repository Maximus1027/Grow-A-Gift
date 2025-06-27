export const getMoneyStat = (player: Player): NumberValue => {
	return player.FindFirstChild("stats")?.FindFirstChild("Money") as NumberValue;
};

export const getInventoryFolder = (player: Player): Folder => {
	return player.WaitForChild("stats").WaitForChild("inventory") as Folder;
};

export const doesPlayerOwnHouse = (player: Player, houseId: string) => {
	return getPlayerHouseObject(player, houseId) !== undefined;
};

export const getPlayerHouseObject = (player: Player, houseId: string) => {
	return getInventoryFolder(player).FindFirstChild(houseId);
};
