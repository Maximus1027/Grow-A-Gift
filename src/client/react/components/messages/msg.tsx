import React from "@rbxts/react";

export interface MsgProps {
	text: string;
	color: Color3;
}

export function Msg(props: MsgProps) {
	return (
		<textlabel
			key={"msg"}
			FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
			Text={props.text}
			TextColor3={props.color}
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
	);
}
