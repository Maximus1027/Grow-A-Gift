import React from "@rbxts/react";
import { Rarity } from "shared/enums/Rarity";

export interface RarityProps {
	rarity: Rarity;
}

export function RarityButton() {
	return (
		<imagebutton
			key={"imageButton"}
			Image={"rbxassetid://104690182497244"}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.06, 0.4)}
			Size={UDim2.fromScale(0.12, 0.8)}
		/>
	);
}
