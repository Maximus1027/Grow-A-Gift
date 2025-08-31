import React, { useEffect, useState } from "@rbxts/react";
import { RewardSlot } from "./rewardslot";
import { tick } from "shared/utils/generictils";
import Object from "@rbxts/object-utils";
import { getRewardsConfig } from "shared/utils/configtils";
import { useTimer } from "@rbxts/pretty-react-hooks";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RootState, RootStore } from "client/react/store/store";
import { StoreState } from "client/react/store/producer/storeproducer";
import { Events } from "client/network";
import { WindowWrapper } from "../windows/windowwrapper";
import { Window } from "client/react/store/producer/windowproducer";

export function Rewards() {
	const rewards = Object.entries(getRewardsConfig());
	const rewardsState = useSelector((state: RootState) => state.rewards);
	const dispatch = useProducer<RootStore>();

	const window = useSelector((state: RootState) => state.windowManager.windows.rewards);

	return (
		<screengui
			key={"REWARDS-PROD"}
			ResetOnSpawn={false}
			IgnoreGuiInset={true}
			ZIndexBehavior={Enum.ZIndexBehavior.Global}
			Enabled={true}
		>
			<WindowWrapper window={Window.rewards} target={UDim2.fromScale(0.5, 1.5)}>
				<imagelabel
					key={"main"}
					Image={"rbxassetid://132799962764777"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.49, 0.48)}
					Size={UDim2.fromScale(0.434, 0.583)}
				>
					<frame
						key={"frame"}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.535, 0.629)}
						Size={UDim2.fromScale(0.822, 0.864)}
					>
						<uigridlayout
							key={"uIGridLayout"}
							CellPadding={UDim2.fromScale(0.01, 0.02)}
							CellSize={UDim2.fromScale(0.185, 0.269)}
							HorizontalAlignment={Enum.HorizontalAlignment.Left}
							SortOrder={Enum.SortOrder.LayoutOrder}
						/>

						{rewards.map(([id, config]) => {
							const nid = tonumber(id) as number;

							const claimState =
								rewardsState.unlocked >= nid
									? rewardsState.claimed.includes(nid)
										? "claimed"
										: "claim"
									: rewardsState.claimed.includes(nid)
									? "claimed"
									: "countdown";

							return (
								<RewardSlot
									id={nid}
									timeInSeconds={rewardsState.startTick + config.timeInMinutes}
									key={id}
									claimState={claimState}
									// countdown={true || rewardsState.highestUnlock + 1 === nid}
									mega={tonumber(id) === rewards.size()}
									onClick={() => {
										print(claimState);
										claimState === "claim" && Events.onRewardClaim.fire(nid);
									}}
								/>
							);
						})}
					</frame>

					<uiaspectratioconstraint key={"uIAspectRatioConstraint2"} AspectRatio={1.32} />

					<imagebutton
						key={"unlockall"}
						Image={"rbxassetid://99377596623530"}
						ScaleType={Enum.ScaleType.Fit}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.735, 1.08)}
						Size={UDim2.fromScale(0.411, 0.141)}
					>
						<textlabel
							key={"textLabel"}
							FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
							Text={"7"}
							TextColor3={Color3.fromRGB(255, 183, 0)}
							TextScaled={true}
							TextSize={14}
							TextWrapped={true}
							BackgroundColor3={Color3.fromRGB(255, 255, 255)}
							BackgroundTransparency={1}
							BorderColor3={Color3.fromRGB(0, 0, 0)}
							BorderSizePixel={0}
							Position={UDim2.fromScale(0.79, 0.214)}
							Size={UDim2.fromOffset(49, 44)}
						>
							<uistroke key={"uIStroke3"} Thickness={3} />
						</textlabel>
					</imagebutton>
				</imagelabel>
			</WindowWrapper>
		</screengui>
	);
}
