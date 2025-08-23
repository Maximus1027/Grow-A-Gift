export enum Boost {
	"Income" = "Income",
	"NPCSpeed" = "NPCSpeed",
	"GiftLuck" = "GiftLuck",
	"InviteFriend" = "InviteFriend",
}

export type BoostData = {
	namespace: string;
	boostType: Boost;
	boostValue: number;
};

export type optionalBoost = BoostData & {
	endtick?: number;
};

export type TimedBoost = BoostData & {
	player: Player;
	namespace: string;
	endtick: number;
};
