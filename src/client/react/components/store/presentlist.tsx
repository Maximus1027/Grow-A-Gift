import Object from "@rbxts/object-utils";
import React from "@rbxts/react";
import { RarityLootTable } from "shared/utils/loot";
import { PresentDisplay } from "./presentdisplay";
import { Rarity } from "shared/enums/Rarity";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RootStore } from "client/react/store/store";

export interface PresentListProps {
	lootTable: RarityLootTable;
	houseid: string;
}

export function PresentList(props: PresentListProps) {
	const dispatch = useProducer<RootStore>();

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
			Event={{
				MouseEnter: () => dispatch.toggleChancesHover(props.houseid),
				MouseLeave: () => dispatch.toggleChancesHover(undefined),
			}}
		>
			<uigridlayout
				key={"uIGridLayout"}
				CellPadding={UDim2.fromScale(0.02, 0)}
				CellSize={UDim2.fromScale(0.15, 0.9)}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>

			{Object.entries(props.lootTable)
				.sort((a, b) => (a[1] as number) < (b[1] as number))
				.map((rarity) => (
					<PresentDisplay distance={2.3} key={rarity[0] as string} rarity={rarity[0] as Rarity} />
				))}
		</frame>
	);
}
