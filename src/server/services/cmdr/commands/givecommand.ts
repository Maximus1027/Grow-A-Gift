import { Dependency } from "@flamework/core";
import { Register, Command, CommandContext, CenturionType, Group } from "@rbxts/centurion";
import { t } from "@rbxts/t";
import { DataService } from "server/services/DataService";
import { InventoryService } from "server/services/InventoryService";

// eslint-disable-next-line roblox-ts/no-any

@Register({
	groups: [
		{
			name: "inventory",
			description: "Inventory command",
		},
	],
})
@Group("inventory")
class InventoryCommand {
	@Command({
		name: "edit",
		description: "Inventory interface",
		arguments: [
			{
				name: "player",
				description: "Player to give items to",
				type: CenturionType.Player,
			},
			{
				name: "inventory action",
				description: "inventory action",
				type: "inventoryAction",
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
	give(ctx: CommandContext, player: Player, inventoryAction: string, item: string, amount: number) {
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
