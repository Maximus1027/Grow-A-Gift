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
