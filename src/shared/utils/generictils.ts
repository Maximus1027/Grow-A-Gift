import Object from "@rbxts/object-utils";
import { Workspace } from "@rbxts/services";
import * as minersConfig from "shared/config/miners.json";

/**
 * Check if two models are intersecting in the same place
 */
export const isModelIntersecting = function (model1: Model): boolean {
	const parts = Workspace.GetPartBoundsInBox(model1.GetBoundingBox()[0], model1.GetBoundingBox()[1]);

	return parts.size() > 0;
};

/**
 * Check if miner id exists in config
 * @param minerId
 */
export const doesMinerExist = function (minerId: string): boolean {
	const keys = Object.keys(minersConfig);

	if (keys.find((val) => val === minerId)!.size() > 0) {
		return true;
	}

	return false;
};
