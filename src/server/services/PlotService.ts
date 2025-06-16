import { Service, OnStart, OnInit } from "@flamework/core";
import { act } from "@rbxts/react-roblox";
import { Players, Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Events } from "server/network";
import { Plot } from "shared/plots/plot";

@Service({})
export class PlotService implements OnStart, OnInit {
	private plotMap = new Map<Player, Plot>();

	onInit() {
		const PlotsFolder = new Instance("Folder");
		PlotsFolder.Name = "Plots";
		PlotsFolder.Parent = Workspace;
	}

	onStart() {
		Players.PlayerAdded.Connect((player: Player) => {
			const plot = this.setupPlayer(player);

			const spawnPlot = this.plotMap
				.get(player)
				?.getPlotFolder()!
				.FindFirstChild("plot")
				?.FindFirstChild("baseplate") as BasePart;

			player.CharacterAdded.Connect((character) => {
				const spawnPosition = spawnPlot.Position.add(
					new Vector3(0, character.GetExtentsSize().Y, spawnPlot.Size.Z / 2 - 10),
				);
				character.MoveTo(spawnPosition);
			});
		});

		Events.onPlotAction.connect((player: Player, action: unknown, ...args: unknown[]) => {
			print("test");
			if (!t.string(action)) {
				return;
			}

			const plot = this.plotMap.get(player);

			if (!plot) {
				return;
			}

			print("a");

			//Shift computation from service to plot object
			plot.dispatch(action, args as unknown[]);
		});
	}

	private setupPlayer(player: Player) {
		const plot = new Plot(player);

		this.plotMap.set(player, plot);

		return plot;
	}

	private placeVoidMiner(player: Player, pos: Vector3) {
		const plot = this.plotMap.get(player);
	}
}
