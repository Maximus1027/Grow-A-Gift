import React from "@rbxts/react";
import { Sunray } from "../crates/roll/sunray";

export interface SpinRewardProps {
	id: number;
	title: string;
	special: boolean;
	image?: string;
}

// function getCircularPosition(id: number, total: number, centerX: number, centerY: number, radius: number) {
// 	const angle = (2 * math.pi * (id + 1)) / total - math.pi; // Start at the top
// 	const x = centerX + radius * math.cos(angle);
// 	const y = centerY + radius * math.sin(angle);
// 	return new UDim2(x, 0, y, 0);
// }

/**
 * Returns a UDim2 position for an item placed in a circle.
 * @param id Index of the item (0-based)
 * @param total Total number of items
 * @param centerX Center X (0-1)
 * @param centerY Center Y (0-1)
 * @param radius Distance from center (0-1)
 */
function getCircularPosition(id: number, total: number, centerX: number, centerY: number, radius: number) {
	const angle = (2 * math.pi * id) / total - math.pi / 2; // Start at the top
	const x = centerX + radius * math.cos(angle);
	const y = centerY + radius * math.sin(angle);
	return new UDim2(x, 0, y, 0);
}
export function Reward(props: SpinRewardProps) {
	// 45 degrees per slice for 8 rewards (360/8)
	const rotation = props.id * 45; //(((2 * math.pi * props.id) / 8 - math.pi / 2) * 180)) / math.pi;

	return (
		<frame
			key={props.id}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={getCircularPosition(props.id, 8, 0.5, 0.5, 0.32)}
			Size={UDim2.fromScale(0.214, 0.154)}
			ZIndex={4}
			Rotation={rotation}
			BackgroundTransparency={1}
		>
			<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={1.39} />
			<textlabel
				key={"display"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={props.title}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.491, 0.281)}
				Size={UDim2.fromScale(0.983, 0.354)}
				ZIndex={6}
			>
				<uistroke key={"uIStroke"} Thickness={3} />

				<imagelabel
					key={"image"}
					Image={props.image}
					ScaleType={Enum.ScaleType.Fit}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={1}
					BorderColor3={Color3.fromRGB(0, 0, 0)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.503, 2.27)}
					Size={UDim2.fromScale(1.26, 3.16)}
					ZIndex={5}
				>
					{props.special && (
						<Sunray
							ZIndex={4}
							speed={7}
							Position={UDim2.fromScale(0.5, 0.5)}
							Size={UDim2.fromScale(2, 2)}
							looped={true}
						/>
					)}
					<uiaspectratioconstraint key={"uIAspectRatioConstraint"} AspectRatio={1.5} />
				</imagelabel>
			</textlabel>
		</frame>
	);
}
