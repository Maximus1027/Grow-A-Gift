import React from "@rbxts/react";
import { WindowWrapper } from "../windows/windowwrapper";
import { Window } from "client/react/store/producer/windowproducer";

export function Messages() {
	return (
		<screengui key={"mESSAGESDEV"} DisplayOrder={-1} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
			<WindowWrapper window={Window.hud}>
				<frame
					key={"msgs"}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.303, 0.106)}
					Size={UDim2.fromScale(0.394, 0.156)}
				>
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={4.47} />

					<textlabel
						key={"inv"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={"You have received 1x Igloo"}
						TextColor3={Color3.fromRGB(34, 255, 0)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Size={UDim2.fromScale(1, 0.26)}
					>
						<uistroke key={"uIStroke"} Thickness={3} />
					</textlabel>

					<textlabel
						key={"boost"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={"You have received 3x NPC Speed for 4 minutes"}
						TextColor3={Color3.fromRGB(255, 255, 12)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0, 0.254)}
						Size={UDim2.fromScale(1, 0.26)}
					>
						<uistroke key={"uIStroke1"} Thickness={3} />
					</textlabel>

					<textlabel
						key={"stat"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={"You have received 3 Spins"}
						TextColor3={Color3.fromRGB(0, 255, 247)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0, 0.509)}
						Size={UDim2.fromScale(1, 0.26)}
					>
						<uistroke key={"uIStroke2"} Thickness={3} />
					</textlabel>

					<textlabel
						key={"stat1"}
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text={"Thank you for your purchase!"}
						TextColor3={Color3.fromRGB(255, 2, 230)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						BackgroundColor3={Color3.fromRGB(255, 255, 255)}
						BackgroundTransparency={1}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0, 0.74)}
						Size={UDim2.fromScale(1, 0.26)}
					>
						<uistroke key={"uIStroke3"} Thickness={3} />
					</textlabel>
				</frame>
			</WindowWrapper>
		</screengui>
	);
}
