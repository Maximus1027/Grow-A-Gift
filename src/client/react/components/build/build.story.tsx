import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { BuildMenu } from "./BuildMenu";
import React from "@rbxts/react";
import { App } from "client/react/app/App";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";

export = hoarcekat(() => {
	store.toggleBuild();

	return (
		<ReflexProvider producer={store}>
			<BuildMenu />
		</ReflexProvider>
	);
});
