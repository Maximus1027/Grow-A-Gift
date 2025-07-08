import React from "@rbxts/react";
import { Rarity } from "shared/enums/Rarity";
import { convertChanceToString } from "shared/utils/loot";

export interface ChanceProps {
	rarity: Rarity;
	chanceString: string;
}

export function Chance(props: ChanceProps) {
	return (
		<frame
			key={"chance" + props.rarity}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.5, 0.0815)}
			Size={UDim2.fromScale(1, 0.163)}
		>
			<viewportframe
				key={"viewportFrame"}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.19, 0.578)}
				Size={UDim2.fromScale(0.251, 1)}
				ZIndex={3}
			/>

			<textlabel
				key={"chance1"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={props.chanceString}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.699, 0.529)}
				Size={UDim2.fromScale(0.573, 0.902)}
			>
				<uistroke key={"uIStroke"} Thickness={3} />

				<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={46} />
			</textlabel>
		</frame>
	);
}
