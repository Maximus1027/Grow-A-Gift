import React from "@rbxts/react";
import { Version } from "../components/version/version";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "../store/store";
import { Players } from "@rbxts/services";
import { MoneyDisplay } from "../components/balance/moneydisplay";
import { Hotbar } from "../components/hotbar/Hotbar";
import { Presents } from "../components/present/Presents";
import { Inventory } from "../components/inventory/inventory";
import { HouseSelect } from "../components/houseselect/SelectHouse";
import { Store } from "../components/store/Store";
import { PresentChancesHover } from "../components/hover/PresentHover";
import { Crates } from "../components/crates/Crates";
import { PreloadAssets } from "../components/preloader/preloadassets";
import { Hud } from "../components/hud/hud";
import { Township } from "../components/township/TownshipHandler";

const player = Players.LocalPlayer;
const stats = player.WaitForChild("stats");
const moneyValue = stats.WaitForChild("Money") as NumberValue;

export function App() {
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
			<Crates />
			<Hud />
			<Township />
		</ReflexProvider>
	);
}
