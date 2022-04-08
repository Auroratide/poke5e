<script lang="ts">
    import { base } from '$app/paths'
    import { tms as allTms } from '../moves/store'

    export let tms: number[]

    const name = (tm: number) => $allTms.find(it => it.id === tm)?.moveInfo?.name
</script>

{#if $allTms !== undefined}
    <ul>
        {#each tms as tm}
            <li><a href="{base}/tms/{tm}" title={name(tm)}>{tm}</a></li>
        {/each}
    </ul>
{:else}
    <span class="loading" aria-label="Loading">...</span>
{/if}

<style>
    ul {
        list-style: none;
        display: inline;
        padding: 0;
        margin: 0;
    }

    li {
        display: inline;
    }

    li::after {
        content: ', '
    }

    li:last-child::after {
        display: none;
    }

    .loading {
        opacity: 0.5;
    }
</style>