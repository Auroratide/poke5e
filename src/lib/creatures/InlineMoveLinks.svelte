<script lang="ts">
    import { getMoves } from '../moves/context'

    export let moves: string[]

    const names = getMoves().reduce((obj, it) => ({ ...obj, [it.id]: it.name}), {})
</script>

<ul>
    {#each moves as move}
        <li><a href="/moves/{move}">{names[move]}</a></li>
    {/each}
</ul>

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
</style>