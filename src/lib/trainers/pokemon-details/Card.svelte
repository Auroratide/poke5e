<script lang="ts">
    import type { PokemonId, TrainerPokemon } from '$lib/trainers/types'
    import { pokemon as pokeData } from '$lib/creatures/store'
    import Loader from '$lib/design/Loader.svelte'
    import Info, { type UpdateDetail as UpdateInfoDetail} from './Info.svelte'
    import Card from '$lib/design/Card.svelte'
    import Button from '$lib/design/Button.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'
    import TypeTag from '$lib/pokemon/TypeTag.svelte'
    import { updatePokemon, type TrainerData } from '../trainers'
    import Editor, { type UpdateDetail as UpdateEditorDetail } from './Editor.svelte'

    export let trainer: TrainerData
    export let id: PokemonId

    $: pokemon = trainer.pokemon.find((it) => it.id === id)
    $: species = $pokeData?.find((it) => it.id === pokemon.pokemonId)
    
    let editing = false
    let saving = false
    const startEdit = () => editing = true
    const cancelEdit = () => editing = false

    const updatePokemonView = (updated: TrainerPokemon) => {
        const index = trainer.pokemon.findIndex((it) => it.id === id)
        trainer.pokemon[index] = {
            ...trainer.pokemon[index],
            ...updated,
        }

        trainer = {
            ...trainer,
            pokemon: trainer.pokemon,
        }
    }

    const onUpdate = (e: CustomEvent<UpdateEditorDetail>) => {
        updatePokemon(trainer.writeKey, e.detail).then(() => {
            saving = false
            editing = false

            updatePokemonView(e.detail)
        })
    }

    const onImmediateUpdate = (e: CustomEvent<UpdateInfoDetail>) => {
        updatePokemonView(e.detail)

        updatePokemon(trainer.writeKey, e.detail)
    }
</script>

{#if pokemon && species}
    <Card title={pokemon.nickname ? pokemon.nickname : species.name}>
        <TypeTag slot="header-extra" type={species.type} />
        {#if editing}
            <Editor {pokemon} on:cancel={cancelEdit} on:update={onUpdate} {saving} />
        {:else}
            <Info {pokemon} {species} editable={trainer.writeKey?.length > 0} on:update={onImmediateUpdate} />
            {#if trainer.writeKey}
                <ActionArea>
                    <Button on:click={startEdit}>Edit</Button>
                </ActionArea>
            {/if}
        {/if}
    </Card>
{:else}
    <Loader />
{/if}
