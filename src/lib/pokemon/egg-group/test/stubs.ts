import { EggGroup } from "../EggGroup"

export function stubEggGroup(groups: string[] = ["field"]): EggGroup {
	return new EggGroup(groups)
}
