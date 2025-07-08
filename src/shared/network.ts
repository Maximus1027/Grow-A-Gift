import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	onPlotAction: (action: unknown, ...args: unknown[]) => void;
	onInventoryAction: (action: unknown, ...args: unknown[]) => void;
	onStoreAction: (action: unknown, id: unknown) => void;
}

interface ServerToClientEvents {
	onStock: (newStock: Record<string, number>) => void;
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
