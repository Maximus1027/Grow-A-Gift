import React, { useEffect, useRef } from "@rbxts/react";
import { Rarity } from "shared/enums/Rarity";
import { Present } from "shared/types/entity";
import { getPresentModel } from "shared/utils/generictils";

export interface PresentDisplayProps {
	rarity: Rarity;
	distance: number;
	position?: UDim2;
	size?: UDim2;
}

export function PresentDisplay(props: PresentDisplayProps) {
	const camera = useRef<Camera>();

	useEffect(() => {
		print(camera);
		const presentModel = getPresentModel(props.rarity)?.Clone() as Model;

		if (!presentModel) {
			return;
		}

		presentModel.Parent = camera.current;

		presentModel.PivotTo(new CFrame(0, 0, -props.distance).mul(CFrame.fromEulerAnglesXYZ(0, 0, 0)));

		return () => {
			presentModel.Destroy();
		};
	}, []);

	return (
		<viewportframe
			key={"viewportFrame"}
			BackgroundColor3={Color3.fromRGB(255, 0, 0)}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Size={props.size}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Position={props.position}
		>
			<camera CFrame={new CFrame(new Vector3(0, 0, 0))} ref={camera} />
		</viewportframe>
	);
}
