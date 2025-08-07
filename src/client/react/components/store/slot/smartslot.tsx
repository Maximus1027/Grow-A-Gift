import React from "@rbxts/react";
import { storeType } from "../Store";
import { BaseSlotProps, StoreSlotProps } from "./baseslot";
import { CrateProps, CrateSlot } from "./crateslot";
import { HouseSlot, HouseSlotProps } from "./storeslot";
import { getCrateConfig } from "shared/utils/loot";
import { store } from "client/react/store/store";

export interface SmartSlotProps {
	storetype: storeType;
	props: StoreSlotProps;
}

export function SmartSlot(props: SmartSlotProps) {
	switch (props.storetype) {
		case "crate":
			return (
				<CrateSlot
					cost={props.props.cost}
					itemid={props.props.itemid}
					displayName={props.props.displayName}
					layoutorder={props.props.layoutorder}
					productid={props.props.productid}
					openTime={getCrateConfig()[props.props.itemid].timeInMinutes}
				/>
			);

		case "house":
			return (
				<HouseSlot
					stock={store.getState().store.stock[props.props.itemid] ?? 0}
					cost={props.props.cost}
					itemid={props.props.itemid}
					displayName={props.props.displayName}
					layoutorder={props.props.layoutorder}
					productid={props.props.productid}
				/>
			);
	}
}
