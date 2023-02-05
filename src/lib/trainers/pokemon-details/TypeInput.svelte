<script lang="ts">
    import { type PokeType, PokeTypes, isPokeType } from '$lib/pokemon/types'
    import Fieldset from '$lib/design/Form/Fieldset.svelte'

    const NONE = ''

    export let value: PokeType[]
    export let id = 'type-input'

    let primary = value[0]
    let secondary = value[1] ?? NONE
    let additional: string[] = value.slice(2)

    const onAdditionalChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        if (target.checked) {
            additional = additional.concat([target.value])
        } else {
            additional = additional.filter((it) => it !== target.value)
        }
    }

    $: secondary = primary === secondary ? NONE : secondary // no fire/fire allowed
    $: value = [...new Set([primary, secondary]
        .concat(additional)
        .filter(isPokeType)
    )]
</script>

<Fieldset title="Type">
    <label for="{id}-primary">Primary</label>
    <select id="{id}-primary" bind:value={primary} required>
        {#each PokeTypes as type}
            <option value={type}>{type}</option>
        {/each}
    </select>
    <label for="{id}-secondary">Secondary</label>
    <select id="{id}-secondary" bind:value={secondary}>
        <option value="{NONE}">- None -</option>
        {#each PokeTypes as type}
            <option value={type} disabled={type === primary}>{type}</option>
        {/each}
    </select>
    <fieldset style:grid-column="span 2">
        <legend>Additional Types</legend>
        <div class="three-columns">
            {#each PokeTypes as type}
                <input id="{id}-checkbox-{type}" type="checkbox" value="{type}" disabled={type === primary || type === secondary} checked={additional.includes(type) || type === primary || type === secondary} on:change={onAdditionalChange} />
                <label for="{id}-checkbox-{type}" class="cap">{type}</label>
            {/each}
        </div>
    </fieldset>
</Fieldset>

<style>
    option {
        text-transform: capitalize;
    }

    .three-columns {
        display: grid;
        grid-template-columns: repeat(3, auto 1fr);
        gap: 0.25em;
    }
</style>