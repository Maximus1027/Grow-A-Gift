import * as Houses from "shared/config/house.json";
import Object from "@rbxts/object-utils";
import { HouseConfig } from "./loot";

/**
 * <House, Integer> $$ map
 */
const valueMap: Map<string, number> = new Map(
	Object.entries(Houses).map((val) => {
		return [val[0], val[1].cost];
	}),
);

/**
 * Get house cost
 * @param house
 * @returns $ worth
 */
export const getHouseCost = (houseid: string) => {
	return valueMap.get(houseid);
};

export const getHouseDisplayName = (houseid: string) => {
	return (Houses as unknown as HouseConfig)[houseid].displayName;
};
