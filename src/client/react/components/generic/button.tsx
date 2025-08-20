import React from "@rbxts/react";

export interface ButtonProps extends React.PropsWithChildren {
	Image: string;
	Position: UDim2;
	Size: UDim2;
	imageColor?: Color3;
	onClick: () => void;
}

export function Button(props: ButtonProps) {
	return (
		<imagebutton
			Image={props.Image}
			Position={props.Position}
			Size={props.Size}
			Event={{
				MouseButton1Up: () => props.onClick(),
			}}
			ScaleType={Enum.ScaleType.Fit}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			ImageColor3={props.imageColor}
			AutoButtonColor={false}
		>
			{props.children}
		</imagebutton>
	);
}
