import { createProducer } from "@rbxts/reflex";
import { storeType } from "client/react/components/store/Store";

export interface StoreState {
	storeOpen?: storeType;
	stock: Record<string, number>;
	lastStock: number;
	hovering?: string;
}

const initialState: StoreState = {
	storeOpen: "house",
	stock: {},
	lastStock: 0,
	hovering: undefined,
};

export const StoreActions = createProducer(initialState, {
	//Enable the store based on storeid, if not given then turn off
	toggleStore: (state: StoreState, store?: storeType) => {
		return {
			...state,
			storeOpen: store,
		};
	},
	setStock: (state: StoreState, stock: Record<string, number>) => {
		return {
			...state,
			stock: stock ?? {},
		};
	},
	setLastStock: (state: StoreState, time: number) => {
		return {
			...state,
			lastStock: time,
		};
	},
	toggleChancesHover: (state: StoreState, hoveringHouse?: string) => {
		return { ...state, hovering: hoveringHouse };
	},
});
