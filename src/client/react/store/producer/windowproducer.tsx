/**
 * This producer will serve as the window manager across all UI,
 */

import { createProducer } from "@rbxts/reflex";
import { CrateState } from "./crateproducer";

export enum Window {
	"hud" = "hud",
	"confirm" = "confirm",
	"crateopen" = "crateopen",
	"inventory" = "inventory",
	"shop" = "shop",
	"store" = "store",
	"township" = "township",
	"houseselect" = "houseselect",
	"rebirth" = "rebirth",
	"invite" = "invite",
	"spin" = "spin",
}

export interface WindowState {
	inFocus: boolean; //if only one window is focused on (like crate roll)
	windows: {
		[key in keyof typeof Window]?: boolean;
	};
}

const initialState: WindowState = {
	inFocus: false,
	windows: {
		hud: true,
	},
};

let savedWindows: WindowState["windows"] = {};

export const WindowActions = createProducer(initialState, {
	setFocusedWindow: (state: WindowState, window?: Window) => {
		if (window !== undefined) {
			//save windows open before close
			savedWindows = state.windows;
		}

		return {
			...state,
			inFocus: window !== undefined,
			windows:
				window !== undefined
					? {
							[window]: true,
					  }
					: savedWindows,
		};
	},
	setWindowState: (state: WindowState, window: Window, enabled: boolean) => {
		if (state.inFocus) {
			return state;
		}

		return {
			...state,
			windows: {
				...state.windows,
				[window]: enabled,
			},
		};
	},
	toggleWindowState: (state: WindowState, window: Window) => {
		if (state.inFocus) {
			return state;
		}

		return {
			...state,
			windows: {
				...state.windows,
				[window]: !state.windows[window],
			},
		};
	},
});
