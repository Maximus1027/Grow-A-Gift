import { hoarcekat } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";

import { Window } from "client/react/store/producer/windowproducer";
import { RewardPopup } from "./rewardpopup";
import { getSpinConfig } from "shared/utils/loot";
import Object from "@rbxts/object-utils";

export = hoarcekat(() => {
	store.setWindowState(Window.rewardpopup, true);

	return (
		<ReflexProvider producer={store}>
			<RewardPopup />
		</ReflexProvider>
	);
});
