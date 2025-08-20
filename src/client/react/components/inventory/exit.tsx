import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { useProducer } from "@rbxts/react-reflex";
import { RootStore } from "client/react/store/store";

export interface ExitButtonProps {
	Position: UDim2;
	Size: UDim2;
	onClick: () => void;
}

export function ExitButton(props: ExitButtonProps) {
	return (
		<imagebutton
			key={"exit"}
			Image={"rbxassetid://140390112233945"}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={props.Position}
			Rotation={0}
			Size={props.Size}
			Event={{
				Activated: () => {
					props.onClick();
				},
			}}
		>
			<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={1} />
		</imagebutton>
	);
}
