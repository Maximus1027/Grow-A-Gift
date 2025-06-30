import React, { useEffect, useState } from "@rbxts/react";
import { HotbarSlot } from "./slot";
import { Players, ReplicatedStorage } from "@rbxts/services";

import { t } from "@rbxts/t";

const houseModels = ReplicatedStorage.WaitForChild("assets").WaitForChild("houses") as Folder;
const player = Players.LocalPlayer;

export interface HotbarProps {
	inventoryFolder: Folder;
}

export function Hotbar(props: HotbarProps) {
	const [houseIds, setHouses] = useState<NumberValue[]>([]);

	useEffect(() => {
		const inventoryFolder = props.inventoryFolder;

		if (inventoryFolder) {
			inventoryFolder.ChildAdded.Connect((houseValue) => {
				if (t.instanceIsA("NumberValue")(houseValue)) {
					setHouses(inventoryFolder.GetChildren() as NumberValue[]);
				}
			});

			inventoryFolder.ChildRemoved.Connect((houseValue) => {
				if (t.instanceIsA("NumberValue")(houseValue)) {
					// Only update with the current children, do not clear first
					setHouses(inventoryFolder.GetChildren() as NumberValue[]);
				}
			});

			setHouses(inventoryFolder.GetChildren() as NumberValue[]);
		}
	}, []);

	return (
		<screengui
			key={"Hotbar-PRODUCTION"}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ZIndexBehavior={Enum.ZIndexBehavior.Global}
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
					/>

					{houseIds
						.sort(
							(house1, house2) =>
								(house1.GetAttribute("slot") as number) < (house2.GetAttribute("slot") as number),
						)
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
