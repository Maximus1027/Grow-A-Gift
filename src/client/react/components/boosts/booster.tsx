import React, { useEffect, useState } from "@rbxts/react";
import { RunService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { formatSecondsToMinutesAndSeconds, tick } from "shared/utils/generictils";

export interface BoosterProps {
	imageid: string;
	value: number;
	endtick: number;
}

export function Booster(props: BoosterProps) {
	const [displayTime, setDisplayTime] = useState<string>("");

	useEffect(() => {
		const endtick = props.endtick;
		if (!t.number(endtick)) {
			return;
		}

		const stepped = RunService.Heartbeat.Connect(() => {
			const tickLeft = math.round(endtick - tick());
			const display = formatSecondsToMinutesAndSeconds(tickLeft);
			setDisplayTime(display);
		});

		return () => {
			stepped.Disconnect();
		};
	}, []);

	return (
		<imagelabel
			key={"booster"}
			Image={props.imageid}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			LayoutOrder={4}
			Position={UDim2.fromScale(0.88, 0.0461)}
			Size={UDim2.fromScale(0.251, 1)}
		>
			<textlabel
				key={"label"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={props.value < 1 ? props.value * 100 + "%" : props.value + "x"}
				TextColor3={Color3.fromRGB(229, 194, 22)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.492, 0.0714)}
				Size={UDim2.fromScale(1, 0.3)}
			>
				<uistroke key={"uIStroke"} Thickness={4} />
			</textlabel>

			{props.endtick !== undefined && (
				<textlabel
					key={"timed"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={displayTime}
					TextColor3={Color3.fromRGB(241, 241, 241)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.5, 1.111)}
					Size={UDim2.fromScale(1, 0.234)}
				>
					<uistroke key={"uIStroke"} Thickness={4} />
				</textlabel>
			)}
		</imagelabel>
	);
}
