<script lang="ts">
    import { onMount, onDestroy } from 'svelte'

    export let title: string

    // Height calculations because my brain isn't big enough to figure out a CSS-only solution
    let container: HTMLElement
    let scrollable: HTMLElement
    const setHeight = () => {
        // The 3em accounts for the header and padding
        scrollable.style.height = `min(${scrollable.scrollHeight}px, calc(${container.clientHeight}px - 3em))`
    }

    onMount(() => {
        setHeight()
        window.addEventListener('resize', setHeight)
    })

    onDestroy(() => {
        if (typeof window !== 'undefined')
            window.removeEventListener('resize', setHeight)
    })
</script>

<div bind:this={container} class="container">
    <article>
        <header>
            <h1>{title}</h1>
            <slot name="header-extra"></slot>
        </header>
        <div bind:this={scrollable} class="scrollable">
            <slot></slot>
        </div>
    </article>
</div>

<style lang="scss">
    .container {
        height: 100%;
    }

    article {
        background-color: var(--skin-content);
        color: var(--skin-content-text);
        border-radius: 2em;
        box-shadow: var(--elev-cirrus);
        max-height: 100%;
        overflow: hidden;

        header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            background-color: var(--skin-bg);
            color: var(--skin-bg-text);
            padding: 0.5em 1em;
            margin-bottom: 0.5em;

            h1 {
                font-weight: 700;
                font-size: var(--font-sz-neptune);
            }
        }

        .scrollable {
            overflow: auto;
        }

        :global(section) {
            padding: 0 1em;
        }
    }
</style>