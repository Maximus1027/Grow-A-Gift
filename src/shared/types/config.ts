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
