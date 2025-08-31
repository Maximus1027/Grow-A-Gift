import { useDeferState, useAsyncEffect } from "@rbxts/pretty-react-hooks";
import React from "@rbxts/react";
import { useMemo } from "@rbxts/react";
import { ContentProvider, Players } from "@rbxts/services";
import { t } from "@rbxts/t";

const player = Players.LocalPlayer;

export function AutoPreload() {
	const contentIds = useMemo(() => {
		const playerGui = player.FindFirstChild("PlayerGui") as PlayerGui;
		const images = playerGui.GetDescendants();
		const contentIDs: string[] = [];

		for (const content of images) {
			if (content.IsA("ImageButton") || content.IsA("ImageLabel")) {
				const imageID = content.Image;

				if (t.string(imageID) && contentIDs.indexOf(imageID) === -1) contentIDs.push(imageID);
			}
		}

		return contentIDs;
	}, []);

	const [currentAsset, setCurrentAsset] = useDeferState<string>();

	useAsyncEffect(async () => {
		ContentProvider.PreloadAsync(contentIds, (assetId) => {
			setCurrentAsset(assetId);
			print(assetId);
		});

		setCurrentAsset(undefined);
	}, []);

	// if (currentAsset === undefined) {
	// 	return <></>;
	// }

	return (
		currentAsset !== undefined && (
			<screengui>
				<textlabel
					Text={`Loading ${currentAsset}`}
					Size={UDim2.fromScale(0.2, 0.2)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
				>
					<imagelabel Image={currentAsset} Size={UDim2.fromOffset(1, 1)} />
					<uistroke
						Thickness={1}
						Color={Color3.fromRGB(0, 0, 0)}
						Transparency={0.5}
						ApplyStrokeMode="Contextual"
					/>
				</textlabel>
			</screengui>
		)
	);
}
