import React from "@rbxts/react";
import { BuildMenu } from "../components/build/BuildMenu";
import { Version } from "../components/version/version";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "../store/store";
import { Players } from "@rbxts/services";
import { MoneyDisplay } from "../components/balance/moneydisplay";

const player = Players.LocalPlayer;
const stats = player.WaitForChild("stats");
const moneyValue = stats.WaitForChild("Money") as NumberValue;

export function App() {
	return (
		<ReflexProvider producer={store}>
			<BuildMenu />
			<Version />
			<MoneyDisplay value={moneyValue} />
		</ReflexProvider>
	);
}
