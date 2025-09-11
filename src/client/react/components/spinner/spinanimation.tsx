import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";

import { Reward } from "./reward";
import { getSpinConfig } from "shared/utils/loot";
import Object from "@rbxts/object-utils";
import { useSelector } from "@rbxts/react-reflex";
import { RootState } from "client/react/store/store";

export interface SpinProps {
	onAnimationComplete: () => void;
}

const rewards = getSpinConfig();
const rewardsMap = Object.entries(rewards);

const rewardsSorted = rewardsMap.sort((a, b) => (tonumber(a[0]) as number) < (tonumber(b[0]) as number));

const rewardsLabels = rewardsSorted.map(([reward, data]) => (
	<Reward
		special={data.special ?? false}
		id={tonumber(reward) as number}
		title={data.displayName.format(data.amount)}
		image={data!.image}
	/>
));

export function SpinAnimation(props: SpinProps) {
	const spins = 5;
	const [rot, setRot] = useMotion(0);
	const reward = useSelector((state: RootState) => state.spin.chosenReward);

	const idleSpin = () => {
		setRot.immediate(0);
		setRot.linear(360, {
			speed: 15,
		});
	};

	useEffect(() => {
		if (reward === undefined) {
			setRot.onComplete(() => reward === undefined && idleSpin());
			idleSpin();
			return;
		}

		//const index = rewardsSorted.findIndex(([id]) => id === reward);
		const index = tonumber(reward as string) as number;

		const rotAngle = 360 / rewardsMap.size();
		const randomOffset = math.random(-18, 18);

		setRot.stop();
		setRot.immediate(0);
		setRot.tween(360 * spins - rotAngle * index + randomOffset, {
			style: Enum.EasingStyle.Exponential,
			direction: Enum.EasingDirection.Out,
			time: 6.5,
		});
		setRot.onComplete(() => {
			props.onAnimationComplete();
		});
	}, [reward]);

	return (
		<imagelabel
			key={"spinner"}
			Image={"rbxassetid://82827593712059"}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderColor3={Color3.fromRGB(0, 0, 0)}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.502, 0.498)}
			Size={UDim2.fromScale(0.783, 0.78)}
			ZIndex={2}
			Rotation={rot.map((rot) => rot)}
		>
			{rewardsLabels}
			<uiaspectratioconstraint />
		</imagelabel>
	);
}
