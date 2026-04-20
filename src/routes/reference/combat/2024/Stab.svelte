<script>
	import { Details } from "$lib/ui/elements"

</script>
<p><abbr>STAB</abbr> stands for "Same-Type Attack Bonus". When a Pokémon uses a move with the same type as one of its own types, it gets a STAB bonus added to damage rolls. Otherwise, STAB is 0.</p>
<p>When STAB applies, it is equal to the pokémon's <strong>Proficiency Bonus</strong>. Additionally, STAB cannot be negative; treat STAB as 0 in these cases.</p>
<p>STAB may only be added once per move per target, even for moves that deal damage over time like Leech Seed and Smog, or moves that hit a target multiple times like Bubble and Fury Swipes.</p>
<Details title="STAB Examples">
	<p>For all of these examples, we will assume the attacking pokémon has a move modifer of +2, a proficiency bonus of +3, and the correct typing such that STAB applies.</p>

	<h4>Tackle: Single Target Attack</h4>
	<p>Tackle deals 1d6 + MOVE damage. If it hits with STAB, then it will deal 1d6 + 2 (MOVE) + 3 (STAB) for a total of +5 normal damage.</p>
	<h4>Dazzling Gleam: Area of Effect</h4>
	<p>Dazzling Gleam does 2d6 + MOVE damage. With STAB, each target will take 2d6 + 2 (MOVE) + 3 (STAB) damage, for a total of +5 fairy damage.</p>
	<h4>Quick Attack: No MOVE Modifier</h4>
	<p>Quick Attack deals 1d4 damage with no move modifier. With STAB, it will deal 1d4 + 3 (STAB) damage.</p>
	<h4>Bubble: Multiple Attacks</h4>
	<p>Bubble attacks a target three times for 1d4 damage each. Let's say it hits all three times. The first will deal 1d4 + 3 (STAB) damage. Since STAB only applies once per move, the second and third attacks will deal 1d4 + 0 each. The total damage dealt is 3d4 + 3.</p>
</Details>

<style>
	h4 {
		font-weight: bold;
		font-size: var(--font-sz-venus);
		margin-block-end: 0.25em;
	}
</style>