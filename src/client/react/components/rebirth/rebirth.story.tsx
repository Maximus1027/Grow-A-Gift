import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Rebirth } from "./rebirth";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";

export = hoarcekat(() => (
	<ReflexProvider producer={store}>
		<Rebirth cost={0} income={0} luck={0} speed={0} />
	</ReflexProvider>
));
