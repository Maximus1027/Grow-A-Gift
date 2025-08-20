import { createProducer } from "@rbxts/reflex";

export interface InventoryState {
	inputKey?: number;
	promptHouseid?: string;
	inventory: NumberValue[];
}

const initialState: InventoryState = {
	promptHouseid: undefined,
	inventory: [],
};

export const InventoryActions = createProducer(initialState, {
	setInventory: (state: InventoryState, contents: NumberValue[]) => {
		return {
			...state,
			inventory: contents,
		};
	},
	promptHouse: (state: InventoryState, houseid?: string) => {
		return {
			...state,
			promptHouseid: state.promptHouseid === houseid ? undefined : houseid,
		};
	},
	setInputKey: (state: InventoryState, key?: number) => {
		return {
			...state,
			inputKey: key,
		};
	},
});
