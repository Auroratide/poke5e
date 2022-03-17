<script lang="ts">
    import Page from '$lib/design/Page.svelte'
    import Pokeball from '$lib/design/icon/Pokeball.svelte'
    import Title from '$lib/design/Title.svelte'
</script>

<Title value="My Pokemon" />
<Page theme="purple">
    <Pokeball slot="icon" />
    <nav slot="side" class="table" aria-label="Pokemon List">
        <p>Something</p>
    </nav>
    <p>Something 2</p>
</Page>

<style lang="scss">
    nav {
        height: 100%;
    }
</style>