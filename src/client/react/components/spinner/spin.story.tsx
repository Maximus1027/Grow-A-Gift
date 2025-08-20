import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Spin } from "./spin";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";
import { Window } from "client/react/store/producer/windowproducer";

export = hoarcekat(() => {
	store.setWindowState(Window.spin, true);

	return (
		<ReflexProvider producer={store}>
			<Spin />
		</ReflexProvider>
	);
});
