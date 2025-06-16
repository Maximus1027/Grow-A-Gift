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
	const [pos, setpos] = useMotion(1.08);

	useEffect(() => {
		if (isBuilding) {
			setpos.spring(0.85);
		} else {
			setpos.spring(1.08);
		}
	}, [isBuilding]);

	return (
		<screengui
			key={"build"}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ZIndexBehavior={Enum.ZIndexBehavior.Global}
			ResetOnSpawn={false}
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
				Position={pos.map((y) => UDim2.fromScale(0.5, y))}
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

				<textbutton
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
					{Object.keys(Miners).map((miner) => (
						<MachineButton machineModel={machineModels.FindFirstChild(miner) as Model} machineId={miner} />
					))}
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
