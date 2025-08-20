import { Controller, OnStart } from "@flamework/core";
import { Events } from "client/network";
import { Window } from "client/react/store/producer/windowproducer";
import { store } from "client/react/store/store";

@Controller({})
export class SpinController implements OnStart {
	onStart() {
		Events.onReward.connect((rewardType, reward) => {
			if (rewardType !== "spin") return;

			store.setReward(reward);
			store.setFocusedWindow(Window.spin);
		});
	}
}
