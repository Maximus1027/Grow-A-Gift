import { Workspace } from "@rbxts/services";

/**
 * Check if two models are intersecting in the same place
 */
export const isModelIntersecting = function (model1: Model): boolean {
	const parts = Workspace.GetPartBoundsInBox(model1.GetBoundingBox()[0], model1.GetBoundingBox()[1]);

	return parts.size() > 0;
};
