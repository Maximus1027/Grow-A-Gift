import Abbreviator from "@rbxts/abbreviate";
import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";

export interface MoneyProps {
	value: ValueBase;
}

export function MoneyDisplay(props: MoneyProps) {
	const [money, setMoney] = useMotion(0);
	const abv = new Abbreviator();
	abv.setSetting("stripTrailingZeroes", true);

	useEffect(() => {
		props.value.Changed.Connect((value: unknown) => {
			if (!t.number(value)) {
				return;
			}

			setMoney.spring(value);
		});
	}, []);

	return (
		<screengui key={"money"} ResetOnSpawn={false} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
			<textlabel
				key={"textLabel"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={money.map((mon) => `$${abv.commify(math.ceil(mon))}`)}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.02, 0.879)}
				Size={UDim2.fromScale(0.3, 0.09)}
				TextXAlignment={Enum.TextXAlignment.Left}
			>
				<uistroke key={"uIStroke"} Color={Color3.fromRGB(0, 217, 21)} Thickness={3} />
			</textlabel>
		</screengui>
	);
}
