import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { App } from "../app/App";
import { ReflexProvider } from "@rbxts/react-reflex";
import React from "@rbxts/react";
import { MoneyDisplay } from "../components/balance/moneydisplay";
import { BuildMenu } from "../components/build/BuildMenu";
import { Version } from "../components/version/version";
import { store } from "../store/store";

const moneyDisplay = new Instance("NumberValue");

export = hoarcekat(() => {
	return (
		<ReflexProvider producer={store}>
			<BuildMenu />
			<Version />
			<MoneyDisplay value={moneyDisplay} />
		</ReflexProvider>
	);
});
