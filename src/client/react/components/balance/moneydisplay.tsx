import Abbreviator from "@rbxts/abbreviate";
import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { t } from "@rbxts/t";
import { Window } from "client/react/store/producer/windowproducer";
import { RootState } from "client/react/store/store";
import { abbreviateNumber } from "shared/utils/generictils";

export interface MoneyProps {
	value: ValueBase;
}

export function MoneyDisplay(props: MoneyProps) {
	const [money, setMoney] = useMotion(0);

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
			key={"CASH-PRODUCTION"}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ResetOnSpawn={false}
		>
			<imagelabel
				key={"imageLabel"}
				Image={"rbxassetid://95994691620048"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.048, 0.891)}
				Size={UDim2.fromScale(0.067, 0.135)}
			>
				<textlabel
					key={"textLabel"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={money.map((num) => "$" + abbreviateNumber(num))}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					TextXAlignment={Enum.TextXAlignment.Left}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(1.942, 0.515)}
					Size={UDim2.fromScale(2.51, 0.524)}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={5.32} />

					<uistroke Color={Color3.fromRGB(0, 194, 28)} key={"uIStroke"} Thickness={4} />
				</textlabel>
			</imagelabel>
		</screengui>
	);
}
