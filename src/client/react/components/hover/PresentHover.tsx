import Object from "@rbxts/object-utils";
import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/react/store/store";
import { convertChanceToString, getLootTable, LootTable } from "shared/utils/loot";
import { Chance } from "./chance";
import { Rarity } from "shared/enums/Rarity";

export function PresentChancesHover() {
	const hover = useSelector((state: RootState) => state.store.hovering);

	return (
		hover !== undefined && (
			<screengui key={"hOVERDEV"} DisplayOrder={1}>
				<imagelabel
					key={"hover"}
					Image={"rbxassetid://91327591590824"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.716, 0.536)}
					Size={UDim2.fromScale(0.131, 0.351)}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={0.666} />

					<frame
						key={"chances"}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.503, 0.491)}
						Size={UDim2.fromScale(0.805, 0.826)}
					>
						{Object.entries(getLootTable(hover)).map(([rarity, chance], idx) => (
							<Chance
								key={rarity}
								chanceString={convertChanceToString(rarity, hover) + ""}
								rarity={rarity as Rarity}
							/>
						))}
						<uilistlayout key={"uIListLayout"} SortOrder={Enum.SortOrder.LayoutOrder} />
					</frame>
				</imagelabel>
			</screengui>
		)
	);
}
