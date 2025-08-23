import * as Rebirths from "shared/config/rebirth.json";
import * as UI from "shared/config/ui.json";
import { RebirthConfig, UIConfig } from "shared/types/config";

export const getRebirthConfig = () => {
	return Rebirths as RebirthConfig;
};

export const getUIConfig = () => {
	return UI as UIConfig;
};
