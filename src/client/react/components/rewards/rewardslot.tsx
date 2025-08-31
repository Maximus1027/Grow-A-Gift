import { useTimer } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useState } from "@rbxts/react";
import { formatMinutesToDisplay, formatSecondsToMinutesAndSeconds, tick } from "shared/utils/generictils";
import { InteractiveButton } from "../misc/interactivebutton";

export interface RewardSlotProps {
	id: number;
	timeInSeconds: number;
	claimState: "claim" | "claimed" | "countdown";
	mega: boolean;
	onClick: () => void;
}

const getStateText = (state: RewardSlotProps, time: number) => {
	switch (state.claimState) {
		case "claim": {
			return "CLAIM!";
		}
		case "claimed": {
			return "CLAIMED";
		}
		case "countdown": {
			return formatSecondsToMinutesAndSeconds(math.round(state.timeInSeconds - tick()));
		}
	}
};

export function RewardSlot(props: RewardSlotProps) {
	const timer = useTimer(0);

	useEffect(() => {
		if (props.claimState !== "countdown") {
			return;
		}
		timer.start();

		return () => {
			timer.stop();
		};
	}, []);

	return (
		<frame
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Size={UDim2.fromScale(0.185, 0.269)}
			Position={UDim2.fromScale(0.782, 0.136)}
			LayoutOrder={props.id}
		>
			<InteractiveButton
				key={"mega"}
				Image={"rbxassetid://89094151318737"}
				LayoutOrder={props.id}
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={UDim2.fromScale(1, 1)}
				onClick={() => props.onClick()}
				velocity={0.01}
			>
				{props.mega && (
					<imagelabel
						key={"flare"}
						Image={"rbxassetid://128609139232110"}
						ScaleType={Enum.ScaleType.Fit}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.409, 0.202)}
						Size={UDim2.fromScale(1.18, 0.708)}
					/>
				)}

				<imagelabel
					key={"imageLabel"}
					Image={"rbxassetid://99904940642346"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.498, 0.463)}
					Size={UDim2.fromScale(0.749, 0.608)}
					Visible={props.claimState === "countdown"}
				/>

				{props.claimState === "countdown" && (
					<textlabel
						key={"status"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={timer.value.map((val) => getStateText(props, val))}
						TextColor3={Color3.fromRGB(255, 207, 35)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.498, 0.866)}
						Size={UDim2.fromScale(0.8, 0.25)}
					>
						<uistroke key={"uIStroke"} Thickness={3} />

						<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={45} />
					</textlabel>
				)}
				{props.claimState === "claim" && (
					<textlabel
						key={"status"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={"CLAIM!"}
						TextColor3={Color3.fromRGB(13, 255, 0)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.497, 0.859)}
						Size={UDim2.fromScale(1, 0.281)}
					>
						<uistroke key={"uIStroke"} Thickness={3} />

						<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={40} />
					</textlabel>
				)}
				{props.claimState === "claimed" && (
					<textlabel
						key={"status"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={"CLAIMED"}
						TextColor3={Color3.fromRGB(255, 0, 4)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.493, 0.875)}
						Size={UDim2.fromScale(1.13, 0.322)}
					>
						<uistroke key={"uIStroke"} Thickness={3} />

						<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={33} />
					</textlabel>
				)}
			</InteractiveButton>
		</frame>
	);
}
