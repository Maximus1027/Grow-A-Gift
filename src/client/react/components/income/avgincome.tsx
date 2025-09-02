import React, { useState, useEffect } from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { t } from "@rbxts/t";
import { abbreviateNumber, forceAbbreviateNumber } from "shared/utils/generictils";

export interface AverageIncomeProps {
	houseModel: Model;
}

export function AverageIncome(props: AverageIncomeProps) {
	const [income, setIncome] = useState<string>("..");

	useEffect(() => {
		const a = props.houseModel.AttributeChanged.Connect((attribute) => {
			if (attribute !== "avg") {
				return;
			}

			const avg = props.houseModel!.GetAttribute("avg");
			setIncome(forceAbbreviateNumber(t.number(avg) ? avg : 0));
		});

		return () => {
			a.Disconnect();
		};
	}, []);

	return createPortal(
		<billboardgui
			key={"label"}
			Active={true}
			ClipsDescendants={true}
			MaxDistance={100}
			Size={UDim2.fromScale(12, 2)}
			StudsOffsetWorldSpace={new Vector3(0, 3, 0)}
			ResetOnSpawn={false}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			<textlabel
				key={"textLabel"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={`$${income}/s`}
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
		(props.houseModel.FindFirstChild("drop") as Instance) ?? props.houseModel,
	);
}
