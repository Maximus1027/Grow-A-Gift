import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { Messages } from "./messages";
import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { store } from "client/react/store/store";
import { Window } from "client/react/store/producer/windowproducer";
import { MESSAGE } from "shared/types/messages";
import { getMessageConfig } from "shared/utils/configtils";

function sendMessage(reason: MESSAGE, ...args: string[]) {
	const messageData = getMessageConfig()[reason];

	if (!messageData) {
		return;
	}

	let i = 0;
	const [formattedMessage] = messageData.message.gsub("%%[sd]", () => {
		const val = args[i];
		i++;
		return tostring(val);
	});

	store.sendMessage(formattedMessage);
}

export = hoarcekat(() => {
	// store.sendMessage({ text: "This is a test message!", color: Color3.fromRGB(255, 0, 0) });
	// store.sendMessage({ text: "Test", color: Color3.fromRGB(0, 0, 255) });
	// store.sendMessage({ text: "Test", color: Color3.fromRGB(0, 0, 255) });
	// store.sendMessage({ text: "Test", color: Color3.fromRGB(0, 0, 255) });
	// store.sendMessage({ text: "Test", color: Color3.fromRGB(0, 0, 255) });
	// task.delay(1, () => {
	// 	store.sendMessage({ text: "Another message after 1 second!", color: Color3.fromRGB(0, 255, 0) });
	// });

	sendMessage(MESSAGE.INVENTORY, "5", "Igloo");

	return (
		<ReflexProvider producer={store}>
			<Messages />
		</ReflexProvider>
	);
});
