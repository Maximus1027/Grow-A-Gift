import React, { useMemo } from "@rbxts/react";
import { InteractiveButton } from "../misc/interactivebutton";
import { WindowWrapper } from "../windows/windowwrapper";
import { Window } from "client/react/store/producer/windowproducer";
import { Reward } from "shared/types/config";
import { formatMinutesToDisplay } from "shared/utils/generictils";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { RootState, RootStore } from "client/react/store/store";

export function RewardPopup() {
	const reward = useSelector((state: RootState) => state.rewards.popupReward);

	const text = useMemo(() => {
		if (!reward) {
			return "";
		}

		const displayName = reward.displayName.format(reward.amount);

		if (reward.rewardType === "boost") {
			return `${displayName} for ${
				reward.timed !== undefined ? formatMinutesToDisplay(reward.timed / 60) : "inf"
			}`;
		}

		return displayName;
	}, [reward]);

	const dispatch = useProducer<RootStore>();

	return (
		<screengui
			key={"rEWARDPOPUPDEV"}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ResetOnSpawn={false}
		>
			<WindowWrapper window={Window.rewardpopup}>
				<imagelabel
					key={"main"}
					Image={"rbxassetid://72212577622637"}
					ScaleType={Enum.ScaleType.Fit}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromScale(0.343, 0.485)}
				>
					<InteractiveButton
						key={"ok"}
						Image={"rbxassetid://80436193791509"}
						onClick={() => {
							dispatch.setFocusedWindow(undefined);
							dispatch.popup(undefined);
						}}
						Position={UDim2.fromScale(0.5, 0.95)}
						Size={UDim2.fromScale(0.422, 0.191)}
					>
						<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={2.78} />
					</InteractiveButton>

					<textlabel
						key={"label"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						RichText={true}
						Text={text}
						TextColor3={Color3.fromRGB(230, 255, 0)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.5, 0.78)}
						Size={UDim2.fromScale(0.797, 0.106)}
					>
						<uistroke key={"uIStroke"} Thickness={3} />
					</textlabel>

					<imagelabel
						key={"rewardimg"}
						Image={"rbxassetid://109406931713617"}
						ScaleType={Enum.ScaleType.Fit}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.366, 0.273)}
						Size={UDim2.fromScale(0.267, 0.318)}
					>
						<uiaspectratioconstraint key={"uIAspectRatioConstraint1"} AspectRatio={1.06} />
					</imagelabel>

					<uiaspectratioconstraint key={"uIAspectRatioConstraint2"} AspectRatio={1.26} />
				</imagelabel>
			</WindowWrapper>
		</screengui>
	);
}
