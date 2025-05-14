<script lang="ts">
	import type { PokeType } from "../types"
	import BugIcon from "./BugIcon.svelte"
	import DarkIcon from "./DarkIcon.svelte"
	import DragonIcon from "./DragonIcon.svelte"
	import ElectricIcon from "./ElectricIcon.svelte"
	import FairyIcon from "./FairyIcon.svelte"
	import FightingIcon from "./FightingIcon.svelte"
	import FireIcon from "./FireIcon.svelte"
	import FlyingIcon from "./FlyingIcon.svelte"
	import GhostIcon from "./GhostIcon.svelte"
	import GrassIcon from "./GrassIcon.svelte"
	import GroundIcon from "./GroundIcon.svelte"
	import IceIcon from "./IceIcon.svelte"
	import NormalIcon from "./NormalIcon.svelte"
	import PoisonIcon from "./PoisonIcon.svelte"
	import PsychicIcon from "./PsychicIcon.svelte"
	import RockIcon from "./RockIcon.svelte"
	import SteelIcon from "./SteelIcon.svelte"
	import WaterIcon from "./WaterIcon.svelte"

	export let type: PokeType
</script>

{#if type === "bug"}
	<BugIcon />
{:else if type === "dark"}
	<DarkIcon />
{:else if type === "dragon"}
	<DragonIcon />
{:else if type === "electric"}
	<ElectricIcon />
{:else if type === "fairy"}
	<FairyIcon />
{:else if type === "fighting"}
	<FightingIcon />
{:else if type === "fire"}
	<FireIcon />
{:else if type === "flying"}
	<FlyingIcon />
{:else if type === "ghost"}
	<GhostIcon />
{:else if type === "grass"}
	<GrassIcon />
{:else if type === "ground"}
	<GroundIcon />
{:else if type === "ice"}
	<IceIcon />
{:else if type === "normal"}
	<NormalIcon />
{:else if type === "poison"}
	<PoisonIcon />
{:else if type === "psychic"}
	<PsychicIcon />
{:else if type === "rock"}
	<RockIcon />
{:else if type === "steel"}
	<SteelIcon />
{:else if type === "water"}
	<WaterIcon />
{/if}