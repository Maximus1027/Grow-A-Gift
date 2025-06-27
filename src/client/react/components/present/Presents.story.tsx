import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Presents } from "./Presents";
import React from "@rbxts/react";
import { MoneyValue } from "./moneyvalue";
import { Workspace } from "@rbxts/services";

export = hoarcekat(() => {
	return <MoneyValue presentid={""} parent={Workspace.FindFirstChild("SpawnLocation") as ParabolaAdornment} />;
});
