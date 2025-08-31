import { Dependency } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { Profile } from "@rbxts/profileservice/globals";
import { HttpService, ReplicatedStorage, ServerStorage, Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Events } from "server/network";
import { CrateService } from "server/services/CrateService";
import { DataService } from "server/services/DataService";
import { InventoryService } from "server/services/InventoryService";
import * as HousesConfig from "shared/config/house.json";
import { PlotFolder } from "shared/types/plot";
import { ProfileData } from "shared/types/profile";
import {
	doesHouseExist,
	getNextVillageUnlock,
	getSpawnLocations,
	getVillage,
	isModelIntersecting,
	isModelWithinBounds,
	tick,
} from "shared/utils/generictils";
import { getItemCost } from "shared/utils/houseutils";
import { getCrateConfig } from "shared/utils/loot";
import { doesPlayerOwnHouse, getPlayerHouseObject } from "shared/utils/playertils";

const serverAssets = ServerStorage.WaitForChild("assets") as Folder;
const sharedAssets = ReplicatedStorage.WaitForChild("assets") as Folder;
const houseFolder = sharedAssets.WaitForChild("houses") as Folder & Model[];
const villages = serverAssets.WaitForChild("villages") as Folder;

const CrateConfig = getCrateConfig();

export class Plot {
	constructor(readonly player: Player) {
		const plot = this.createPlot();

		if (plot) {
			this.plot = plot;
			task.delay(2, () => Events.onDataLoaded.fire(this.player));
			this.spawnLocations = getSpawnLocations(plot);
		} else {
			player.Kick("Couldn't locate village");
		}
	}
	private inventoryService = Dependency<InventoryService>();
	private dataService = Dependency<DataService>();
	private crateService = Dependency<CrateService>();

	private plot?: PlotFolder;
	private plotBaseplate?: BasePart;
	private spawnPlate?: BasePart;
	private grid = new Map<string, CFrame>();
	private crateTick = new Map<string, number>();
	private housesFolder?: Folder;
	private spawnLocations: Vector3[] = [];

