<script>
    import Card from '$lib/design/Card.svelte'
    import Button from '$lib/design/Button.svelte'
    import Saveable from '$lib/design/Saveable.svelte'
    import { trainers } from './trainers'
    import { goto } from '$app/navigation'
    import { Url } from '$lib/url'
    import findTrainerIdImg from '$lib/assets/find-trainer-id.png'

    let id = ''
    $: id = id.toLocaleUpperCase().replace(/[^a-zA-Z0-9]/g, '')

    let couldNotFind = ''

    let searching = false
    const onSubmit = () => {
        searching = true
        trainers.get(id).then((trainer) => {
            if (trainer) {
                goto(Url.trainers(id))
            } else {
                searching = false
                couldNotFind = id
            }
        })
    }
</script>

<Card title="Find Trainer by ID">
    <Saveable saving={searching} caption="Searching...">
        <section>
            <p>Enter the trainer's unique ID below and click "Search".</p>
            <form on:submit|preventDefault={onSubmit} class="vertical spaced-lg" disabled={searching}>
                <label for="id-input" class="font-sm spaced-sm">Trainer ID</label>
                <div class="horizontal spaced-sm">
                    <input id="id-input" bind:value={id} type="text" class="font-lg" maxlength="12" placeholder="e.g. H4PF8E2GZA0A" style:flex="1" disabled={searching} required />
                    <Button type="submit" disabled={searching}>Search</Button>
                </div>
                {#if couldNotFind.length > 0 && couldNotFind === id}
                    <p class="font-sm error">No trainer is registered with this id</p>
                {/if}
            </form>
        </section>
        <hr />
        <section>
            <p>Each trainer has a unique 12-character ID. You can find it on their page, pictured below.</p>
            <figure class="spaced-lg">
                <img src={findTrainerIdImg} alt="The label 'Trainer ID' denotes the trainer's id." />
                <figcaption>Use this ID for searching</figcaption>
            </figure>
            <p>Searching by a trainer's ID can allow you to view a friend's pokemon or view your own trainer's pokemon on different devices.</p>
        </section>
    </Saveable>
</Card>

<style>
    .spaced-lg {
        margin-bottom: 1em;
    }

    .spaced-sm {
        margin-bottom: 0.25em;
    }

    .font-lg {
        font-size: 1.25rem;
    }

    .font-sm {
        font-size: 1rem;
    }

    .error {
        font-style: italic;
        color: var(--skin-danger-text);
    }

    .vertical {
        display: flex;
        flex-direction: column;
    }

    .horizontal {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5em;
    }
    
    img {
        width: 100%;
    }
</style>