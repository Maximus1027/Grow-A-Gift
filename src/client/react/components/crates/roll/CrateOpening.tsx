import { useEffect, useState } from "@rbxts/react";
import { CollectionService } from "@rbxts/services";
import { Events } from "client/network";
import { store } from "client/react/store/store";
import { CrateSpin } from "./cratespin";
import React from "@rbxts/react";

export function CrateOpening() {
	//crate, rewardhouseid
	const [crate, setCrate] = useState<[string, string]>();

	useEffect(() => {
		const onOpen = Events.onReward.connect((crateid, houseid) => {
			if (crate !== undefined) {
				return;
			}

			setCrate([crateid, houseid]);
			task.delay(9, () => {
				setCrate(undefined);
			});
		});

		return () => {
			onOpen.Disconnect();
		};
	}, []);

	return crate !== undefined && <CrateSpin crateid={crate[0]} chosenHouseid={crate[1]} />;
}
