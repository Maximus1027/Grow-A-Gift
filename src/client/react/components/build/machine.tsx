import { Rarity } from "shared/enums/Rarity";
import { RarityButton } from "./rarity";
import React, { createRef, useEffect, useReducer, useRef } from "@rbxts/react";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RootState, RootStore } from "client/react/store/store";
import { RunService } from "@rbxts/services";
import { Dependency } from "@flamework/core";
import { PlacementController } from "client/controllers/PlacementController";

export interface MachineProps {
	machineId: string;
	machineModel: Model;
}

export function MachineButton(props: MachineProps) {
	const dispatch = useProducer<RootStore>();
	const selectedMachine = useSelector((state: RootState) => state.build.selectedMachine);
	const camera = useRef();

	useEffect(() => {
		const machineDisplay = props.machineModel.Clone() as Model;

		machineDisplay.Parent = camera.current;

		const x = 2 + machineDisplay.GetExtentsSize().X;

		const cam = camera.current as unknown as Camera;
		cam.CFrame = new CFrame(new Vector3(0, 13, 6), new Vector3(x, 0, 0));

		machineDisplay.PivotTo(new CFrame(x, -machineDisplay.GetExtentsSize().Y / 2.6, 0));

		//Rotate display
		const spin = RunService.RenderStepped.Connect((dt) => {
			machineDisplay.PivotTo(machineDisplay.GetPivot().mul(CFrame.fromEulerAnglesXYZ(0, dt, 0)));
		});

		return () => {
			spin.Disconnect();
		};
	}, []);

	return (
		<RarityButton rarity={Rarity.Common}>
			<viewportframe
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(1, 1)}
				CurrentCamera={camera}
			>
				<camera ref={camera} />
			</viewportframe>
			<textbutton
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(1, 1)}
				Text={""}
				Event={{
					Activated: () => {
						print("press");
						const placementController = Dependency<PlacementController>();
						if (selectedMachine !== props.machineId) {
							dispatch.selectMachine(props.machineId);
							if (RunService.IsStudio()) {
								if (placementController) {
									placementController.beginPlacingMachine(props.machineId);
								}
							}
						} else {
							dispatch.selectMachine("");
							placementController.stopPlacingMachine();
						}
					},
				}}
			/>
		</RarityButton>
	);
}
