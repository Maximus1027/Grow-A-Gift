import React from "@rbxts/react";
import { formatSecondsToMinutesAndSeconds } from "shared/utils/generictils";

export interface RewardSlotProps {
	id: number;
	tickGoal: number;
}

export function RewardSlot(props: RewardSlotProps) {
	return (
		<imagebutton
			key={"imageButton2"}
			Image={"rbxassetid://127902197268115"}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.5, 0.183)}
			Size={UDim2.fromScale(0.185, 0.269)}
		>
			<textlabel
				key={"status2"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={formatSecondsToMinutesAndSeconds(props.tickGoal - tick())}
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
				Size={UDim2.fromScale(0.869, 0.289)}
			>
				<uistroke key={"uIStroke2"} Thickness={3} />

				<uitextsizeconstraint key={"uITextSizeConstraint2"} MaxTextSize={40} />
			</textlabel>

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
			/>
		</imagebutton>
	);
}
