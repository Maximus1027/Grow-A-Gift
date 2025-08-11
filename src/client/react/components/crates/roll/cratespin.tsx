import React, { useEffect, useRef, useState } from "@rbxts/react";
import { Rarity } from "shared/enums/Rarity";
import {
	convertChanceToStringMarkup,
	convertCrateChanceToStringMarkup,
	CrateLootTable,
	getCrateLootTable,
	getLootTable,
	HouseConfig,
	RarityLootTable,
	returnRandomRarity,
} from "shared/utils/loot";
import { HouseDisplay } from "../housedisplay";
import Object from "@rbxts/object-utils";
import { useMotion } from "@rbxts/pretty-react-hooks";
import { CrateDisplay } from "./CrateDisplay";

import * as Icons from "shared/config/ui.json";
import * as Houses from "shared/config/house.json";
import { HouseReward } from "./housereward";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RootState, RootStore } from "client/react/store/store";
import { Window } from "client/react/store/producer/windowproducer";

export interface SpinProps {
	crateid: string;
	chosenHouseid: string;
}

export function CrateSpin(props: SpinProps) {
	const offset = 0.175;

	const loottable = getCrateLootTable(props.crateid);

	const display: React.Element[] = [];

	let winnerPos = 0;
	const randomIndex = math.random(35, 45);

	const config = Houses as unknown as HouseConfig;

	for (let i = 0; i < 50; i++) {
		const reward = i === randomIndex ? props.chosenHouseid : returnRandomRarity(loottable, props.crateid);
		const offsetPos = UDim2.fromScale(0, 0.5).add(UDim2.fromScale(offset * i, 0));

		if (i === randomIndex) {
			winnerPos = 1 + offset * i;
		}

		const rarity = config[reward].rarity as Rarity;
		const image = Icons.crates[rarity];

		const chance = convertCrateChanceToStringMarkup(reward, props.crateid);

		display.push(
			<CrateDisplay chanceDisplay={chance} key={i + ""} houseid={reward} position={offsetPos} imageid={image} />,
		);
	}

	const [pos, setpos] = useMotion<UDim2>(UDim2.fromScale(0.5, 0.5));
	const listRef = useRef();
	const mainRef = useRef();

	const [reward, setcompleteReward] = useState<string>();

	useEffect(() => {
		const list = listRef.current as unknown as Frame;
		const main = mainRef.current as unknown as Frame;

		if (!list || !main) {
			return;
		}

		const winner = list.FindFirstChild(randomIndex) as Frame;

		const xDiff = winner.AbsolutePosition.X + winner.AbsoluteSize.X / 2 - main.AbsolutePosition.X;
		const landPos = UDim2.fromScale(1, 0.5).sub(UDim2.fromOffset(xDiff, 0));

		print(landPos, winner.AbsolutePosition);

		setpos.tween(landPos, {
			time: 5,
			style: Enum.EasingStyle.Quart,
			direction: Enum.EasingDirection.Out,
		});

		setpos.onComplete(() => {
			setcompleteReward(props.chosenHouseid);
		});
	}, [listRef]);

	useEffect(() => {}, [display.size()]);

	return reward === undefined ? (
		<screengui
			key={"CRATE-ROLL-PRODUCTION"}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
			Enabled={setpos.isComplete()}
		>
			<imagelabel
				key={"main"}
				Image={"rbxassetid://128740229126942"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={UDim2.fromScale(0.521, 0.199)}
				ClipsDescendants={true}
				ref={mainRef}
			>
				<frame
					key={"holder"}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					ClipsDescendants={true}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(0.95, 0.762)}
				>
					<frame
						key={"items"}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						ClipsDescendants={false}
						Position={pos.map((p) => p)}
						Size={UDim2.fromScale(1, 1)}
						ref={listRef}
					>
						{display}

						<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={5.675} />
					</frame>
				</frame>

				<uiaspectratioconstraint key={"uIAspectRatioConstraint2"} AspectRatio={4.65} />
			</imagelabel>
			<imagelabel
				key={"topspinner"}
				Image={"rbxassetid://114207178073610"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.401)}
				Size={UDim2.fromScale(0.05, 0.0609)}
			>
				<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={1.46} />
			</imagelabel>
			<imagelabel
				key={"bottomspinner"}
				Image={"rbxassetid://118084931576514"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.598)}
				Size={UDim2.fromScale(0.05, 0.0596)}
			>
				<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={1.49} />
			</imagelabel>
		</screengui>
	) : (
		<HouseReward
			houseid={reward}
			rarity={config[reward].rarity as Rarity}
			chance={convertCrateChanceToStringMarkup(reward, props.crateid)}
		/>
	);
}
