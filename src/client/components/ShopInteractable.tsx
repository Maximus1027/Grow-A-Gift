import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { store } from "client/react/store/store";
import { t } from "@rbxts/t";
import { storeType } from "client/react/components/store/Store";
import { Window } from "client/react/store/producer/windowproducer";

interface Attributes {
	shopType: string;
}

@Component({
	tag: "ShopInteract",
})
export class ShopInteractable extends BaseComponent<Attributes> implements OnStart {
	onStart() {
		if (this.attributes.shopType === undefined || !t.string(this.attributes.shopType)) {
			return;
		}

		let shopType = this.attributes.shopType;
		shopType = shopType.sub(0, 1).upper() + shopType.sub(2);

		const proximityPrompt = new Instance("ProximityPrompt");
		proximityPrompt.ObjectText = "Open " + shopType;

		proximityPrompt.Enabled = true;

		proximityPrompt.HoldDuration = 0.8;
		proximityPrompt.UIOffset = new Vector2(0, 30);
		proximityPrompt.MaxActivationDistance = 20;
		proximityPrompt.RequiresLineOfSight = false;

		proximityPrompt.Triggered.Connect(() => {
			store.toggleStore(this.attributes.shopType as storeType);
			store.setWindowState(Window.shop, true);
		});

		proximityPrompt.Parent = this.instance;
	}
}
