import { Dependency } from "@flamework/core";
import { HttpService, ReplicatedStorage, ServerStorage, TweenService } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Rarity } from "shared/enums/Rarity";
import { EntityNPC } from "shared/types/entity";
import { getMoneyStat } from "shared/utils/playertils";
import { getPresentValue } from "shared/utils/presentutils";

const serverAssets = ServerStorage.WaitForChild("assets") as Folder;
const npcModel = serverAssets!.WaitForChild("npc")!.WaitForChild("default") as EntityNPC;
const sharedAssets = ReplicatedStorage.WaitForChild("assets") as Folder;
const presents = sharedAssets.WaitForChild("presents") as Folder;

const animation = new Instance("Animation");
animation.AnimationId = "rbxassetid://95117573488710";

/**
 * Server side Npc object
 * Creates entity and destroys when reach destination
 */
export class NPC {
	private entity?: EntityNPC;
	private presentWorth?: number;

	constructor(
		readonly parent: Folder,
		readonly spawnLocation: Vector3,
		readonly goalLocation: Vector3,
		readonly presentRarity: Rarity,
		readonly owner: Player,
	) {
		const newNPC = npcModel.Clone();
		newNPC.Name = HttpService.GenerateGUID();
		newNPC.PivotTo(new CFrame(spawnLocation.add(new Vector3(0, newNPC.GetExtentsSize().Y / 2, 0)), goalLocation));

		this.entity = newNPC;

		this.spawn();
	}

	public getEntity() {
		return this.entity;
	}

	private spawn() {
		this.entity!.Parent = this.parent;
		this.setTransparency(1, 0);

		this.entity?.Humanoid.MoveTo(this.goalLocation);
		this.entity?.Humanoid.MoveToFinished.Once((reached) => {
			this.finish();
		});

		this.attachPresent(this.presentRarity);

		this.entity!.Humanoid.Animator.LoadAnimation(animation).Play();
	}

	private attachPresent(rarity: Rarity) {
		const newPresent = presents.FindFirstChild(rarity)?.Clone() as Model;
		newPresent.GetChildren().forEach((part) => {
			if (part.IsA("BasePart")) {
				part.CollisionGroup = "npc";
			}
		});

		const presentWorth = getPresentValue(this.presentRarity);
		this.presentWorth = math.random(presentWorth!.min, presentWorth!.max);
		newPresent.SetAttribute("value", this.presentWorth);

		const torso = this.entity!.Torso;
		newPresent.Parent = torso;

		const motor6d = new Instance("Motor6D");

		motor6d.Part0 = torso;
		motor6d.Part1 = newPresent.PrimaryPart;
		motor6d.C1 = new CFrame(0, 0, newPresent.GetExtentsSize().X);
		motor6d.Parent = torso;
	}

	private finish() {
		task.spawn(() => {
			task.wait(0.5);
			this.setTransparency(0, 1);
			task.wait(1);
			this.entity?.Destroy();
		});

		const money = getMoneyStat(this.owner);
		if (t.number(this.presentWorth)) {
			money.Value += this.presentWorth;
		}
	}

	private setTransparency(startT: number, goalT: number) {
		this.entity?.GetDescendants().forEach((part) => {
			if (t.instanceIsA("BasePart")(part) && this.entity?.PrimaryPart !== part) {
				part.Transparency = startT;
				TweenService.Create(part, new TweenInfo(1), {
					Transparency: goalT,
				}).Play();
			}
		});
	}
}
