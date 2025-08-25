import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Reward } from "../spinner/reward";
import { Rewards } from "./rewards";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";
import { Window } from "client/react/store/producer/windowproducer";

export = hoarcekat(() => {
	store.setUnlocked(3);
	store.setClaimed([1, 3]);
	store.setWindowState(Window.rewards, true);

	return (
		<ReflexProvider producer={store}>
			<Rewards />
		</ReflexProvider>
	);
});
