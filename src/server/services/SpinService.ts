import { Service, OnStart } from "@flamework/core";
import { InventoryService } from "./InventoryService";
import { getSpinConfig, returnRandomSpinReward } from "shared/utils/loot";
import { Events } from "server/network";
import Object from "@rbxts/object-utils";
import { Reward } from "shared/types/config";
import { BoostService } from "./BoostService";
import { HttpService } from "@rbxts/services";
import { Boost } from "shared/enums/Boost";
import { t } from "@rbxts/t";

@Service({})
export class SpinService implements OnStart {
	constructor(private readonly inventoryService: InventoryService, private readonly boostService: BoostService) {}

	onStart() {
		Events.onSpin.connect((player) => {
			this.getReward(player);
		});

		// const record: Record<string, number> = {};

		// for (let i = 0; i < 10000; i++) {
		// 	const reward = returnRandomSpinReward();
		// 	record[reward] = ((record[reward] || 0) as number) + 1;
		// }

		// const size = Object.values(record).reduce((acc, value) => acc + value, 0);

		// for (const [reward, amount] of Object.entries(record)) {
		// 	print(`Reward: ${reward}, Amount: ${amount}`, "occurence" + amount / size);
		// }
	}

	getReward(Player: Player) {
		const spins = Player.stats.spins;

		if (spins && spins.Value > 0) {
			spins.Value -= 1;

			const reward = returnRandomSpinReward();
			const spinnerConfig = getSpinConfig();
			const foundReward: Reward = { ...spinnerConfig[reward], namespace: "SPIN" };
			print(foundReward);
			if (foundReward) {
				this.grantReward(Player, foundReward);
				Events.onReward.fire(Player, "spin", reward, "");
			}
		}
	}

	grantReward(player: Player, reward: Reward) {
		switch (reward.rewardType) {
			case "stats": {
				const statsFolder = player.stats;
				const stat = statsFolder.FindFirstChild(reward.reward);

				if (!stat) {
					warn("Couldn't find stat reward", stat);
					return;
				}

				if (stat.IsA("NumberValue")) {
					stat.Value += reward.amount;
				}
				break;
			}
			case "boost": {
				this.boostService.addBoost(
					player,
					`${reward.namespace}_${reward.reward}_${reward.amount}`,
					reward.reward as Boost,
					reward.amount,
					reward.timed,
				);
				break;
			}
			case "inventory": {
				this.inventoryService.addHouseToInventory(player, reward.reward);
				break;
			}
		}
	}
}
