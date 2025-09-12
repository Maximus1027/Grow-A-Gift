import { Controller, OnStart } from "@flamework/core";
import { MusicController } from "./MusicController";
import { TopBar } from "client/react/components/hud/topbar";
import { Icon } from "@rbxts/topbar-plus";

@Controller({})
export class TopbarController implements OnStart {
	constructor(private readonly musicController: MusicController) {}

	onStart() {
		const icon = new Icon().setImage("rbxassetid://105571421404169").setImageScale(0.8);
		icon.clearNotices();

		let muted = false;

		const toggleMute = () => {
			muted = !muted;
			icon.setImage(muted ? "rbxassetid://111007362708614" : "rbxassetid://105571421404169");

			this.musicController.muteMusic();
		};

		icon.selected.Connect(() => toggleMute());
		icon.deselected.Connect(() => toggleMute());
	}
}
