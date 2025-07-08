import React, { useEffect, useRef } from "@rbxts/react";
import { Rarity } from "shared/enums/Rarity";
import { Present } from "shared/types/entity";
import { getPresentModel } from "shared/utils/generictils";

export interface PresentDisplayProps {
	rarity: Rarity;
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

		presentModel.PivotTo(new CFrame(0, 0, -2.3).mul(CFrame.fromEulerAnglesXYZ(0, 0, 0)));

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
			Size={UDim2.fromOffset(100, 100)}
			BackgroundTransparency={1}
		>
			<camera CFrame={new CFrame(new Vector3(0, 0, 0))} ref={camera} />
		</viewportframe>
	);
}
