import React, { useEffect, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { createPortal } from "@rbxts/react-roblox";
import { RunService } from "@rbxts/services";
import { Events } from "client/network";
import { RootState } from "client/react/store/store";
import { formatSecondsToMinutesAndSeconds, tick } from "shared/utils/generictils";

import { CrateConfig, getCrateConfig } from "shared/utils/loot";

export interface CrateTimeProps {
	crateModel: Model;
	crateid: string;
	crateTimer: number;
	placedTick: number;
}

const Crates = getCrateConfig();

export function CrateTimer(props: CrateTimeProps) {
	const [timeUntil, setTime] = useState(0);
	const isCurrentlyRolling = useSelector((state: RootState) => state.windowManager.windows.crateopen);

	useEffect(() => {
		const placed = props.placedTick;

		const count = RunService.Heartbeat.Connect(() => {
			const time = math.round(placed + props.crateTimer - tick());

			setTime(time);
		});

		return () => {
			count.Disconnect();
		};
	}, []);

	return (
		<billboardgui
			key={"billboardGui"}
			Active={true}
			Brightness={2}
			ClipsDescendants={true}
			Size={UDim2.fromScale(8, 4)}
			StudsOffsetWorldSpace={new Vector3(0, 6, 0)}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			{timeUntil <= 0 &&
				createPortal(
					<proximityprompt
						ActionText={"Open"}
						HoldDuration={1}
						Event={{
							Triggered: () => {
								if (timeUntil > 0 || isCurrentlyRolling === true) {
									return;
								}

								Events.onPlotAction.fire("open", props.crateid);
							},
						}}
					/>,
					props.crateModel,
				)}
			<imagelabel
				key={"imageLabel"}
				Image={"rbxassetid://97531847924889"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.431)}
				Size={UDim2.fromScale(0.902, 0.455)}
			>
				<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={3.52} />

				<textlabel
					key={"var_time"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={timeUntil > 0 ? formatSecondsToMinutesAndSeconds(timeUntil) : "Ready"}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={100}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.502, 0.462)}
					Size={UDim2.fromScale(0.915, 0.63)}
				>
					<uistroke key={"uIStroke"} Thickness={5} />
					<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={5.12} />
					<uitextsizeconstraint />
				</textlabel>
			</imagelabel>

			<imagelabel
				key={"imageLabel1"}
				Image={"rbxassetid://137937388093839"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.85)}
				Size={UDim2.fromScale(0.45, 0.35)}
				Visible={false}
			>
				<uiaspectratioconstraint key={"uIAspectRatioConstraint2"} AspectRatio={3.09} />
			</imagelabel>
		</billboardgui>
	);
}
