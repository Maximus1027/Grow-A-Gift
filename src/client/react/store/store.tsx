import { combineProducers, InferState } from "@rbxts/reflex";
import { BuildActions } from "./producer/buildproducer";
import { InventoryActions } from "./producer/inventoryproducer";

export function createStore() {
	const store = combineProducers({
		build: BuildActions,
		inventory: InventoryActions,
	});

	return store;
}

export const store = createStore();

export type RootStore = typeof store;
export type RootState = InferState<RootStore>;

store.subscribe((state: RootState) => {
	//	print(state);
});
