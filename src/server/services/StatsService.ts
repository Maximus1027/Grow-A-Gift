import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";

@Service({})
export class StatsService implements OnStart {
	onStart() {
		Players.PlayerAdded.Connect((player) => this.setupPlayer(player));
		Players.GetPlayers().forEach((player) => this.setupPlayer(player));
	}

	private setupPlayer(player: Player) {
		const statsFolder = new Instance("Folder");
		statsFolder.Name = "stats";
		statsFolder.Parent = player;

		const money = new Instance("NumberValue");
		money.Name = "Money";
		money.Parent = statsFolder;
	}
}
