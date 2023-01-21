<script lang="ts">
    import type { LearnedMove, PokemonId, TrainerPokemon } from '$lib/trainers/types'
    import { pokemon as pokeData } from '$lib/creatures/store'
    import Loader from '$lib/design/Loader.svelte'
    import Info from './Info.svelte'
    import Card from '$lib/design/Card.svelte'
    import Button from '$lib/design/Button.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'
    import TypeTag from '$lib/pokemon/TypeTag.svelte'
    import type { TrainerStore } from '../trainers'
    import Editor, { type UpdateDetail as UpdateEditorDetail } from './Editor.svelte'
    import Evolver from './Evolver.svelte'
    import { base } from '$app/paths'
    import { PageAction } from '../page-action'

    export let trainer: TrainerStore
    export let id: PokemonId
    
    $: canEdit = trainer.update != null
    $: pokemon = $trainer.pokemon.find((it) => it.id === id)
    $: species = $pokeData?.find((it) => it.id === pokemon.pokemonId)

    let editing = false
    const startEdit = () => editing = true
    const cancelEdit = () => editing = false
    let evolving = false
    const startEvolve = () => evolving = true
    const cancelEvolve = () => evolving = false
    let saving = false

    const onUpdate = (e: CustomEvent<UpdateEditorDetail>) => {
        saving = true
        trainer.update?.pokemon(e.detail).then(() => {
            saving = false
            editing = false
        })
    }

    const onUpdateHealth = (e: CustomEvent<TrainerPokemon>) => {
        trainer.update?.pokemon(e.detail)
    }

    const onUpdatePp = (e: CustomEvent<LearnedMove>) => {
        trainer.update?.move(e.detail)
    }

    const onEvolve = (e: CustomEvent<TrainerPokemon>) => {
        saving = true
        trainer.update?.pokemon(e.detail).then(() => {
            saving = false
            evolving = false
        })
    }
</script>

{#if pokemon && species}
    <Card title={pokemon.nickname}>
        <TypeTag slot="header-extra" type={species.type} />
        {#if editing}
            <Editor {pokemon} on:cancel={cancelEdit} on:update={onUpdate} {saving} {species} />
        {:else if evolving}
            <Evolver {pokemon} on:cancel={cancelEvolve} on:submit={onEvolve} {species} {saving} />
        {:else}
            <Info {pokemon} {species} editable={canEdit} on:update-health={onUpdateHealth} on:update-pp={onUpdatePp} />
            {#if canEdit}
                <ActionArea>
                    <Button href="{base}/trainers?id={$trainer.info.readKey}&pokemon={pokemon.id}&action={PageAction.removePokemon}" variant="ghost">Remove</Button>
                    {#if species.evolution?.to?.length > 0}
                        <Button on:click={startEvolve} variant="ghost">Evolve</Button>
                    {/if}
                    <Button on:click={startEdit}>Edit</Button>
                </ActionArea>
            {/if}
        {/if}
    </Card>
{:else}
    <Loader />
{/if}
