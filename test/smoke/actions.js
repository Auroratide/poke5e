import {
	$,
	goto,
	evaluate,
	toRightOf,
	text,
} from "taiko"
import { url } from "./config.js"

export const startJourney = async (journeyName) => {
	console.log(`Starting Journey: ${journeyName}`)
	await goto(url)
}

export const readDescriptionDefinition = async (title) => {
	return await evaluate($("dd", toRightOf(text(title))), (element) => element.textContent)
}

export const visitPathExplicitly = async (path) => {
	await goto(`${url}${path}`)
}

export * from "taiko"
