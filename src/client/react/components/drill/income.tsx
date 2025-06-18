import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useEffect } from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { Ore } from "shared/enums/Ore";
import { getOreValue } from "shared/utils/oresutils";

export interface IncomeProps {
	ore: Ore;
	parent: Instance;
}

export function Income(props: IncomeProps) {
	const [offset, setoffset] = useMotion(0);
	const [trans, setTrans] = useMotion(0);
	const random = math.random(-1, 1);
	const oreWorth = getOreValue(props.ore);

	useEffect(() => {
		setoffset.spring(2, {
			frequency: 0.5,
		});

		setTrans.linear(1);
	}, []);

	return createPortal(
		<billboardgui
			key={props.ore + "-money"}
			Active={true}
			ClipsDescendants={true}
			ExtentsOffset={offset.map((y) => new Vector3((y / 10) * random, y + 2, 0))}
			Size={UDim2.fromScale(3, 1.5)}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			<textlabel
				key={"money"}
				FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
				Text={`${props.ore}  $${oreWorth}`}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				BackgroundTransparency={1}
				TextTransparency={trans}
				BorderColor3={Color3.fromRGB(0, 0, 0)}
				BorderSizePixel={0}
				Size={UDim2.fromScale(1, 1)}
				// Rotation={offset.map((val) => val * random)}
			>
				<uistroke Transparency={trans} key={"uIStroke"} Color={Color3.fromRGB(0, 170, 0)} Thickness={3} />
			</textlabel>
		</billboardgui>,
		props.parent,
	);
}
