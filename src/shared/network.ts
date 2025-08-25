import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	onPlotAction: (action: unknown, ...args: unknown[]) => void;
	onInventoryAction: (action: unknown, ...args: unknown[]) => void;
	onStoreAction: (action: unknown, id: unknown) => void;
	onSpin: () => void;
	onRewardClaim: (id: unknown) => void;
}

interface ServerToClientEvents {
	onStock: (newStock: Record<string, number>) => void;
	onReward: (rewardType: "crate" | "spin", crateid: string, houseid: string) => void;
	onRewardsAction: (action: "unlock" | "claim", id: number) => void;
	onBoost: () => void;
	onDataLoaded: () => void;
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
