import { Service, OnStart } from "@flamework/core";
import { Centurion } from "@rbxts/centurion";
import { ReplicatedStorage } from "@rbxts/services";

@Service({
	loadOrder: 1,
})
export class CommandService implements OnStart {
	onStart() {
		const server = Centurion.server({
			syncFilter: (player) => {
				return true;
			},
		});

		const commands = script.Parent!.WaitForChild("cmdr");
		const cmdtypesFolder = ReplicatedStorage.GetDescendants().filter((child) => child.Name === "cmdtypes");

		if (cmdtypesFolder.size() > 0) {
			server.registry.load(cmdtypesFolder[0]);
		}
		server.registry.load(commands);

		server.start();
	}
}
