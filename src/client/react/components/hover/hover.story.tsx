import { hoarcekat } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";
import { Store } from "../store/Store";
import { PresentChancesHover } from "./PresentHover";
import { getLootTable } from "shared/utils/loot";

export = hoarcekat(() => {
	store.toggleChancesHover("tiki");
	return (
		<ReflexProvider producer={store}>
			<PresentChancesHover />
		</ReflexProvider>
	);
});
