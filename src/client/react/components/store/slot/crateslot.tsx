import React from "@rbxts/react";
import { BaseSlot, StoreSlotProps } from "./baseslot";
import Abbreviator from "@rbxts/abbreviate";
import { abbreviateNumber, formatMinutesToDisplay } from "shared/utils/generictils";

export interface CrateProps extends StoreSlotProps {
	openTime: number;
}

export function CrateSlot(props: CrateProps) {
	return (
		<BaseSlot itemid={props.itemid} actionType={"crate"} devProductId={"123"}>
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
				Position={UDim2.fromScale(0.749, 0.214)}
				Size={UDim2.fromScale(0.296, 0.334)}
			>
				<uistroke key={"uIStroke"} Thickness={3} />

				<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={3.04} />
			</textlabel>
			<textlabel
				key={"cost"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={`$${abbreviateNumber(props.cost)}`}
				TextColor3={Color3.fromRGB(99, 247, 138)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				TextXAlignment={Enum.TextXAlignment.Center}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.75, 0.418)}
				Size={UDim2.fromScale(0.248, 0.2)}
			>
				<uistroke key={"uIStroke"} Thickness={3} />

				<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={3.54} />

				<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={45} />
			</textlabel>
			<textlabel
				key={"opendisplay"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={"Open Time"}
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
				Position={UDim2.fromScale(0.397, 0.408)}
				Size={UDim2.fromScale(0.248, 0.218)}
			>
				<uistroke key={"uIStroke"} Thickness={3} />

				<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={3.54} />

				<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={45} />
			</textlabel>
			<textlabel
				key={"var_time"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={formatMinutesToDisplay(props.openTime)}
				TextColor3={Color3.fromRGB(243, 255, 6)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				TextXAlignment={Enum.TextXAlignment.Center}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.39, 0.61)}
				Size={UDim2.fromScale(0.163, 0.185)}
			>
				<uistroke key={"uIStroke"} Thickness={3} />

				<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={3.54} />

				<uitextsizeconstraint key={"uITextSizeConstraint"} MaxTextSize={45} />
			</textlabel>
		</BaseSlot>
	);
}
