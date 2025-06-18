import { Service, OnStart } from "@flamework/core";
import { Ore } from "shared/enums/Ore";
import { getOreValue } from "shared/utils/oresutils";

@Service({})
export class DrillService implements OnStart {
	onStart() {}
}
