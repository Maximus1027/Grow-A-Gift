import Object from "@rbxts/object-utils";
import { getRarityColor, Rarity } from "shared/enums/Rarity";

import * as HousesConfig from "shared/config/house.json";
import * as CratesConfig from "shared/config/crate.json";
import * as SpinnerConfig from "shared/config/spinner.json";

export type RarityLootTable = Partial<Record<Rarity, number>>;
export type CrateLootTable = Record<string, number>;
export type SpinnerLootTable = CrateLootTable;

export type Config<O> = Record<string, O>;
export type HouseConfig = Config<{
	loot: RarityLootTable;
	displayName: string;
	rarity: string;
	stock: number;
	rate: number;
}>;
export type CrateConfig = Config<{ loot: CrateLootTable; displayName: string; timeInMinutes: number }>;
export type SpinConfig = Config<{
	rewardType: "boost" | "stats" | "inventory";
	reward: string;
	displayName: string;
	amount: number;
	chance: number;
	image?: string; // Optional image for spinner rewards
}>;

const rarityOrderCache: Record<string, Rarity[]> = {};

function cacheOrderedConfig(conf: HouseConfig | CrateConfig): void {
	for (const [houseId, options] of Object.entries(conf)) {
		const loot = (options as { loot: CrateLootTable }).loot;
		const rarities = Object.keys(loot).sort(
			(a, b) => (loot[b as Rarity] as number) < (loot[a as Rarity] as number),
		);
		rarityOrderCache[houseId] = rarities as Rarity[];
	}
}

cacheOrderedConfig(HousesConfig);
cacheOrderedConfig(CratesConfig);

const mappedSpinnerLoot: SpinnerLootTable = Object.entries(SpinnerConfig as SpinConfig).reduce((acc, [key, value]) => {
	acc[key as string] = value.chance;
	return acc;
}, {} as SpinnerLootTable);

/**
 * Use loot table to return a random rarity
 *
 * @param loot
 * @param houseid
 * @param luck subtracts luck by 1 in x, e.g luck: 10 -> 1 in 50 becomes 1 in 40
 */
export const returnRandomRarity = (loot: RarityLootTable | CrateLootTable, houseid: string, luck?: number): Rarity => {
	const rarities = rarityOrderCache[houseid];

	//luck must be not nil and at least 1
	const adjustedLuck = luck !== undefined && luck >= 1 ? luck : 1;

	for (const rarity of rarities) {
		const chance = loot[rarity];

		//const adjustedChance = math.max(1, (chance as number) - (luck ?? 0));
		const adjustedChance = math.max(1, math.round((chance as number) / adjustedLuck));

		if (math.random(1, adjustedChance) === 1) {
			return rarity;
		}
	}

	//incase no luck above return least rarest

	return rarities[rarities.size() - 1];
};

export const returnRandomSpinReward = (): string => {
	const spinnerLoot = getSpinnerLootTable() as Record<string, number>;
	const weightTable: string[] = [];

	for (const loot of Object.entries(spinnerLoot)) {
		for (let i = 0; i < loot[1]; i++) {
			weightTable.push(loot[0]);
		}
	}

	const reward = weightTable[math.random(0, weightTable.size() - 1)];

	return reward;
};

/**
 * Get Loottable for a house
 * @param houseId
 */
export const getLootTable = (houseId: string): RarityLootTable | CrateLootTable => {
	const houseConfig = HousesConfig as unknown as HouseConfig;
	const foundData = houseConfig[houseId];

	if (!foundData) {
		const crateLoot = getCrateLootTable(houseId);

		return crateLoot;
	}

	return foundData.loot;
};

/**
 * Get loot table for a crate
 * @param crateid
 * @returns
 */
export const getCrateLootTable = (crateid: string): CrateLootTable => {
	const crateConfig = CratesConfig as unknown as CrateConfig;
	const foundData = crateConfig[crateid];

	return foundData && foundData.loot;
};

/**
 * Get "1 in x" string from rarity and houseid
 * @param rarity
 * @param houseid
 * @returns "1 in x"
 */
export const convertChanceToString = (rarity: Rarity, houseid: string) => {
	const chance = getLootTable(houseid)[rarity];

	return `1 in ${chance}`;
};

/**
 * Get richtext "1 in x" from rarity and houseid
 * @param rarity
 * @param houseid
 * @returns
 */
export const convertChanceToStringMarkup = (rarity: Rarity, houseid: string) => {
	const chance = getLootTable(houseid)[rarity];

	return `1 in <font color="#${getRarityColor(rarity).ToHex()}">${chance}</font>`;
};

/**
 * Get house chance from crate in "1 in x" format
 * @param houseid
 * @param crateid
 * @returns
 */
export const convertCrateChanceToStringMarkup = (houseid: string, crateid: string) => {
	const config = HousesConfig as unknown as HouseConfig;

	const chance = getCrateLootTable(crateid)[houseid];
	const rarity = config[houseid].rarity as Rarity;

	return `1 in <font color="#${getRarityColor(rarity).ToHex()}">${chance}</font>`;
};

export const getCrateConfig = (): CrateConfig => {
	return CratesConfig as CrateConfig;
};

export const getHouseConfig = (): HouseConfig => {
	return HousesConfig as unknown as HouseConfig;
};

export const getSpinConfig = (): SpinConfig => {
	return SpinnerConfig as SpinConfig;
};

export const getSpinnerLootTable = (): SpinnerLootTable => {
	return mappedSpinnerLoot;
};

export const getOrderedLoottable = (houseid: string) => rarityOrderCache[houseid];
