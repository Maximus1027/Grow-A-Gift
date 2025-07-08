import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { ReflexProvider } from "@rbxts/react-reflex";
import { Store } from "./Store";
import React from "@rbxts/react";
import { store } from "client/react/store/store";

export = hoarcekat(() => {
	store.setStock({
		trailer: 5,
	});
	store.setLastStock(os.clock());
	store.toggleStore("house");
	task.delay(3, () =>
		store.setStock({
			tiki: 10,
		}),
	);

	return (
		<ReflexProvider producer={store}>
			<Store />
		</ReflexProvider>
	);
});
