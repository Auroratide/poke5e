<script lang="ts" context="module">
    export type UpdateDetail = TrainerPokemon
</script>

<script lang="ts">
    import { Gender, type TrainerPokemon } from '../types'
    import { createEventDispatcher } from 'svelte'
    import Button from '$lib/design/Button.svelte'
    import Fieldset from '$lib/design/Form/Fieldset.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'
    import NatureInput from './NatureInput.svelte'
    import { attributeList } from '$lib/dnd/attributes'
    import { skillList } from '$lib/dnd/proficiency'
    import type { Pokemon } from '$lib/creatures/types'
    import Loader from '$lib/design/Loader.svelte'

    const noSpaces = (s: string) => s.replace(/\s/g, '')
    
    const dispatch = createEventDispatcher()

    export let pokemon: TrainerPokemon
    export let species: Pokemon
    export let saving: boolean = false
    $: disabled = saving

    let nickname = pokemon.nickname
    let nature = pokemon.nature
    let natureCustom = pokemon.nature
    let level = pokemon.level
    let ac = pokemon.ac
    let maxHp = pokemon.hp.max
    let gender = pokemon.gender
    let attributes = { ...pokemon.attributes }
    let proficiencies = pokemon.proficiencies
    let savingThrows = pokemon.savingThrows

    const cancel = () => {
        dispatch('cancel')
    }
    const endEdit = () => {
        dispatch('update', {
            ...pokemon,
            nickname: nickname.length > 0 ? nickname : species.name,
            nature: nature === 'other' ? natureCustom : nature,
            level,
            ac,
            hp: {
                current: pokemon.hp.current,
                max: maxHp,
            },
            hitDice: {
                current: pokemon.hitDice.current,
                max: pokemon.level,
            },
            gender,
            attributes,
            proficiencies,
            savingThrows,
        } as UpdateDetail)
    }
</script>

<div class="relative">
    <form on:submit|preventDefault={endEdit} class:muted={saving}>
        <Fieldset title="Basic Info">
            <label for="nickname-input">Nickname</label>
            <input name="name" id="nickname-input" type="text" bind:value={nickname} {disabled} />
            <NatureInput id="nature-input" bind:value={nature} bind:custom={natureCustom} {disabled} />
            <label for="level-input">Level</label>
            <input name="level" id="level-input" type="number" min="1" max="20" bind:value={level} {disabled} />
            <label for="ac-input">AC</label>
            <input name="ac" id="ac-input" min="0" max="30" type="number" bind:value={ac} {disabled} />
            <label for="max-hp-input">Max HP</label>
            <input name="max-hp" id="max-hp-input" min="1" type="number" bind:value={maxHp} {disabled} />
        </Fieldset>
        <Fieldset title="Gender" columns={4}>
            <input value={Gender.Male} type="radio" id="gender-input-male" name="gender" bind:group={gender} {disabled} />
            <label for="gender-input-male">Male</label>
            <input value={Gender.Female} type="radio" id="gender-input-female" name="gender" bind:group={gender} {disabled} />
            <label for="gender-input-female">Female</label>
            <input value={Gender.None} type="radio" id="gender-input-none" name="gender" bind:group={gender} {disabled} />
            <label for="gender-input-none">None</label>
            <input value={Gender.Other} type="radio" id="gender-input-other" name="gender" bind:group={gender} {disabled} />
            <label for="gender-input-other">Other</label>
        </Fieldset>
        <Fieldset title="Attributes" columns={3}>
            {#each attributeList as attr}
                <label for="{attr.abbr}-input" class="upper">{attr.abbr}</label>
                <input name="{attr.abbr}" id="{attr.abbr}-input" min="0" max="30" type="number" bind:value={attributes[attr.abbr]} style:max-width="4em" {disabled} />
            {/each}
        </Fieldset>
        <Fieldset title="Proficiencies" columns={2}>
            {#each skillList as skill}
                {@const nameId = noSpaces(skill.name)}
                <input value={skill.name} bind:group={proficiencies} type="checkbox" id="proficiencies-input-{nameId}" name="proficiencies" {disabled} />
                <label for="proficiencies-input-{nameId}" class="cap">{skill.name}</label>
            {/each}
        </Fieldset>
        <Fieldset title="Saving Throws" columns={2}>
            {#each attributeList as attr}
                <input value={attr.abbr} bind:group={savingThrows} type="checkbox" id="saves-input-{attr.abbr}" name="saves" {disabled} />
                <label for="saves-input-{attr.abbr}" class="cap">{attr.name}</label>
            {/each}
        </Fieldset>
        <ActionArea>
            <Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
            <Button type="submit" {disabled}>Finish!</Button>
        </ActionArea>
    </form>
    {#if saving}
        <div class="center-overlay" aria-live="assertive">
            <div class="fixed">
                <Loader caption="Saving..." />
            </div>
        </div>
    {/if}
</div>

<style>
    .muted { opacity: 0.5; }
    .relative { position: relative; }
    .fixed { position: fixed; }

    .center-overlay {
        position: absolute;
        top: 15vh;
        left: 50%;
    }
    .center-overlay .fixed {
        --skin-local-color: var(--skin-content-text);
        transform: translateX(-50%);
    }
</style>