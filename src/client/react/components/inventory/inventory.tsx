import React, { useEffect, useState } from "@rbxts/react";
import { InventorySlot } from "./inventoryslot";
import { InventoryDivider } from "./divider";
import { ExitButton } from "./exit";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RootState, RootStore } from "client/react/store/store";
import { getHouseModel } from "shared/utils/generictils";
import { t } from "@rbxts/t";

export function Inventory() {
	const inventoryToggle = useSelector((state: RootState) => state.inventory.inventoryOpen);
	const houseids = useSelector((state: RootState) => state.inventory.inventory);

	const dispatch = useProducer<RootStore>();

	return (
		inventoryToggle && (
			<screengui
				key={"iNVENTORYDEV"}
				IgnoreGuiInset={true}
				ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
				ResetOnSpawn={false}
			>
				<imagelabel
					key={"main"}
					Image={"rbxassetid://138469023746536"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.5, 0.499)}
					Size={UDim2.fromScale(0.379, 0.458)}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={1.55} />
					<ExitButton
						onClick={() => dispatch.toggleInventory()}
						Position={UDim2.fromScale(0.93, 0.106)}
						Size={UDim2.fromScale(0.137, 0.212)}
					/>
					<scrollingframe
						key={"scrollingFrame"}
						AutomaticCanvasSize={Enum.AutomaticSize.Y}
						CanvasSize={new UDim2()}
						ScrollBarImageColor3={Color3.fromRGB(0, 0, 0)}
						ScrollBarThickness={3}
						Active={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.499, 0.566)}
						Size={UDim2.fromScale(0.897, 0.707)}
					>
						{houseids
							.filter((house) => house.GetAttribute("slot") === undefined)
							.map((house) => {
								const model = getHouseModel(house.Name);

								print(house, model);

								if (!t.instanceIsA("Model")(model)) {
									return <></>;
								}

								return (
									<InventorySlot
										key={house.Name}
										houseId={house.Name}
										houseModel={model}
										valueBase={house}
									/>
								);
							})}

						<uigridlayout
							key={"uIGridLayout"}
							CellPadding={UDim2.fromScale(0.017, 0)}
							CellSize={UDim2.fromScale(0.18, 0.4)}
							SortOrder={Enum.SortOrder.LayoutOrder}
						/>
					</scrollingframe>

					<imagelabel
						key={"imageLabel"}
						Image={"rbxassetid://105940033785986"}
						ScaleType={Enum.ScaleType.Fit}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(-0.25, 0.542)}
						Size={UDim2.fromScale(0.448, 0.774)}
					>
						<uiaspectratioconstraint key={"uIAspectRatioConstraint2"} AspectRatio={0.893} />

						<frame
							key={"holder"}
							AnchorPoint={new Vector2(0.5, 0.5)}
							BackgroundColor3={Color3.fromRGB(255, 255, 255)}
							BackgroundTransparency={1}
							BorderColor3={Color3.fromRGB(0, 0, 0)}
							BorderSizePixel={0}
							Position={UDim2.fromScale(0.503, 0.497)}
							Size={UDim2.fromScale(0.782, 0.759)}
						>
							<InventoryDivider />

							<imagebutton
								key={"crates"}
								Image={"rbxassetid://87477564493751"}
								ScaleType={Enum.ScaleType.Fit}
								AnchorPoint={new Vector2(0.5, 0.5)}
								BackgroundColor3={Color3.fromRGB(255, 255, 255)}
								BackgroundTransparency={1}
								BorderColor3={Color3.fromRGB(0, 0, 0)}
								BorderSizePixel={0}
								Position={UDim2.fromScale(0.496, 0.477)}
								Size={UDim2.fromScale(0.991, 0.291)}
							>
								<uiaspectratioconstraint key={"uIAspectRatioConstraint4"} AspectRatio={3.13} />
							</imagebutton>

							<imagebutton
								key={"boosters"}
								Image={"rbxassetid://105056767479291"}
								ScaleType={Enum.ScaleType.Fit}
								AnchorPoint={new Vector2(0.5, 0.5)}
								BackgroundColor3={Color3.fromRGB(255, 255, 255)}
								BackgroundTransparency={1}
								BorderColor3={Color3.fromRGB(0, 0, 0)}
								BorderSizePixel={0}
								Position={UDim2.fromScale(0.496, 0.808)}
								Size={UDim2.fromScale(0.991, 0.291)}
							>
								<uiaspectratioconstraint key={"uIAspectRatioConstraint5"} AspectRatio={3.13} />
							</imagebutton>

							<uilistlayout
								key={"uIListLayout"}
								Padding={new UDim(0.04, 0)}
								SortOrder={Enum.SortOrder.LayoutOrder}
							/>

							<uiaspectratioconstraint key={"uIAspectRatioConstraint6"} AspectRatio={0.921} />
						</frame>
					</imagelabel>
				</imagelabel>
			</screengui>
		)
	);
}
