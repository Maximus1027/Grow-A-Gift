import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";

export interface SunrayProps {
	Position: UDim2;
	Size: UDim2;
	looped: boolean;
	speed?: number;
	ZIndex?: number;
	onComplete?: () => void;
}

export function Sunray(props: SunrayProps) {
	const [rot, setrot] = useMotion(0);
	let active = props.looped;

	useEffect(() => {
		const doSpin = () => {
			setrot.immediate(0);
			setrot.tween(360, {
				time: props.speed ?? 4,
				style: Enum.EasingStyle.Linear,
			});
		};
		doSpin();

		setrot.onComplete(() => (active ? doSpin() : props.onComplete && !active && props.onComplete()));

		return () => {
			active = false;
			setrot.stop();
		};
	}, []);

	return (
		<imagelabel
			key={"sunray"}
			Image={"rbxassetid://13522988808"}
			ImageColor3={Color3.fromRGB(58, 58, 58)}
			ImageTransparency={0.59}
			ScaleType={Enum.ScaleType.Crop}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(27, 42, 53)}
			BorderSizePixel={0}
			Position={props.Position}
			Size={props.Size}
			Rotation={rot}
			ZIndex={props.ZIndex}
		>
			<uiaspectratioconstraint />
		</imagelabel>
	);
}
