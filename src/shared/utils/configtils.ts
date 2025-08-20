import * as Rebirths from "shared/config/rebirth.json";
import { RebirthConfig } from "shared/types/config";

export const getRebirthConfig = () => {
	return Rebirths as RebirthConfig;
};
