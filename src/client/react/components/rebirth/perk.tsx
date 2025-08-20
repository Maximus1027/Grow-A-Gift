import React from "@rbxts/react";
import { Boost } from "shared/enums/Boost";

export interface PerkProps {
	percentBoost: number;
	boostType: Boost;
}

export function Perk(props: PerkProps) {
	return (
		<textlabel
			key={"perk"}
			FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
			RichText={true}
			Text={`<font color="rgb(60,250,0)">+${props.percentBoost}%</font> ${props.boostType}`}
			TextColor3={Color3.fromRGB(255, 255, 255)}
			TextScaled={true}
			TextSize={14}
			TextWrapped={true}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.181, 0.535)}
			Size={UDim2.fromScale(0.333, 0.636)}
		>
			<uistroke key={"uIStroke1"} Thickness={3} />

			<uitextsizeconstraint key={"uITextSizeConstraint1"} MaxTextSize={32} />
		</textlabel>
	);
}
