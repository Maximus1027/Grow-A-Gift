import { useEffect, useState } from "@rbxts/react";
import { CollectionService } from "@rbxts/services";
import { Events } from "client/network";
import { RootState, RootStore, store } from "client/react/store/store";
import { CrateSpin } from "./cratespin";
import React from "@rbxts/react";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { Window } from "client/react/store/producer/windowproducer";

export function CrateOpening() {
	//crate, rewardhouseid
	const [crate, setCrate] = useState<[string, string]>();

	const dispatch = useProducer<RootStore>();
	const window = useSelector((state: RootState) => state.windowManager.windows.crateopen);

	useEffect(() => {
		const onOpen = Events.onReward.connect((crateid, houseid) => {
			if (crate !== undefined) {
				return;
			}

			dispatch.setFocusedWindow(Window.crateopen);

			setCrate([crateid, houseid]);
			task.delay(9, () => {
				setCrate(undefined);
				dispatch.setFocusedWindow(undefined);
			});
		});

		return () => {
			onOpen.Disconnect();
		};
	}, []);

	return crate !== undefined && window === true && <CrateSpin crateid={crate[0]} chosenHouseid={crate[1]} />;
}
