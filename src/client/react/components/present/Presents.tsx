import React, { useState } from "@rbxts/react";
import { useEffect } from "@rbxts/react";
import { CollectionService, HttpService, Workspace } from "@rbxts/services";
import { MoneyValue } from "./moneyvalue";
import { createPortal } from "@rbxts/react-roblox";

export function Presents() {
	const [presentObjects, setPresentObjects] = useState<Model[]>([]);

	useEffect(() => {
		const plots = Workspace.WaitForChild("NPC-PROD", 10) as Folder;

		plots.DescendantAdded.Connect((present) => {
			if (present.HasTag("Present")) {
				setPresentObjects(CollectionService.GetTagged("Present") as Model[]);
			}
		});

		plots.DescendantRemoving.Connect((present) => {
			if (present.HasTag("Present")) {
				setPresentObjects(CollectionService.GetTagged("Present") as Model[]);
			}
		});
	}, []);

	return presentObjects.map((present) => (
		<MoneyValue
			key={present.Name}
			parent={present}
			value={present.GetAttribute("value") as number}
			chance={present.GetAttribute("chance") as string}
		/>
	));
}
