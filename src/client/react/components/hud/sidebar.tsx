import React from "@rbxts/react";
import { Button } from "../generic/button";

export function SideBar() {
	return (
		<frame
			key={"sidebar"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.069, 0.5)}
			Size={UDim2.fromScale(0.089, 0.412)}
		>
			<uilistlayout key={"uIListLayout"} Padding={new UDim(0.01, 0)} SortOrder={Enum.SortOrder.LayoutOrder} />

			<Button
				key={"store"}
				Image={"rbxassetid://101699459221535"}
				Position={UDim2.fromScale(0, 0)}
				Size={UDim2.fromScale(1, 0.356)}
				onClick={() => {}}
			/>
			<Button
				key={"var_settings"}
				Image={"rbxassetid://131456886173627"}
				Position={UDim2.fromScale(0, 0)}
				Size={UDim2.fromScale(1, 0.356)}
				onClick={() => {}}
			/>
			<Button
				key={"rewards"}
				Image={"rbxassetid://103426566447423"}
				Position={UDim2.fromScale(0, 0)}
				Size={UDim2.fromScale(1, 0.356)}
				onClick={() => {}}
			/>
		</frame>
	);
}
