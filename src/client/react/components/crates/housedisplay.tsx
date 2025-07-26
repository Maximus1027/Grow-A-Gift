import React, { useEffect, useRef } from "@rbxts/react";
import { RunService } from "@rbxts/services";
import { getHouseAssetsFolder } from "shared/utils/generictils";

export interface HouseDisplayProps {
	houseid: string;
	rotate: boolean;
	Size: UDim2;
	Position: UDim2;
	children?: React.Element[];
}

export function HouseDisplay(props: HouseDisplayProps) {
	const camera = useRef();

	useEffect(() => {
		const houseModel = getHouseAssetsFolder().FindFirstChild(props.houseid);

		if (!houseModel) {
			return;
		}

		const newModel = houseModel.Clone() as Model;

		newModel.Parent = camera.current;

		const x = 2 + newModel.GetExtentsSize().X;

		const cam = camera.current as unknown as Camera;
		cam.CFrame = new CFrame(new Vector3(0, 13, 6), new Vector3(x, 0, 0));

		newModel.PivotTo(new CFrame(x, -newModel.GetExtentsSize().Y / 2.6, 0));

		if (!props.rotate) {
			return;
		}

		//Rotate display
		const spin = RunService.RenderStepped.Connect((dt) => {
			newModel.PivotTo(newModel.GetPivot().mul(CFrame.fromEulerAnglesXYZ(0, dt, 0)));
		});

		return () => {
			spin.Disconnect();
		};
	}, []);

	return (
		<viewportframe
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={props.Position}
			BackgroundTransparency={1}
			Size={props.Size}
			CurrentCamera={camera}
		>
			<camera ref={camera} />
			{props.children}
		</viewportframe>
	);
}
