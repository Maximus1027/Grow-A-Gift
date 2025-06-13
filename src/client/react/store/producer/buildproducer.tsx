import { createProducer } from "@rbxts/reflex";

export interface BuildState {
	isBuilding: Boolean;
	selectedMachine: string;
}

const initialState: BuildState = {
	isBuilding: false,
	selectedMachine: "",
};

export const BuildActions = createProducer(initialState, {
	toggleBuild: (state: BuildState) => {
		return {
			...state,
			isBuilding: !state.isBuilding,
		};
	},
	selectMachine: (state: BuildState, machineId: string) => {
		return {
			...state,
			selectedMachine: machineId,
		};
	},
});
