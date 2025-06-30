import React from "@rbxts/react";
import { Version } from "../components/version/version";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "../store/store";
import { Players } from "@rbxts/services";
import { MoneyDisplay } from "../components/balance/moneydisplay";
import { Hotbar } from "../components/hotbar/Hotbar";
import { Presents } from "../components/present/Presents";
import { Inventory } from "../components/inventory/inventory";

const player = Players.LocalPlayer;
const stats = player.WaitForChild("stats");
const moneyValue = stats.WaitForChild("Money") as NumberValue;

export function App() {
	const hotbarFolder = player.WaitForChild("stats").WaitForChild("hotbar") as Folder;

	return (
		<ReflexProvider producer={store}>
			<Version />
			<Presents />
			<MoneyDisplay value={moneyValue} />
			<Hotbar inventoryFolder={hotbarFolder} />
			<Inventory />
		</ReflexProvider>
	);
}
