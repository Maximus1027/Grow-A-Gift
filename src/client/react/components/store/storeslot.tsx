import Abbreviator from "@rbxts/abbreviate";
import React, { useEffect, useState } from "@rbxts/react";
import { Events } from "client/network";
import * as Houses from "shared/config/house.json";
import { getLootTable, HouseConfig } from "shared/utils/loot";
import { PresentList } from "./presentlist";

export interface StoreSlotProps {
	cost: number;
	houseid: string;
	displayName: string;
	layoutorder: number;
	stock: number;
	productid?: number;
	robuxprice: number;
	onBuy: () => void;
	onRobuxBuy: () => void;
}

export function StoreSlot(props: StoreSlotProps) {
	const abv = new Abbreviator();
	// eslint-disable-next-line roblox-ts/no-any
	const maxStock = (Houses as HouseConfig)[props.houseid].stock;

	useEffect(() => {
		return () => {
			"unmount";
		};
	}, []);

	return (
		<imagelabel
			key={"slot"}
			Image={"rbxassetid://92884394960407"}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.5, 0.275)}
			Size={UDim2.fromScale(1, 0.55)}
		>
			<viewportframe
				key={"viewportFrame"}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.16, 0.475)}
				Size={UDim2.fromScale(0.199, 0.724)}
			>
				<uiaspectratioconstraint />
			</viewportframe>

			{<PresentList lootTable={getLootTable(props.houseid)} />}

			<textlabel
				key={"house"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={props.displayName}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				TextXAlignment={Enum.TextXAlignment.Left}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.381, 0.24)}
				Size={UDim2.fromScale(0.212, 0.254)}
			>
				<uistroke key={"uIStroke"} Thickness={3} />

				<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={3.04} />

				<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={54} />
			</textlabel>

			<textlabel
				key={"cost"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={`$${abv.commify(props.cost)}`}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				TextXAlignment={Enum.TextXAlignment.Left}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.398, 0.498)}
				Size={UDim2.fromScale(0.248, 0.254)}
			>
				<uistroke key={"uIStroke1"} Thickness={3} />

				<uiaspectratioconstraint key={"uIAspectRatioConstraint2"} AspectRatio={3.54} />

				<uitextsizeconstraint key={"uITextSizeConstraint1"} MaxTextSize={45} />
			</textlabel>

			<imagebutton
				key={"buy"}
				Image={"rbxassetid://131222522112144"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.652, 0.688)}
				Size={UDim2.fromScale(0.18, 0.288)}
				Event={{
					Activated: () => Events.onStoreAction("house", props.houseid),
				}}
			>
				<uiaspectratioconstraint key={"uIAspectRatioConstraint3"} AspectRatio={2.27} />
			</imagebutton>

			<imagebutton
				key={"robux"}
				Image={"rbxassetid://123672105383598"}
				ScaleType={Enum.ScaleType.Fit}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.85, 0.689)}
				Size={UDim2.fromScale(0.178, 0.289)}
			>
				<imagelabel
					key={"imageLabel1"}
					Image={"rbxassetid://104137813001476"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.25, 0.471)}
					Size={UDim2.fromScale(0.37, 0.735)}
				/>

				<textlabel
					key={"cost1"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={tostring(props.robuxprice)}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.639, 0.47)}
					Size={UDim2.fromScale(0.518, 0.687)}
				>
					<uistroke key={"uIStroke2"} Thickness={2} />

					<uitextsizeconstraint key={"uITextSizeConstraint2"} MaxTextSize={42} />
				</textlabel>

				<uiaspectratioconstraint key={"uIAspectRatioConstraint4"} AspectRatio={2.24} />
			</imagebutton>

			<textlabel
				key={"stock"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={props.stock > 0 ? tostring(props.stock) + " / " + maxStock : "Out Of Stock"}
				TextColor3={props.stock > 0 ? Color3.fromRGB(20, 255, 0) : Color3.fromRGB(255, 0, 0)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				TextXAlignment={Enum.TextXAlignment.Left}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.381, 0.732)}
				Size={UDim2.fromScale(0.248, 0.218)}
			>
				<uistroke key={"uIStroke3"} Thickness={3} />

				<uiaspectratioconstraint key={"uIAspectRatioConstraint5"} AspectRatio={3.54} />

				<uitextsizeconstraint key={"uITextSizeConstraint3"} MaxTextSize={45} />
			</textlabel>
		</imagelabel>
	);
}
