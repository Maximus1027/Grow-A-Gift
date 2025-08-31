import Abbreviator from "@rbxts/abbreviate";
import React, { useState } from "@rbxts/react";
import { Button } from "../misc/button";
import { getVillage } from "shared/utils/generictils";
import { useProducer } from "@rbxts/react-reflex";
import { RootStore } from "client/react/store/store";
import { Window } from "client/react/store/producer/windowproducer";
import { Events } from "client/network";
import { InteractiveButton } from "../misc/interactivebutton";
import { WindowWrapper } from "../windows/windowwrapper";

export interface TownshipProps {
	nextTown: string;
	currentTown: string;
}

const abv = new Abbreviator();

export function UpgradeTown(props: TownshipProps) {
	const current = getVillage(props.currentTown);
	const nextVillage = getVillage(props.nextTown);

	const dispatch = useProducer<RootStore>();

	return (
		<screengui
			key={"tOWNSHIPDEV"}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ResetOnSpawn={false}
		>
			<WindowWrapper window={Window.township}>
				<imagelabel
					key={"main"}
					Image={"rbxassetid://128002358167749"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.499, 0.5)}
					Size={UDim2.fromScale(0.435, 0.46)}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={1.68} />

					<textlabel
						key={"context"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={
							props.nextTown === ""
								? "MAXED"
								: `${current[1].displayName} ► ${nextVillage[1].displayName}`
						}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.502, 0.435)}
						Size={UDim2.fromScale(0.819, 0.155)}
					>
						<uistroke key={"uIStroke"} Thickness={4} />
					</textlabel>

					<InteractiveButton
						key={"cancel"}
						Image={"rbxassetid://99603570912100"}
						Position={UDim2.fromScale(0.266, 0.775)}
						Size={UDim2.fromScale(0.345, 0.213)}
						onClick={() => {
							dispatch.setWindowState(Window.township, false);
						}}
						hover={1.03}
					/>

					{nextVillage && (
						<React.Fragment>
							<imagelabel
								key={"icon"}
								Image={nextVillage[1].iconid}
								ScaleType={Enum.ScaleType.Fit}
								AnchorPoint={new Vector2(0.5, 0.5)}
								BackgroundColor3={Color3.fromRGB(255, 255, 255)}
								BackgroundTransparency={1}
								BorderColor3={Color3.fromRGB(0, 0, 0)}
								BorderSizePixel={0}
								Position={UDim2.fromScale(0.925, 0.221)}
								Rotation={-10}
								Size={UDim2.fromScale(0.186, 0.312)}
							/>

							<InteractiveButton
								key={"upgrade"}
								Image={"rbxassetid://88088338934962"}
								Position={UDim2.fromScale(0.739, 0.775)}
								Size={UDim2.fromScale(0.345, 0.213)}
								onClick={() => {
									dispatch.setWindowState(Window.township, false);
									Events.onPlotAction.fire("upgrade", nextVillage[0]);
								}}
							/>

							<textlabel
								key={"cost"}
								FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
								Text={`-$${abv.commify(nextVillage[1].cost)}`}
								TextColor3={Color3.fromRGB(255, 0, 0)}
								TextScaled={true}
								TextSize={14}
								TextWrapped={true}
								AnchorPoint={new Vector2(0.5, 0.5)}
								BackgroundColor3={Color3.fromRGB(255, 255, 255)}
								BackgroundTransparency={1}
								BorderColor3={Color3.fromRGB(0, 0, 0)}
								BorderSizePixel={0}
								Position={UDim2.fromScale(0.263, 0.57)}
								Size={UDim2.fromScale(0.343, 0.0997)}
							>
								<uistroke key={"uIStroke1"} Thickness={4} />
							</textlabel>

							<frame
								key={"perks"}
								AnchorPoint={new Vector2(0.5, 0.5)}
								BackgroundColor3={Color3.fromRGB(255, 255, 255)}
								BorderColor3={Color3.fromRGB(0, 0, 0)}
								BorderSizePixel={0}
								Position={UDim2.fromScale(0.73, 0.573)}
								Size={UDim2.fromScale(0.387, 0.12)}
							>
								<uilistlayout
									key={"uIListLayout"}
									ItemLineAlignment={Enum.ItemLineAlignment.Center}
									SortOrder={Enum.SortOrder.LayoutOrder}
									VerticalAlignment={Enum.VerticalAlignment.Center}
								/>

								<textlabel
									key={"perk1"}
									FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
									Text={`+${nextVillage[1].luck}% Luck Boost`}
									TextColor3={Color3.fromRGB(38, 255, 0)}
									TextScaled={true}
									TextSize={14}
									TextWrapped={true}
									AnchorPoint={new Vector2(0.5, 0.5)}
									BackgroundColor3={Color3.fromRGB(255, 255, 255)}
									BackgroundTransparency={1}
									BorderColor3={Color3.fromRGB(0, 0, 0)}
									BorderSizePixel={0}
									Position={UDim2.fromScale(0.485, 0.475)}
									Size={UDim2.fromScale(0.97, 0.648)}
								>
									<uistroke key={"uIStroke3"} Thickness={4} />
								</textlabel>
							</frame>
						</React.Fragment>
					)}
				</imagelabel>
			</WindowWrapper>
		</screengui>
	);
}
