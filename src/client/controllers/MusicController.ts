import { Controller, OnStart } from "@flamework/core";
import { SoundService } from "@rbxts/services";

@Controller({})
export class MusicController implements OnStart {
	private soundTrack: Sound[] = [];
	private muted = false;
	private index = 0;
	private volume = 0.23;

	onStart() {
		SoundService.GetChildren().forEach((child) => {
			if (child.IsA("Sound")) {
				this.soundTrack.push(child);
				child.Volume = this.volume;
			}
		});

		//randomize starting song
		this.index = math.random(0, this.soundTrack.size() - 1);

		// eslint-disable-next-line no-constant-condition
		while (true) {
			const sound = this.soundTrack[this.index];

			if (sound) {
				sound.Volume = this.muted ? 0 : this.volume;

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
		this.muted = !this.muted;

		this.soundTrack[this.index].Volume = this.muted ? 0 : this.volume;
	}
}
