/// <reference types="@sveltejs/kit" />

import type { Move } from "$lib/moves/types"
import type { Pokemon } from "$lib/poke5e/legacy-types"

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	interface Stuff {
		moves: Move[],
		pokemons: Pokemon[],
	}
}
