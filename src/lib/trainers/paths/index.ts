import { TrainerPaths as TrainerPaths2018 } from "./2018"
import { TrainerPaths as TrainerPaths2024 } from "./2024"
import type { TrainerPath } from "./TrainerPath"

export * from "./TrainerPath"

export const TrainerPaths: Record<string, TrainerPath[]> = {
	"2018": TrainerPaths2018,
	"2024": TrainerPaths2024,
}
