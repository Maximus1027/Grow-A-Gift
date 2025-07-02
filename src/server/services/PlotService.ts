import { Service, OnStart, OnInit } from "@flamework/core";
import { act } from "@rbxts/react-roblox";
import { Players, Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Events } from "server/network";
import { Plot } from "server/plots/plot";

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
				?.getPlotFolder()
				.GetDescendants()
				.find((child) => child.HasTag("Spawn"));

			if (!spawnPlot || !spawnPlot.IsA("BasePart")) {
				return;
			}

			player.CharacterAdded.Connect((character) => {
				character.PivotTo(spawnPlot.CFrame.add(new Vector3(0, character.GetExtentsSize().Y, 0)));

				character.GetDescendants().forEach((part) => {
					if (part.IsA("BasePart")) {
						part.CollisionGroup = "plr";
					}
				});
			});
		});

		Events.onPlotAction.connect((player: Player, action: unknown, ...args: unknown[]) => {
			if (!t.string(action)) {
				return;
			}

			const plot = this.plotMap.get(player);

			if (!plot) {
				return;
			}

			//Shift computation from service to plot object
			plot.dispatch(action, args as unknown[]);
		});
	}

	private setupPlayer(player: Player) {
		const plot = new Plot(player);

		this.plotMap.set(player, plot);

		return plot;
	}
}
