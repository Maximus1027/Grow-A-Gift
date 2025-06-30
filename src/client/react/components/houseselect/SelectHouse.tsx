import React from "@rbxts/react";

export function HouseSelect() {
	return (
		<screengui key={"sELECTHOUSEDEV"} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
			<imagelabel
				key={"mansion"}
				Image={"rbxassetid://106981462577987"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={UDim2.fromScale(0.326, 0.345)}
			>
				<imagebutton
					key={"exit"}
					Image={"rbxassetid://126615963509378"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.938, 0.0583)}
					Size={UDim2.fromScale(0.187, 0.313)}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={1} />
				</imagebutton>
				<imagebutton
					key={"pickup"}
					Image={"rbxassetid://136601838790547"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.29, 0.736)}
					Size={UDim2.fromScale(0.359, 0.225)}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={2.68} />
				</imagebutton>

				<imagebutton
					key={"sell"}
					Image={"rbxassetid://107865544701853"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.711, 0.736)}
					Size={UDim2.fromScale(0.359, 0.225)}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={2.68} />
				</imagebutton>

				<uiaspectratioconstraint key={"uIAspectRatioConstraint2"} AspectRatio={1.68} />

				<textlabel
					key={"selectionid"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={"Mansion"}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.5, 0.447)}
					Size={UDim2.fromScale(0.521, 0.218)}
				>
					<uistroke key={"uIStroke"} Thickness={3.5} />

					<uiaspectratioconstraint key={"uIAspectRatioConstraint3"} AspectRatio={4} />
				</textlabel>
			</imagelabel>
		</screengui>
	);
}
