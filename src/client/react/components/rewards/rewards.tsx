import React from "@rbxts/react";

export function Rewards() {
	return (
		<screengui
			key={"REWARDS-PROD"}
			ResetOnSpawn={false}
			IgnoreGuiInset={true}
			ZIndexBehavior={Enum.ZIndexBehavior.Global}
		>
			<imagelabel
				key={"main"}
				Image={"rbxassetid://132799962764777"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.51, 0.408)}
				Size={UDim2.fromScale(0.434, 0.583)}
			>
				<frame
					key={"frame"}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.518, 0.629)}
					Size={UDim2.fromScale(0.822, 0.864)}
				>
					<imagebutton
						key={"imageButton"}
						Image={"rbxassetid://127902197268115"}
						ScaleType={Enum.ScaleType.Fit}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.11, 0.134)}
						Size={UDim2.fromScale(0.185, 0.269)}
					>
						<textlabel
							key={"status"}
							FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
							Text={"CLAIMED"}
							TextColor3={Color3.fromRGB(255, 0, 4)}
							TextScaled={true}
							TextSize={14}
							TextWrapped={true}
							AnchorPoint={new Vector2(0.5, 0.5)}
							BackgroundColor3={Color3.fromRGB(255, 255, 255)}
							BackgroundTransparency={1}
							BorderColor3={Color3.fromRGB(0, 0, 0)}
							BorderSizePixel={0}
							Position={UDim2.fromScale(0.501, 0.876)}
							Size={UDim2.fromScale(0.839, 0.31)}
						>
							<uistroke key={"uIStroke"} Thickness={3} />

							<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={33} />
						</textlabel>
					</imagebutton>

					<imagebutton
						key={"imageButton1"}
						Image={"rbxassetid://127902197268115"}
						ScaleType={Enum.ScaleType.Fit}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.305, 0.134)}
						Size={UDim2.fromScale(0.185, 0.269)}
					>
						<textlabel
							key={"status1"}
							FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
							Text={"CLAIM!"}
							TextColor3={Color3.fromRGB(13, 255, 0)}
							TextScaled={true}
							TextSize={14}
							TextWrapped={true}
							AnchorPoint={new Vector2(0.5, 0.5)}
							BackgroundColor3={Color3.fromRGB(255, 255, 255)}
							BackgroundTransparency={1}
							BorderColor3={Color3.fromRGB(0, 0, 0)}
							BorderSizePixel={0}
							Position={UDim2.fromScale(0.498, 0.866)}
							Size={UDim2.fromScale(0.869, 0.289)}
						>
							<uistroke key={"uIStroke1"} Thickness={3} />

							<uitextsizeconstraint key={"uITextSizeConstraint1"} MaxTextSize={40} />
						</textlabel>
					</imagebutton>

					<imagebutton
						key={"imageButton2"}
						Image={"rbxassetid://127902197268115"}
						ScaleType={Enum.ScaleType.Fit}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.5, 0.183)}
						Size={UDim2.fromScale(0.185, 0.269)}
					>
						<textlabel
							key={"status2"}
							FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
							Text={"10:00"}
							TextColor3={Color3.fromRGB(255, 207, 35)}
							TextScaled={true}
							TextSize={14}
							TextWrapped={true}
							AnchorPoint={new Vector2(0.5, 0.5)}
							BackgroundColor3={Color3.fromRGB(255, 255, 255)}
							BackgroundTransparency={1}
							BorderColor3={Color3.fromRGB(0, 0, 0)}
							BorderSizePixel={0}
							Position={UDim2.fromScale(0.498, 0.866)}
							Size={UDim2.fromScale(0.869, 0.289)}
						>
							<uistroke key={"uIStroke2"} Thickness={3} />

							<uitextsizeconstraint key={"uITextSizeConstraint2"} MaxTextSize={40} />
						</textlabel>

						<imagelabel
							key={"imageLabel"}
							Image={"rbxassetid://99904940642346"}
							ScaleType={Enum.ScaleType.Fit}
							AnchorPoint={new Vector2(0.5, 0.5)}
							BackgroundColor3={Color3.fromRGB(255, 255, 255)}
							BackgroundTransparency={1}
							BorderColor3={Color3.fromRGB(0, 0, 0)}
							BorderSizePixel={0}
							Position={UDim2.fromScale(0.498, 0.463)}
							Size={UDim2.fromScale(0.749, 0.608)}
						/>
					</imagebutton>

					<uigridlayout
						key={"uIGridLayout"}
						CellPadding={UDim2.fromScale(0.01, 0.02)}
						CellSize={UDim2.fromScale(0.185, 0.269)}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						SortOrder={Enum.SortOrder.LayoutOrder}
					>
						<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={0.913} />
					</uigridlayout>

					<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={1.33} />

					<imagebutton
						key={"imageButton14"}
						Image={"rbxassetid://127902197268115"}
						ScaleType={Enum.ScaleType.Fit}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.89, 0.761)}
						Size={UDim2.fromScale(0.185, 0.269)}
					/>
				</frame>

				<uiaspectratioconstraint key={"uIAspectRatioConstraint2"} AspectRatio={1.32} />

				<imagebutton
					key={"unlockall"}
					Image={"rbxassetid://99377596623530"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.735, 1.08)}
					Size={UDim2.fromScale(0.411, 0.141)}
				>
					<textlabel
						key={"textLabel"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={"7"}
						TextColor3={Color3.fromRGB(255, 183, 0)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.79, 0.214)}
						Size={UDim2.fromOffset(49, 44)}
					>
						<uistroke key={"uIStroke3"} Thickness={3} />
					</textlabel>
				</imagebutton>
			</imagelabel>
		</screengui>
	);
}
