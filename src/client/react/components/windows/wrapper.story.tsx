import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { WindowWrapper } from "./windowwrapper";
import React from "@rbxts/react";
import { Window } from "client/react/store/producer/windowproducer";
import { Confirm } from "../confirm/Confirm";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";

export = hoarcekat(() => {
	store.setWindowState(Window.confirm, true);
	return (
		<ReflexProvider producer={store}>
			<WindowWrapper window={Window.confirm} target={UDim2.fromScale(0.5, 1.5)}>
				<frame Position={UDim2.fromScale(0.5, 0.5)} Size={UDim2.fromScale(0.1, 0.1)}></frame>
			</WindowWrapper>
		</ReflexProvider>
	);
});
