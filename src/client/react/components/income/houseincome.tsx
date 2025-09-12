import React, { useEffect, useState } from "@rbxts/react";
import { CollectionService, Players, Workspace } from "@rbxts/services";
import { getPlayerPlotFolder } from "shared/utils/generictils";
import { AverageIncome, AverageIncomeProps } from "./avgincome";
import Object from "@rbxts/object-utils";

const player = Players.LocalPlayer;

export function HouseIncomeManager() {
	const [houses, setHouses] = useState<React.Element[]>([]);
	let homes: React.Element[] = [];

	useEffect(() => {
		const plot = Workspace.WaitForChild("Plots");

		if (!plot) {
			warn("Couldn't find player's plot folder");
			return;
		}

		const added = plot.DescendantAdded.Connect((item) => {
			if (!item.HasTag("House") || !item.IsA("Model")) {
				return;
			}

			homes = [...homes, <AverageIncome houseModel={item} />];
			setHouses(homes);
		});

		const removed = plot.DescendantRemoving.Connect((item) => {
			if (!item.HasTag("House") || !item.IsA("Model")) {
				return;
			}

			homes = homes.filter((house) => (house.props as AverageIncomeProps).houseModel !== item);
			setHouses(homes);
		});

		const loadedHouses = CollectionService.GetTagged("House").map((house) => (
			<AverageIncome houseModel={house as Model} />
		));

		homes = loadedHouses;
		setHouses(homes);

		return () => {
			added.Disconnect();
			removed.Disconnect();
		};
	}, []);

	return [...houses];
}
