<script lang="ts">
    import type { PokemonId } from '$lib/trainers/types'
    import { pokemon as pokeData } from '$lib/creatures/store'
    import Loader from '$lib/design/Loader.svelte'
    import Info from './Info.svelte'
    import Card from '$lib/design/Card.svelte'
    import Button from '$lib/design/Button.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'
    import TypeTag from '$lib/pokemon/TypeTag.svelte'
    import type { TrainerData } from '../trainers'
    import Editor, { type UpdateDetail } from './Editor.svelte'

    export let trainer: TrainerData
    export let id: PokemonId

    $: pokemon = trainer.pokemon.find((it) => it.id === id)
    $: species = $pokeData?.find((it) => it.id === pokemon.pokemonId)
    
    let editing = false
    const startEdit = () => editing = true
    const cancelEdit = () => editing = false

    const onUpdate = (e: CustomEvent<UpdateDetail>) => {
        editing = false

        const index = trainer.pokemon.findIndex((it) => it.id === id)
        trainer.pokemon[index] = {
            ...trainer.pokemon[index],
            ...e.detail,
        }

        trainer = {
            ...trainer,
            pokemon: trainer.pokemon,
        }

        // client.update(e.detail)
    }
</script>

{#if pokemon && species}
    <Card title={pokemon.nickname ? pokemon.nickname : species.name}>
        <TypeTag slot="header-extra" type={species.type} />
        {#if editing}
            <Editor {pokemon} on:cancel={cancelEdit} on:update={onUpdate} />
        {:else}
            <Info {pokemon} {species} />
            {#if trainer.writable}
                <ActionArea>
                    <Button on:click={startEdit}>Edit</Button>
                </ActionArea>
            {/if}
        {/if}
    </Card>
{:else}
    <Loader />
{/if}
