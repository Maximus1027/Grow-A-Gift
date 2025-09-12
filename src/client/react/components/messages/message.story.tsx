import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Messages } from "./messages";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";
import { Window } from "client/react/store/producer/windowproducer";

export = hoarcekat(() => {
	return (
		<ReflexProvider producer={store}>
			<Messages />
		</ReflexProvider>
	);
});
