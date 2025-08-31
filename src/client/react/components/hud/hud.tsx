import React from "@rbxts/react";
import { SideBar } from "./sidebar";
import { TopBar } from "./topbar";
import { SpinnerButton } from "./spinner";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/react/store/store";
import { Window } from "client/react/store/producer/windowproducer";

export function Hud() {
	return (
		<screengui
			key={"hUDDEV"}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ResetOnSpawn={false}
			Enabled={true}
		>
			<SideBar />
			<TopBar />
			<SpinnerButton />
		</screengui>
	);
}
