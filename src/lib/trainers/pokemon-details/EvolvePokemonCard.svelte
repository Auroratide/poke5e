<script lang="ts">
    import type { PokemonId, TrainerPokemon } from '$lib/trainers/types'
    import { pokemon as pokeData } from '$lib/creatures/store'
    import Loader from '$lib/design/Loader.svelte'
    import Card from '$lib/design/Card.svelte'
    import Button from '$lib/design/Button.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'
    import type { TrainerStore } from '../trainers'
    import { goto } from '$app/navigation'
    import { Url } from '$lib/url'
    import Evolver from './Evolver.svelte'
    import RequirePokemon from './RequirePokemon.svelte'
    import Title from '$lib/design/Title.svelte'

    export let trainer: TrainerStore
    export let id: PokemonId
    
    $: canEdit = trainer.update != null
    $: pokemon = $trainer.pokemon.find((it) => it.id === id)
    $: species = $pokeData?.find((it) => it.id === pokemon?.pokemonId)

    let saving = false
    const update = (e: CustomEvent<TrainerPokemon>) => {
        saving = true
        trainer.update?.pokemon(e.detail).then(() => {
            saving = false
            goto(Url.trainers($trainer.info.readKey, id))
        }).catch(() => {
            saving = false
        })
    }
    const cancel = () => {
        goto(Url.trainers($trainer.info.readKey, id))
    }
</script>

<RequirePokemon trainer={$trainer} {id} titlePrefix="Evolve">
    {#if species}
        <Card title="Evolve {pokemon.nickname}">
            {#if canEdit}
                <Evolver {pokemon} {species} {saving} on:cancel={cancel} on:submit={update} />
            {:else}
                <section>
                    <p>You do not have permission to evolve this pokemon.</p>
                    <ActionArea>
                        <Button href="{Url.trainers($trainer.info.readKey, id)}">Go Back</Button>
                    </ActionArea>
                </section>
            {/if}
        </Card>
    {:else}
        <Loader />
    {/if}
</RequirePokemon>
