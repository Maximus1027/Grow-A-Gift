import { number } from "@rbxts/react/src/prop-types";
import { createProducer } from "@rbxts/reflex";
import { Boost, optionalBoost } from "shared/enums/Boost";
import { tick } from "shared/utils/generictils";

export interface RewardState {
	unlocked: number;
	claimed: number[];
	startTick: number;
}

const initialState: RewardState = {
	unlocked: 0,
	claimed: [],
	startTick: tick(),
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
	setTick: (state: RewardState, tick: number) => {
		return {
			...state,
			startTick: tick,
		};
	},
});
