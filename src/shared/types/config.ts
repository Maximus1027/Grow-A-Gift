import { Boost } from "shared/enums/Boost";
import { Rarity } from "shared/enums/Rarity";

export type RebirthConfig = {
	[key: string]: {
		cost: number;
		boost: {
			Income: number;
			NPCSpeed: number;
			GiftLuck: number;
		};
	};
};

export type UIConfig = {
	crates: { [k in keyof typeof Rarity]: string };
	boost: { [k in keyof typeof Boost]: string };
};
