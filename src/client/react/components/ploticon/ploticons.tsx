import { useEffect, useState } from "@rbxts/react";
import { PFP } from "./pfp";
import { Players, Workspace } from "@rbxts/services";
import React from "@rbxts/react";
import { useAsyncEffect } from "@rbxts/pretty-react-hooks";
import { getPlayerPlotFolder } from "shared/utils/generictils";
import { t } from "@rbxts/t";
import { Janitor } from "@rbxts/janitor";

type profile = {
	player: Player;
	thumbnail: string;
	part: Instance;
};

export function PlotIcons() {
	const [profiles, setProfiles] = useState<profile[]>([]);
	const janitor = new Janitor();

	const addPlayer = (player: Player) => {
		const [thumbnail, ready] = Players.GetUserThumbnailAsync(
			player.UserId,
			Enum.ThumbnailType.AvatarBust,
			Enum.ThumbnailSize.Size420x420,
		);
		const plot = getPlayerPlotFolder(player);

		if (!t.Instance(plot) || !ready) {
			return;
		}
		setProfiles((state) => [
			...state,
			{
				player: player,
				thumbnail: thumbnail,
				part: plot,
			},
		]);
	};

	useEffect(() => {
		const trackChanges = (plot: Instance) => {
			janitor.Add(
				plot.GetAttributeChangedSignal("player").Connect((attribute) => {
					if (t.string(plot.GetAttribute("player"))) {
						const foundPlayer = Players.GetPlayers().find((p) => p.Name === plot.GetAttribute("player"));

						if (foundPlayer) addPlayer(foundPlayer);
					} else {
						setProfiles((old) => old.filter((p) => p.part !== plot));
					}
				}),
			);
		};

		Workspace.WaitForChild("Plots")
			.GetChildren()
			.forEach((plot) => trackChanges(plot));
		Players.GetPlayers().forEach((player) => addPlayer(player));

		return () => {
			janitor.Cleanup();
		};
	}, []);

	return profiles.map((p) => <PFP imageLabel={p.thumbnail} part={p.part} />);
}
