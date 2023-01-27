<script lang="ts">
    import Card from '$lib/design/Card.svelte'
    import Button from '$lib/design/Button.svelte'
    import { trainers, } from './trainers'
    import { goto } from '$app/navigation'
    import { base } from '$app/paths'
    import Saveable from '$lib/design/Saveable.svelte'
    import ActionArea from '$lib/design/Form/ActionArea.svelte'
    import Fieldset from '$lib/design/Form/Fieldset.svelte'
    import Title from '$lib/design/Title.svelte'

    let name = ''
    let description = ''
    
    let saving = false
    $: disabled = saving
    const onCreate = () => {
        saving = true
        trainers.new({
            name,
            description,
        }).then(({ info }) => {
            goto(`${base}/trainers?id=${info.readKey}`)
        }).catch(() => {
            saving = false
        })
    }

    const cancel = () => {
        goto(`${base}/trainers`)
    }
</script>

<Title value="Create Trainer" />
<Card title="Create a New Trainer">
    <section>
        <Saveable {saving}>
            <form on:submit|preventDefault={onCreate}>
                <Fieldset title="Basic Info">
                    <label for="name-input">Name</label>
                    <input name="name" required id="name-input" type="text" bind:value={name} {disabled} />
                    <label for="description-input" style:place-self="start">Description</label>
                    <textarea name="description" id="description-input" bind:value={description} rows="6" {disabled}></textarea>
                </Fieldset>
                <ActionArea>
                    <Button on:click={cancel} variant="ghost" {disabled}>Cancel</Button>
                    <Button type="submit" {disabled}>Finish!</Button>
                </ActionArea>
            </form>
        </Saveable>
    </section>
</Card>
