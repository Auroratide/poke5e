import type { MarkdownString } from "$lib/ui/rendering"
import FoundryVttModuleImage from "./foundry-vtt-module.jpg"

export type Resource = {
	name: string,
	description: MarkdownString,
	href: string,
	cta: string,
	img: string,
	alt: string,
	caption: string,
	details: MarkdownString,
}

export const Resources: Resource[] = [ {
	name: "Foundry VTT Module",
	description: "Module for [Foundry Virtual Tabletop](https://foundryvtt.com).",
	href: "https://github.com/MissingGlitch/pokemon5e-foundry-module",
	cta: "View Foundry Module",
	img: FoundryVttModuleImage,
	alt: "",
	caption: "Raise your Pokémon in Foundry!",
	details: "### Main Features\n- All 18 Pokémon types added as damage types.\n- Comprehensive compendium of pokémon, items, and trainers.\n- Automations for all of the pokémon moves.\n- Status Effects added as conditions.\n- Pokémon currency and origins added.",
} ]
