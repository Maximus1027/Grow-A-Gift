import Object from "@rbxts/object-utils";
import * as RarityConfig from "shared/config/rarity.json";

export enum Rarity {
	"Common" = "Common",
	"Epic" = "Epic",
	"Rare" = "Rare",
	"Legendary" = "Legendary",
	"Mythic" = "Mythic",
}

const RarityColors: Record<Rarity, Color3> = {} as Record<Rarity, Color3>;

Object.entries(RarityConfig).forEach((rarity) => {
	const rgb = rarity[1].RGB;

	RarityColors[rarity[0] as Rarity] = Color3.fromRGB(rgb[0], rgb[1], rgb[2]);
});

/**
 * Get assigned Color3 rgb of rarity enum
 * @param rarity
 * @returns Color3
 */
export const getRarityColor = (rarity: Rarity) => RarityColors[rarity];
