import { Service, OnStart } from "@flamework/core";
import { DataService } from "./DataService";
import { Players } from "@rbxts/services";
import { Boost, TimedBoost } from "shared/enums/Boost";
import { t } from "@rbxts/t";
import Object from "@rbxts/object-utils";
import { tick } from "shared/utils/generictils";
import { Events } from "server/network";

@Service({})
export class BoostService implements OnStart {
	constructor(readonly dataService: DataService) {}

	//timed boost
	private timedBoosters = new Map<string, [number, Player]>();

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
			while (task.wait(0.5)) {
				if (this.timedBoosters.size() <= 0) {
					continue;
				}

				for (const [booster, data] of this.timedBoosters) {
					const currentTick = tick();
					const endtick = data[0];

					if (currentTick >= endtick) {
						//if booster time has passed

						this.timedBoosters.delete(booster);

						this.removeBoost(data[1], booster);

						continue;
					}
				}
			}
		});
	}

	/**
	 * Remove player's timed boosters from map
	 */
	private popPlayerboosters(player: Player) {
		const boosters = Object.entries(this.timedBoosters).filter(([namespace, data]) => data[1] === player);

		//remove from orignal set
		boosters.forEach(([namespace, data]) => this.timedBoosters.delete(namespace));
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

		Events.onBoost.fire(player);
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
		print("Granting boost", player);
		if (player.stats.boosts.FindFirstChild(namespace)) {
			if (timed !== undefined) this.extendBoost(player, namespace, timed);
			return;
		}

		const booster = new Instance("NumberValue");
		booster.Name = namespace;
		booster.Value = value;
		booster.SetAttribute("boost", boost);

		if (timed !== undefined && timed !== 0) {
			const endtick = tick() + timed;
			booster.SetAttribute("endtick", endtick);

			this.timedBoosters.set(namespace, [endtick, player]);
		}

		booster.Parent = player.stats.boosts;

		this.calculateBoosts(player);
	}

	public removeBoost(player: Player, namespace: string) {
		const boost = player.stats.boosts.FindFirstChild(namespace);

		if (boost !== undefined) {
			boost.Destroy();
			this.calculateBoosts(player);
			this.timedBoosters.delete(namespace);
		}
	}

	/**
	 * Extend an active boost
	 * @param player
	 * @param namespace
	 * @param extensionTime
	 */
	public extendBoost(player: Player, namespace: string, extensionTime: number, extensionValue?: number) {
		const foundBoost = player.stats.boosts.FindFirstChild(namespace);
		if (!foundBoost?.IsA("NumberValue") || foundBoost.GetAttribute("endtick") === undefined) {
			warn("A timed booster with that namespace does not exist. Namespace:", namespace);
			return;
		}

		const boost = foundBoost.GetAttribute("boost") as Boost;
		const endtick = foundBoost.GetAttribute("endtick") as number;
		const newTime = endtick + extensionTime;
		//const boostLeft = endtick - tick();

		// this.removeBoost(player, namespace);
		// this.addBoost(player, namespace, boost, foundBoost.Value + (extensionValue ?? 0), boostLeft + extensionTime);
		foundBoost.SetAttribute("endtick", endtick + extensionTime);
		this.timedBoosters.delete(namespace);
		this.timedBoosters.set(namespace, [newTime, player]);

		// this.timedBoosters.delete({
		// 	player: player,
		// 	endtick: endtick,
		// 	bo
		// })
		this.calculateBoosts(player);
		print("Extended booster", namespace, "by", extensionTime, "seconds");
	}
}
