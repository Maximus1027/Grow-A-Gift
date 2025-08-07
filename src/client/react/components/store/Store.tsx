import Object from "@rbxts/object-utils";
import React, { useEffect, useMemo, useState } from "@rbxts/react";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RootState, RootStore, store } from "client/react/store/store";

import * as HouseConfig from "shared/config/house.json";
import * as CrateConfig from "shared/config/crate.json";
import { Events } from "client/network";
import { CountdownTimer } from "./countdown";
import { ExitButton } from "../inventory/exit";
import { useMotion } from "@rbxts/pretty-react-hooks";
import { HouseSlot, HouseSlotProps } from "./slot/storeslot";
import { SmartSlot } from "./slot/smartslot";
import { getCrateConfig } from "shared/utils/loot";

export type storeType = "house" | "crate" | "booster";

export type storeConfig = {
	cost: number;
	productid: number;
	displayName: string;
};

//store map so list is cached
const getConfigMap = (storeType: storeType, config: Record<string, storeConfig>) => {
	let orderNum = 0;
	return Object.entries(config)
		.sort((a, b) => {
			return a[1].cost < b[1].cost;
		})
		.map(([key, config]) => {
			orderNum++;
			return (
				<SmartSlot
					key={key}
					storetype={storeType}
					props={{
						itemid: key,
						cost: config.cost,
						layoutorder: orderNum,
						displayName: config.displayName,
						productid: tostring(config.productid),
					}}
				/>
			);
		});
};

const storeRecord: Record<storeType, typeof CrateConfig | typeof HouseConfig> = {
	house: HouseConfig,
	crate: CrateConfig,
	booster: HouseConfig,
};

export function Store() {
	const storeState = useSelector((state: RootState) => state.store);
	const dispatch = useProducer<RootStore>();

	const [pos, setpos] = useMotion(1.5);
	const [visible, setvisible] = useState(false);

	const countdown = useMemo(() => <CountdownTimer />, []);

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

	useEffect(() => {}, [storeState.stock]);

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

				{storeState.storeOpen === "house" && countdown}
			</imagelabel>
		</screengui>
	);
}
