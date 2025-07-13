import React from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { getPresentValue } from "shared/utils/presentutils";

export interface MoneyValueProps {
	presentid: string;
	parent: Instance;
}

export function MoneyValue(props: MoneyValueProps) {
	return createPortal(
		<billboardgui
			key={"billboardGui"}
			Active={true}
			ClipsDescendants={true}
			ExtentsOffsetWorldSpace={new Vector3(0, 0.8, 0)}
			Size={UDim2.fromScale(2, 1.5)}
			StudsOffsetWorldSpace={new Vector3(0, 1, 0)}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
			MaxDistance={45}
		>
			<textlabel
				key={"chance"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={(props.parent.GetAttribute("chance") as string) ?? "N/A"}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				RichText={true}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Size={UDim2.fromScale(1, 0.4)}
				Position={UDim2.fromScale(0, 0)}
			>
				<uistroke key={"uIStroke"} Color={Color3.fromRGB(0, 0, 0)} Thickness={1} />
			</textlabel>
			<textlabel
				key={"money"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={`$` + props.parent.GetAttribute("value")}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0, 0.5)}
				Size={UDim2.fromScale(1, 0.5)}
			>
				<uistroke key={"uIStroke"} Color={Color3.fromRGB(0, 170, 0)} Thickness={3} />
			</textlabel>
		</billboardgui>,
		props.parent,
	);
}
