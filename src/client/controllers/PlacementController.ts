import { Controller, OnInit, OnStart } from "@flamework/core";
import {
	ContextActionService,
	Players,
	ReplicatedStorage,
	RunService,
	UserInputService,
	Workspace,
} from "@rbxts/services";
import { store } from "client/react/store/store";
import { getHouseAssetsFolder, getPlayerPlot, isModelIntersecting } from "shared/utils/generictils";
import * as MainConfig from "shared/config/main.json";
import { Events } from "client/network";

const houses = getHouseAssetsFolder();
const player = Players.LocalPlayer;
const mouse = player.GetMouse();

//TODO: Finish game & get rich

@Controller({})
export class PlacementController implements OnStart, OnInit {
	private temp?: Folder;
	private tempMachine?: Model;
	onInit() {
		const machineFolder = new Instance("Folder");
		machineFolder.Name = "temp";
		machineFolder.Parent = Workspace;

		this.temp = machineFolder;
	}
	onStart() {
		UserInputService.InputBegan.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				this.confirmPlacement();
			}
		});

		const character = player.Character ?? player.CharacterAdded.Wait()[0];
		const head = character.PrimaryPart as Part;
		const plot = getPlayerPlot(player);

		const gridSize = MainConfig.gridSize as number;

		RunService.RenderStepped.Connect((dt) => {
			if (this.tempMachine) {
				const raycastParams = new RaycastParams();
				raycastParams.AddToFilter(plot.FindFirstChild("baseplate") as BasePart);
				raycastParams.FilterType = Enum.RaycastFilterType.Include;

				const origin = Workspace.CurrentCamera!.CFrame.Position;

				const ray = Workspace.Raycast(origin, mouse.Hit.Position.sub(origin).Unit.mul(1000), raycastParams);

				if (ray) {
					const divPivot = ray.Position;
					const gridPivot = new CFrame(
						math.floor(divPivot.X / gridSize + 0.5) * gridSize,
						ray.Position.Y,
						math.floor(divPivot.Z / gridSize + 0.5) * gridSize,
					);

					this.tempMachine.PivotTo(this.tempMachine.GetPivot().Lerp(gridPivot, 0.6));

					const selectionBox = this.tempMachine.FindFirstChildWhichIsA("SelectionBox");

					if (isModelIntersecting(this.tempMachine)) {
						selectionBox!.SurfaceColor3 = Color3.fromRGB(255, 0, 0);
					} else {
						selectionBox!.SurfaceColor3 = Color3.fromRGB(0, 255, 18);
					}
				}
			}
		});
	}
	/**
	 * Toggle build mode on client
	 */
	public toggleBuildMode() {
		if (this.tempMachine) {
			this.stopPlacingMachine();
			store.selectMachine("");
		}
		store.toggleBuild();
	}

	/**
	 * Place object on grid
	 */
	public confirmPlacement() {
		if (!this.tempMachine || isModelIntersecting(this.tempMachine)) {
			return;
		}

		const plot = getPlayerPlot(player);

		Events.onPlotAction.fire("place", this.tempMachine.Name, this.tempMachine.GetPivot().Position);

		this.stopPlacingMachine();
		task.delay(0.1, () => store.selectMachine(""));
	}

	/**
	 * place hologram at player mouse
	 * @param machineId
	 */
	public beginPlacingMachine(machineId: string) {
		const machineDisplay = houses.FindFirstChild(machineId)?.Clone() as Model;
		machineDisplay.Name = `${machineDisplay}`;
		machineDisplay.PivotTo(mouse.Hit);
		machineDisplay!.Parent = this.temp;

		const selectionBox = new Instance("SelectionBox");
		selectionBox.Name = "status";
		selectionBox.Adornee = machineDisplay;
		selectionBox.Transparency = 1;
		selectionBox.SurfaceTransparency = 0.8;

		selectionBox.Parent = machineDisplay;

		machineDisplay.GetDescendants().forEach((child) => {
			if (child.IsA("BasePart")) {
				child.CanCollide = false;
				child.Transparency = 0.3;
			}
		});

		this.tempMachine = machineDisplay;

		print("wprking");
	}

	/**
	 * stop hologram
	 */
	public stopPlacingMachine() {
		if (this.tempMachine) {
			this.tempMachine?.Destroy();
		}

		this.tempMachine = undefined;
	}
}
