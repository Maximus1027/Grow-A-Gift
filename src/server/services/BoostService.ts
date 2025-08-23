import { Service, OnStart } from "@flamework/core";
import { DataService } from "./DataService";
import { Players } from "@rbxts/services";
import { Boost, TimedBoost } from "shared/enums/Boost";
import { t } from "@rbxts/t";
import Object from "@rbxts/object-utils";
import { tick } from "shared/utils/generictils";

@Service({})
export class BoostService implements OnStart {
	constructor(readonly dataService: DataService) {}

	//timed boost
	private timedBoosters = new Set<TimedBoost>();

	onStart() {
		this.startBoostTimer();
		this.dataService.PlayerLoaded.Connect((player, profile) => {
			/** Load timed boosts */
			for (const boost of profile.Data.boosters) {
				this.addBoost(player, boost.namespace, boost.boostType, boost.boostValue, boost.timeleft);
			}

			this.calculateFriendsBoost(player);
			/** Test boosters */
			// this.addBoost(player, "test", Boost.GiftLuck, 1000);
			// this.addBoost(player, "test2", Boost.Income, 5);
			// this.addBoost(player, "test3", Boost.NPCSpeed, 1.1);
		});

		Players.PlayerAdded.Connect((player: Player) => {});

		Players.PlayerRemoving.Connect((player: Player) => {
			for (const boost of player.stats.boosts.GetChildren()) {
				//if player leaving has friend boosters, find friends and remove their friend booster
				if (boost.GetAttribute("boost") === Boost.InviteFriend) {
					const frienduserid = tonumber(boost.Name.split("_")[1] as string);

					if (!t.number(frienduserid)) {
						return;
					}

					const foundFriend = Players.GetPlayerByUserId(frienduserid);

					if (foundFriend) {
						this.removeBoost(foundFriend, "friend_" + player.UserId);
					}
				}
			}

			this.popPlayerboosters(player);
		});
	}

	/**
	 * Check for expiring timed boosters
	 */
	private startBoostTimer() {
		task.spawn(() => {
			while (task.wait(1)) {
				if (this.timedBoosters.size() <= 0) {
					continue;
				}

				for (const booster of this.timedBoosters) {
					const currentTick = tick();

					if (currentTick >= booster.endtick) {
						//if booster time has passed

						this.timedBoosters.delete(booster);
						this.removeBoost(booster.player, booster.namespace);
						continue;
					}
				}
			}
		});
	}

	/**
	 * Remove player's timed boosters from set and return them
	 */
	private popPlayerboosters(player: Player): TimedBoost[] {
		const boosters = Object.keys(this.timedBoosters).filter((booster) => booster.player === player);

		//remove from orignal set
		boosters.forEach((booster) => this.timedBoosters.delete(booster));

		return boosters;
	}

	/**
	 * On join -> friend boost calculation
	 * @param player
	 * @returns
	 */
	calculateFriendsBoost(player: Player): number {
		const boost = 0;
		for (const friend of Players.GetPlayers()) {
			if (friend === player) {
				continue;
			}

			if (player.IsFriendsWith(friend.UserId)) {
				this.addBoost(player, "friend" + friend.UserId, Boost.InviteFriend, 10);
				this.addBoost(friend, "friend_" + player.UserId, Boost.InviteFriend, 10);
			}
		}

		return boost;
	}

	calculateBoosts(player: Player) {
		const boostMap: Partial<Record<Boost, number>> = {
			[Boost.GiftLuck]: 0,
			[Boost.Income]: 0,
			[Boost.InviteFriend]: 0,
			[Boost.NPCSpeed]: 0,
		};

		for (const boost of player.stats.boosts.GetChildren()) {
			const boostType = boost.GetAttribute("boost");
			if (!boost.IsA("NumberValue") || !t.string(boostType)) {
				return;
			}

			// Type assertion to Boost to fix implicit 'any' error
			boostMap[boostType as Boost] = (boostMap[boostType as Boost] ?? 0) + boost.Value;
		}

		for (const [boost, val] of Object.entries(boostMap)) {
			player.SetAttribute(boost, val > 0 ? val : undefined);
		}
	}

	/**
	 * Add booster to player
	 * @param player
	 * @param namespace
	 * @param boost
	 * @param value
	 * @param timed optional time constraint in seconds
	 * @returns
	 */
	public addBoost(player: Player, namespace: string, boost: Boost, value: number, timed?: number) {
		if (player.stats.boosts.FindFirstChild(namespace)) {
			warn("A booster with that namespace is already active. Namespace:", namespace);
			return;
		}

		const booster = new Instance("NumberValue");
		booster.Name = namespace;
		booster.Value = value;
		booster.SetAttribute("boost", boost);

		if (timed !== undefined) {
			const endtick = tick() + timed;
			booster.SetAttribute("endtick", endtick);
			this.timedBoosters.add({
				player: player,
				namespace: namespace,
				boostType: boost,
				boostValue: value,
				endtick: endtick,
			});
		}

		booster.Parent = player.stats.boosts;

		this.calculateBoosts(player);
	}

	public removeBoost(player: Player, namespace: string) {
		const boost = player.stats.boosts.FindFirstChild(namespace);

		if (boost !== undefined) {
			boost.Destroy();
			this.calculateBoosts(player);
		}
	}
}
