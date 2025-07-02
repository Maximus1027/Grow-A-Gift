import React, { useEffect, useState } from "@rbxts/react";
import { HotbarSlot } from "./slot";
import { Players, ReplicatedStorage } from "@rbxts/services";

import { t } from "@rbxts/t";
import { InventoryOpener } from "../inventory/inventoryopener";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/react/store/store";

const houseModels = ReplicatedStorage.WaitForChild("assets").WaitForChild("houses") as Folder;
const player = Players.LocalPlayer;

export interface HotbarProps {
	inventoryFolder: Folder;
}

export function Hotbar(props: HotbarProps) {
	const houseids = useSelector((state: RootState) => state.inventory.inventory);

	return (
		<screengui
			key={"Hotbar-PRODUCTION"}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ZIndexBehavior={Enum.ZIndexBehavior.Global}
			ResetOnSpawn={false}
		>
			<frame
				key={"frame"}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.919)}
				Size={UDim2.fromScale(0.0907, 0.161)}
			>
				<uiaspectratioconstraint />

				<frame
					key={"hotbar"}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(3.5, 0.615)}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={5.84} />

					<uilistlayout
						key={"uIListLayout"}
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						SortOrder={Enum.SortOrder.LayoutOrder}
						VerticalAlignment={Enum.VerticalAlignment.Center}
						Padding={new UDim(0.009)}
					/>
					<InventoryOpener />
					{houseids
						.filter((house) => house.GetAttribute("equip") === true)
						.map((house: NumberValue) => {
							const model = houseModels.FindFirstChild(house.Name);
							if (!model || !model.IsA("Model")) return <></>;
							print(house, model);
							return (
								<HotbarSlot
									key={house.Name}
									houseModel={model}
									houseId={house.Name}
									valueBase={house}
								/>
							);
						})}
				</frame>
			</frame>
		</screengui>
	);
}
