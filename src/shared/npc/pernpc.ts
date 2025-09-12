import { Dependency } from "@flamework/core";
import { HttpService, ReplicatedStorage, ServerStorage, TweenService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Boost } from "shared/enums/Boost";
import { Rarity } from "shared/enums/Rarity";
import { NPCConfig, NPCData } from "shared/types/config";
import { ClientNPC, EntityNPC } from "shared/types/entity";
import { abbreviateNumber } from "shared/utils/generictils";
import { getNPCConfig } from "shared/utils/loot";
import { ObjectPool } from "shared/utils/objectpool";
import { getMoneyStat } from "shared/utils/playertils";
import { getPresentValue } from "shared/utils/presentutils";

const sharedAssets = ReplicatedStorage.WaitForChild("assets") as Folder;
const presents = sharedAssets.WaitForChild("presents") as Folder;
const npcModel = sharedAssets.WaitForChild("npc")!.WaitForChild("default") as ClientNPC;

/**
 * Server side Npc object
 * Creates entity and destroys when reach destination
 */
export class NPC {
	private npc: ClientNPC;
	private present?: Model;
	private animation: Animation;
	private npcData: NPCData;

	constructor(
		readonly owner: Player,
		readonly pool: ObjectPool<ClientNPC>,
		readonly npcid: keyof NPCConfig,
		readonly spawnLocation: Vector3,
		readonly goalLocation: Vector3,
		readonly presentWorth: number,
		readonly presentRarity: Rarity,
		readonly chanceDisplay: string,
		readonly time: number,
		readonly parent: Instance,
	) {
		const moneyBoost = this.owner.GetAttribute(Boost.Income) ?? 1;

		const newNPC = this.pool.getObject();
		this.npc = newNPC;

		this.npcData = getNPCConfig()[this.npcid];

		const animation = new Instance("Animation");
		animation.AnimationId = this.npcData.animation;

		this.animation = animation;

		this.spawn();
		this.attachPresent();
		this.walk();
	}

	private spawn() {
		this.npc.PivotTo(new CFrame(this.spawnLocation.add(new Vector3(0, this.npc.GetExtentsSize().Y / 2, 0))));

		this.npc.SetAttribute("time", this.time);
		this.npc.SetAttribute("goal", this.goalLocation);

		this.npc.Parent = this.parent;

		this.setTransparency(1, 0, true);
	}

	private walk() {
		const goalPos = new Vector3(this.goalLocation.X, this.npc.GetPivot().Y, this.goalLocation.Z);

		const hrp = this.npc.PrimaryPart as BasePart;
		const orientation = new CFrame(this.npc.GetPivot().Position, goalPos);
		hrp.CFrame = orientation;

		const anim = this.npc.AnimationController.Animator.LoadAnimation(this.animation);
		const goal = new CFrame(goalPos).mul(orientation.Rotation);

		const tween = TweenService.Create(hrp, new TweenInfo(this.time, Enum.EasingStyle.Linear), {
			//Position: this.goal,
			CFrame: goal,
		});

		anim.Play();
		tween.Play();
		tween.Completed.Once(() => {
			this.finish();
			tween.Destroy();
			anim.Stop();
			anim.Destroy();
		});
		//task.delay(this.time, () => this.finish());
	}

	private attachPresent() {
		const newPresent = presents.FindFirstChild(this.presentRarity)?.Clone() as Model;
		newPresent.ScaleTo(this.npcData.giftscale);
		newPresent.AddTag("Present");
		newPresent.Name = HttpService.GenerateGUID();
		newPresent.GetChildren().forEach((part) => {
			if (part.IsA("BasePart")) {
				part.CollisionGroup = "npc";
			}
		});

		const abbreviatedValue = abbreviateNumber(this.presentWorth);

		const formattedValue = this.npcData.present.value.format(abbreviatedValue);
		const formattedChance = this.npcData.present.chance.format(this.chanceDisplay);
		newPresent.SetAttribute("value", formattedValue ?? abbreviatedValue);
		newPresent.SetAttribute("chance", formattedChance ?? this.chanceDisplay);
		newPresent.SetAttribute("guiscale", this.npcData.guiscale);

		const torso = this.npc.Torso;

		const motor6d = new Instance("Motor6D");

		motor6d.Part0 = torso;
		motor6d.Part1 = newPresent.PrimaryPart;
		motor6d.C1 = new CFrame(0, 0, newPresent.GetExtentsSize().X);
		motor6d.Parent = newPresent;

		newPresent.Parent = torso;

		this.present = newPresent;
	}

	private finish() {
		if (this.present) {
			this.present.Destroy();
		}
		task.spawn(() => {
			//	this.setTransparency(1, 0, false);
			this.setTransparency(0, 1, true);
			task.wait(1);

			this.pool.returnObject(this.npc);
		});
	}

	private setTransparency(startT: number, goalT: number, tween: boolean) {
		this.npc?.GetDescendants().forEach((part) => {
			if (t.instanceIsA("BasePart")(part) && this.npc?.PrimaryPart !== part) {
				if (!tween) {
					part.Transparency = goalT;
					return;
				}
				part.Transparency = startT;
				TweenService.Create(part, new TweenInfo(0.8), {
					Transparency: goalT,
				}).Play();
			}
		});
	}
}
