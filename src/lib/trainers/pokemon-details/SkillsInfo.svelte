<script lang="ts">
    import type { TrainerPokemon } from '../types'
    import FlatDl from '$lib/design/FlatDl.svelte'
    import { proficiencyBonus, proficiencyModifier } from '$lib/dnd/proficiency'
    import { modifierForScore } from '$lib/dnd/attributes'

    export let pokemon: TrainerPokemon

    $: pb = proficiencyBonus(pokemon.level)
</script>

<FlatDl columns={2}>
    <dt>Saves</dt>
    <div class="upper">
        {#each pokemon.savingThrows as savingThrow}
            <dd>{savingThrow} +{modifierForScore(pokemon.attributes[savingThrow]) + pb}</dd>
        {/each}
    </div>
    <dt>Proficiencies</dt>
    <div class="cap">
        {#each pokemon.proficiencies as proficiency}
            <dd>{proficiency} +{proficiencyModifier(proficiency, pokemon.attributes, pb)}</dd>
        {/each}
    </div>
</FlatDl>
