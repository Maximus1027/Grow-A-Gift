import { Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";

export class ObjectPool<T extends Model> {
	private pool;
	constructor(readonly object: T, readonly amount: number, readonly parent: Instance) {
		if (!t.Instance(object)) {
			warn("Object must be an instance");
			return;
		}

		const newPool: T[] = [];

		for (let i = 0; i < amount; i++) {
			const o = object.Clone();
			o.Parent = parent;
			newPool.push(o);
		}

		this.pool = newPool;
	}

	public getObject(): T {
		const found = this.pool!.pop();

		if (found) return found;

		print("Instantiated a new object");

		return this.object.Clone();
	}

	public getPool(): T[] {
		return this.pool || [];
	}

	public returnObject(object: T) {
		object.PivotTo(object.GetPivot().sub(new Vector3(0, 50, 0)));
		this.pool?.push(object);
	}
}
