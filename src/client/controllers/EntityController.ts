import { Controller, OnInit, OnStart } from "@flamework/core";
import Object from "@rbxts/object-utils";
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Events } from "client/network";
import { Rarity } from "shared/enums/Rarity";
import { NPC } from "shared/npc/pernpc";
import { NPCConfig } from "shared/types/config";
import { ClientNPC, NPCPacket } from "shared/types/entity";
import { calculateGoalTime, getDistanceFromPlayer, tick } from "shared/utils/generictils";
import { convertChanceToStringMarkup, getHouseConfig, getNPCConfig } from "shared/utils/loot";
import { ObjectPool } from "shared/utils/objectpool";
import { getPlayerNPCFolder } from "shared/utils/playertils";

const sharedAssets = ReplicatedStorage.WaitForChild("assets") as Folder;
const presents = sharedAssets.WaitForChild("presents") as Folder;
const npcModels = sharedAssets.WaitForChild("npc") as Folder;

const rarities = Object.keys(Rarity);
const houses = Object.keys(getHouseConfig());
const npckeys = Object.keys(getNPCConfig());

const player = Players.LocalPlayer;
const plotsFolder = Workspace.WaitForChild("Plots");

@Controller({})
export class EntityController implements OnStart, OnInit {
	private objectPools: Record<keyof NPCConfig, ObjectPool<ClientNPC>> = {};
	private NPCFolder?: Folder;
	onInit() {
		this.NPCFolder = new Instance("Folder");
		this.NPCFolder.Name = "NPC-PROD";
		this.NPCFolder.Parent = Workspace;

		for (const npc of Object.entries(getNPCConfig())) {
			const model = npcModels.FindFirstChild(npc[0]) as ClientNPC;

			if (!model) continue;

			this.objectPools[npc[0]] = new ObjectPool<ClientNPC>(model, 20, this.NPCFolder);
		}
	}

	onStart() {
		Events.onNPC.connect((npcs: NPCPacket[]) => this.loadNPCs(npcs));

		// while (task.wait(0.1)) {
		// 	new NPC(
		// 		Players.LocalPlayer,
		// 		this.objectPool as ObjectPool<ClientNPC>,
		// 		new Vector3(-590.691, 9.847, 469.029),
		// 		new Vector3(-545.542 + math.random(-20, 20), 8.604, 464.97 + math.random(-20, 20)),
		// 		Rarity.Common,
		// 		"test",
		// 		5,
		// 		Workspace.WaitForChild("Plots"),
		// 	);
		// }
	}

	loadNPCs(npcs: NPCPacket[]) {
		npcs.forEach((packet) => {
			const dis = getDistanceFromPlayer(player, packet[0]);

			const foundPlayer = Players.GetPlayerByUserId(packet[2]);

			if (t.number(dis) && dis < 100 && foundPlayer) {
				const rarity = rarities[packet[5]] as Rarity;
				const houseid = houses[packet[6]];

				const npcid = npckeys[packet[8]];
				const npcdata = getNPCConfig()[npcid];

				const chanceDisplay = convertChanceToStringMarkup(rarity, houseid);
				const time = calculateGoalTime(packet[0], packet[1], npcdata.walkspeed);
				const tickOffset = tick() - packet[7];

				const pool = this.objectPools[npcid];

				if (!pool) return;

				new NPC(
					foundPlayer,
					pool,
					npcid,
					packet[0],
					packet[1],
					packet[4],
					rarity,
					chanceDisplay,
					time - tickOffset,
					this.NPCFolder as Folder,
				);
			}
		});
	}
}
