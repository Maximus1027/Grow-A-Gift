import React, { useEffect, useState } from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";
import { abbreviateNumber } from "shared/utils/generictils";

export interface NametagProps {
	player: Player;
}

export function Nametag(props: NametagProps) {
	const [mon, setmoney] = useState<string>("0");
	const [hrp, setHRP] = useState<BasePart>();

	useEffect(() => {
		print("nametag");
		const a = props.player.AttributeChanged.Connect((attr) => {
			if (attr === "totalincome") {
				const money = props.player.GetAttribute("totalincome");
				if (t.number(money)) {
					setmoney(abbreviateNumber(money as number));
				}
			}
		});

		const char = props.player.Character?.PrimaryPart;

		if (char?.IsA("BasePart")) setHRP(char);
		const ca = props.player.CharacterAdded.Connect((character) => {
			const h = character.PrimaryPart;
			if (h && h.IsA("BasePart")) setHRP(h);
		});

		return () => {
			a.Disconnect();
			ca.Disconnect();
		};
	}, []);

	return (
		hrp &&
		createPortal(
			<billboardgui
				key={"label"}
				Active={true}
				ClipsDescendants={true}
				MaxDistance={100}
				Size={UDim2.fromScale(12, 1)}
				StudsOffsetWorldSpace={new Vector3(0, 4.5, 0)}
				ResetOnSpawn={false}
				ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
			>
				<textlabel
					key={"textLabel"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={`$${mon}/s`}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Size={UDim2.fromScale(1, 1)}
				>
					<uistroke key={"uIStroke"} Thickness={4} />
				</textlabel>
			</billboardgui>,
			hrp,
		)
	);
}
