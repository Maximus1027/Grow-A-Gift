import { hoarcekat } from "@rbxts/pretty-react-hooks";

import React, { useEffect } from "@rbxts/react";
import { MoneyDisplay } from "./moneydisplay";
import { Players } from "@rbxts/services";

const moneyDisplay = new Instance("NumberValue");

export = hoarcekat(() => {
	useEffect(() => {
		moneyDisplay.Value = math.random(1, 1000);
	}, []);

	return <MoneyDisplay value={moneyDisplay} />;
});
