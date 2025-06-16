import React from "@rbxts/react";

import * as main from "shared/config/main.json";

export function Version() {
	return (
		<screengui ResetOnSpawn={false}>
			<textlabel
				Position={UDim2.fromScale(0.855, 0.95)}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(0.14, 0.05)}
				Text={"Void Miners - " + main.version}
				Font={Enum.Font.BuilderSansBold}
				TextScaled={true}
				TextColor3={Color3.fromRGB(255, 255, 255)}
			></textlabel>
		</screengui>
	);
}
