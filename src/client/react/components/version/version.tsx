import React from "@rbxts/react";

import * as main from "shared/config/main.json";

export function Version() {
	return (
		<screengui key={"version"} ResetOnSpawn={false}>
			<textlabel
				Position={UDim2.fromScale(1, 1)}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(0.08, 0.03)}
				Text={"Grow A Gift - " + main.version}
				Font={Enum.Font.BuilderSansBold}
				TextScaled={true}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextTransparency={0.5}
				TextStrokeTransparency={1}
				AnchorPoint={new Vector2(1, 1)}
			/>
		</screengui>
	);
}
