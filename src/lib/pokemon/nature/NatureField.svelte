<script lang="ts">
	import { SelectField } from "$lib/design/forms"
	import { Nature } from "./Nature"
	import { StandardNatures } from "./StandardNature"

	const OtherNature = "other"

	export let value: Nature
	export let disabled = false

	let nature = value.isStandard() ? value.data : OtherNature
	let natureCustom = value.data

	$: options = $StandardNatures.map((nature: string) => ({
		name: nature,
		value: nature,
	}))

	$: value = new Nature(nature === OtherNature ? natureCustom : nature)
</script>

<SelectField label="Nature" {options} bind:value={nature} bind:other={natureCustom} {disabled} />