	public getPlotFolder(): PlotFolder {
		return this.plot as PlotFolder;
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
			const position = entry[1].pos;

			//if a tick is assigned

			//position and rotation
			const rotation = CFrame.Angles(position[3], position[4], position[5]);
			const cframe = new CFrame(position[0], position[1], position[2]).mul(rotation);

			const houseid = entry[0].split("-")[0];
			const ticks = entry[1].tick;
			const placement = this.placeHouse(houseid, cframe.add(this.plotBaseplate!.Position), true, ticks);
		});
	}

	public getSpawnLocations() {
		return this.spawnLocations;
	}

	private createPlot() {
		const PlotsFolder = Workspace.WaitForChild("Plots") as Folder & Folder[];

		//get next available plot
		const plotFolder = PlotsFolder.GetChildren().find(
			(folder) => folder.GetAttribute("player") === undefined,
		) as PlotFolder;
		plotFolder?.SetAttribute("player", this.player.Name);

		//cleanup any possible artifacts

		this.clearFolder(plotFolder);

		const currentVillage = this.player.stats.village.Value;

		const villageModel = this.placeVillage(currentVillage, plotFolder);

		if (!villageModel) {
			return;
		}

		const houseFolder = new Instance("Folder");
		houseFolder.Name = "houses";
		houseFolder.Parent = plotFolder;
		this.housesFolder = houseFolder;

		const npcFolder = new Instance("Folder");
		npcFolder.Name = "NPC";
		npcFolder.Parent = plotFolder;

		this.plotBaseplate = plotFolder.WaitForChild("baseplate") as BasePart;

		this.loadData();

		return plotFolder as PlotFolder;
	}

	private placeVillage(village: string, folder?: PlotFolder): Model | undefined {
		const villageAsset = villages.FindFirstChild(village);

		if (!villageAsset) {
			warn("Something went wrong, couldn't locate village model");
			return;
		}

		const plotFolder = folder ?? this.getPlotFolder();

		const villageModel = villageAsset.Clone() as Model;
		villageModel.Parent = plotFolder;
		villageModel.PivotTo(plotFolder.CFrame);

		const spawn = villageModel.GetDescendants().find((child) => child.HasTag("Spawn")) as BasePart;
		this.spawnPlate = spawn ?? this.plotBaseplate;

		return villageModel;
	}

	/**
	 * Teleport player to plot home spawn
	 * @returns
	 */
	public summonPlayer() {
		const character = this.player.Character || this.player.CharacterAdded.Wait()[0];

		if (!character || !this.spawnPlate) {
			return;
		}
		character.PivotTo(this.spawnPlate.CFrame.add(new Vector3(0, character.GetExtentsSize().Y, 0)));
	}

	/**
	 * Place void miner and define it's position by model's center
	 * @param houseId
	 * @param cframe
	 * @param bypassOwnership
	 *
	 */
	private placeHouse(houseId: string, cframe: CFrame, bypassOwnership?: boolean, ticks?: number) {
		if (
			!doesHouseExist(houseId) ||
			!this.plotBaseplate ||
			!(bypassOwnership || doesPlayerOwnHouse(this.player, houseId))
		) {
			warn(this.plotBaseplate, doesPlayerOwnHouse(this.player, houseId), this.player.Character);
			warn(`A severe issue cancelled placing ${this.player}'s ${houseId}`);
			return;
		}

		//create new House
		const newHouse = houseFolder.FindFirstChild(houseId)?.Clone() as Model;
		newHouse!.Name = newHouse?.Name + "-" + HttpService.GenerateGUID(false);
		newHouse!.PivotTo(cframe);

		if (!isModelWithinBounds(newHouse, this.plotBaseplate)) {
			warn("House could not be placed due to out of bounds");
			return;
		}

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

		//Add crate attributes if this is a crate
		if (CrateConfig[houseId] !== undefined) {
			const t = ticks ?? tick();

			newHouse.SetAttribute("placed", t);
			this.crateTick.set(newHouse.Name, t);

			newHouse.AddTag("Crate");
		} else {
			newHouse.AddTag("House");
		}

		newHouse!.Parent = this.housesFolder;

		//Ensure nothing exists in its spot
		if (isModelIntersecting(newHouse)) {
			newHouse.Destroy();
			return;
		}

		//place on grid
		this.grid.set(newHouse?.Name, cframe.sub(this.plotBaseplate!.Position));

		//remove from inventory
		if (!bypassOwnership) {
			const houseObject = getPlayerHouseObject(this.player, houseId);
			if (t.instanceIsA("NumberValue")(houseObject)) {
				houseObject.Value -= 1;
				if (houseObject.Value <= 0) {
					houseObject.Destroy();
				}
			}
		}

		return newHouse;
	}

	public getGrid() {
		return this.grid;
	}

	public getCrateTick() {
		return this.crateTick;
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
	 * Reset player stats and inventory
	 */
	private rebirth() {
		this.player.stats.inventory.ClearAllChildren();
		this.housesFolder?.ClearAllChildren();
		this.getPlotFolder().FindFirstChild("NPC")?.ClearAllChildren();
		this.grid.clear();

		this.player.stats.Money.Value = 0;
		this.player.stats.village.Value = "dirt";
		this.player.stats.rebirths.Value += 1;

		this.removeCurrentVillage();
		this.placeVillage("dirt");
	}

	/**
	 * Sell house for money!
	 * @param houseid
	 */
	private sellHouse(houseid: string) {
		const success = this.removeHouse(houseid);
		if (success) {
			const parsedHouseId = houseid.split("-")[0];
			const worth = getItemCost(parsedHouseId);
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
	 * Open a crate
	 * @param crateid
	 */
	private openCrate(crateid: string) {
		const parsedCrate = crateid.split("-")[0];
		const crateData = CrateConfig[parsedCrate];

		if (
			!this.crateTick.has(crateid) ||
			(this.crateTick.get(crateid) as number) + crateData.timeInMinutes * 60 > tick()
		) {
			return;
		}

		this.removeHouse(crateid);

		this.crateService.openCrate(this.player, parsedCrate);

		return;
	}

	/**
	 * Upgrade the player's village
	 * @param player
	 */
	private upgradeVillage() {
		const currentVillage = this.player.stats.village.Value;
		const nextVillage = getNextVillageUnlock(currentVillage);

		if (!t.string(nextVillage)) {
			warn(nextVillage, "-- Next village not found. maybe player hit max?");
			return;
		}

		const villageData = getVillage(nextVillage);

		if (this.player.stats.Money.Value >= villageData[1].cost) {
			this.player.stats.Money.Value -= villageData[1].cost;
			this.player.stats.village.Value = nextVillage;

			this.removeCurrentVillage();
			this.placeVillage(nextVillage);
		}
	}

	/**
	 * Handles actions & args sent from client and calls the respective method
	 * @param action
	 * @param args
	 */
	public dispatch(action: string, args: unknown[]) {
		if (!args) {
			warn(`Something went wrong with ${this.player.Name}'s plot dispatch. Action & Args:`, action, args);
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
			case "open": {
				//for crate openings

				if (!t.string(args[0])) {
					return;
				}

				this.openCrate(args[0]);
				break;
			}
			case "upgrade": {
				//upgrading the village

				this.upgradeVillage();
				break;
			}
			case "rebirth": {
				this.rebirth();
				break;
			}
		}

		this.dataService.savePlots(this.player, this);
	}

	private removeCurrentVillage() {
		const foundModel = this.getPlotFolder()
			.GetChildren()
			.find((inst) => inst.HasTag("Village"));

		if (foundModel) {
			foundModel.Destroy();
		}
	}

	private clearFolder(plotFolder: PlotFolder) {
		plotFolder
			.GetChildren()
			.filter((child) => !child.HasTag("baseplate"))
			.filter((child) => child !== plotFolder.spawnregion)
			.forEach((child) => child.Destroy());
	}

	/**
	 * When player leaves the game cleanup anything relating to player
	 */
	public destroy() {
		this.clearFolder(this.plot as PlotFolder);

		//add default plot
		this.placeVillage("dirt");

		this.getPlotFolder().SetAttribute("player", undefined);
	}
}
