import { ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";

const assets = ServerStorage.WaitForChild("assets") as Folder;
const plotSquare = assets.WaitForChild("plot") as Model;
export class Plot {
	constructor(readonly player: Player) {
		this.plot = this.createPlot();
	}
	private plot: Folder | undefined = undefined;
	private minerMap = new Map<string, Model>();

	public getPlotFolder() {
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

		return plotFolder;
	}

	private placeVoidMiner(player: Player, pos: Vector3) {}
}
