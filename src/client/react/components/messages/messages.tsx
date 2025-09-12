import React, { useEffect, useState } from "@rbxts/react";
import { WindowWrapper } from "../windows/windowwrapper";
import { Window } from "client/react/store/producer/windowproducer";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { useAsync, useAsyncEffect, useDeferState } from "@rbxts/pretty-react-hooks";
import { RootState, RootStore } from "client/react/store/store";
import { Msg } from "./msg";
import { Message } from "client/react/store/producer/messageproducer";
import Object from "@rbxts/object-utils";

export function Messages() {
	const messageState = useSelector((state: RootState) => state.messages.messages);
	const [msgs, setMsgs] = useState<string[]>([]);
	const dispatch = useProducer<RootStore>();

	useAsyncEffect(async () => {
		if (messageState.size() < 1) {
			return;
		}

		dispatch.clearMessages();

		for (const msg of messageState) {
			task.wait(0.1);
			setMsgs((old) => [...old, msg]);

			task.delay(5, () => {
				setMsgs((old) => old.filter((m) => m !== msg));
			});
		}
	}, [messageState]);

	return (
		<screengui
			ResetOnSpawn={false}
			IgnoreGuiInset={true}
			key={"mESSAGESDEV"}
			DisplayOrder={-1}
			ZIndexBehavior={Enum.ZIndexBehavior.Global}
		>
			<WindowWrapper window={Window.hud}>
				<frame
					key={"msgs"}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.5, 0.26)}
					Size={UDim2.fromScale(0.394, 0.156)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					ZIndex={-100}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={4.47} />

					{Object.values(msgs)
						.sort((a, b) => msgs.indexOf(a) > msgs.indexOf(b))
						.map((msg: string, index) => (
							<Msg index={index} text={msg} />
						))}
				</frame>
			</WindowWrapper>
		</screengui>
	);
}
