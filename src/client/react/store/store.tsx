import { combineProducers, InferState } from "@rbxts/reflex";
import { BuildActions } from "./producer/buildproducer";
import { InventoryActions } from "./producer/inventoryproducer";
import { StoreActions } from "./producer/storeproducer";
import { CrateActions } from "./producer/crateproducer";

export function createStore() {
	const store = combineProducers({
		build: BuildActions,
		inventory: InventoryActions,
		store: StoreActions,
		crate: CrateActions,
	});

	return store;
}

export const store = createStore();

export type RootStore = typeof store;
export type RootState = InferState<RootStore>;

store.subscribe((state: RootState) => {
	//	print(state);
});
