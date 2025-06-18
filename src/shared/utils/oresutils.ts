import { Ore } from "shared/enums/Ore";

import * as OreConfig from "shared/config/ores.json";
import Object from "@rbxts/object-utils";

/**
 * <Ore, Integer> $$ map
 */
const valueMap: Map<keyof typeof Ore, number> = new Map(
	Object.entries(OreConfig).map((val) => {
		print(val);
		return [val[0], val[1].value];
	}),
);

/**
 * Get ore value
 * @param ore
 * @returns $ worth
 */
export const getOreValue = (ore: Ore) => {
	return valueMap.get(ore);
};

/**
 * Get random ore based on planet and drill
 * @param planet
 * @param drill
 * @returns
 */
export const getRandomOre = (planet: string, drill: string) => {
	//TODO: make functional

	const oreEntries = Object.entries(OreConfig);

	const random = oreEntries[math.random(0, oreEntries.size() - 1)];

	return Ore[random[0]];
};
