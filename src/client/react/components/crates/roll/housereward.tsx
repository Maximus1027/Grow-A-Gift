import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useState } from "@rbxts/react";
import { RunService } from "@rbxts/services";
import { HouseDisplay } from "../housedisplay";
import { getHouseDisplayName } from "shared/utils/houseutils";
import { Chance } from "../../hover/chance";
import { getRarityColor, Rarity } from "shared/enums/Rarity";
import { Sunray } from "./sunray";

export function HouseReward(props: { houseid: string; rarity: Rarity; chance: string }) {
	const [size, setSize] = useMotion(0.05);
	const [pos, setpos] = useMotion(0);

	useEffect(() => {
		setSize.spring(0.396, {
			frequency: 0.79,
			friction: 1,
		});
	}, []);

	return (
		<screengui
			key={"hOUSEUNLOCKDEV"}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ResetOnSpawn={false}
		>
			<frame
				key={"houseimage"}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(27, 42, 53)}
				BorderSizePixel={0}
				Position={pos.map((y) => UDim2.fromScale(0.499, y + 0.491))}
				Size={size.map((y) => UDim2.fromScale(0.231, y))}
				ZIndex={2}
			>
				<Sunray
					key={"sunray"}
					Position={UDim2.fromScale(0.5, 0.499)}
					Size={UDim2.fromScale(1.7, 1.7)}
					looped={false}
					onComplete={() => setpos.spring(1)}
				/>
				<HouseDisplay
					houseid={props.houseid}
					rotate={true}
					Size={UDim2.fromScale(1, 1)}
					Position={UDim2.fromScale(0.5, 0.5)}
				/>
				<textlabel
					key={"petname"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={getHouseDisplayName(props.houseid)}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(27, 42, 53)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.505, -0.204)}
					Size={UDim2.fromScale(1.5, 0.309)}
				>
					<uistroke key={"uIStroke"} Thickness={3} />
				</textlabel>
				<textlabel
					key={"rarity"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={props.rarity.upper()}
					TextColor3={getRarityColor(props.rarity)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(27, 42, 53)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.499, -0.0265)}
					Size={UDim2.fromScale(0.594, 0.182)}
				>
					<uistroke key={"uIStroke1"} Thickness={4.5} />
				</textlabel>
				<uiaspectratioconstraint />

				<textlabel
					key={"winboost"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={props.chance}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					RichText={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(27, 42, 53)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.498, 1.07)}
					Size={UDim2.fromScale(1.09, 0.212)}
				>
					<uistroke key={"uIStroke2"} Thickness={5} />
				</textlabel>
			</frame>
		</screengui>
	);
}
