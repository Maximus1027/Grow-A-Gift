import React from "@rbxts/react";
import { useEffect } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { createPortal } from "@rbxts/react-roblox";
import { TweenService, Workspace } from "@rbxts/services";
import { RootState } from "client/react/store/store";

export function FovEffect() {
	const focused = useSelector((state: RootState) => state.windowManager.inFocus);

	const camera = Workspace.CurrentCamera;
	const tweenOptions = new TweenInfo(0.4, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out);

	useEffect(() => {
		if (!camera) {
			return;
		}

		const tween = TweenService.Create(camera, tweenOptions, { FieldOfView: focused ? 90 : 70 });

		tween.Play();
	}, [focused]);

	return <frame />;
}
