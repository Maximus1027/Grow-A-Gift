import * as Houses from "shared/config/house.json";
import Object from "@rbxts/object-utils";
import { getCrateConfig, getHouseConfig, HouseConfig } from "./loot";

/**
 * <House, Integer> $$ map
 */
const valueMap: Map<string, number> = new Map();

// Combine entries from Houses and getCrateConfig, then populate valueMap
[...Object.entries(Houses), ...Object.entries(getCrateConfig())].forEach(([key, val]) => {
	if ("cost" in val) {
		valueMap.set(key, val.cost);
	}
});

/**
 * Get house cost
 * @param house
 * @returns $ worth
 */
export const getItemCost = (houseid: string) => {
	return valueMap.get(houseid);
};

export const getHouseDisplayName = (houseid: string) => {
	return (Houses as unknown as HouseConfig)[houseid].displayName;
};
