<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ params }) => {
        return {
            props: {
                trainerId: params.id,
            },
        }
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte'
    import { getTrainer } from '$lib/trainers/trainers'
    import Layout from './_layout.svelte'

    export let trainerId: string
</script>

