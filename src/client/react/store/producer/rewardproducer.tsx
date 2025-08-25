import { createProducer } from "@rbxts/reflex";
import { Boost, optionalBoost } from "shared/enums/Boost";

export interface RewardState {
	unlocked: number;
	claimed: number[];
}

const initialState: RewardState = {
	unlocked: 0,
	claimed: [],
};

export const RewardActions = createProducer(initialState, {
	setUnlocked: (state: RewardState, unlock: number) => {
		return {
			...state,
			unlocked: unlock,
		};
	},
	setClaimed: (state: RewardState, claimed: number[]) => {
		return {
			...state,
			claimed: claimed,
		};
	},
});
