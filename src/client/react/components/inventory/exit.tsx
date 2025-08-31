import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { useProducer } from "@rbxts/react-reflex";
import { RootStore } from "client/react/store/store";
import { InteractiveButton } from "../misc/interactivebutton";

export interface ExitButtonProps {
	Position: UDim2;
	Size: UDim2;
	onClick: () => void;
}

export function ExitButton(props: ExitButtonProps) {
	return (
		<InteractiveButton
			key={"exit"}
			Image={"rbxassetid://140390112233945"}
			Position={props.Position}
			Size={props.Size}
			onClick={() => props.onClick()}
		>
			<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={1} />
		</InteractiveButton>
	);
}
