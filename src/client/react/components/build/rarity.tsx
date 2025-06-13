import React, { ReactChildren } from "@rbxts/react";
import { Rarity } from "shared/enums/Rarity";
import * as UIoptions from "shared/config/ui.json";
import Object from "@rbxts/object-utils";

export interface RarityProps {
	rarity: Rarity;
	children?: React.ReactNode;
}

export function RarityButton(props: RarityProps) {
	const imageId = Object.entries(UIoptions.build).filter((obj) => {
		return (obj[0] as unknown as Rarity) === props.rarity;
	})[0][1];

	return (
		<imagebutton
			key={"imageButton"}
			Image={imageId}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.06, 0.4)}
			Size={UDim2.fromScale(0.12, 0.8)}
		>
			{props.children}
		</imagebutton>
	);
}
