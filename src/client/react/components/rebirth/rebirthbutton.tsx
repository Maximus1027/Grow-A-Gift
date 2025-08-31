import React, { useEffect, useState } from "react";
import { Button } from "../misc/button";
import { useMotion } from "@rbxts/pretty-react-hooks";
import { RunService } from "@rbxts/services";
import { InteractiveButton } from "../misc/interactivebutton";

export function RebirthButton({ onClick }: { onClick: () => void }) {
	const [imageColor, setColor] = useState<[number, number, number]>([1, 1, 1]);
	useEffect(() => {
		const c = RunService.Heartbeat.Connect(() => {
			const hue = (tick() % 15) / 15;
			setColor([hue, 1, 1]);
		});

		return () => {
			c.Disconnect();
		};
	}, []);

	return (
		<InteractiveButton
			onClick={onClick}
			Image="rbxassetid://89317764495043"
			Position={UDim2.fromScale(0.294, 0.638)}
			Size={UDim2.fromScale(0.349, 0.212)}
			imageColor={Color3.fromHSV(imageColor[0], imageColor[1], imageColor[2])}
		/>
	);
}
