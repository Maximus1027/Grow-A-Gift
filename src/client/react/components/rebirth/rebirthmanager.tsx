import { useEffect, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/react/store/store";
import { Rebirth } from "./rebirth";
import React from "@rbxts/react";
import { Players } from "@rbxts/services";
import { getRebirthConfig } from "shared/utils/configtils";

export function RebirthManager() {
	const window = useSelector((state: RootState) => state.windowManager.windows.rebirth);
	//                                       cost, income, luck, speed
	const [rebirthData, setData] = useState<[number, number, number, number]>([0, 0, 0, 0]);

	useEffect(() => {
		const currentRebirth = Players.LocalPlayer.stats.rebirths.Value ?? 0;

		const rebirth = getRebirthConfig()[tostring(currentRebirth + 1)];

		if (!rebirth) {
			setData([-1, -1, -1, -1]);
			return;
		}

		setData([rebirth.cost, rebirth.boost.Income, rebirth.boost.GiftLuck, rebirth.boost.NPCSpeed]);
	}, [window]);

	return (
		window && <Rebirth cost={rebirthData[0]} income={rebirthData[1]} luck={rebirthData[2]} speed={rebirthData[3]} />
	);
}
