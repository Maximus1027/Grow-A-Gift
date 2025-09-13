import { createProducer } from "@rbxts/reflex";
import { InventoryState } from "./inventoryproducer";

export type Message = {
	text: string;
	color: Color3;
};

export interface MessageState {
	messages: string[];
}

const initialState: MessageState = {
	messages: [],
};

export const MessageActions = createProducer(initialState, {
	sendMessage: (state: MessageState, message: string) => {
		return {
			...state,
			messages: [...state.messages, message],
		};
	},
	removeMessage: (state: MessageState) => {
		const lastMessages = state.messages;
		lastMessages.pop();

		return {
			...state,
			messages: lastMessages,
		};
	},

	clearMessages: (state: MessageState) => {
		return {
			...state,
			messages: [],
		};
	},
});
