import React, { useEffect, useState } from "@rbxts/react";
import { Button } from "../generic/button";
import { Reward } from "./reward";
import { useMotion } from "@rbxts/pretty-react-hooks";
import { SpinAnimation } from "./spinanimation";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RootState, RootStore } from "client/react/store/store";
import { getSpinConfig } from "shared/utils/loot";

import { Events } from "client/network";
import { Window } from "client/react/store/producer/windowproducer";
import { Players } from "@rbxts/services";

const player = Players.LocalPlayer;

export function Spin() {
	const window = useSelector((state: RootState) => state.windowManager);
	const [spins, setSpins] = useState<number>(0);

	const reward = useSelector((state: RootState) => state.spin.chosenReward);
	const dispatch = useProducer<RootStore>();

	useEffect(() => {
		const stats = Players.LocalPlayer.FindFirstChild("stats");

		if (!stats) {
			return;
		}

		const spinsValue = stats.FindFirstChild("spins") as NumberValue;

		const spins = spinsValue.Value ?? 0;
		setSpins(spins);
	}, [window.windows.spin, window.inFocus]);

	return (
		<screengui
			key={"sPINNERDEV"}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ResetOnSpawn={false}
			Enabled={window.windows.spin === true}
		>
			<imagelabel
				key={"main"}
				Image={"rbxassetid://74963660050421"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.456)}
				Size={UDim2.fromScale(0.335, 0.533)}
			>
				<uiaspectratioconstraint />
				<SpinAnimation
					onAnimationComplete={() => {
						dispatch.setReward(undefined);
						dispatch.setFocusedWindow(undefined);
					}}
				/>

				<imagelabel
					key={"var_tick"}
					Image={"rbxassetid://78596949992244"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.498, 0.0664)}
					Size={UDim2.fromScale(0.308, 0.308)}
					ZIndex={5}
				>
					<uiaspectratioconstraint />
				</imagelabel>
				{window.inFocus === false && (
					<React.Fragment>
						<textlabel
							key={"spinsamount"}
							FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
							Text={spins + " Spins"}
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextScaled={true}
							TextSize={14}
							TextWrapped={true}
							AnchorPoint={new Vector2(0.5, 0.5)}
							BackgroundColor3={Color3.fromRGB(255, 255, 255)}
							BackgroundTransparency={1}
							BorderColor3={Color3.fromRGB(0, 0, 0)}
							BorderSizePixel={0}
							Position={UDim2.fromScale(0.502, 1.38)}
							Size={UDim2.fromScale(0.708, 0.121)}
						>
							<uistroke key={"uIStroke"} Thickness={3} />
						</textlabel>
						<Button
							key={"spin"}
							Image={"rbxassetid://135371424340238"}
							Position={UDim2.fromScale(0.5, 1.19)}
							Size={UDim2.fromScale(0.567, 0.193)}
							imageColor={Color3.fromRGB(75, 255, 55)}
							onClick={() => {
								reward === undefined && Events.onSpin.fire();
							}}
						>
							<textlabel
								key={"textLabel"}
								FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
								Text={"SPIN"}
								TextColor3={Color3.fromRGB(255, 255, 255)}
								TextScaled={true}
								TextSize={14}
								TextWrapped={true}
								AnchorPoint={new Vector2(0.5, 0.5)}
								BackgroundColor3={Color3.fromRGB(255, 255, 255)}
								BackgroundTransparency={1}
								BorderColor3={Color3.fromRGB(0, 0, 0)}
								BorderSizePixel={0}
								Position={UDim2.fromScale(0.5, 0.452)}
								Size={UDim2.fromScale(0.874, 0.667)}
							>
								<uistroke key={"uIStroke"} Thickness={3} />
							</textlabel>
						</Button>
						<Button
							key={"buy1"}
							Image={"rbxassetid://135371424340238"}
							Position={UDim2.fromScale(-0.172, 1.09)}
							Size={UDim2.fromScale(0.567, 0.193)}
							onClick={() => {}}
							imageColor={Color3.fromRGB(255, 255, 119)}
						>
							<textlabel
								key={"textLabel1"}
								FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
								Text={"BUY x5"}
								TextColor3={Color3.fromRGB(255, 255, 255)}
								TextScaled={true}
								TextSize={14}
								TextWrapped={true}
								AnchorPoint={new Vector2(0.5, 0.5)}
								BackgroundColor3={Color3.fromRGB(255, 255, 255)}
								BackgroundTransparency={1}
								BorderColor3={Color3.fromRGB(0, 0, 0)}
								BorderSizePixel={0}
								Position={UDim2.fromScale(0.5, 0.452)}
								Size={UDim2.fromScale(0.874, 0.667)}
							>
								<uistroke key={"uIStroke1"} Thickness={3} />
							</textlabel>
						</Button>
						<Button
							key={"buy2"}
							Image={"rbxassetid://135371424340238"}
							Position={UDim2.fromScale(1.17, 1.09)}
							Size={UDim2.fromScale(0.567, 0.193)}
							onClick={() => {}}
							imageColor={Color3.fromRGB(255, 255, 119)}
						>
							<textlabel
								key={"textLabel2"}
								FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
								Text={"BUY x10"}
								TextColor3={Color3.fromRGB(255, 255, 255)}
								TextScaled={true}
								TextSize={14}
								TextWrapped={true}
								AnchorPoint={new Vector2(0.5, 0.5)}
								BackgroundColor3={Color3.fromRGB(255, 255, 255)}
								BackgroundTransparency={1}
								BorderColor3={Color3.fromRGB(0, 0, 0)}
								BorderSizePixel={0}
								Position={UDim2.fromScale(0.498, 0.452)}
								Size={UDim2.fromScale(0.858, 0.667)}
							>
								<uistroke key={"uIStroke2"} Thickness={3} />
							</textlabel>
						</Button>
					</React.Fragment>
				)}
			</imagelabel>
		</screengui>
	);
}
