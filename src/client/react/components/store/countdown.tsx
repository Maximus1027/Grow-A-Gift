import React, { useEffect, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RunService } from "@rbxts/services";
import { RootState } from "client/react/store/store";
import { formatSecondsToMinutesAndSeconds } from "shared/utils/generictils";

import { timeToStock } from "shared/config/main.json";

export function CountdownTimer() {
	const lastStock = useSelector((state: RootState) => state.store.lastStock);
	const [timeUntil, setTime] = useState(0);

	useEffect(() => {
		const count = RunService.Heartbeat.Connect(() => {
			setTime(math.round(lastStock + (timeToStock as number) - os.time()));
		});

		return () => {
			count.Disconnect();
		};
	}, [lastStock]);

	return (
		<textlabel
			key={"var_time"}
			FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
			Text={"Next  Stock Reset in " + (timeUntil <= 0 ? 0 : formatSecondsToMinutesAndSeconds(timeUntil))}
			TextColor3={Color3.fromRGB(255, 255, 255)}
			TextScaled={true}
			TextSize={14}
			TextWrapped={true}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.499, 1.09)}
			Size={UDim2.fromScale(0.933, 0.178)}
		>
			<uistroke key={"uIStroke"} Thickness={3} />

			<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={8.15} />
		</textlabel>
	);
}
