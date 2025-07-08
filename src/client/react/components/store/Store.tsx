import Object from "@rbxts/object-utils";
import React, { useEffect, useState } from "@rbxts/react";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RootState, RootStore, store } from "client/react/store/store";

import * as HouseConfig from "shared/config/house.json";
import * as CrateConfig from "shared/config/crate.json";
import { StoreSlot } from "./storeslot";
import { Events } from "client/network";
import { CountdownTimer } from "./countdown";
import { ExitButton } from "../inventory/exit";
import { useMotion } from "@rbxts/pretty-react-hooks";
import { PresentList } from "./presentlist";
import { getLootTable } from "shared/utils/loot";

export type storeType = "house" | "crate" | "booster";

export type storeConfig = {
	cost: number;
	productid?: number;
	displayName: string;
};

//store map so list is cached

const getConfigMap = (storeType: storeType, config: Record<string, storeConfig>) => {
	const orderNum = 0;
	return Object.entries(config)
		.sort((a, b) => {
			return a[1].cost < b[1].cost;
		})
		.map(([key, config]) => {
			print(key, orderNum);

			return (
				<StoreSlot
					key={key}
					houseid={key}
					cost={config.cost}
					robuxprice={25}
					layoutorder={orderNum}
					displayName={config.displayName}
					stock={store.getState().store.stock[key] ?? 0}
					productid={config.productid}
					onBuy={() => {
						Events.onStoreAction.fire(storeType, key);
					}}
					onRobuxBuy={() => {
						print("robux!");
					}}
				/>
			);
		});
};

const storeRecord: Record<storeType, Record<string, storeConfig>> = {
	house: HouseConfig,
	crate: CrateConfig,
	booster: HouseConfig,
};

export function Store() {
	const storeState = useSelector((state: RootState) => state.store);
	const dispatch = useProducer<RootStore>();

	const [pos, setpos] = useMotion(1.5);
	const [visible, setvisible] = useState(false);

	useEffect(() => {
		if (!setpos.isComplete()) {
			return;
		}

		setvisible(true);

		const goal = storeState.storeOpen === undefined ? 1.5 : 0.5;
		setpos.spring(goal, {
			frequency: 0.3,
			damping: 0.8,
		});

		if (storeState.storeOpen === undefined) {
			task.delay(0.2, () => setvisible(false));
		}
	}, [storeState.storeOpen]);

	useEffect(() => {
		print("stock update", storeState.stock);
	}, [storeState.stock]);

	return (
		<screengui key={"sTOREDEV"} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
			<imagelabel
				key={"imageLabel"}
				Image={"rbxassetid://104627235588011"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={pos.map((y) => UDim2.fromScale(0.5, y))}
				Size={UDim2.fromScale(0.432, 0.452)}
			>
				<scrollingframe
					key={"scrollingFrame"}
					AutomaticCanvasSize={Enum.AutomaticSize.Y}
					CanvasSize={new UDim2()}
					ScrollBarImageColor3={Color3.fromRGB(0, 0, 0)}
					ScrollBarThickness={5}
					ScrollingDirection={Enum.ScrollingDirection.Y}
					Active={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.5, 0.514)}
					Size={UDim2.fromScale(0.933, 0.794)}
				>
					<uilistlayout
						key={"uIListLayout"}
						Padding={new UDim(0.04, 0)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
					{storeState.storeOpen && getConfigMap(storeState.storeOpen, storeRecord[storeState.storeOpen])}
				</scrollingframe>
				<uiaspectratioconstraint key={"uIAspectRatioConstraint6"} AspectRatio={1.7} />
				<ExitButton
					Position={UDim2.fromScale(0.952, 0.0472)}
					Size={UDim2.fromScale(0.12, 0.205)}
					onClick={function (): void {
						dispatch.toggleStore(undefined);
					}}
				/>
				<CountdownTimer />
			</imagelabel>
		</screengui>
	);
}
