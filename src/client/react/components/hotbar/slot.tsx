import { Dependency } from "@flamework/core";
import React, { useEffect, useRef, useState } from "@rbxts/react";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RunService } from "@rbxts/services";
import { PlacementController } from "client/controllers/PlacementController";
import { Events } from "client/network";
import { RootStore, RootState } from "client/react/store/store";

export interface HotbarProps {
	houseId: string;
	houseModel: Model;
	valueBase: NumberValue;
}

export function HotbarSlot(props: HotbarProps) {
	const dispatch = useProducer<RootStore>();
	const selectedMachine = useSelector((state: RootState) => state.build.selectedMachine);
	const inventoryOpen = useSelector((state: RootState) => state.inventory.inventoryOpen);
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
		};
	}, []);

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
				MouseButton1Click: () => {
					const placementController = Dependency<PlacementController>();

					if (inventoryOpen) {
						Events.onInventoryAction("addInventory", props.houseId);
						return;
					}

					if (selectedMachine === props.houseId) {
						dispatch.selectMachine("");
						placementController.stopPlacingMachine();

						return;
					}

					if (selectedMachine !== "") {
						placementController.stopPlacingMachine();
					}

					dispatch.selectMachine(props.houseId);
					placementController.beginPlacingMachine(props.houseId);
				},
			}}
		>
			<viewportframe
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(1, 1)}
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
