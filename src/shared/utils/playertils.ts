import * as mainConfig from "shared/config/main.json";
import { getPlayerPlotFolder } from "./generictils";

export const getMoneyStat = (player: Player): NumberValue => {
	return player.FindFirstChild("stats")?.FindFirstChild("Money") as NumberValue;
};

export const getInventoryFolder = (player: Player): Folder => {
	return player.WaitForChild("stats")?.FindFirstChild("inventory") as Folder;
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

export const summonPlayer = (player: Player, pos: Vector3) => {
	const character = player.Character || player.CharacterAdded.Wait()[0];

	if (!character) {
		return;
	}

	character.MoveTo(pos.add(new Vector3(0, character.GetExtentsSize().Y / 2, 0)));
};

export const sendPlayerToPlot = (player: Player) => {
	const plot = getPlayerPlotFolder(player);

	if (!plot) {
		return;
	}

	const spawn = plot.GetDescendants().find((child) => child.HasTag("Spawn"));

	if (spawn && spawn.IsA("BasePart")) {
		summonPlayer(player, spawn.CFrame.Position);
	}
};
