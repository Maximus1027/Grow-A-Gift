import { createProducer } from "@rbxts/reflex";
import { Boost, optionalBoost } from "shared/enums/Boost";

export interface BoosterState {
	activeBoosts: optionalBoost[];
}

const initialBoosterState: BoosterState = {
	activeBoosts: [],
};

export const BoosterActions = createProducer(initialBoosterState, {
	setBoosters: (state: BoosterState, boosters: BoosterState["activeBoosts"]) => {
		return {
			...state,
			activeBoosts: boosters,
		};
	},
});
