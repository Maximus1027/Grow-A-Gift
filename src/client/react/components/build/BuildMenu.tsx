import React from "@rbxts/react";

export function BuildMenu() {
	return (
		<screengui
			key={"build"}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			<imagelabel
				key={"main"}
				Image={"rbxassetid://115406005863518"}
				ScaleType={Enum.ScaleType.Crop}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 1.06)}
				Size={UDim2.fromScale(0.699, 0.591)}
			>
				<textlabel
					key={"displaykey"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={"F"}
					TextColor3={Color3.fromRGB(0, 0, 0)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.368, 0.122)}
					Size={UDim2.fromScale(0.0636, 0.151)}
				/>

				<textlabel
					key={"displaymode"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={"BUILD MODE"}
					TextColor3={Color3.fromRGB(0, 0, 0)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.506, 0.136)}
					Size={UDim2.fromScale(0.246, 0.178)}
				/>

				<scrollingframe
					key={"items"}
					AutomaticCanvasSize={Enum.AutomaticSize.Y}
					CanvasSize={new UDim2()}
					ScrollBarImageColor3={Color3.fromRGB(0, 0, 0)}
					Active={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.501, 0.631)}
					Size={UDim2.fromScale(0.976, 0.664)}
				>
					<uigridlayout
						key={"uIGridLayout"}
						CellPadding={UDim2.fromScale(0.01, 0.1)}
						CellSize={UDim2.fromScale(0.12, 0.8)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
				</scrollingframe>

				<uiaspectratioconstraint
					key={"uIAspectRatioConstraint"}
					AspectRatio={4.81}
					DominantAxis={Enum.DominantAxis.Height}
				/>
			</imagelabel>
		</screengui>
	);
}
