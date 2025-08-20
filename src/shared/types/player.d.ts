type Boost = "Income" | "NPCSpeed" | "GiftLuck" | "InviteFriend";

declare class Player {
	stats: Folder & {
		Money: NumberValue;
		inventory: Folder;
		village: StringValue;
		rebirths: IntValue;
		spins: IntValue;
		boosts: Folder & { [k in Boost]: NumberValue };
	};
}
