import Object from "@rbxts/object-utils";
import React from "@rbxts/react";
import { LootTable } from "shared/utils/loot";
import { PresentDisplay } from "./presentdisplay";
import { Rarity } from "shared/enums/Rarity";

export interface PresentListProps {
	lootTable: LootTable;
}

export function PresentList(props: PresentListProps) {
	return (
		<frame
			key={"presents"}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.776, 0.244)}
			Size={UDim2.fromScale(0.43, 0.3)}
		>
			<uigridlayout
				key={"uIGridLayout"}
				CellPadding={UDim2.fromScale(0.02, 0)}
				CellSize={UDim2.fromScale(0.15, 0.9)}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>

			{Object.entries(props.lootTable)
				.sort((a, b) => a[1] < b[1])
				.map((rarity) => (
					<PresentDisplay distance={2.3} key={rarity[0]} rarity={rarity[0]} />
				))}
		</frame>
	);
}
