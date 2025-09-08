import { Service, OnStart, OnTick } from "@flamework/core";
import { SpinService } from "./SpinService";
import { Events } from "server/network";
import { t } from "@rbxts/t";
import { getRewardsConfig } from "shared/utils/configtils";
import { tick } from "shared/utils/generictils";
import { Players } from "@rbxts/services";
import Object from "@rbxts/object-utils";
import { Reward } from "shared/types/config";

@Service({})
export class RewardService implements OnStart, OnTick {
	constructor(readonly SpinService: SpinService, private readonly spinService: SpinService) {}

	private startTicks = new Map<Player, number>();
	private rewardsConfig = getRewardsConfig();

	private lastUnlock = Object.keys(this.rewardsConfig).size();

	onStart() {
		Players.PlayerAdded.Connect((player: Player) => {
			this.startTicks.set(player, tick());
			player.SetAttribute("highestUnlock", 0);
			Events.onRewardsAction.fire(player, "start", this.startTicks.get(player) ?? tick());
		});

		Players.PlayerRemoving.Connect((player: Player) => {
			this.startTicks.delete(player);
		});

		Events.onRewardClaim.connect((player: Player, id: unknown) => {
			if (!t.number(id)) {
				return;
			}

			this.onRewardClaim(player, id);
		});
	}

	private onRewardClaim(player: Player, id: number) {
		const foundReward: Reward = { ...this.rewardsConfig[tostring(id)], namespace: "REWARDS" };

		if (foundReward) {
			this.SpinService.grantReward(player, foundReward);
			Events.onRewardsAction.fire(player, "claim", id);
		}
	}

	onTick(dt: number): void {
		const reward = getRewardsConfig();

		for (const [player, t] of this.startTicks) {
			const unlock = player.GetAttribute("highestUnlock") as number;

			if (t + reward[tostring(unlock + 1) as string].timeInMinutes - tick() <= 0) {
				player.SetAttribute("highestUnlock", unlock + 1);
				Events.onRewardsAction.fire(player, "unlock", unlock + 1);

				if (unlock + 1 === this.lastUnlock) {
					this.startTicks.delete(player);
				}
			}
		}
	}
}
