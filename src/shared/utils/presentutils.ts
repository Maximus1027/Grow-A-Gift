import * as Presents from "shared/config/presents.json";
import Object from "@rbxts/object-utils";

type valueRange = {
	min: number;
	max: number;
};

/**
 * <Present, Integer> $$ map
 */
const valueMap: Map<string, valueRange> = new Map(
	Object.entries(Presents).map((val) => {
		return [val[0], { min: (val[1] as valueRange).min, max: (val[1] as valueRange).max }];
	}),
);

/**
 * Get present value
 * @param present
 * @returns $ worth
 */
export const getPresentValue = (id: string) => {
	return valueMap.get(id);
};
