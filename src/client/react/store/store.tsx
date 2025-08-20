import { combineProducers, InferState } from "@rbxts/reflex";
import { BuildActions } from "./producer/buildproducer";
import { InventoryActions } from "./producer/inventoryproducer";
import { StoreActions } from "./producer/storeproducer";
import { CrateActions } from "./producer/crateproducer";
import { WindowActions } from "./producer/windowproducer";
import { SpinActions } from "./producer/spinproducer";

export function createStore() {
	const store = combineProducers({
		build: BuildActions,
		inventory: InventoryActions,
		store: StoreActions,
		crate: CrateActions,
		windowManager: WindowActions,
		spin: SpinActions,
	});

	return store;
}

export const store = createStore();

export type RootStore = typeof store;
export type RootState = InferState<RootStore>;

store.subscribe((state: RootState) => {
	//print(state.windowManager.windows);
	//print(state.inventory.inputKey);
});
