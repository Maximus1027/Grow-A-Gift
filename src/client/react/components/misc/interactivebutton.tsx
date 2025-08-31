import { useEffect } from "@rbxts/react";
import { Button, ButtonProps } from "./button";
import { useMotion } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { ButtonSpring } from "shared/types/spring";

export interface InteractiveProps extends ButtonProps {
	hover?: number;
	velocity?: number;
	LayoutOrder?: number;
}

export function InteractiveButton(props: InteractiveProps) {
	const [motion, setmotion] = useMotion(1);
	const hover = props.hover ?? 1.05;
	const velocity = props.velocity ?? 0.03;

	return (
		<imagebutton
			Image={props.Image}
			Position={props.Position}
			// eslint-disable-next-line roblox-ts/no-any
			Size={motion.map((num: number) => UDim2.fromScale(props.Size.X.Scale / num, props.Size.Y.Scale / num))}
			Event={{
				Activated: () => {
					task.spawn(() => props.onClick());
					setmotion.spring(hover, {
						frequency: 0.2, // moderate speed bounce
						damping: 0.9, // low damping → nice bouncy overshoot

						velocity: velocity,
					});
				},
				MouseEnter: () => setmotion.spring(hover, ButtonSpring),
				MouseLeave: () => setmotion.spring(1, ButtonSpring),
			}}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			ImageColor3={props.imageColor}
			AutoButtonColor={false}
			LayoutOrder={props.LayoutOrder}
		>
			{props.children}
		</imagebutton>
	);
}
