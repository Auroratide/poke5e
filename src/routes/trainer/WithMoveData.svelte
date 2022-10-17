<script lang="ts">
    import { base } from '$app/paths'

    export let moves: string[]

    $: data = fetch(`${base}/moves.json`)
        .then(res => res.json())
        .then(data => moves.reduce((all, cur) => ({
            ...all,
            [cur]: data.moves.find(it => it.id === cur)
        }), {}))
</script>

<slot {data}></slot>
