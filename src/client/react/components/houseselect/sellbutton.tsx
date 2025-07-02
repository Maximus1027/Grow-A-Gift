import React, { useState } from "@rbxts/react";
import { PricePopup } from "./pricepopup";
import Abbreviator from "@rbxts/abbreviate";
export interface SellButtonProps {
	onSell?: () => void;
	sellValue: number;
}

export function SellButton(props: SellButtonProps) {
	const [showPrice, setShow] = useState<boolean>(false);

	return (
		<imagebutton
			key={"sell"}
			Image={"rbxassetid://122047660596559"}
			ImageColor3={Color3.fromRGB(255, 0, 0)}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.711, 0.736)}
			Size={UDim2.fromScale(0.359, 0.225)}
			Event={{
				Activated: () => {
					if (showPrice) {
						if (props.onSell) {
							props.onSell();
						}
						return;
					}

					setShow(true);
				},
			}}
		>
			{showPrice && <PricePopup price={props.sellValue} />}
			<textlabel
				key={"label"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={showPrice ? "CONFIRM?" : "SELL"}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={UDim2.fromScale(0.509 + (showPrice ? 0.1 : 0), showPrice ? 1 : 0.617)}
			>
				<uistroke key={"uIStroke"} Thickness={4} />
			</textlabel>
			<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={2.68} />
		</imagebutton>
	);
}
