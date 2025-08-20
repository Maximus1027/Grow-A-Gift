import { createProducer } from "@rbxts/reflex";

export interface SpinState {
	chosenReward?: string;
}

const initialState: SpinState = {
	chosenReward: undefined,
};

export const SpinActions = createProducer(initialState, {
	//Enable the store based on storeid, if not given then turn off
	setReward: (state: SpinState, reward?: string) => {
		return {
			...state,
			chosenReward: reward,
		};
	},
});
