import { Boost } from "shared/enums/Boost";
import { Rarity } from "shared/enums/Rarity";
import { CrateLootTable, RarityLootTable } from "shared/utils/loot";

export type Config<O> = Record<string, O>;

export type RebirthConfig = Config<{
	cost: number;
	boost: {
		Income: number;
		NPCSpeed: number;
		GiftLuck: number;
	};
}>;

export type HouseConfig = Config<{
	loot: RarityLootTable;
	displayName: string;
	rarity: string;
	stock: number;
	rate: number;
}>;

export type CrateConfig = Config<{ loot: CrateLootTable; displayName: string; timeInMinutes: number }>;

export type NPCConfig = Config<NPCData>;

export type Reward = {
	rewardType: "boost" | "stats" | "inventory";
	reward: string;
	displayName: string;
	amount: number;
	timed?: number;
	image?: string;
	namespace?: string;
};

export type SpinConfig = Config<
	Reward & {
		chance: number;
	}
>;

export type RewardConfig = Config<
	Reward & {
		timeInMinutes: number;
	}
>;

export type UIConfig = {
	crates: { [k in keyof typeof Rarity]: string };
	boost: { [k in keyof typeof Boost]: string };
};

export type NPCData = {
	walkspeed: number;
	range: number;
	animation: string;
	chance: number;
	multiplier: number;
	giftscale: number;
	guiscale: number;
	present: {
		value: string;
		chance: string;
	};
};
