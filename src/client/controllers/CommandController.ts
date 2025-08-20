import { Controller, OnStart } from "@flamework/core";
import { Centurion } from "@rbxts/centurion";
import { CenturionUI } from "@rbxts/centurion-ui";
import { ReplicatedStorage, UserInputService } from "@rbxts/services";

@Controller({})
export class Command implements OnStart {
	onStart() {
		const client = Centurion.client();

		const cmdtypesFolder = ReplicatedStorage.GetDescendants().filter((child) => child.Name === "cmdtypes");

		if (cmdtypesFolder.size() > 0) {
			print("Loaded cmd type", cmdtypesFolder[0].GetChildren());
			client.registry.load(cmdtypesFolder[0]);
		}

		client.registry.synced.Connect((synced, incoming) => {
			print("Synced:", synced, "Incoming:", incoming);
		});

		client
			.start()
			.then(() =>
				// eslint-disable-next-line roblox-ts/no-any
				CenturionUI.start(Centurion.client(), {
					activationKeys: [Enum.KeyCode.F],
				}),
			)
			.catch((err) => warn("Failed to start Centurion:", err));
	}
}
