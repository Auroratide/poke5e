import { Move } from "../Move"
import type { TmDetails } from "./TmDetails"

export type Tm = Move & {
	get tm(): TmDetails
}
