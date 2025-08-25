import React from "@rbxts/react";
import { Button } from "../generic/button";
import { useProducer } from "@rbxts/react-reflex";
import { RootStore } from "client/react/store/store";
import { Window } from "client/react/store/producer/windowproducer";
import { Players, SocialService } from "@rbxts/services";

export function SideBar() {
	const dispatch = useProducer<RootStore>();

	return (
		<frame
			key={"sidebar"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.069, 0.5)}
			Size={UDim2.fromScale(0.089, 0.411)}
		>
			<Button
				key={"store"}
				Image={"rbxassetid://106493541616767"}
				Position={UDim2.fromScale(0.659, 0.139)}
				Size={UDim2.fromScale(1.761, 0.301)}
				onClick={() => {}}
			/>
			<Button
				key={"var_settings"}
				Image={"rbxassetid://104444834711761"}
				Position={UDim2.fromScale(0.212, 0.831)}
				Size={UDim2.fromScale(0.832, 0.353)}
				onClick={() => {}}
			/>
			<Button
				key={"rewards"}
				Image={"rbxassetid://121515043185114"}
				Position={UDim2.fromScale(0.214, 0.476)}
				Size={UDim2.fromScale(0.836, 0.341)}
				onClick={() => dispatch.toggleWindowState(Window.rewards)}
			/>

			<Button
				key={"rebirth"}
				Image={"rbxassetid://113933330229309"}
				Position={UDim2.fromScale(1.118, 0.473)}
				Size={UDim2.fromScale(0.836, 0.341)}
				onClick={() => {
					dispatch.toggleWindowState(Window.rebirth);
				}}
			/>

			<Button
				key={"invite"}
				Image={"rbxassetid://86420249705256"}
				Position={UDim2.fromScale(1.116, 0.826)}
				Size={UDim2.fromScale(0.833, 0.341)}
				onClick={() => {
					dispatch.toggleWindowState(Window.invite);
				}}
			/>

			<uiaspectratioconstraint key={"uIAspectRatioConstraint5"} AspectRatio={0.385} />
		</frame>
	);
}
