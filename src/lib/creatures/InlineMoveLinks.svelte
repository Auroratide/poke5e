<script lang="ts">
    export let moves: string[]
</script>

<ul>
    {#each moves as move}
        <li><a href="/moves/{move}">{move}</a></li>
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