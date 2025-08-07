import Object from "@rbxts/object-utils";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import * as houseConfig from "shared/config/house.json";
import * as crateConfig from "shared/config/crate.json";
import { Rarity } from "shared/enums/Rarity";
import { HouseConfig } from "./loot";

/**
 * Check if two models are intersecting in the same place
 */
export const isModelIntersecting = function (model1: Model): boolean {
	const parts = Workspace.GetPartBoundsInBox(model1.GetBoundingBox()[0], model1.GetBoundingBox()[1])
		.filter((part) => part.CollisionGroup !== "npc")
		.filter((part) => part.Transparency !== 1)
		.filter((part) => !part.HasTag("baseplate"));

	print(parts, parts.size());

	//does region area have more parts inside than the model itself
	return (
		parts.size() >
		model1
			.GetDescendants()
			.filter((child) => child.IsA("BasePart"))
			.size()
	);
};

/**
 * Check if house id exists in config
 * @param minerId
 */
export const doesHouseExist = function (houseId: string): boolean {
	const keys = [...Object.keys(houseConfig), ...Object.keys(crateConfig)];

	if (keys.find((val) => val === houseId)!.size() > 0) {
		return true;
	}

	return false;
};

export const getHouseModel = (houseid: string) => getHouseAssetsFolder().FindFirstChild(houseid);

export const getHouseAssetsFolder = () => ReplicatedStorage.WaitForChild("assets").WaitForChild("houses");

export const getPresentAssetsFolder = () => ReplicatedStorage.WaitForChild("assets").WaitForChild("presents");

export const getPresentModel = (rarity: Rarity) => getPresentAssetsFolder().FindFirstChild(rarity);

export const getPlayerPlotFolder = (player: Player) =>
	Workspace.FindFirstChild("Plots")
		?.GetChildren()
		.find((folder) => folder.GetAttribute("player") === player.Name);

export const getPlayerPlot = (player: Player) => getPlayerPlotFolder(player)!.FindFirstChild("plot") as Model;

export const formatSecondsToMinutesAndSeconds = (totalSeconds: number): string => {
	const minutes = math.floor(totalSeconds / 60);
	const remainingSeconds = totalSeconds % 60;

	// Pad with leading zero if seconds is a single digit
	const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

	return `${minutes}:${formattedSeconds}`;
};

export const formatMinutesToDisplay = (minutes: number): string => {
	if (minutes >= 60) {
		const hours = minutes / 60;

		return `${minutes / 60} Hour${hours >= 2 ? "s" : ""}`;
	} else {
		return `${minutes} Minutes`;
	}
};
