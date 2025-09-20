import Abbreviator from "@rbxts/abbreviate";
import React, { useEffect, useState } from "@rbxts/react";
import * as Houses from "shared/config/house.json";
import { getHouseConfig, getLootTable, RarityLootTable } from "shared/utils/loot";
import { PresentList } from "../presentlist";
import { BaseSlot, StoreSlotProps } from "./baseslot";
import { abbreviateNumber } from "shared/utils/generictils";

export interface HouseSlotProps extends StoreSlotProps {
	stock: number;
}

export function HouseSlot(props: HouseSlotProps) {
	// eslint-disable-next-line roblox-ts/no-any
	const maxStock = getHouseConfig()[props.itemid].stock;
	const chance = getHouseConfig()[props.itemid].chance;

	return (
		<BaseSlot actionType="house" devProductId={props.productid ?? ""} itemid={props.itemid}>
			{<PresentList houseid={props.itemid} lootTable={getLootTable(props.itemid) as RarityLootTable} />}

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
				Text={`$${abbreviateNumber(props.cost)}`}
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
		</BaseSlot>
	);
}
