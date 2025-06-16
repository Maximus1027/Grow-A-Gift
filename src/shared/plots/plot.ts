import Object from "@rbxts/object-utils";
import { HttpService, ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";
import * as minersConfig from "shared/config/miners.json";
import { doesMinerExist, isModelIntersecting } from "shared/utils/generictils";

const serverAssets = ServerStorage.WaitForChild("assets") as Folder;
const sharedAssets = ReplicatedStorage.WaitForChild("assets") as Folder;
const minersFolder = sharedAssets.WaitForChild("miners") as Folder & Model[];
const plotSquare = serverAssets.WaitForChild("plot") as Model;
export class Plot {
	constructor(readonly player: Player) {
		this.plot = this.createPlot();
	}
	private plot: PlotFolder;
	private plotBaseplate?: BasePart;
	private grid = new Map<string, Vector3>();

	public getPlotFolder(): PlotFolder {
		return this.plot;
	}

	public getMinersFolder(): Partial<PlotFolder>["miners"] {
		const mineFolder = this.getPlotFolder().FindFirstChild("miners") as Partial<PlotFolder>["miners"];

		return mineFolder;
	}

	private createPlot() {
		const plotFolder = new Instance("Folder");
		plotFolder.Name = `${this.player.Name}`;

		plotFolder.Parent = Workspace.WaitForChild("Plots");

		const plotBaseplate = plotSquare.Clone();
		plotBaseplate.PivotTo(new CFrame(0, 0, 0));
		plotBaseplate.PrimaryPart!.Size = new Vector3(125, 1, 125);
		plotBaseplate.Parent = plotFolder;

		this.plotBaseplate = plotBaseplate.PrimaryPart;

		const minersFolder = new Instance("Folder");
		minersFolder.Name = "miners";
		minersFolder.Parent = plotFolder;

		return plotFolder as PlotFolder;
	}

	/**
	 * Place void miner and define it's position by model's center
	 * @param pos
	 */
	private placeVoidMiner(minerId: string, pos: Vector3) {
		print(minerId, pos);
		if (!doesMinerExist(minerId) || !this.plotBaseplate) {
			return;
		}

		//create new miner
		const newMiner = minersFolder.FindFirstChild(minerId)?.Clone() as Model;
		newMiner!.Name = newMiner?.Name + HttpService.GenerateGUID(false);
		newMiner!.PivotTo(new CFrame(pos));
		newMiner!.Parent = this.getMinersFolder();

		print(newMiner.GetPivot());

		//Ensure nothing exists in its spot
		if (isModelIntersecting(newMiner)) {
			newMiner.Destroy();
			return;
		}

		//place on grid
		this.grid.set(newMiner?.Name, pos.sub(newMiner.GetPivot().Position));
	}

	/**
	 * Handles actions & args sent from client and calls the respective method
	 * @param action
	 * @param args
	 */
	public dispatch(action: string, args: unknown[]) {
		switch (action) {
			case "place":
				//ensure there are two args and follow the correct types
				if (!args || !(args.size() > 1) || !t.string(args[0]) || !t.Vector3(args[1])) {
					return;
				}

				this.placeVoidMiner(args[0], args[1]);
		}
	}
}

type PlotFolder = Folder & {
	plot: Model;
	miners: Folder & Model[];
};
