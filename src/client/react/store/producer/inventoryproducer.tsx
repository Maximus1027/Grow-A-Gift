import { createProducer } from "@rbxts/reflex";

export interface InventoryState {
	inventoryOpen: boolean;
	promptHouseid?: string;
	inventory: NumberValue[];
}

const initialState: InventoryState = {
	inventoryOpen: false,
	promptHouseid: undefined,
	inventory: [],
};

export const InventoryActions = createProducer(initialState, {
	toggleInventory: (state: InventoryState) => {
		return {
			...state,
			inventoryOpen: !state.inventoryOpen,
		};
	},
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
});
