import { useEffect, useState } from "@rbxts/react";
import { CollectionService, Players } from "@rbxts/services";
import { getPlayerPlotFolder } from "shared/utils/generictils";
import { getCrateConfig } from "shared/utils/loot";
import { CrateTimer } from "./timer";
import React from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";

const player = Players.LocalPlayer;
const config = getCrateConfig();

export function TimeManager() {
	const [crates, setCrates] = useState<Model[]>([]);

	useEffect(() => {
		const plot = getPlayerPlotFolder(player) as Folder;

		if (!plot) {
			warn("Couldn't find player's plot folder");
			return;
		}

		const updateCrates = () => {
			const crates = plot.GetDescendants().filter((val) => val.HasTag("Crate") && val.IsA("Model")) as Model[];
			setCrates(crates);
		};

		plot.DescendantAdded.Connect((item) => {
			if (!item.HasTag("Crate") || !item.IsA("Model")) {
				return;
			}

			updateCrates();
		});

		plot.DescendantRemoving.Connect((item) => {
			if (!item.HasTag("Crate") || !item.IsA("Model")) {
				return;
			}

			updateCrates();
		});

		updateCrates();
	}, []);

	return (
		crates.size() > 0 &&
		crates.map((crate: Model) => {
			const placed = crate.GetAttribute("placed") as number;
			const crateid = crate.GetAttribute("crateid") as string;
			const crateDelay = config[crateid].timeInSeconds;

			return createPortal(
				<CrateTimer crateModel={crate} crateid={crate.Name} crateTimer={crateDelay} placedTick={placed} />,
				crate,
			);
		})
	);
}
