import { Controller, OnStart } from "@flamework/core";
import { ContextActionService, Players, RunService, UserInputService } from "@rbxts/services";
import { store } from "client/react/store/store";
import { getPlayerPlotFolder } from "shared/utils/generictils";

const mouse = Players.LocalPlayer.GetMouse();

@Controller({})
export class PickupController implements OnStart {
	private currentselection?: SelectionBox;

	onStart() {
		this.startSelectionLoop();

		UserInputService.InputBegan.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				const state = store.getState();

				//Ensure not currently placing
				if (state.build.selectedMachine !== "" || state.inventory.inventoryOpen) {
					return;
				}
				this.promptPickup();
			}
		});
	}

	startSelectionLoop() {
		const plot = getPlayerPlotFolder(Players.LocalPlayer);

		const loop = mouse.Move.Connect(() => {
			const potentialHouse = mouse.Target?.Parent;

			if (!potentialHouse || !potentialHouse!.HasTag("House")) {
				if (this.currentselection) {
					this.currentselection.Visible = false;
					this.currentselection = undefined;
				}

				return;
			}

			const selectionBox = potentialHouse?.FindFirstChild("select") as SelectionBox;

			print(selectionBox);

			//Remove last selectd
			if (this.currentselection && this.currentselection !== selectionBox) {
				this.currentselection!.Visible = false;
			}
			this.currentselection = selectionBox;
			if (selectionBox) {
				selectionBox.Visible = true;
			}
		});
	}

	promptPickup() {
		if (!this.currentselection) {
			return;
		}

		store.promptHouse(this.currentselection!.Parent!.Name);
	}
}
