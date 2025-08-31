import React from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { func } from "@rbxts/react/src/prop-types";

export interface PFPProps {
	imageLabel: string;
	part: Instance;
}

export function PFP(props: PFPProps) {
	return createPortal(
		<billboardgui
			key={"billboardGui"}
			Active={true}
			Brightness={2}
			ClipsDescendants={true}
			Size={UDim2.fromScale(20, 55)}
			StudsOffsetWorldSpace={new Vector3(0, 60, 0)}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			<imagelabel
				key={"imageLabel"}
				Image={props.imageLabel}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.431)}
				Size={UDim2.fromScale(0.902, 0.455)}
			>
				<uicorner key={"uICorner"} CornerRadius={new UDim(1, 0)} />
			</imagelabel>

			<textlabel
				key={"var_time"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={"YOU"}
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
				Visible={false}
			>
				<uistroke key={"uIStroke"} Thickness={5} />
				<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={5.12} />
				<uitextsizeconstraint />
			</textlabel>
		</billboardgui>,

		props.part,
	);
}
