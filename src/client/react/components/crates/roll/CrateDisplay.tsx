import React, { useEffect, useState } from "@rbxts/react";
import { HouseDisplay } from "../housedisplay";
import { useMotion } from "@rbxts/pretty-react-hooks";

export interface CrateProps {
	houseid: string;
	position: UDim2;
	imageid: string;
	chanceDisplay: string;
	key?: string;
}

export function CrateDisplay(props: CrateProps) {
	return (
		<imagelabel
			key={props.key}
			Image={props.imageid}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={props.position}
			Size={UDim2.fromScale(0.173, 0.973)}
		>
			<HouseDisplay
				houseid={props.houseid}
				rotate={false}
				Size={UDim2.fromScale(1, 1)}
				Position={UDim2.fromScale(0.5, 0.5)}
			/>

			<textlabel
				key={"chance"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				RichText={true}
				Text={props.chanceDisplay}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.496, 0.824)}
				Size={UDim2.fromScale(0.904, 0.276)}
			>
				<uistroke key={"uIStroke"} Thickness={4} />
			</textlabel>

			<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={1} />
		</imagelabel>
	);
}
