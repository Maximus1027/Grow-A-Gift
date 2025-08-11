import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Hud } from "./hud";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";

export = hoarcekat(() => (
	<ReflexProvider producer={store}>
		<Hud />
	</ReflexProvider>
));
