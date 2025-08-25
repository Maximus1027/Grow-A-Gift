import { BaseRegistry, TransformResult, TypeBuilder } from "@rbxts/centurion";
import Object from "@rbxts/object-utils";
import { Boost } from "shared/enums/Boost";
import { getCrateConfig, getHouseConfig } from "shared/utils/loot";

const assetList: string[] = [...Object.keys(getHouseConfig()), ...Object.keys(getCrateConfig())];

const inventoryAction = TypeBuilder.create<string>("inventoryAction")
	.transform((text, executor) => {
		if (text === "add" || text === "remove" || text === "set") {
			return TransformResult.ok(text);
		}

		return TransformResult.err("Action not found");
	})
	.suggestions(() => ["add", "remove", "set"])
	.markForRegistration()
	.build();

const statList = ["spins", "rebirths", "Money"];

const stats = TypeBuilder.create<string>("stat")
	.transform((text, executor) => {
		if (statList.find((stat) => stat === text) !== undefined) {
			return TransformResult.ok(text);
		}

		return TransformResult.err("Stat not found");
	})
	.suggestions(() => statList)
	.markForRegistration()
	.build();

const asset = TypeBuilder.create<string>("item")
	.transform((text, executor) => {
		if (text === "*") {
			return TransformResult.ok("*");
		}

		const asset = assetList.find((as) => as.lower() === text.lower());
		if (asset === undefined) {
			return TransformResult.err("Item not found");
		}

		return TransformResult.ok(asset);
	})
	.suggestions(() => assetList)
	.markForRegistration()
	.build();

const boostEnumKeys = Object.keys(Boost);

const boosts = TypeBuilder.create<string>("boost")
	.transform((text, executor) => {
		const foundBoost = boostEnumKeys.find((boost) => boost === text);

		if (!foundBoost) {
			return TransformResult.err("That is not a valid boost");
		}

		return TransformResult.ok(foundBoost);
	})
	.suggestions(() => boostEnumKeys)
	.markForRegistration()
	.build();

const getBoostNamespace = (player: Player): string[] => {
	const namespaces = player.stats.boosts.GetChildren().map((boost) => boost.Name);

	return namespaces;
};

const namespaceBoosts = TypeBuilder.create<string>("boostid")
	.transform((text, executor) => {
		const namespaces = getBoostNamespace(executor);

		if (namespaces.includes(text)) {
			return TransformResult.ok(text);
		}

		return TransformResult.err("Could not find booster with that namespace");
	})
	.suggestions((t, player) => getBoostNamespace(player))
	.markForRegistration()
	.build();

export = (registry: BaseRegistry) => {
	registry.registerType(asset);
	registry.registerType(inventoryAction);
	registry.registerType(stats);
	registry.registerType(boosts);
	registry.registerType(namespaceBoosts);
};
