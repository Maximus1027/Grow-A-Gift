import { combineProducers, InferState } from "@rbxts/reflex";
import { BuildActions } from "./producer/buildproducer";

export function createStore() {
	const store = combineProducers({
		build: BuildActions,
	});

	return store;
}

export const store = createStore();

export type RootStore = typeof store;
export type RootState = InferState<RootStore>;

store.subscribe((state: RootState) => {
	print(state);
});
