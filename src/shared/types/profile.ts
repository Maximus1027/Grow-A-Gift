export interface ProfileData {
	money: number;
	inventory: Record<string, number>;
	equipped: string[];
	plot: {
		placed: Record<string, number[]>;
	};
}
