import Object from "@rbxts/object-utils";
import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/react/store/store";
import { Booster } from "./booster";

import { getUIConfig } from "shared/utils/configtils";

export function Boost() {
	const boosts = useSelector((state: RootState) => state.boost.activeBoosts);
	const window = useSelector((state: RootState) => state.windowManager.windows.hud);

	return (
		<screengui
			key={"BOOSTS-PROD"}
			Enabled={window === true}
			ResetOnSpawn={false}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
			IgnoreGuiInset={true}
		>
			<frame
				key={"main"}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.834, 0.725)}
				Size={UDim2.fromScale(0.309, 0.229)}
			>
				<uigridlayout
					key={"uIGridLayout"}
					CellPadding={UDim2.fromScale(0, 0.14)}
					CellSize={UDim2.fromScale(0.25, 0.5)}
					StartCorner={Enum.StartCorner.TopRight}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Bottom}
				/>
				<uilistlayout
					key={"uIListLayout"}
					Padding={new UDim(0.01, 0)}
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Right}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>

				{boosts.map((boost) => {
					const imageid = getUIConfig().boost[boost.boostType];

					return (
						<Booster
							key={boost.namespace}
							imageid={imageid}
							value={boost.boostValue}
							endtick={boost.endtick}
						/>
					);
				})}
			</frame>
		</screengui>
	);
}
