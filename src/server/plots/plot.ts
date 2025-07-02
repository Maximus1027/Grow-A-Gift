import { Dependency } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { HttpService, ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";
import { DataService } from "server/services/DataService";
import * as HousesConfig from "shared/config/house.json";
import { doesHouseExist, isModelIntersecting } from "shared/utils/generictils";
import { getHouseCost } from "shared/utils/houseutils";
import { doesPlayerOwnHouse, getPlayerHouseObject } from "shared/utils/playertils";

const serverAssets = ServerStorage.WaitForChild("assets") as Folder;
const sharedAssets = ReplicatedStorage.WaitForChild("assets") as Folder;
const houseFolder = sharedAssets.WaitForChild("houses") as Folder & Model[];
const plotSquare = serverAssets.WaitForChild("plot") as Model;
export class Plot {
	constructor(readonly player: Player) {
		this.plot = this.createPlot();
	}
	private dataService = Dependency<DataService>();

	private plot: PlotFolder;
	private plotBaseplate?: BasePart;
	private grid = new Map<string, Vector3>();

	public getPlotFolder(): PlotFolder {
		return this.plot;
	}

	public getHouseFolder(): Partial<PlotFolder>["houses"] {
		const houseFolder = this.getPlotFolder().FindFirstChild("houses") as Partial<PlotFolder>["houses"];

		return houseFolder;
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

		const houseFolder = new Instance("Folder");
		houseFolder.Name = "houses";
		houseFolder.Parent = plotFolder;

		const npcFolder = new Instance("Folder");
		npcFolder.Name = "NPC";
		npcFolder.Parent = plotFolder;

		return plotFolder as PlotFolder;
	}

	/**
	 * Place void miner and define it's position by model's center
	 * @param pos
	 */
	private placeHouse(houseId: string, pos: Vector3) {
		if (!doesHouseExist(houseId) || !this.plotBaseplate || !doesPlayerOwnHouse(this.player, houseId)) {
			return;
		}

		//create new House
		const newHouse = houseFolder.FindFirstChild(houseId)?.Clone() as Model;
		newHouse!.Name = newHouse?.Name + "-" + HttpService.GenerateGUID(false);
		newHouse!.PivotTo(new CFrame(pos));

		//	newHouse.AddTag("Drill");
		newHouse.SetAttribute("owner", this.player.Name);

		//add selection selection box
		const selectionBox = new Instance("SelectionBox");
		selectionBox.Name = "select";
		selectionBox.Visible = false;
		selectionBox.Adornee = newHouse;
		selectionBox.Transparency = 0;
		selectionBox.LineThickness = 0.15;
		selectionBox.Color3 = Color3.fromRGB(255, 255, 255);
		selectionBox.Parent = newHouse;

		newHouse!.Parent = this.getHouseFolder();

		print(newHouse.GetPivot());

		//Ensure nothing exists in its spot
		if (isModelIntersecting(newHouse)) {
			print("??");
			newHouse.Destroy();
			return;
		}

		//place on grid
		this.grid.set(newHouse?.Name, pos.sub(newHouse.GetPivot().Position));

		//remove from inventory
		const houseObject = getPlayerHouseObject(this.player, houseId);

		if (t.instanceIsA("NumberValue")(houseObject)) {
			houseObject.Value -= 1;
			if (houseObject.Value <= 0) {
				houseObject.Destroy();
			}
		}
	}

	/**
	 * Pickup house from plot and add back to inventory
	 * @param houseid
	 * @returns
	 */
	private pickupHouse(houseid: string) {
		const success = this.removeHouse(houseid);
		if (success) {
			const parsedHouseId = houseid.split("-")[0];
			this.dataService.addHouseToInventory(this.player, parsedHouseId, 1);
		}
	}

	/**
	 * Sell house for money!
	 * @param houseid
	 */
	private sellHouse(houseid: string) {
		const success = this.removeHouse(houseid);
		if (success) {
			const parsedHouseId = houseid.split("-")[0];
			const worth = getHouseCost(parsedHouseId);
			if (t.number(worth)) {
				this.dataService.getMoneyStat(this.player).Value += worth;
			}
		}
	}

	/**
	 * Remove house from grid and physical object
	 * @param houseid R
	 * @returns if house was found and deleted successfully
	 */
	private removeHouse(houseid: string): boolean {
		const foundHouse = this.grid.get(houseid);
		const foundmodel = this.getHouseFolder()?.FindFirstChild(houseid);

		if (!foundHouse || !foundmodel) {
			warn(`Could not find ${houseid} for ${this.player}`);
			return false;
		}

		this.grid.delete(houseid);

		foundmodel.Destroy();

		return true;
	}

	/**
	 * Handles actions & args sent from client and calls the respective method
	 * @param action
	 * @param args
	 */
	public dispatch(action: string, args: unknown[]) {
		print(action, args);

		if (!args || !(args.size() > 0)) {
			return;
		}

		switch (action) {
			case "place":
				//ensure there are two args and follow the correct types
				if (!(args.size() > 1) || !t.string(args[0]) || !t.Vector3(args[1])) {
					return;
				}

				this.placeHouse(args[0], args[1]);
				break;

			case "pickup": {
				if (!t.string(args[0])) {
					return;
				}

				const houseid = args[0];
				this.pickupHouse(houseid);
				break;
			}
			case "sell": {
				if (!t.string(args[0])) {
					return;
				}

				const houseid = args[0];
				this.sellHouse(houseid);
			}
		}
	}
}

type PlotFolder = Folder & {
	plot: Model;
	houses: Folder & Model[];
};
