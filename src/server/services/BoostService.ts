import { Service, OnStart } from "@flamework/core";
import { DataService } from "./DataService";
import { Players } from "@rbxts/services";
import { Boost } from "shared/enums/Boost";
import { t } from "@rbxts/t";

@Service({})
export class BoostService implements OnStart {
	constructor(readonly dataService: DataService) {}

	private playerBoosters = new Map<Player, Partial<Record<Boost, number>>>();

	onStart() {
		this.dataService.PlayerLoaded.Connect((player, profile) => {
			/** Load timed boosts */
		});

		Players.PlayerAdded.Connect((player: Player) => {
			this.calculateFriendsBoost(player);
		});

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
		});
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

	addBoost(player: Player, namespace: string, boost: Boost, value: number) {
		const booster = new Instance("NumberValue");
		booster.Name = namespace;
		booster.Value = value;
		booster.SetAttribute("boost", boost);

		booster.Parent = player.stats.boosts;
	}

	removeBoost(player: Player, namespace: string) {
		const boost = player.stats.boosts.FindFirstChild(namespace);

		if (boost !== undefined) {
			boost.Destroy();
		}
	}
}
