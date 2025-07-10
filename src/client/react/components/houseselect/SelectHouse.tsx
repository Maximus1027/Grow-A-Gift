import React, { useEffect, useState } from "@rbxts/react";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RootState, RootStore } from "client/react/store/store";
import { ExitButton } from "../inventory/exit";
import { useMotion } from "@rbxts/pretty-react-hooks";
import { Events } from "client/network";
import { SellButton } from "./sellbutton";
import { getHouseCost, getHouseDisplayName } from "shared/utils/houseutils";

export function HouseSelect() {
	const pickup = useSelector((state: RootState) => state.inventory.promptHouseid);
	const dispatch = useProducer<RootStore>();

	const [pos, setpos] = useMotion(1.5);
	const [visible, setvisible] = useState(false);
	const [title, setHouseTitle] = useState<string>("");

	useEffect(() => {
		if (!setpos.isComplete()) {
			return;
		}

		setvisible(true);

		const goal = pickup === undefined ? 1.5 : 0.5;
		setpos.spring(goal, {
			frequency: 0.3,
			damping: 0.8,
		});

		if (pickup === undefined) {
			task.delay(0.2, () => setvisible(false));
		} else {
			setHouseTitle(pickup.split("-")[0]);
		}
	}, [pickup]);

	return (
		visible &&
		title !== "" && (
			<screengui key={"HOUSESELECTION" + pickup} ResetOnSpawn={false} ZIndexBehavior={Enum.ZIndexBehavior.Global}>
				<imagelabel
					key={"mansion"}
					Image={"rbxassetid://106981462577987"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={pos.map((y) => UDim2.fromScale(0.5, y))}
					Size={UDim2.fromScale(0.326, 0.345)}
				>
					<ExitButton
						onClick={() => dispatch.promptHouse(undefined)}
						Position={UDim2.fromScale(0.938, 0.0583)}
						Size={UDim2.fromScale(0.187, 0.313)}
					/>

					<imagebutton
						key={"pickup"}
						Image={"rbxassetid://136601838790547"}
						ScaleType={Enum.ScaleType.Fit}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.29, 0.736)}
						Size={UDim2.fromScale(0.359, 0.225)}
						Event={{
							Activated: () => {
								Events.onPlotAction("pickup", pickup);
								dispatch.promptHouse(undefined);
							},
						}}
					>
						<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={2.68} />
					</imagebutton>

					{/* <imagebutton
						key={"sell"}
						Image={"rbxassetid://107865544701853"}
						ScaleType={Enum.ScaleType.Fit}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.711, 0.736)}
						Size={UDim2.fromScale(0.359, 0.225)}
						Event={{
							Activated: () => {
								Events.onPlotAction("sell", pickup);
								dispatch.promptHouse(undefined);
							},
						}}
					>
						<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={2.68} />
					</imagebutton> */}
					<SellButton
						sellValue={getHouseCost(title) ?? 0}
						onSell={() => {
							Events.onPlotAction("sell", pickup);
							dispatch.promptHouse(undefined);
						}}
					/>

					<uiaspectratioconstraint key={"uIAspectRatioConstraint2"} AspectRatio={1.68} />

					<textlabel
						key={"selectionid"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={getHouseDisplayName(title)}
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.5, 0.447)}
						Size={UDim2.fromScale(0.521, 0.218)}
					>
						<uistroke key={"uIStroke"} Thickness={3.5} />

						<uiaspectratioconstraint key={"uIAspectRatioConstraint3"} AspectRatio={4} />
					</textlabel>
				</imagelabel>
			</screengui>
		)
	);
}
