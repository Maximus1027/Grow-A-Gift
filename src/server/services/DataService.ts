import { Service, OnStart } from "@flamework/core";
import { HttpService, Players } from "@rbxts/services";
import { ProfileData } from "shared/types/profile";
import { doesPlayerOwnHouse, getInventoryFolder, getMoneyStat, getPlayerHouseObject } from "shared/utils/playertils";
import { InventoryService } from "./InventoryService";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import Object from "@rbxts/object-utils";
import { Plot } from "server/plots/plot";
import { t } from "@rbxts/t";
import Signal from "@rbxts/lemon-signal";
import { getCrateConfig } from "shared/utils/loot";
import { getPlayerPlotFolder, tick } from "shared/utils/generictils";
import { Boost, TimedBoost } from "shared/enums/Boost";

const defaultProfile: ProfileData = {
	money: 100,
	village: "dirt",
	inventory: {},
	rebirths: 0,
	spins: 0,
	equipped: [],
	plot: {
		placed: {},
	},
	boosters: [],
};

const crateConfig = getCrateConfig();

@Service({
	loadOrder: 0,
})
export class DataService implements OnStart {
	private profileStore = ProfileService.GetProfileStore("PlayerDB", defaultProfile);
	private loadedProfiles = new Map<Player, Profile<ProfileData>>();

	public PlayerLoaded = new Signal<[Player, Profile<ProfileData>]>();

	onStart() {
		Players.PlayerAdded.Connect((player) => this.createProfile(player));
		Players.GetPlayers().forEach((player) => this.createProfile(player));

		Players.PlayerRemoving.Connect((player) => this.saveProfile(player));
	}

	doSaveLoop() {
		// eslint-disable-next-line no-constant-condition
		while (true) {
			task.wait(60);
			for (const player of Players.GetPlayers()) {
				this.saveData(player);
			}
		}
	}

	/**
	 * Create profile for player
	 * @param player
	 * @returns
	 */
	private createProfile(player: Player) {
		if (this.loadedProfiles.has(player)) {
			print("Profile already exists for player", player.Name);
			return;
		}

		const userid = player.UserId;
		const key = `profile_${userid}`;

		const profile = this.profileStore.LoadProfileAsync(key);

		if (!profile) {
			return player.Kick("ERROR WITH LOADING DATA");
		}

		profile.ListenToRelease(() => {
			this.loadedProfiles.delete(player);
			player.Kick("Profile released.");
		});

		profile.AddUserId(userid);
		profile.Reconcile();

		this.loadedProfiles.set(player, profile);

		this.setupPlayer(player, profile);
	}

	/**
	 * Setup folders and values
	 * @param player
	 */
	private setupPlayer(player: Player, profile: Profile<ProfileData>) {
		const dataFolder = new Instance("Folder");
		dataFolder.Name = "stats";
		dataFolder.Parent = player;

		const money = new Instance("NumberValue");
		money.Name = "Money";
		money.Parent = dataFolder;

		const inventory = new Instance("Folder");
		inventory.Name = "inventory";
		inventory.Parent = dataFolder;

		const boosts = new Instance("Folder");
		boosts.Name = "boosts";
		boosts.Parent = dataFolder;

		const village = new Instance("StringValue");
		village.Name = "village";
		village.Parent = dataFolder;

		const rebirths = new Instance("IntValue");
		rebirths.Name = "rebirths";
		rebirths.Parent = dataFolder;

		const spins = new Instance("IntValue");
		spins.Name = "spins";
		spins.Parent = dataFolder;

		/** Load Data */
		money.Value = profile.Data.money;
		village.Value = profile.Data.village ?? "dirt";
		rebirths.Value = profile.Data.rebirths;
		spins.Value = profile.Data.spins;
		/** Done Loading */
		this.PlayerLoaded.Fire(player, profile);
	}

	/**
	 * Save and release profile
	 * @param player
	 * @returns
	 */
	private saveProfile(player: Player) {
		const profile = this.loadedProfiles.get(player);
		if (!profile) {
			return;
		}

		this.saveData(player)
			.andThen(() => profile.Release())
			.andThen(() => this.loadedProfiles.delete(player))
			.finallyCall(print, `Saved profile for ${player.Name}`);
	}

	/**
	 * Save data to profile
	 * @param player
	 * @returns
	 */
	private async saveData(player: Player) {
		const profile = this.loadedProfiles.get(player);

		if (!profile) {
			return;
		}

		return this.saveInventory(player)
			.andThen(() => this.saveTimedBoosters(player))
			.andThen(() => {
				profile.Data.money = getMoneyStat(player).Value;
				profile.Data.village = player.stats.village.Value;
				profile.Data.rebirths = player.stats.rebirths.Value;
				profile.Data.spins = player.stats.spins.Value;
			});
	}

	/**
	 *
	 * @param player
	 */
	private async saveInventory(player: Player) {
		const profile = this.loadedProfiles.get(player);

		if (!profile) {
			return;
		}

		const newInventory = {} as Record<string, number>;
		const equip: string[] = {} as string[];

		getInventoryFolder(player)
			.GetChildren()
			.forEach((item) => {
				newInventory[item.Name] = (item as NumberValue).Value;

				if (item.GetAttribute("equip") !== undefined) {
					equip.push(item.Name);
				}
			});

		profile.Data.inventory = newInventory;
		profile.Data.equipped = equip;
	}

	/**
	 * Save the player's plot
	 * @param player
	 * @param plot
	 * @returns
	 */
	public savePlots(player: Player, plot: Plot) {
		const profile = this.loadedProfiles.get(player);

		if (!profile) {
			return;
		}

		const placed = {} as ProfileData["plot"]["placed"];

		const grid = plot.getGrid();
		const ticks = plot.getCrateTick();
		const plotFolder = getPlayerPlotFolder(player);

		grid.forEach((cframe, house) => {
			if (t.string(house)) {
				const rotation = cframe.ToEulerAnglesXYZ();
				const cframeEncode = [cframe.X, cframe.Y, cframe.Z, rotation[0], rotation[1], rotation[2]];

				if (ticks.has(house)) {
					//if saving a crate
					placed[house] = { pos: cframeEncode, tick: (ticks.get(house) as number) ?? 0 };
				} else {
					placed[house] = { pos: cframeEncode };
				}
			}
		});

		profile.Data.plot.placed = placed;
	}

	/**
	 * Save active boosters
	 * @param player
	 * @param boosters
	 */
	public saveTimedBoosters(player: Player) {
		const profile = this.getProfile(player);
		const boosterFolder = player.stats.boosts;

		if (!profile || !boosterFolder) {
			warn(`Could not save boosters for ${player}`);
			return;
		}

		// endtick becomes time left on booster
		const adjustedBoosters = boosterFolder
			.GetChildren()
			.map((boosterValue) => {
				const timed = boosterValue.GetAttribute("endtick");
				const boostType = boosterValue.GetAttribute("boost");

				if (!t.number(timed) || !t.string(boostType) || !boosterValue.IsA("NumberValue")) {
					return undefined;
				}

				return {
					namespace: boosterValue.Name,
					boostType: boostType as Boost,
					boostValue: boosterValue.Value,
					timeleft: timed - tick(),
				};
			})
			.filterUndefined();

		profile.Data.boosters = adjustedBoosters;
	}

	public getProfile(player: Player) {
		const profile = this.loadedProfiles.get(player);

		if (!profile) {
			return;
		}

		return profile;
	}
}
