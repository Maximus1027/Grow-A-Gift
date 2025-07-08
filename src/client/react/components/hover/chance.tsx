import React from "@rbxts/react";
import { Rarity } from "shared/enums/Rarity";
import { convertChanceToString } from "shared/utils/loot";
import { PresentDisplay } from "../store/presentdisplay";

export interface ChanceProps {
	chanceString: string;
	rarity: Rarity;
	order: number;
}

export function Chance(props: ChanceProps) {
	return (
		<frame
			key={"chance"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.5, 0.0815)}
			Size={UDim2.fromScale(1, 0.163)}
			LayoutOrder={props.order}
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

			<PresentDisplay
				position={UDim2.fromScale(0.15, 0.5)}
				size={UDim2.fromScale(0.25, 1)}
				distance={2.3}
				rarity={props.rarity}
			/>

			<textlabel
				key={"chance1"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={props.chanceString}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				RichText={true}
				TextWrapped={true}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.64, 0.5)}
				Size={UDim2.fromScale(0.573, 0.902)}
			>
				<uistroke key={"uIStroke"} Thickness={3} />

				<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={46} />
			</textlabel>
		</frame>
	);
}
