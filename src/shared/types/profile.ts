import { number } from "@rbxts/react/src/prop-types";

export interface ProfileData {
	money: number;
	inventory: Record<string, number>;
	equipped: string[];
	plot: {
		placed: Record<string, { pos: number[]; tick?: number }>;
	};
}
