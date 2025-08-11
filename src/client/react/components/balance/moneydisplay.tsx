import Abbreviator from "@rbxts/abbreviate";
import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { t } from "@rbxts/t";
import { Window } from "client/react/store/producer/windowproducer";
import { RootState } from "client/react/store/store";

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
		setMoney.immediate((props.value.Value as number) ?? 0);
	}, []);

	const window = useSelector((state: RootState) => state.windowManager.windows.hud);

	return (
		<screengui
			key={"MONEY DISPLAY"}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
			ResetOnSpawn={false}
			Enabled={window === true}
		>
			<imagelabel
				key={"imageLabel"}
				Image={"rbxassetid://125600642646562"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.125, 0.935)}
				Size={UDim2.fromScale(0.25, 0.157)}
			>
				<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={2.99} />
				<textlabel
					key={"textLabel"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={money.map((mon) => `$${abv.commify(math.ceil(mon))}`)}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					TextXAlignment={Enum.TextXAlignment.Left}
					Position={UDim2.fromScale(0.595, 0.528)}
					Size={UDim2.fromScale(0.565, 0.322)}
				>
					<uistroke key={"uIStroke"} Color={Color3.fromRGB(0, 217, 21)} Thickness={5} />
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={5.32} />
				</textlabel>
			</imagelabel>
		</screengui>
	);
}
