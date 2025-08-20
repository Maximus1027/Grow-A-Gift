import { Dependency } from "@flamework/core";
import { Register, Command, CommandContext, CenturionType, Group } from "@rbxts/centurion";
import { t } from "@rbxts/t";
import { DataService } from "server/services/DataService";
import { InventoryService } from "server/services/InventoryService";

// eslint-disable-next-line roblox-ts/no-any
@Register({
	groups: [
		{
			name: "data",
			description: "Player data manipulation",
		},
	],
})
@Group("data")
class DataCommand {
	@Command({
		name: "stats",
		description: "Stats / data manipulation",

		arguments: [
			{
				name: "Player",
				description: "Player to give items to",
				type: CenturionType.Player,
			},
			{
				name: "action",
				description: "action",
				type: "inventoryAction",
			},
			{
				name: "Stats Name",
				description: "stats name",
				type: "stat",
			},
			{
				name: "Value",
				description: "Stat Value",
				type: CenturionType.Number,
			},
		],
	})
	stat(ctx: CommandContext, player: Player, inventoryAction: string, stat: string, value: number) {
		const inventoryService = Dependency<InventoryService>();

		const stats = player.stats;
		const foundStat = stats.FindFirstChild(stat);

		if (!foundStat?.IsA("NumberValue")) {
			return;
		}

		switch (inventoryAction) {
			case "add": {
				foundStat.Value += value;
				break;
			}
			case "remove": {
				foundStat.Value -= value;
				break;
			}
			case "set": {
				foundStat.Value = value;
				break;
			}
		}

		ctx.reply(`Successfully ${inventoryAction} ${stat} ${value} to ${player}`);
	}
}
