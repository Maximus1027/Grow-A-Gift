import { hoarcekat } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { store } from "client/react/store/store";
import { Boost, optionalBoost, TimedBoost } from "shared/enums/Boost";
import { Boost as BoostUI } from "./boost";
import { ReflexProvider } from "@rbxts/react-reflex";
import { Players } from "@rbxts/services";

export = hoarcekat(() => {
	const boosts: optionalBoost[] = [];
	boosts.push({
		namespace: "test",
		boostType: Boost.Income,
		boostValue: 1,
		endtick: tick() + 60,
	});
	boosts.push({
		namespace: "test2",
		boostType: Boost.NPCSpeed,
		boostValue: 1.5,
	});

	store.setBoosters(boosts);

	return (
		<ReflexProvider producer={store}>
			<BoostUI />
		</ReflexProvider>
	);
});
