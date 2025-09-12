import { Controller, OnInit, OnStart } from "@flamework/core";
import { ReplicatedStorage, SoundService } from "@rbxts/services";
import { Events } from "client/network";

@Controller({})
export class MusicController implements OnInit {
	private soundTrack: Sound[] = [];
	private playing = true;
	private index = 0;
	private volume = 0.23;

	onInit() {
		Events.onDataLoaded.connect(() => {
			this.startMusic();
		});
	}

	private startMusic() {
		SoundService.GetChildren().forEach((child) => {
			if (child.IsA("Sound")) {
				this.soundTrack.push(child);
				child.Volume = this.volume;
			}
		});

		//randomize starting song
		this.index = math.random(0, this.soundTrack.size() - 1);

		if (this.soundTrack.size() === 0) {
			warn("No soundtrack found in SoundService");
			return;
		}

		// eslint-disable-next-line no-constant-condition
		while (true) {
			const sound = this.soundTrack[this.index];

			if (sound) {
				sound.Playing = this.playing;

				sound.Play();

				sound.Ended.Wait();

				this.index++;
				continue;
			}

			if (this.index >= this.soundTrack.size()) {
				this.index = 0;
				continue;
			}

			warn("No soundtrack found in SoundService");
			return;
		}
	}

	muteMusic() {
		this.playing = !this.playing;

		this.soundTrack[this.index].Playing = this.playing;
	}
}
