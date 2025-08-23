import { Service, OnStart } from "@flamework/core";
import { InventoryService } from "./InventoryService";
import { getSpinConfig, returnRandomSpinReward, SpinConfig } from "shared/utils/loot";
import { Events } from "server/network";
import Object from "@rbxts/object-utils";

@Service({})
export class SpinService implements OnStart {
	constructor(private readonly inventoryService: InventoryService) {}

	onStart() {
		Events.onSpin.connect((player) => {
			this.getReward(player);
		});

		const record: Record<string, number> = {};

		for (let i = 0; i < 10000; i++) {
			const reward = returnRandomSpinReward();
			record[reward] = ((record[reward] || 0) as number) + 1;
		}

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

			this.grantSpinReward(Player, reward);

			Events.onReward.fire(Player, "spin", reward, "");
		}
	}

	grantSpinReward(player: Player, reward: string) {
		const spinnerConfig = getSpinConfig();
		const foundReward = spinnerConfig[reward];

		if (!foundReward) {
			return "Reward not found";
		}

		switch (foundReward.rewardType) {
			case "stats": {
				const statsFolder = player.stats;
				const stat = statsFolder.FindFirstChild(foundReward.reward);

				if (!stat) {
					warn("Couldn't find stat reward", stat);
					return;
				}

				if (stat.IsA("NumberValue")) {
					stat.Value += foundReward.amount;
				}
				break;
			}
			// case "boost": {
			// 	break;
			case "inventory": {
				this.inventoryService.addHouseToInventory(player, foundReward.reward);
				break;
			}
		}
	}
}
