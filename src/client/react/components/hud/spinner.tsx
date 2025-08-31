import React from "@rbxts/react";
import { Button } from "../misc/button";
import { useProducer } from "@rbxts/react-reflex";
import { Window, WindowState } from "client/react/store/producer/windowproducer";
import { RootStore } from "client/react/store/store";
import { InteractiveButton } from "../misc/interactivebutton";
import { WindowWrapper } from "../windows/windowwrapper";

export function SpinnerButton() {
	const dispatch = useProducer<RootStore>();

	return (
		<WindowWrapper window={Window.hud} target={UDim2.fromScale(0.5, -0.2)}>
			<frame
				key={"spinner"}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.856, 0.05)}
				Size={UDim2.fromScale(0.0814, 0.145)}
			>
				<imagelabel
					key={"leg"}
					Image={"rbxassetid://106717852261852"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.765, 0.474)}
					Size={UDim2.fromScale(0.339, 0.692)}
					ZIndex={0}
				/>

				<InteractiveButton
					key={"spin"}
					Image={"rbxassetid://105458860026898"}
					Position={UDim2.fromScale(0.766, 0.768)}
					Size={UDim2.fromScale(0.674, 0.717)}
					onClick={() => {
						dispatch.toggleWindowState(Window.spin);
					}}
					hover={0.95}
					ZIndex={1}
				/>

				<textlabel
					key={"textLabel"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={"10:00"}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.762, 1.11)}
					Size={UDim2.fromScale(1.28, 0.32)}
				>
					<uistroke key={"uIStroke"} Thickness={4} />
				</textlabel>
			</frame>
		</WindowWrapper>
	);
}
