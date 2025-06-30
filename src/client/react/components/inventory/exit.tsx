import React from "@rbxts/react";

export function ExitButton() {
	return (
		<imagebutton
			key={"exit"}
			Image={"rbxassetid://126615963509378"}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.93, 0.106)}
			Size={UDim2.fromScale(0.137, 0.212)}
		>
			<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={1} />
		</imagebutton>
	);
}
