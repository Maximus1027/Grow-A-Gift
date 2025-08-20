import React, { useEffect, useRef, useState } from "@rbxts/react";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RunService } from "@rbxts/services";
import { Window } from "client/react/store/producer/windowproducer";
import { RootState, RootStore } from "client/react/store/store";

export function InventoryOpener() {
	const dispatch = useProducer<RootStore>();
	const inventoryState = useSelector((state: RootState) => state.inventory);
	const window = useSelector((state: RootState) => state.windowManager.windows.hud);

	return (
		window === true && (
			<imagebutton
				key={"openinv"}
				Image={"rbxassetid://130138970079871"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				LayoutOrder={999}
				Position={UDim2.fromScale(0.0856, 0.5)}
				Size={UDim2.fromScale(0.171, 1)}
				Event={{
					Activated: () => {
						dispatch.setWindowState(Window.inventory, true);
					},
				}}
			/>
		)
	);
}
