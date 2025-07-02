import Abbreviator from "@rbxts/abbreviate";
import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";

export interface PricePopupProps {
	price: number;
}

export function PricePopup(props: PricePopupProps) {
	const [y, setY] = useMotion(0);
	const abv = new Abbreviator();

	useEffect(() => {
		setY.spring(1.406, {
			frequency: 0.5,

			damping: 0.7,
		});
	}, []);

	return (
		<imagelabel
			key={"pop"}
			Image={"rbxassetid://135296878032016"}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.496, -0.794)}
			Size={y.map((y) => UDim2.fromScale(1.385, y))}
			ZIndex={10}
		>
			<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={2.64} />

			<textlabel
				key={"textLabel"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={`$${abv.commify(props.price)}`}
				TextColor3={Color3.fromRGB(66, 205, 91)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.558, 0.356)}
				Size={UDim2.fromScale(0.646, 0.438)}
				ZIndex={11}
				TextXAlignment={Enum.TextXAlignment.Right}
			>
				<uistroke key={"uIStroke"} Thickness={4} />
			</textlabel>
		</imagelabel>
	);
}
