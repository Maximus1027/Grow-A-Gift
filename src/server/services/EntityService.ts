import { Service, OnStart } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { Players, Workspace } from "@rbxts/services";
import { Events } from "server/network";
import { Rarity } from "shared/enums/Rarity";
import { NPC } from "shared/npc/npc";
import { NPCPacket } from "shared/types/entity";
import { getHouseConfig, getNPCConfig } from "shared/utils/loot";
import { ObjectPool } from "shared/utils/objectpool";

const rarities = Object.keys(Rarity);
const houses = Object.keys(getHouseConfig());
const npcs = Object.keys(getNPCConfig());

@Service({})
export class EntityService implements OnStart {
	private NPCQueue: NPCPacket[] = [];
	onStart() {
		task.spawn(() => {
			while (task.wait(1)) {
				if (this.NPCQueue.size() < 1) {
					continue;
				}

				Events.onNPC.broadcast(this.NPCQueue);
				this.NPCQueue.clear();
			}
		});
	}

	/**
	 * Add npc to data set which is sent to clients for rendering
	 * @param owner
	 * @param spawn
	 * @param goal
	 * @param rarity
	 * @param houseid
	 * @param parent
	 */
	spawnNPC(
		owner: Player,
		spawn: Vector3,
		goal: Vector3,
		money: number,
		rarity: Rarity,
		houseid: string,
		arrivalTick: number,
		npcid: string,
	) {
		const packet: NPCPacket = [
			spawn,
			goal,
			owner.UserId,
			0,
			money,
			rarities.indexOf(rarity),
			houses.indexOf(houseid),
			arrivalTick,
			npcs.indexOf(npcid),
		];

		print(npcid);

		this.NPCQueue.push(packet);
	}
}
