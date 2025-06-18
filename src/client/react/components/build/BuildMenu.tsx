import Object from "@rbxts/object-utils";
import React, { useEffect, useState } from "@rbxts/react";

import * as Miners from "shared/config/miners.json";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/react/store/store";
import { useMotion } from "@rbxts/pretty-react-hooks";
import { MachineButton } from "./machine";
import { ReplicatedStorage } from "@rbxts/services";

const machineModels = ReplicatedStorage.WaitForChild("assets").WaitForChild("miners");

export function BuildMenu() {
	const isBuilding = useSelector((state: RootState) => state.build.isBuilding);
	const [pos, setpos] = useMotion(0.725);

	useEffect(() => {
		if (isBuilding) {
			setpos.spring(0.591);
		} else {
			setpos.spring(0.725);
		}
	}, [isBuilding]);

	return (
		<screengui key={"bUILDDEV"} IgnoreGuiInset={true} ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}>
			<frame
				key={"main"}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={pos.map((y) => UDim2.fromScale(0.5, y))}
				Size={UDim2.fromScale(0.57, 0.688)}
				BackgroundTransparency={1}
			>
				<imagelabel
					key={"top"}
					Image={"rbxassetid://77858954283743"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.414, 0.856)}
					Size={UDim2.fromScale(0.427, 0.11)}
				>
					<textlabel
						key={"displaykey"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={"B"}
						TextColor3={Color3.fromRGB(0, 0, 0)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.109, 0.411)}
						Size={UDim2.fromScale(0.172, 0.588)}
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
						Position={UDim2.fromScale(0.558, 0.659)}
						Size={UDim2.fromScale(0.611, 0.517)}
					/>
				</imagelabel>
				<imagelabel
					key={"bottom"}
					Image={"rbxassetid://116882832803759"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.415, 0.999)}
					Size={UDim2.fromScale(1.23, 0.211)}
				>
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
						Position={UDim2.fromScale(0.501, 0.523)}
						Size={UDim2.fromScale(0.976, 0.88)}
					>
						<uigridlayout
							key={"uIGridLayout"}
							CellPadding={UDim2.fromScale(0.01, 0.1)}
							CellSize={UDim2.fromScale(0.12, 0.8)}
							SortOrder={Enum.SortOrder.LayoutOrder}
						/>

						{Object.keys(Miners).map((miner) => (
							<MachineButton
								machineModel={machineModels.FindFirstChild(miner) as Model}
								machineId={miner}
							/>
						))}
					</scrollingframe>
				</imagelabel>
				<uiaspectratioconstraint />
			</frame>
		</screengui>
	);
}
