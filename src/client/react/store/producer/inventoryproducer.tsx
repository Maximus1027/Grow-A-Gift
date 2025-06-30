import { createProducer } from "@rbxts/reflex";

export interface InventoryState {
	inventoryOpen: boolean;
	inventory: NumberValue[];
}

const initialState: InventoryState = {
	inventoryOpen: false,
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
});
