import React, { useState } from "@rbxts/react";
import { useEffect } from "@rbxts/react";
import { CollectionService, Workspace } from "@rbxts/services";
import { MoneyValue } from "./moneyvalue";
import { createPortal } from "@rbxts/react-roblox";

export function Presents() {
	const [presentObjects, setPresentObjects] = useState<Model[]>([]);

	useEffect(() => {
		const plots = Workspace.WaitForChild("Plots") as Folder;

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

	return presentObjects.map((present) => <MoneyValue parent={present} presentid={present.Name} />);
}
