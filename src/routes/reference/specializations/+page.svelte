<script>
	import { SpecializationList, specializationDescription } from "$lib/trainers/specializations"
	import { IconedCardHeading } from "$lib/ui/page"
	import ReferencePage from "../ReferencePage.svelte"
	import { TypeTag } from "$lib/pokemon/types-2"
</script>

<ReferencePage title="Specializations">
	<section>
		<p>At levels 1, 7, and 18, trainers may choose a specialization from the following list, granting them bonuses depending on the type of Pokemon they train. Specializations can be stacked for an additional +1 bonus to skill checks each time it is chosen.</p>

		<h2>Options</h2>
		{#each Object.values($SpecializationList) as specialization}
			<IconedCardHeading>
				{specialization.name}
				<div slot="icon" class="small-font"><TypeTag type={[specialization.type]} /></div>
			</IconedCardHeading>
			<p>{specializationDescription(specialization)}</p>
		{/each}
	</section>
</ReferencePage>

<style>
	.small-font { font-size: var(--font-sz-venus); }
</style>
