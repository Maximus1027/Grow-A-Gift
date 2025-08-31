import { Rarity } from "shared/enums/Rarity";

export type EntityNPC = Model & {
	Humanoid: Humanoid & {
		Animator: Animator;
	};
	Torso: BasePart & {
		Present: Present;
	};
};

export type Present = Model & {
	base: BasePart;
};

export type ClientNPC = Model & {
	["Left Leg"]: Part;
	["Right Arm"]: Part;
	Head: Part & {
		Mesh: SpecialMesh;
		face: Decal;
	};
	["Right Leg"]: Part;
	Torso: Part;
	HumanoidRootPart: Part;
	["Left Arm"]: Part;
	AnimationController: AnimationController & {
		Animator: Animator;
	};
};

export type NPCPacket = [
	Vector3, //start
	Vector3, //goal
	number, //playerid
	number, //npcid
	number, //money
	number, //rarityid
	number, //housid
	number, //spawn tick
];
