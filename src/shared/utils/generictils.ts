import Object from "@rbxts/object-utils";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import * as houseConfig from "shared/config/house.json";

/**
 * Check if two models are intersecting in the same place
 */
export const isModelIntersecting = function (model1: Model): boolean {
	const parts = Workspace.GetPartBoundsInBox(model1.GetBoundingBox()[0], model1.GetBoundingBox()[1])
		.filter((part) => part.CollisionGroup !== "npc")
		.filter((part) => part.Transparency !== 1);

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
	const keys = Object.keys(houseConfig);

	if (keys.find((val) => val === houseId)!.size() > 0) {
		return true;
	}

	return false;
};

export const getMachinesFolder = () => ReplicatedStorage.WaitForChild("assets").WaitForChild("houses");

export const getPlayerPlot = (player: Player) =>
	Workspace.WaitForChild("Plots").WaitForChild(player.Name).WaitForChild("plot") as Model;

export const getPlayerPlotFolder = (player: Player) =>
	Workspace.WaitForChild("Plots").WaitForChild(player.Name) as Folder;
