import Object from "@rbxts/object-utils";
import { Rarity } from "shared/enums/Rarity";

import * as HousesConfig from "shared/config/house.json";

export type LootTable = Record<Rarity, number>;
export type HouseConfig = Record<string, { loot: LootTable; stock: number }>;

const totalWeights: Record<string, number> = Object.entries(HousesConfig).reduce((acc, [houseId, config]) => {
	let total = 0;
	Object.values((config as { loot: LootTable }).loot).forEach((chance) => (total += chance));
	acc[houseId] = total;
	return acc;
}, {} as Record<string, number>);

/**
 * Use loot table to return a random rarity
 * @param loot
 */
export const returnRandomRarity = (loot: LootTable): Rarity => {
	const weightTable: Rarity[] = [];
	for (const [rarity, chance] of Object.entries(loot)) {
		for (let i = 0; i < chance; i++) {
			weightTable.push(rarity);
		}
	}

	return weightTable[math.random(0, weightTable.size() - 1)] as Rarity;
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
	const total = totalWeights[houseid];
	const chance = getLootTable(houseid)[rarity];

	print(total, chance);

	return `1 in ${total / chance}`;
};
