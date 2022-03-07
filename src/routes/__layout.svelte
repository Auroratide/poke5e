<script lang="ts">
    import Container from '$lib/design/Container.svelte'
</script>

<div class="page">
    <Container>
        <header>
            <nav aria-label="Site Navigation">
                <ul>
                    <li><a href="/pokemon">Pokemon</a></li>
                    <li><a href="/moves">Moves</a></li>
                </ul>
            </nav>
        </header>
    </Container>
    <div class="content">
        <slot></slot>
    </div>
    <footer>
        <Container>
            <p class="license"><small>This is unofficial Fan Content and is not approved/endorsed by &copy; Wizards of the Coast, &copy; Game Freak, or &copy; Nintendo Company Inc. Portions of the material are property of &copy; Wizards of the Coast, &copy; Game Freak, or &copy; Nintendo Company Inc.</small></p>
        </Container>
    </footer>
</div>

<style lang="scss">
    .page {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
    }

    header {
        background: var(--skin-bg);

        a {
            color: var(--skin-bg-text);
            text-decoration: none;
        }
    }

    .content {
        flex: 1;
        overflow: hidden;
    }

    footer {
        background: var(--skin-footer);
        color: var(--skin-footer-text);

        .license {
            text-align: center;
            margin: 0;
            font-size: var(--font-sz-mars);
        }
    }

    nav ul {
        list-style: none;
        padding: 0;
        display: flex;
    }
</style>