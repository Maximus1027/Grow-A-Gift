import Object from "@rbxts/object-utils";
import { ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";

const assets = ServerStorage.WaitForChild("assets") as Folder;
const minersFolder = assets.WaitForChild("miners") as Folder & Model[];
const plotSquare = assets.WaitForChild("plot") as Model;
export class Plot {
	constructor(readonly player: Player) {
		this.plot = this.createPlot();
	}
	private plot: PlotFolder;
	private grid = new Map<string, Vector3>();

	public getPlotFolder(): PlotFolder {
		return this.plot;
	}

	private createPlot() {
		const plotFolder = new Instance("Folder");
		plotFolder.Name = `${this.player.Name}`;

		plotFolder.Parent = Workspace.WaitForChild("Plots");

		const plotBaseplate = plotSquare.Clone();
		plotBaseplate.PivotTo(new CFrame(0, 0, 0));
		plotBaseplate.PrimaryPart!.Size = new Vector3(125, 1, 125);
		plotBaseplate.Parent = plotFolder;

		const minersFolder = new Instance("Folder");

		return plotFolder as PlotFolder;
	}

	/**
	 * Place void miner and define it's position by model's center
	 * @param pos
	 */
	private placeVoidMiner(pos: Vector3) {
		const newMiner = minersFolder;

		//Ensure no miner exists at spot
	}

	/**
	 * Handles actions & args sent from client and calls the respective method
	 * @param action
	 * @param args
	 */
	public dispatch(action: string, args: unknown[]) {
		switch (action) {
			case "place":
				if (!args || !(args.size() > 0) || !t.Vector3(args[0])) {
					return;
				}

				this.placeVoidMiner(args[0]);
		}
	}
}

type PlotFolder = Folder & {
	plot: Model;
	miners: Folder & Model[];
};
