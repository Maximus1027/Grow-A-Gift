import { OnInit, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { TweenService } from "@rbxts/services";
import { ClientNPC } from "shared/types/entity";
import { Rarity } from "shared/enums/Rarity";

interface Attributes {
	goal: Vector3;
	time: number;
}

@Component({})
export class PerNPC extends BaseComponent<Attributes, ClientNPC> implements OnStart, OnTick {
	private active: boolean = true;
	onTick(dt: number): void {
		if (!this.active) {
			return;
		}

		const rot = math.sin((1 / this.attributes.time) * 20 * tick()) * 22;
		const model = this.instance;

		model["Right Leg"].Orientation = new Vector3(rot, 90, 0);
		model["Left Leg"].Orientation = new Vector3(-rot, 90, 0);
	}
	onStart() {
		const model = this.instance;
		model["Left Arm"].Orientation = new Vector3(65, 90, 0);
		model["Right Arm"].Orientation = new Vector3(65, 90, 0);

		this.startWalking();
	}
	startWalking() {
		const goalPos = new Vector3(this.attributes.goal.X, this.instance.GetPivot().Y, this.attributes.goal.Z);
		const orientation = new CFrame(this.instance.GetPivot().Position, goalPos);

		const hrp = this.instance.PrimaryPart as BasePart;
		const time = this.attributes.time;

		hrp.CFrame = orientation;

		const tween = TweenService.Create(hrp, new TweenInfo(time, Enum.EasingStyle.Linear), {
			//Position: this.goal,
			CFrame: new CFrame(goalPos).mul(orientation.Rotation),
		});

		tween.Play();
		task.delay(time, () => this.finish());
	}
	finish(): void {
		this.active = false;
		this.destroy();
		this.instance.Destroy();
	}
}
