import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect, useRef } from "@rbxts/react";
import { ButtonSpring } from "shared/types/spring";

export interface MsgProps {
	text: string;
	index: number;
}

const tweenInfo = new TweenInfo(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out);

export function Msg(props: MsgProps) {
	const [y, sety] = useMotion(0);
	const [transparency, setT] = useMotion(1);
	const ref = useRef<TextLabel>();

	useEffect(() => {
		sety.immediate((props.index - 1) * ref.current!.AbsoluteSize.Y);

		sety.tween(0);

		sety.tween(props.index * ref.current!.AbsoluteSize.Y + 5, {
			time: 0.1,
		});
	}, [ref]);

	return (
		<textlabel
			key={"msg"}
			FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
			Text={props.text}
			TextScaled={true}
			TextSize={14}
			TextWrapped={true}
			RichText={true}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Size={UDim2.fromScale(1.465, 0.342)}
			Position={y.map((value) => new UDim2(0.5, 0, 0, value))}
			TextTransparency={0}
			ref={ref}
			ZIndex={-props.index}
			AnchorPoint={new Vector2(0.5, 0.5)}
		>
			<uistroke key={"uIStroke"} Thickness={3} />
		</textlabel>
	);
}
