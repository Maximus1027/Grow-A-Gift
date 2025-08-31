import React from "@rbxts/react";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { SocialService, Players } from "@rbxts/services";
import { RootState, RootStore } from "client/react/store/store";
import { ExitButton } from "../inventory/exit";
import { Window } from "client/react/store/producer/windowproducer";
import { WindowWrapper } from "../windows/windowwrapper";
import { InteractiveButton } from "../misc/interactivebutton";

const player = Players.LocalPlayer;

export function InviteFriends() {
	const dispatch = useProducer<RootStore>();

	return (
		<screengui key={"iNVITEDEV"} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
			<WindowWrapper window={Window.invite}>
				<imagelabel
					key={"main"}
					Image={"rbxassetid://105110659671753"}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.503, 0.499)}
					Size={UDim2.fromScale(0.403, 0.506)}
				>
					<InteractiveButton
						key={"invite"}
						Image={"rbxassetid://99234119678718"}
						Position={UDim2.fromScale(0.5, 0.689)}
						Size={UDim2.fromScale(0.343, 0.184)}
						onClick={() => {
							SocialService.CanSendGameInviteAsync(player) && SocialService.PromptGameInvite(player);
						}}
					/>

					<ExitButton
						Position={UDim2.fromScale(0.951, 0.152)}
						Size={UDim2.fromScale(0.152, 0.215)}
						onClick={() => dispatch.setWindowState(Window.invite, false)}
					/>

					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={1.41} />
				</imagelabel>
			</WindowWrapper>
		</screengui>
	);
}
