import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { Players } from "@rbxts/services";
import { MoneyDisplay } from "../components/balance/moneydisplay";
import { Hotbar } from "../components/hotbar/Hotbar";
import { Presents } from "../components/present/Presents";
import { Version } from "../components/version/version";
import { createStore, store } from "../store/store";
import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { PreloadAssets } from "../components/preloader/preloadassets";
import { Inventory } from "../components/inventory/inventory";
import { Store } from "../components/store/Store";
import { Crates } from "../components/crates/Crates";
import { HouseSelect } from "../components/houseselect/SelectHouse";
import { PresentChancesHover } from "../components/hover/PresentHover";
import { Hud } from "../components/hud/hud";

const player = Players.LocalPlayer;
const moneyValue = new Instance("NumberValue");

export = hoarcekat(() => {
	return (
		<ReflexProvider producer={store}>
			<PreloadAssets />
			<Version />
			<Presents />
			<MoneyDisplay value={moneyValue} />
			<Hotbar />
			<Inventory />
			<Store />
			<HouseSelect />
			<PresentChancesHover />
			<Hud />
		</ReflexProvider>
	);
});
