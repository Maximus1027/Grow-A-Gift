import * as Rebirths from "shared/config/rebirth.json";
import * as UI from "shared/config/ui.json";
import * as Rewards from "shared/config/rewards.json";
import { RebirthConfig, RewardConfig, UIConfig } from "shared/types/config";

export const getRebirthConfig = () => {
	return Rebirths as RebirthConfig;
};

export const getUIConfig = () => {
	return UI as UIConfig;
};

export const getRewardsConfig = () => {
	return Rewards as unknown as RewardConfig;
};
