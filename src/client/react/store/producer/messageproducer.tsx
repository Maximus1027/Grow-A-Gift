import { createProducer } from "@rbxts/reflex";
import { InventoryState } from "./inventoryproducer";

export type Message = {
	text: string;
	color: Color3;
};

export interface MessageState {
	messages: Message[];
}

const initialState: MessageState = {
	messages: [],
};

export const MessageActions = createProducer(initialState, {
	sendMessage: (state: MessageState, message: Message) => {
		return {
			...state,
			messages: [...state.messages, message],
		};
	},
});
