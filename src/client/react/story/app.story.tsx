import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { Players } from "@rbxts/services";
import { MoneyDisplay } from "../components/balance/moneydisplay";
import { Hotbar } from "../components/hotbar/Hotbar";
import { Presents } from "../components/present/Presents";
import { Version } from "../components/version/version";
import { createStore, store } from "../store/store";
import { hoarcekat } from "@rbxts/pretty-react-hooks";

const player = Players.LocalPlayer;
const moneyValue = new Instance("NumberValue");

export = hoarcekat(() => {
	return (
		<ReflexProvider producer={store}>
			<Version />
			<MoneyDisplay value={moneyValue} />
			<Hotbar />
		</ReflexProvider>
	);
});
