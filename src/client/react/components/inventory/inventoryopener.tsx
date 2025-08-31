import React, { useEffect, useRef, useState } from "@rbxts/react";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RunService } from "@rbxts/services";
import { Window } from "client/react/store/producer/windowproducer";
import { RootState, RootStore } from "client/react/store/store";
import { InteractiveButton } from "../misc/interactivebutton";

export function InventoryOpener() {
	const dispatch = useProducer<RootStore>();
	const inventoryState = useSelector((state: RootState) => state.inventory);
	const window = useSelector((state: RootState) => state.windowManager.windows.hud);

	return (
		window === true && (
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				LayoutOrder={999}
				Size={UDim2.fromScale(0.171, 1)}
				Position={UDim2.fromScale(0.0856, 0.5)}
			>
				<InteractiveButton
					key={"openinv"}
					Image={"rbxassetid://130138970079871"}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(1, 1)}
					onClick={() => dispatch.toggleWindowState(Window.inventory)}
					hover={1.03}
				/>
			</frame>
		)
	);
}
