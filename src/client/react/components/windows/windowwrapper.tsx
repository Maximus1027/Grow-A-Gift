import { useMotion } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { useEffect, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { Window } from "client/react/store/producer/windowproducer";
import { RootState } from "client/react/store/store";

export interface WindowWrapperProps extends React.PropsWithChildren {
	window: Window;
	target?: UDim2;
	time?: number;
}

export function WindowWrapper(props: WindowWrapperProps) {
	const time = props.time ?? 0.2;
	const target = props.target ?? UDim2.fromScale(0.5, 1.5);

	const window = useSelector((state: RootState) => state.windowManager.windows[props.window]);
	const [visible, setVisible] = useState<boolean>(true);
	const [pos, setPos] = useMotion([target.X.Scale, target.Y.Scale]);

	//const tweenOptions = { time: time, style: props.tweenStyle, direction: Enum.EasingDirection.Out };

	useEffect(() => {
		if (window === true) {
			//setPos.tween([0.5, 0.5], tweenOptions);
			setPos.spring([0.5, 0.5], {
				frequency: 0.3,
				damping: 0.8,
			});
			setVisible(true);
		} else {
			setPos.spring([target.X.Scale, target.Y.Scale], {
				frequency: 0.3,
				damping: 0.8,
			});

			task.delay(time, () => setVisible(false));
		}

		return () => {
			print(props.window, "wrapper disconnected");
		};
	}, [window]);

	return (
		<frame
			key={props.window}
			BackgroundTransparency={1}
			Transparency={1}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={UDim2.fromScale(1, 1)}
			Position={pos.map((p) => UDim2.fromScale(p[0], p[1]))}
		>
			{visible && props.children}
		</frame>
	);
}
