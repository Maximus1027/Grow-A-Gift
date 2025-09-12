import { Controller, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { Events } from "client/network";
import { App } from "client/react/app/App";
import { getPlayerPlotFolder } from "shared/utils/generictils";

@Controller({
	loadOrder: 2,
})
export class ReactMount implements OnStart {
	onStart() {
		const root = createRoot(new Instance("Folder"));

		const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

		print("Loaded");

		Events.onDataLoaded.connect(() => {
			print("Client loading...");
			root.render(<StrictMode>{createPortal(<App />, playerGui)}</StrictMode>);
		});
	}
}
