import Object from "@rbxts/object-utils";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import * as houseConfig from "shared/config/house.json";
import * as crateConfig from "shared/config/crate.json";
import { Rarity } from "shared/enums/Rarity";

import * as VillageConfig from "shared/config/villages.json";

/**
 * Check if two models are intersecting in the same place
 */
export const isModelIntersecting = function (model1: Model): boolean {
	const parts = Workspace.GetPartBoundsInBox(model1.GetBoundingBox()[0], model1.GetBoundingBox()[1])
		.filter((part) => part.CollisionGroup !== "npc")
		.filter((part) => part.Transparency !== 1)
		.filter((part) => !part.HasTag("baseplate"));

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

const VillageOrdered = Object.entries(VillageConfig).sort((a, b) => a[1].cost < b[1].cost);

export const getNextVillageUnlock = (currentVillage: string): string | undefined => {
	const currentIndex = VillageOrdered.findIndex(([key]) => key === currentVillage);

	const nextEntry = VillageOrdered[currentIndex + 1];
	return nextEntry ? nextEntry[0] : undefined;
};

export const getVillage = (village: string) => {
	const currentIndex = VillageOrdered.findIndex(([key]) => key === village);

	const entry = VillageOrdered[currentIndex];
	return entry ?? undefined;
};

export const tick = () => {
	return DateTime.now().UnixTimestampMillis / 1000;
};

export const isModelWithinBounds = (model: Model, boundingPart: BasePart): boolean => {
	const extentsSize = model.GetExtentsSize();
	const [cframe, boundingSize] = model.GetBoundingBox();

	const corner1 = cframe.Position.add(new Vector3(extentsSize.X / 2, 0, extentsSize.Z / 2));
	const corner2 = cframe.Position.sub(new Vector3(extentsSize.X / 2, 0, extentsSize.Z / 2));

	const boundingCorner1 = boundingPart.CFrame.PointToWorldSpace(
		new Vector3(boundingPart.Size.X / 2, 12, boundingPart.Size.Z / 2),
	);
	const boundingCorner2 = boundingPart.CFrame.PointToWorldSpace(
		new Vector3(-boundingPart.Size.X / 2, 12, -boundingPart.Size.Z / 2),
	);

	const checkCorner = (corner: Vector3) => {
		if (
			corner.X <= math.max(boundingCorner1.X, boundingCorner2.X) &&
			corner.X >= math.min(boundingCorner1.X, boundingCorner2.X)
		) {
			if (
				corner.Z <= math.max(boundingCorner1.Z, boundingCorner2.Z) &&
				corner.Z >= math.min(boundingCorner1.Z, boundingCorner2.Z)
			) {
				return true;
			}
		}
		return false;
	};

	if (checkCorner(corner1) && checkCorner(corner2)) {
		return true;
	}

	return false;
};
