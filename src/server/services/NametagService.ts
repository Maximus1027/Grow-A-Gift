import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { PlotFolder } from "shared/types/plot";
import { getPlayerPlotFolder } from "shared/utils/generictils";
import { PlotService } from "./PlotService";

@Service({})
export class NametagService implements OnStart {
	private plotFolders = new Map<Player, Instance>();

	constructor(readonly plotService: PlotService) {}

	onStart() {
		this.plotService.PlotLoaded.Connect((player) => {
			const folder = getPlayerPlotFolder(player);
			if (folder === undefined) return;
			this.plotFolders.set(player, folder);
		});

		Players.PlayerRemoving.Connect((player) => {
			this.plotFolders.delete(player);
		});

		for (const player of Players.GetPlayers()) {
			const folder = getPlayerPlotFolder(player);
			if (folder === undefined) continue;
			this.plotFolders.set(player, folder);
		}

		this.startPlayerLoop();
	}

	private startPlayerLoop() {
		task.spawn(() => {
			// eslint-disable-next-line no-constant-condition
			while (true) {
				for (const [player, folder] of this.plotFolders) {
					this.updatePlayerAttributes(player, folder as PlotFolder);
				}
				task.wait(1);
			}
		});
	}

	private updatePlayerAttributes(player: Player, folder: PlotFolder) {
		const houses = folder.houses.GetChildren();

		let totalIncome = 0;

		for (const house of houses) {
			const income = house.GetAttribute("avg") as number | undefined;

			totalIncome += income ?? 0;
		}

		player.SetAttribute("totalincome", totalIncome);
	}
}
