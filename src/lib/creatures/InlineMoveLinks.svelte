<script lang="ts">
    import { moves as allMoves } from '../moves/store'

    export let moves: string[]

    const name = (m: string) => $allMoves.find(it => it.id === m)?.name
</script>

{#if $allMoves !== undefined}
    <ul>
        {#each moves as move}
            <li><a href="/moves/{move}">{name(move)}</a></li>
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