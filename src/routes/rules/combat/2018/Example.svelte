<script>
	import { Url } from "$lib/site/url"
</script>

<p>You command your level 14 <a href="{Url.pokemon("vivillon")}">Vivillon</a> to use the move <a href="{Url.moves("bug-buzz")}">Bug Buzz</a>.</p>
<p>Bug Buzz uses either DEX or CHA as its move power. Our Vivillon's DEX of 17 is higher than it's CHA of 10, so we will use DEX. Therefore, we calculate:</p>
<ul class="smaller">
	<li><strong>Save DC = 16</strong>: 8 + 3 (DEX mod) + 5 (proficiency)</li>
	<li><strong>Damage</strong>: 3d10 (level) + 3 (DEX mod) + 3 (STAB)</li>
</ul>
<p>Vivillon's STAB is 3 since Bug Buzz is a bug-type move, Vivillon is a bug-type Pokémon, and its STAB is +3 at level 14.</p>
