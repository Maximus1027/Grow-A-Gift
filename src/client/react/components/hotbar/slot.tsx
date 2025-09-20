import { Dependency } from "@flamework/core";
import React, { useEffect, useRef, useState } from "@rbxts/react";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RunService, UserInputService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { PlacementController } from "client/controllers/PlacementController";
import { Events } from "client/network";
import { RootStore, RootState } from "client/react/store/store";

export interface HotbarProps {
	houseId: string;
	houseModel: Model;
	valueBase: NumberValue;
	layoutorder: number;
	onClick: () => void;
}

export function HotbarSlot(props: HotbarProps) {
	const dispatch = useProducer<RootStore>();
	const selectedKey = useSelector((state: RootState) => state.inventory.inputKey);
	const camera = useRef();
	const [houseAmount, setAmount] = useState<number>(props.valueBase.Value);

	const selectedMachine = useSelector((state: RootState) => state.build.selectedMachine);

	const hasKeyboard = UserInputService.KeyboardEnabled;

	useEffect(() => {
		const machineDisplay = props.houseModel.Clone() as Model;

		machineDisplay.Parent = camera.current;

		const x = machineDisplay.GetExtentsSize().Z * 2;

		const cam = camera.current as unknown as Camera;
		cam.CFrame = new CFrame(new Vector3(0, 13, 6), new Vector3(x, 0, 0));

		machineDisplay.PivotTo(new CFrame(x, -machineDisplay.GetExtentsSize().Y / 2.5, 0));

		const baseEvent = props.valueBase.Changed.Connect((newValue) => {
			setAmount(newValue);
		});

		//Rotate display
		const spin = RunService.RenderStepped.Connect((dt) => {
			machineDisplay.PivotTo(machineDisplay.GetPivot().mul(CFrame.fromEulerAnglesXYZ(0, dt, 0)));
		});

		return () => {
			spin.Disconnect();
			baseEvent.Disconnect();

			machineDisplay.Destroy();
		};
	}, []);

	useEffect(() => {
		if (!t.number(selectedKey) || props.layoutorder !== selectedKey) {
			return;
		}

		props.onClick();
		dispatch.setInputKey();
	}, [selectedKey]);

	return (
		<imagebutton
			key={"equip" + props.houseId}
			Image={"rbxassetid://137479388509722"}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.0856, 0.5)}
			Size={UDim2.fromScale(0.171, 1)}
			Event={{
				MouseButton1Click: () => props.onClick(),
			}}
			ImageColor3={
				selectedMachine === props.houseId ? Color3.fromRGB(245, 209, 89) : Color3.fromRGB(255, 255, 255)
			}
		>
			<viewportframe
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(1.5, 1.5)}
				CurrentCamera={camera}
			>
				<camera ref={camera} />
			</viewportframe>

			<textlabel
				key={"amt"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={`${houseAmount}x`}
				TextColor3={Color3.fromRGB(0, 0, 0)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.66, 0.706)}
				Size={UDim2.fromScale(0.3, 0.3)}
			>
				<uiaspectratioconstraint />
			</textlabel>
			{hasKeyboard && (
				<textlabel
					key={"keyboardid"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={props.layoutorder + ""}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextTransparency={0.2}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.304, 0.259)}
					Rotation={3}
					Size={UDim2.fromScale(0.301, 0.311)}
				>
					<uiaspectratioconstraint />

					<uistroke key={"uIStroke"} Thickness={2} />
				</textlabel>
			)}
		</imagebutton>
	);
}
