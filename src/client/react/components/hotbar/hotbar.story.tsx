import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Hotbar } from "./Hotbar";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";

export = hoarcekat(() => {
	print("yo");
	return (
		<ReflexProvider producer={store}>
			<Hotbar />
		</ReflexProvider>
	);
});
