<script lang="ts">
    import { base } from '$app/paths'

    export let pokemon: string

    $: data = fetch(`${base}/pokemon/${pokemon}.json`)
        .then(res => res.json())
</script>

<slot {data}></slot>
