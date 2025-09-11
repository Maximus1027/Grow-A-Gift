import { createProducer } from "@rbxts/reflex";
import { InventoryState } from "./inventoryproducer";

export interface CrateState {
	crateList: Model[];
}

const initialState: CrateState = {
	crateList: [],
};

export const CrateActions = createProducer(initialState, {
	setCrateList: (state: CrateState, crates: Model[]) => {
		return {
			...state,
			crateList: crates,
		};
	},
});
