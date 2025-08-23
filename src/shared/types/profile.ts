import { number } from "@rbxts/react/src/prop-types";
import { Boost, TimedBoost } from "shared/enums/Boost";

export interface ProfileData {
	money: number;
	inventory: Record<string, number>;
	equipped: string[];
	village: string;
	rebirths: number;
	spins: number;
	plot: {
		placed: Record<string, { pos: number[]; tick?: number }>;
	};
	boosters: {
		namespace: string;
		boostType: Boost;
		boostValue: number;
		timeleft: number;
	}[];
}
