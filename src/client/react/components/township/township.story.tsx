import { hoarcekat } from "@rbxts/pretty-react-hooks";

import React from "@rbxts/react";
import { UpgradeTown } from "./upgradetown";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";
import { Window } from "client/react/store/producer/windowproducer";

export = hoarcekat(() => {
	store.setWindowState(Window.township, true);
	return (
		<ReflexProvider producer={store}>
			<UpgradeTown nextTown={"sand"} currentTown={"dirt"} />
		</ReflexProvider>
	);
});
