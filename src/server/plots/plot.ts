import { Dependency } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { Profile } from "@rbxts/profileservice/globals";
import { HttpService, ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";
import { DataService } from "server/services/DataService";
import { InventoryService } from "server/services/InventoryService";
import * as HousesConfig from "shared/config/house.json";
import { ProfileData } from "shared/types/profile";
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
	private inventoryService = Dependency<InventoryService>();
	private dataService = Dependency<DataService>();

	private plot: PlotFolder;
	private plotBaseplate?: BasePart;
	private grid = new Map<string, CFrame>();
	private housesFolder?: Folder;

	public getPlotFolder(): PlotFolder {
		return this.plot;
	}

	public getHouseFolder(): Partial<PlotFolder>["houses"] {
		const houseFolder = this.getPlotFolder().FindFirstChild("houses") as Partial<PlotFolder>["houses"];

		return houseFolder;
	}

	public loadData() {
		const profile = this.dataService.getProfile(this.player);

		if (!profile) {
			return;
		}
		const placement = profile.Data.plot.placed;
		Object.entries(placement).forEach((entry) => {
			const encoded = entry[1];

			print(encoded);

			//position and rotation
			const rotation = CFrame.Angles(encoded[3], encoded[4], encoded[5]);
			const cframe = new CFrame(encoded[0], encoded[1], encoded[2]).mul(rotation);

			print(this.plotBaseplate?.Position);

			const houseid = entry[0].split("-")[0];
			this.placeHouse(houseid, cframe.add(this.plotBaseplate!.Position), true);
		});
	}

	private createPlot() {
		const PlotsFolder = Workspace.WaitForChild("Plots") as Folder & Folder[];

		//get next available plot
		const plotFolder = PlotsFolder.GetChildren().find((folder) => folder.GetAttribute("player") === undefined);
		plotFolder?.SetAttribute("player", this.player.Name);

		// const plotFolder = new Instance("Folder");
		// plotFolder.Name = `${this.player.Name}`;

		// plotFolder.Parent = Workspace.WaitForChild("Plots");

		// const plotBaseplate = plotSquare.Clone();
		// plotBaseplate.PivotTo(new CFrame(0, 0, 0));
		// plotBaseplate.PrimaryPart!.Size = new Vector3(125, 1, 125);
		// plotBaseplate.Parent = plotFolder;

		const placementGrid = plotFolder?.FindFirstChild("plot");

		if (placementGrid?.IsA("Model")) {
			this.plotBaseplate = placementGrid.PrimaryPart;
		}

		const houseFolder = new Instance("Folder");
		houseFolder.Name = "houses";
		houseFolder.Parent = plotFolder;
		this.housesFolder = houseFolder;

		const npcFolder = new Instance("Folder");
		npcFolder.Name = "NPC";
		npcFolder.Parent = plotFolder;

		this.loadData();

		return plotFolder as PlotFolder;
	}

	/**
	 * Place void miner and define it's position by model's center
	 * @param houseId
	 * @param cframe
	 * @param bypassOwnership
	 *
	 */
	private placeHouse(houseId: string, cframe: CFrame, bypassOwnership?: boolean) {
		if (
			!doesHouseExist(houseId) ||
			!this.plotBaseplate ||
			!(bypassOwnership || doesPlayerOwnHouse(this.player, houseId)) ||
			!this.player.Character
		) {
			warn(this.plotBaseplate, doesPlayerOwnHouse(this.player, houseId), this.player.Character);
			warn(`A severe issue cancelled placing ${this.player}'s ${houseId}`);
			return;
		}

		//create new House
		const newHouse = houseFolder.FindFirstChild(houseId)?.Clone() as Model;
		newHouse!.Name = newHouse?.Name + "-" + HttpService.GenerateGUID(false);
		newHouse!.PivotTo(cframe);

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

		newHouse!.Parent = this.housesFolder;

		//Ensure nothing exists in its spot
		if (isModelIntersecting(newHouse)) {
			newHouse.Destroy();
			return;
		}

		//place on grid
		this.grid.set(newHouse?.Name, cframe.sub(this.plotBaseplate!.Position));

		//remove from inventory
		const houseObject = getPlayerHouseObject(this.player, houseId);

		if (t.instanceIsA("NumberValue")(houseObject)) {
			houseObject.Value -= 1;
			if (houseObject.Value <= 0) {
				houseObject.Destroy();
			}
		}
	}

	public getGrid() {
		return this.grid;
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
			this.inventoryService.addHouseToInventory(this.player, parsedHouseId, 1);
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
				this.player.stats.Money.Value += worth;
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
		if (!args || !(args.size() > 0)) {
			return;
		}

		switch (action) {
			case "place":
				//ensure there are two args and follow the correct types
				if (!(args.size() > 1) || !t.string(args[0]) || !t.CFrame(args[1])) {
					break;
				}

				this.placeHouse(args[0], args[1]);
				break;

			case "pickup": {
				if (!t.string(args[0])) {
					break;
				}

				const houseid = args[0];
				this.pickupHouse(houseid);
				break;
			}
			case "sell": {
				if (!t.string(args[0])) {
					break;
				}

				const houseid = args[0];
				this.sellHouse(houseid);
				break;
			}
		}

		this.dataService.savePlots(this.player, this);
	}

	/**
	 * When player leaves the game cleanup anything relating to player
	 */
	public destroy() {
		const houses = this.getPlotFolder().FindFirstChild("houses");
		const npcs = this.getPlotFolder().FindFirstChild("NPC");

		if (houses) {
			houses.Destroy();
		}

		if (npcs) {
			npcs.Destroy();
		}

		this.getPlotFolder().SetAttribute("player", undefined);
	}
}

export type PlotFolder = Folder & {
	plot: Model;
	houses: Folder & Model[];
};
