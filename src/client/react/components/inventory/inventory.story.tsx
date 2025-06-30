import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Inventory } from "./inventory";
import React from "@rbxts/react";

export = hoarcekat(() => {
	return <Inventory inventoryFolder={new Instance("Folder")} />;
});
