<script lang="ts">
    import Container from '$lib/design/Container.svelte'
</script>

<div class="page">
    <header>
        <Container>
            <nav aria-label="Site Navigation">
                <ul>
                    <li><a href="/pokemon">Pokemon</a></li>
                    <li><a href="/moves">Moves</a></li>
                </ul>
            </nav>
        </Container>
    </header>
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

    nav {
        text-align: right;
        padding: 0.25em 0;

        ul {
            position: relative;
            list-style: none;
            padding: 0;
            margin: 0;
            display: inline-flex;
            padding: 0 2em;
        }

        ul::before {
            content: '';
            position: absolute;
            top: 0;
            right: -1000rem;
            left: 0;
            bottom: 0;
            background: var(--skin-bg);
            z-index: 1;
            transform: skewX(var(--skew-angle));
        }

        li {
            position: relative;
            z-index: 2;
        }

        a {
            color: var(--skin-bg-softtext);
            text-decoration: none;
            display: inline-block;
            padding: 0.25em 1em;

            &:hover {
                color: #35c1c0;
            }
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
</style>