import { Dependency } from "@flamework/core";
import { Register, Group, Command, CenturionType, CommandContext } from "@rbxts/centurion";
import { BoostService } from "server/services/BoostService";
import { InventoryService } from "server/services/InventoryService";
import { Boost } from "shared/enums/Boost";

@Register({
	groups: [
		{
			name: "boost",
			description: "Add or remove player boosters",
		},
	],
})
@Group("boost")
class DataCommand {
	@Command({
		name: "list",
		description: "List active boosters for player",

		arguments: [
			{
				name: "Player",
				description: "Player to list boosters",
				type: CenturionType.Player,
			},
		],
	})
	list(ctx: CommandContext, player: Player) {
		const boostFolder = player.stats.boosts;

		let reply = "";

		if (boostFolder) {
			for (const boost of boostFolder.GetChildren()) {
				if (!boost.IsA("NumberValue")) {
					continue;
				}

				reply += `namespace: <b>${boost.Name}</b> type: ${boost.GetAttribute("boost")} value: ${
					boost.Value
				} \n`;
			}
		}

		ctx.reply(reply);
	}
	@Command({
		name: "add",
		description: "Add booster to player",
		arguments: [
			{
				name: "Player",
				description: "Player to give booster to",
				type: CenturionType.Player,
			},
			{
				name: "Boost",
				description: "Type of boost",
				type: "boost",
			},
			{
				name: "value",
				description: "value of boost",
				type: CenturionType.Number,
			},
			{
				name: "namespace",
				description: "id of the booster. can be anything",
				type: CenturionType.String,
			},
			{
				name: "time",
				description: "how long (in seconds) the boost should last",
				type: CenturionType.Number,
				optional: true,
			},
		],
	})
	addBoost(ctx: CommandContext, player: Player, boost: Boost, value: number, namespace: string, time?: number) {
		const boostService = Dependency<BoostService>();
		boostService.addBoost(player, namespace, boost, value, time);
	}
	@Command({
		name: "remove",
		description: "Add booster to player",
		arguments: [
			{
				name: "Player",
				description: "Player to give booster to",
				type: CenturionType.Player,
			},
			{
				name: "namespace",
				description: "id of the booster.",
				type: "boostid",
			},
		],
	})
	removeBoost(ctx: CommandContext, player: Player, namespace: string) {
		const boostService = Dependency<BoostService>();
		boostService.removeBoost(player, namespace);
	}
}
