<script lang="ts">
	import { Fieldset, ImageField, InstructionText, type ImageInputValue, HueField } from "$lib/ui/forms"
	import MediaAttributionFields from "./MediaAttributionFields.svelte"
	import type { SpeciesMedia, UploadedMedia } from "./SpeciesMedia"
	import SpeciesPortrait from "./SpeciesPortrait.svelte"

	export let originals: SpeciesMedia<UploadedMedia>
	export let updated: SpeciesMedia<ImageInputValue>
	export let disabled = false

	let hueShift = originals.customization.shinyHue
	$: newNormalHref = updated.data.values.normalPortrait?.type === "new" ? updated.data.values.normalPortrait.href : undefined
	$: huePreview = originals.copy({
		values: {
			normalPortrait: newNormalHref != null ? { name: "", href: newNormalHref } : originals.data.values.normalPortrait,
			shinyPortrait: undefined,
			normalSprite: undefined,
			shinySprite: undefined,
		},
		customization: {
			shinyHue: hueShift,
		},
	})
	$: originals.data.customization.shinyHue = hueShift
</script>

<Fieldset title="Images" columns={2}>
	<InstructionText>A square image with a transparent background works best. If you don't upload shiny variations, you can use the Hue Slider to draft one.</InstructionText>
	<ImageField label="Normal Portrait" previousValue={originals.data.values.normalPortrait?.href} bind:currentValue={updated.data.values.normalPortrait} {disabled} />
	<ImageField label="Shiny Portrait" previousValue={originals.data.values.shinyPortrait?.href} bind:currentValue={updated.data.values.shinyPortrait} {disabled} />
	<MediaAttributionFields id="portrait" bind:value={originals.data.attribution.portrait} />
	<hr />
	<InstructionText>A square 96 &times; 96 image with a transparent background works best for sprites. If you don't upload sprites, then a downsized version of the portrait will be used.</InstructionText>
	<ImageField label="Normal Sprite" previousValue={originals.data.values.normalSprite?.href} bind:currentValue={updated.data.values.normalSprite} {disabled} />
	<ImageField label="Shiny Sprite" previousValue={originals.data.values.shinySprite?.href} bind:currentValue={updated.data.values.shinySprite} {disabled} />
	<MediaAttributionFields id="sprite" bind:value={originals.data.attribution.sprite} />
	<hr />
	<InstructionText>If you don't upload shiny variations, use this hue slider to make one.</InstructionText>
	<HueField label="Shiny Hue Shift" bind:value={hueShift} />
	<SpeciesPortrait media={huePreview} alt="" shiny />
</Fieldset>
