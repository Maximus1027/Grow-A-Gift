import React from "@rbxts/react";

export interface ConfirmProps {
	confirm: () => {};
	cancel: () => {};
	description: string;
}

export function Confirm(props: ConfirmProps) {
	return (
		<screengui key={"CONFIRM DECISION"} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
			<imagelabel
				key={"main"}
				Image={"rbxassetid://72947143360155"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.499)}
				Size={UDim2.fromScale(0.347, 0.406)}
			>
				<imagebutton
					key={"yes"}
					Image={"rbxassetid://113101002196655"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.288, 0.754)}
					Size={UDim2.fromScale(0.359, 0.225)}
					Event={{
						Activated: () => props.confirm(),
					}}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={2.68} />
				</imagebutton>

				<imagebutton
					key={"no"}
					Image={"rbxassetid://118416060796922"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.709, 0.754)}
					Size={UDim2.fromScale(0.359, 0.225)}
					Event={{
						Activated: () => props.cancel(),
					}}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={2.68} />
				</imagebutton>

				<textlabel
					key={"msg"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					RichText={true}
					Text={props.description}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.502, 0.414)}
					Size={UDim2.fromScale(0.865, 0.371)}
				>
					<uistroke key={"uIStroke"} Thickness={3.5} />
				</textlabel>

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
					<uiaspectratioconstraint key={"uIAspectRatioConstraint2"} AspectRatio={1} />
				</imagebutton>

				<uiaspectratioconstraint key={"uIAspectRatioConstraint3"} AspectRatio={1.52} />
			</imagelabel>
		</screengui>
	);
}
