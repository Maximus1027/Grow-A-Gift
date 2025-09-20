import { hoarcekat } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";
import { Hotbar } from "./Hotbar";
import { getHouseConfig } from "shared/utils/loot";
import Object from "@rbxts/object-utils";

export = hoarcekat(() => {
	const stored: NumberValue[] = [];

	const a = (houseid: string) => {
		const item = new Instance("NumberValue");
		item.Name = houseid;
		item.Value = 1;
		item.SetAttribute("equip", 1);

		stored.push(item);
	};

	for (const house of Object.keys(getHouseConfig())) {
		a(house);
	}

	store.setInventory(stored);

	return (
		<ReflexProvider producer={store}>
			<Hotbar />
		</ReflexProvider>
	);
});
