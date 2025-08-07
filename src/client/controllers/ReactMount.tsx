import { Controller, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { App } from "client/react/app/App";

@Controller({
	loadOrder: 2,
})
export class ReactMount implements OnStart {
	onStart() {
		const root = createRoot(new Instance("Folder"));

		const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

		task.delay(3, () => root.render(<StrictMode>{createPortal(<App />, playerGui)}</StrictMode>));
	}
}
