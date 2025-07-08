import Object from "@rbxts/object-utils";
import React, { useEffect, useMemo, useState } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/react/store/store";
import { convertChanceToString, getLootTable, getOrderedLoottable, LootTable } from "shared/utils/loot";
import { Chance } from "./chance";
import { Rarity } from "shared/enums/Rarity";
import { PresentDisplay } from "../store/presentdisplay";
import { Players, RunService } from "@rbxts/services";
import { t } from "@rbxts/t";

export function PresentChancesHover() {
	const hover = useSelector((state: RootState) => state.store.hovering);
	const [mouse, setMouse] = useState<Vector2>(new Vector2());
	//memoize chances so that they are not re rendered every mouse movement
	const mem = useMemo(
		() =>
			t.string(hover) &&
			getOrderedLoottable(hover).map((rarity, index) => {
				return (
					<Chance
						key={rarity}
						rarity={rarity as Rarity}
						chanceString={convertChanceToString(rarity as Rarity, hover)}
						order={-index}
					/>
				);
			}),
		[hover],
	);

	useEffect(() => {
		const mouse = Players.LocalPlayer.GetMouse();
		const hb = mouse.Move.Connect(() => {
			setMouse(new Vector2(mouse.X, mouse.Y));
		});

		return () => {
			print("dicso");
			hb.Disconnect();
		};
	}, []);

	return (
		hover !== undefined && (
			<screengui key={"hOVERDEV"} DisplayOrder={1}>
				<imagelabel
					key={"hover"}
					Image={"rbxassetid://91327591590824"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0, 0)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromOffset(mouse!.X, mouse!.Y)}
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
						{mem}
						<uilistlayout key={"uIListLayout"} SortOrder={Enum.SortOrder.LayoutOrder} />
					</frame>
				</imagelabel>
			</screengui>
		)
	);
}
