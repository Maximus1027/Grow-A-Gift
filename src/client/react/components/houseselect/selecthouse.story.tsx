import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { HouseSelect } from "./SelectHouse";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";

export = hoarcekat(() => {
	store.promptHouse("Mansion-2323123");
	return (
		<ReflexProvider producer={store}>
			<HouseSelect />
		</ReflexProvider>
	);
});
