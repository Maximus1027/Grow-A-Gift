import React, { useEffect } from "@rbxts/react";
import { Perk } from "./perk";
import { Boost } from "shared/enums/Boost";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RootState, RootStore } from "client/react/store/store";
import Abbreviator from "@rbxts/abbreviate";
import { Players } from "@rbxts/services";
import { Window } from "client/react/store/producer/windowproducer";
import { Events } from "client/network";
import { RebirthButton } from "./rebirthbutton";
import { WindowWrapper } from "../windows/windowwrapper";
import { InteractiveButton } from "../misc/interactivebutton";

export interface RebirthProps {
	cost: number;
	income: number;
	luck: number;
	speed: number;
}

const abv = new Abbreviator();

export function Rebirth(props: RebirthProps) {
	const dispatch = useProducer<RootStore>();
	const money = Players.LocalPlayer.FindFirstChild("stats") ? Players.LocalPlayer.stats.Money.Value : 0;

	return (
		<imagelabel
			key={"main"}
			Image={"rbxassetid://84275838308386"}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.5, 0.5)}
			Size={UDim2.fromScale(0.469, 0.509)}
			AnchorPoint={new Vector2(0.5, 0.5)}
		>
			<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={1.64} />
			{props.cost === -1 ? (
				//if rebirth data wasn't found
				<textlabel
					key={"permlabel"}
					FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
					Text={"MAX REBIRTH REACHED"}
					TextColor3={Color3.fromRGB(255, 0, 0)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.231, 0.275)}
					Size={UDim2.fromScale(0.484, 0.129)}
				>
					<uistroke key={"uIStroke"} Thickness={4} />

					<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={55} />
				</textlabel>
			) : (
				<React.Fragment>
					{money >= props.cost ? (
						<RebirthButton
							key={"rebirth"}
							onClick={() => {
								Events.onPlotAction("rebirth");
								dispatch.setWindowState(Window.rebirth, false);
							}}
						/>
					) : (
						<imagebutton
							key={"missing"}
							Image={"rbxassetid://107731803727260"}
							BackgroundColor3={Color3.fromRGB(255, 255, 255)}
							BorderColor3={Color3.fromRGB(0, 0, 0)}
							BorderSizePixel={0}
							Position={UDim2.fromScale(0.12 + 0.125, 0.532 + 0.125)}
							Size={UDim2.fromScale(0.349, 0.212)}
							ZIndex={2}
							AutoButtonColor={false}
							AnchorPoint={new Vector2(0.5, 0.5)}
						/>
					)}

					<textlabel
						key={"permlabel"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={money >= props.cost ? "YOU CAN REBIRTH!" : "YOU CAN'T REBIRTH"}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.231, 0.275)}
						Size={UDim2.fromScale(0.484, 0.129)}
					>
						<uistroke key={"uIStroke"} Thickness={4} />

						<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={55} />
					</textlabel>
					<frame
						key={"perks"}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.448, 0.452)}
						Size={UDim2.fromScale(0.76, 0.134)}
					>
						<uilistlayout
							key={"uIListLayout"}
							ItemLineAlignment={Enum.ItemLineAlignment.Center}
							Padding={new UDim(0.03, 0)}
							FillDirection={Enum.FillDirection.Horizontal}
							SortOrder={Enum.SortOrder.LayoutOrder}
							VerticalAlignment={Enum.VerticalAlignment.Center}
						/>

						<Perk percentBoost={props.income} boostType={Boost.Income} />
						<Perk percentBoost={props.luck} boostType={Boost.GiftLuck} />
						<Perk percentBoost={props.speed} boostType={Boost.NPCSpeed} />
					</frame>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={1.64} />
					<textlabel
						key={"label"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						RichText={true}
						Text={'<font color="rgb(255,0,0)">COST</font> TO <font color="rgb(255,170,0)">REBIRTH</font>'}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.485, 0.797)}
						Size={UDim2.fromScale(0.333, 0.0811)}
					>
						<uistroke key={"uIStroke4"} Thickness={3} />

						<uitextsizeconstraint key={"uITextSizeConstraint4"} MaxTextSize={39} />
					</textlabel>
					<textlabel
						key={"cost"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						RichText={true}
						Text={`<font color="rgb(255,0,0)">$${abv.commify(
							props.cost,
						)}</font> + <font color="rgb(255,0,0)">INVENTORY</font> + <font color="rgb(255,0,0)">ALL HOUSES</font> + <font color="rgb(255,0,0)">VILLAGE</font>`}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.479, 0.876)}
						Size={UDim2.fromScale(0.825, 0.0784)}
					>
						<uistroke key={"uIStroke5"} Thickness={3} />

						<uitextsizeconstraint key={"uITextSizeConstraint5"} MaxTextSize={39} />
					</textlabel>
				</React.Fragment>
			)}

			<InteractiveButton
				key={"cancel"}
				Image={"rbxassetid://122765808708569"}
				Position={UDim2.fromScale(0.676, 0.638)}
				Size={UDim2.fromScale(0.349, 0.212)}
				onClick={() => dispatch.setWindowState(Window.rebirth, false)}
			/>
		</imagelabel>
	);
}
