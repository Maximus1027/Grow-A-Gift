import React from "@rbxts/react";
import { useEffect, useState } from "@rbxts/react";
import { Players } from "@rbxts/services";
import { Nametag } from "./nametag";

export function TagManager() {
	const [players, setPlayers] = useState<Player[]>([]);

	useEffect(() => {
		const join = Players.PlayerAdded.Connect((player) => {
			setPlayers(Players.GetPlayers());
		});
		const dis = Players.PlayerRemoving.Connect((player) => {
			setPlayers(Players.GetPlayers());
		});

		setPlayers(Players.GetPlayers());

		return () => {
			join.Disconnect();
			dis.Disconnect();
		};
	}, []);

	return players.map((player) => <Nametag key={player.UserId} player={player} />);
}
