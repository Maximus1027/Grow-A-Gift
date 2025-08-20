import { Dependency } from "@flamework/core";
import { Register, Group, Command, CenturionType, CommandContext } from "@rbxts/centurion";
import { InventoryService } from "server/services/InventoryService";

@Register({
	groups: [
		{
			name: "plot",
			description: "Plot command",
		},
	],
})
@Group("plot")
class PlotCommand {
	@Command({
		name: "plot",
		description: "Plot command interface",
		arguments: [
			{
				name: "inventory action",
				description: "inventory action",
				type: "inventoryAction",
			},
			{
				name: "player",
				description: "Player to give items to",
				type: CenturionType.Player,
			},
			{
				name: "item",
				description: "house id, crate id, or stat name",
				type: "item",
			},
			{
				name: "amount",
				description: "# of items",
				type: CenturionType.Number,
			},
		],
	})
	give(ctx: CommandContext, inventoryAction: string, player: Player, item: string, amount: number) {
		const inventoryService = Dependency<InventoryService>();

		switch (inventoryAction) {
			case "add": {
				inventoryService.addHouseToInventory(player, item, amount, true);
				break;
			}
			case "remove": {
				inventoryService.removeHouseFromInventory(player, item, amount);
				break;
			}
			case "set": {
				inventoryService.setHouseInInventory(player, item, amount);
				break;
			}
		}

		ctx.reply(`Successfully ${inventoryAction} ${amount} ${item} to ${player}`);
	}
}
