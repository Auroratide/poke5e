<script lang="ts">
	import { Url } from "$lib/site/url"
	import { m } from "$lib/site/i18n"
</script>

<ol>
	<li><a href="{Url.rules.trainerClass()}">{m["reference.trainerClass"]()}</a></li>
	<li><a href="{Url.rules.trainerPaths()}">{m["reference.trainerPaths"]()}</a></li>
	<li><a href="{Url.rules.catchingPokemon()}">{m["reference.catchingPokemon"]()}</a></li>
	<li><a href="{Url.rules.pokemonLeveling()}">{m["reference.pokemonLeveling"]()}</a></li>
	<li><a href="{Url.rules.combat()}">{m["reference.combat"]()}</a></li>
	<li><a href="{Url.rules.faintingRestingHealing()}">{m["reference.faintingRestingHealing"]()}</a></li>
</ol>
