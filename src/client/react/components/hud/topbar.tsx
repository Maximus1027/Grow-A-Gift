import React from "@rbxts/react";
import { Button } from "../generic/button";
import { useProducer } from "@rbxts/react-reflex";
import { RootStore } from "client/react/store/store";
import { Window } from "client/react/store/producer/windowproducer";
import { sendPlayerToPlot, summonPlayer } from "shared/utils/playertils";
import { Players, Workspace } from "@rbxts/services";

const SHOPSPAWN = Workspace.WaitForChild("SHOPSPAWN");

export function TopBar() {
	const dispatch = useProducer<RootStore>();

	return (
		<frame
			key={"topbar"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.499, 0.078)}
			Size={UDim2.fromScale(0.453, 0.119)}
		>
			<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={6.79} />
			<uilistlayout
				key={"uIListLayout1"}
				Padding={new UDim(0.05, 0)}
				FillDirection={Enum.FillDirection.Horizontal}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			<Button
				key={"shop"}
				Image={"rbxassetid://77375385665147"}
				Position={UDim2.fromScale(0, 0)}
				Size={UDim2.fromScale(0.284, 1.076)}
				onClick={() => {
					if (SHOPSPAWN && SHOPSPAWN.IsA("BasePart")) {
						summonPlayer(Players.LocalPlayer, SHOPSPAWN.CFrame.Position);
					}
				}}
			/>
			<Button
				key={"home"}
				Image={"rbxassetid://131170999223781"}
				Position={UDim2.fromScale(0, 0)}
				Size={UDim2.fromScale(0.338, 0.907)}
				onClick={() => {
					sendPlayerToPlot(Players.LocalPlayer);
				}}
			/>
			<Button
				key={"town"}
				Image={"rbxassetid://96221524734688"}
				Position={UDim2.fromScale(0, 0)}
				Size={UDim2.fromScale(0.284, 1.077)}
				onClick={() => {
					dispatch.setWindowState(Window.township, true);
				}}
			/>
		</frame>
	);
}
