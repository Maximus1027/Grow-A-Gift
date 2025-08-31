import { useEffect, useState } from "@rbxts/react";
import { PFP } from "./pfp";
import { Players } from "@rbxts/services";
import React from "@rbxts/react";
import { useAsyncEffect } from "@rbxts/pretty-react-hooks";
import { getPlayerPlotFolder } from "shared/utils/generictils";
import { t } from "@rbxts/t";

type profile = {
	player: Player;
	thumbnail: string;
	part: Instance;
};

export function PlotIcons() {
	const [profiles, setProfiles] = useState<profile[]>([]);

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
		setProfiles([
			...profiles,
			{
				player: player,
				thumbnail: thumbnail,
				part: plot,
			},
		]);
	};

	useAsyncEffect(async () => {
		const join = Players.PlayerAdded.Connect((player) => {
			addPlayer(player);
		});
		const leave = Players.PlayerRemoving.Connect((player) => {
			addPlayer(player);
		});
		Players.GetPlayers().forEach((player) => addPlayer(player));

		return () => {
			join.Disconnect();
			leave.Disconnect();
		};
	}, []);

	return profiles.map((p) => <PFP imageLabel={p.thumbnail} part={p.part} />);
}
