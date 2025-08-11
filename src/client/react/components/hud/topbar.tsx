import React from "@rbxts/react";
import { Button } from "../generic/button";

export function TopBar() {
	return (
		<frame
			key={"topbar"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.497, 0.0913)}
			Size={UDim2.fromScale(0.478, 0.107)}
		>
			<uilistlayout
				key={"uIListLayout1"}
				Padding={new UDim(0.01, 0)}
				FillDirection={Enum.FillDirection.Horizontal}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
			/>

			<Button
				key={"shop"}
				Image={"rbxassetid://77375385665147"}
				Position={UDim2.fromScale(0, 0)}
				Size={UDim2.fromScale(0.295, 1.04)}
				onClick={() => {}}
			/>
			<Button
				key={"home"}
				Image={"rbxassetid://131170999223781"}
				Position={UDim2.fromScale(0, 0)}
				Size={UDim2.fromScale(0.375, 1.12)}
				onClick={() => {}}
			/>
			<Button
				key={"town"}
				Image={"rbxassetid://96221524734688"}
				Position={UDim2.fromScale(0, 0)}
				Size={UDim2.fromScale(0.295, 1.04)}
				onClick={() => {}}
			/>
		</frame>
	);
}
