import { Networking } from "@flamework/networking";

export function lateRimitMiddleware<I extends Array<unknown>>(): Networking.EventMiddleware<I> {
	return (processNext, event) => {
		return (player, ...args) => {};
	};
}
