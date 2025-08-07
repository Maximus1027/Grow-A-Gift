import React, { Children } from "@rbxts/react";
import { HouseDisplay } from "../../crates/housedisplay";
import { Events } from "client/network";
import { storeType } from "../Store";

export interface BaseSlotProps extends React.PropsWithChildren {
	itemid: string;
	actionType: storeType;
	devProductId: string;
}

//To be extended by other slots
export interface StoreSlotProps {
	cost: number;
	itemid: string;
	displayName: string;
	layoutorder: number;
	productid: string;
}

export function BaseSlot(props: BaseSlotProps) {
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
			{props.children}
			<HouseDisplay
				houseid={props.itemid}
				rotate={true}
				Size={UDim2.fromScale(0.199, 0.724)}
				Position={UDim2.fromScale(0.16, 0.475)}
			/>

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
					Activated: () => Events.onStoreAction.fire(props.actionType, props.itemid),
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
					Text={tostring(25)}
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
		</imagelabel>
	);
}
