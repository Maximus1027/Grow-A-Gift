import { Controller, OnInit, OnStart } from "@flamework/core";
import {
	CollectionService,
	ContextActionService,
	Players,
	ReplicatedStorage,
	RunService,
	UserInputService,
	Workspace,
} from "@rbxts/services";
import { store } from "client/react/store/store";
import {
	getHouseAssetsFolder,
	getPlayerPlot,
	getPlayerPlotFolder,
	isModelIntersecting,
	isModelWithinBounds,
} from "shared/utils/generictils";
import * as MainConfig from "shared/config/main.json";
import { Events } from "client/network";
import { PricePopup } from "client/react/components/houseselect/pricepopup";

const houses = getHouseAssetsFolder();
const player = Players.LocalPlayer;
const mouse = player.GetMouse();

//TODO: Finish game & get rich

@Controller({})
export class PlacementController implements OnStart, OnInit {
	private temp?: Folder;
	private tempMachine?: Model;
	private placementRotation: CFrame = new CFrame();

	private baseplate?: BasePart;
	onInit() {
		const machineFolder = new Instance("Folder");
		machineFolder.Name = "temp";
		machineFolder.Parent = Workspace;

		this.temp = machineFolder;
	}
	onStart() {
		Events.onDataLoaded.connect(() => this.setupPlacementListener());
	}

	private setupPlacementListener() {
		UserInputService.InputBegan.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				this.confirmPlacement();
			}
		});

		UserInputService.InputBegan.Connect((input) => {
			if (input.KeyCode === Enum.KeyCode.R) {
				if (this.tempMachine) this.rotateTemporaryHouse();
			}
		});

		const character = player.Character ?? player.CharacterAdded.Wait()[0];
		const head = character.PrimaryPart as Part;
		const plot = getPlayerPlotFolder(player);
		const baseplate = plot?.WaitForChild("baseplate", 10) as BasePart;
		this.baseplate = baseplate;

		const raycastParams = new RaycastParams();
		raycastParams.AddToFilter(baseplate);
		raycastParams.FilterType = Enum.RaycastFilterType.Include;

		const gridSize = MainConfig.gridSize as number;

		RunService.RenderStepped.Connect((dt) => {
			const direction = Workspace.CurrentCamera!.CFrame.LookVector;

			const angle = math.atan2(direction.X, direction.Z);

			const rot = math.rad(90);
			const fixedAngle = math.round(angle / rot) * rot;

			if (this.tempMachine) {
				const origin = Workspace.CurrentCamera!.CFrame.Position;

				const ray = Workspace.Raycast(origin, mouse.Hit.Position.sub(origin).Unit.mul(1000), raycastParams);

				if (ray) {
					const rayPosition = ray.Position;

					const housePivot = this.tempMachine.GetPivot();

					const gridPosition = new CFrame(
						math.floor(rayPosition.X / gridSize + 0.5) * gridSize,
						ray.Position.Y,
						math.floor(rayPosition.Z / gridSize + 0.5) * gridSize,
					);

					const target = gridPosition.mul(this.placementRotation);

					const lerped = housePivot.Lerp(target, 0.4);

					this.tempMachine.PivotTo(lerped);

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

	private rotateTemporaryHouse() {
		this.placementRotation = this.placementRotation.mul(CFrame.fromEulerAnglesXYZ(0, math.rad(-90), 0));
	}

	/**
	 * Place object on grid
	 */
	public confirmPlacement() {
		if (!this.tempMachine || isModelIntersecting(this.tempMachine) || !this.baseplate) {
			return;
		}

		if (!isModelWithinBounds(this.tempMachine, this.baseplate)) {
			return;
		}

		const plot = getPlayerPlot(player);

		Events.onPlotAction.fire("place", this.tempMachine.Name, this.tempMachine.GetPivot());

		this.stopPlacingMachine();
		task.delay(0.1, () => store.selectMachine(""));
	}

	/**
	 * place hologram at player mouse
	 * @param machineId
	 */
	public beginPlacingMachine(machineId: string) {
		const character = player.Character;
		if (!character) {
			return;
		}

		const machineDisplay = houses.FindFirstChild(machineId)?.Clone() as Model;
		machineDisplay.Name = `${machineDisplay}`;
		//machineDisplay.PivotTo(mouse.Hit);
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

		//** Starting orientation manipulation so that it faces the character */
		const direction = Workspace.CurrentCamera!.CFrame.LookVector;

		const angle = math.atan2(direction.X, direction.Z);

		const rot = math.rad(90);
		const fixedAngle = math.round(angle / rot) * rot;

		this.placementRotation = CFrame.fromEulerAnglesXYZ(0, fixedAngle - math.pi / 2, 0);

		machineDisplay.PivotTo(new CFrame(machineDisplay.GetPivot().Position).mul(this.placementRotation));

		this.tempMachine = machineDisplay;
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
