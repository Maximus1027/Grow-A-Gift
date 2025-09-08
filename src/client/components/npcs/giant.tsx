import { OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { t } from "@rbxts/t";
import { getParticleFolder } from "shared/utils/generictils";
import { Workspace } from "@rbxts/services";
import { Janitor } from "@rbxts/janitor";
import CameraShaker from "@rbxts/camera-shaker";

const camera = Workspace.CurrentCamera as Camera;
const playerCFrame = camera.CFrame;

interface Attributes {}

@Component({})
export class Giant extends BaseComponent<Attributes> implements OnStart, OnTick {
	private janitor = new Janitor();
	private camShake = new CameraShaker(
		Enum.RenderPriority.Camera.Value,
		(shakeCFrame) => (camera.CFrame = camera.CFrame.mul(shakeCFrame)),
	);

	onStart() {
		if (!this.instance.IsDescendantOf(Workspace)) {
			return;
		}

		this.janitor.Add(
			this.instance.DescendantAdded.Connect((descendant) => {
				if (descendant.HasTag("Present") && descendant.IsA("Model")) {
					getParticleFolder().FindFirstChild("giant")!.Clone().Parent = descendant.PrimaryPart;
				}
			}),
		);
	}

	onTick(dt: number) {
		if (dt % 10 === 0 && !this.instance.IsDescendantOf(Workspace)) {
			return;
		}
		//
		//this.camShake.Shake(CameraShaker.Presets.Explosion);
	}

	destroy(): void {
		this.janitor.Cleanup();
	}
}
