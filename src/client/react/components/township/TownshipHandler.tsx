import { useEffect, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/react/store/store";
import { UpgradeTown } from "./upgradetown";
import { getNextVillageUnlock, getVillage } from "shared/utils/generictils";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import React from "@rbxts/react";

const player = Players.LocalPlayer;

export function Township() {
	const window = useSelector((state: RootState) => state.windowManager.windows.township);

	const [village, setVillage] = useState<
		| {
				nextVillage: string;
				current: string;
		  }
		| undefined
	>(undefined);

	useEffect(() => {
		const currentVillage = player.stats.village.Value ?? "dirt";
		if (window === true && t.string(currentVillage)) {
			const nextUnlock = getNextVillageUnlock(currentVillage);

			print(nextUnlock);

			if (nextUnlock !== undefined) {
				setVillage({
					nextVillage: nextUnlock,
					current: currentVillage,
				});
				return;
			}
			setVillage(undefined);
		}
	}, [window]);

	useEffect(() => {
		print(village);
	}, [village]);

	return (
		window === true &&
		(village === undefined ? (
			<UpgradeTown nextTown="" currentTown="" />
		) : (
			<UpgradeTown nextTown={village!.nextVillage} currentTown={village!.current} />
		))
	);
}
