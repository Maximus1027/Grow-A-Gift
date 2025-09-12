import React, { useEffect } from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { abbreviateNumber } from "shared/utils/generictils";
import { getPresentValue } from "shared/utils/presentutils";

export interface MoneyValueProps {
	value: string;
	chance: string;
	scale: number;
	parent: Model;
}

export function MoneyValue(props: MoneyValueProps) {
	return createPortal(
		<billboardgui
			key={props.parent.Name}
			Active={true}
			ClipsDescendants={true}
			//ExtentsOffsetWorldSpace={new Vector3(0, props.scale, 0)}
			StudsOffsetWorldSpace={new Vector3(0, props.parent.GetExtentsSize().Y, 0)}
			Size={UDim2.fromScale(3.5 * props.scale, 2.5 * props.scale)}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
			MaxDistance={45 * props.scale}
			Enabled={true}
			AlwaysOnTop={true}
		>
			<textlabel
				key={"chance"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={props.chance ?? ""}
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
				<uistroke key={"uIStroke"} Color={Color3.fromRGB(0, 0, 0)} Thickness={3} />
			</textlabel>
			<textlabel
				key={"money"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={props.value}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0, 0.4)}
				Size={UDim2.fromScale(1, 0.5)}
			>
				<uistroke key={"uIStroke"} Color={Color3.fromRGB(0, 170, 0)} Thickness={3} />
			</textlabel>
		</billboardgui>,
		props.parent,
	);
}
