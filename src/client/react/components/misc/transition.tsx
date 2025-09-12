import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { Players } from "@rbxts/services";

export interface TransitionProps {
	onHiddenAction: () => void;
	onFinish: () => void;
	speed: number;
}

export function DropTransition(props: TransitionProps) {
	const [position, setposition] = useMotion(UDim2.fromScale(0.5, -1));
	useEffect(() => {
		task.delay(props.speed * 0.15, () => {
			props.onHiddenAction();
		});
		setposition.linear(UDim2.fromScale(0.5, 2.2), {
			speed: props.speed * 3,
		});

		setposition.onComplete(() => {
			props.onFinish();
		});
	}, []);

	return (
		<screengui ScreenInsets={Enum.ScreenInsets.None} DisplayOrder={5} IgnoreGuiInset={true} ResetOnSpawn={false}>
			<frame
				Size={UDim2.fromScale(1.5, 2)}
				Position={position}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(0, 0, 0)}
			></frame>
		</screengui>
	);
}
