import React from "@rbxts/react";
import { BuildMenu } from "../components/build/BuildMenu";
import { Version } from "../components/version/version";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "../store/store";

export function App() {
	return (
		<ReflexProvider producer={store}>
			<BuildMenu />
			<Version />
		</ReflexProvider>
	);
}
