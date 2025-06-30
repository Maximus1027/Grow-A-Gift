import React, { useEffect, useRef, useState } from "@rbxts/react";
import { useProducer } from "@rbxts/react-reflex";
import { RunService } from "@rbxts/services";
import { Events } from "client/network";
import { RootStore } from "client/react/store/store";

export interface InventorySlotProps {
	houseId: string;
	houseModel: Model;
	valueBase: NumberValue;
}

export function InventorySlot(props: InventorySlotProps) {
	const dispatch = useProducer<RootStore>();
	const camera = useRef();
	const [houseAmount, setAmount] = useState<number>(props.valueBase.Value);

	useEffect(() => {
		const machineDisplay = props.houseModel.Clone() as Model;

		machineDisplay.Parent = camera.current;

		const x = 2 + machineDisplay.GetExtentsSize().X;

		const cam = camera.current as unknown as Camera;
		cam.CFrame = new CFrame(new Vector3(0, 13, 6), new Vector3(x, 0, 0));

		machineDisplay.PivotTo(new CFrame(x, -machineDisplay.GetExtentsSize().Y / 2.6, 0));

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

			print("disconnect");
		};
	}, []);

	return (
		<imagebutton
			key={props.houseid}
			Image={"rbxassetid://137995061476893"}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.116, 0.24)}
			Size={UDim2.fromScale(0.231, 0.48)}
			Event={{
				Activated: () => {
					Events.onInventoryAction.fire("addHotbar", props.houseId);
				},
			}}
		>
			<viewportframe
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(0.9, 0.9)}
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
				Position={UDim2.fromScale(0.725, 0.706)}
				Size={UDim2.fromScale(0.265, 0.221)}
			>
				<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={50} />
				<uiaspectratioconstraint />
			</textlabel>
		</imagebutton>
	);
}
