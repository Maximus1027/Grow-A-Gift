import Object from "@rbxts/object-utils";
import { Rarity } from "shared/enums/Rarity";

import * as HousesConfig from "shared/config/house.json";

export type LootTable = Record<Rarity, number>;
export type HouseConfig = Record<string, { loot: LootTable; stock: number }>;

/**
 * Cached values
 */
const totalWeights: Record<string, number> = Object.entries(HousesConfig).reduce((acc, [houseId, config]) => {
	let total = 0;
	Object.values((config as { loot: LootTable }).loot).forEach((chance) => (total += chance));
	acc[houseId] = total;
	return acc;
}, {} as Record<string, number>);

const rarityOrderCache: Record<string, Rarity[]> = {};

for (const [houseId, config] of Object.entries(HousesConfig as unknown as HouseConfig)) {
	const loot = (config as { loot: LootTable }).loot;
	const rarities = Object.keys(loot).sort((a, b) => (loot[b as Rarity] as number) < (loot[a as Rarity] as number));
	rarityOrderCache[houseId] = rarities;
}

/**
 * Use loot table to return a random rarity
 * @param loot
 */
export const returnRandomRarity = (loot: LootTable, houseid: string): Rarity => {
	const rarities = rarityOrderCache[houseid];
	for (const rarity of rarities) {
		const chance = loot[rarity];

		if (math.random(1, chance) === 1) {
			print(rarity, chance);
			return rarity;
		}
	}

	print("fallback");

	//incase no luck above return least rarest

	return rarities[rarities.size() - 1];
};

/**
 *
 * @param houseId
 */
export const getLootTable = (houseId: string): LootTable => {
	const config = HousesConfig as unknown as HouseConfig;

	return config[houseId].loot;
};

export const convertChanceToString = (rarity: Rarity, houseid: string) => {
	const chance = getLootTable(houseid)[rarity];

	print(getLootTable(houseid), rarity);

	return `1 in ${chance}`;
};

export const getOrderedLoottable = (houseid: string) => rarityOrderCache[houseid];
