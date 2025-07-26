import React from "@rbxts/react";
import { CrateOpening } from "./roll/CrateOpening";
import { TimeManager } from "./countdown/TimeManager";

export function Crates() {
	return (
		<React.Fragment>
			<CrateOpening />
			<TimeManager />
		</React.Fragment>
	);
}
