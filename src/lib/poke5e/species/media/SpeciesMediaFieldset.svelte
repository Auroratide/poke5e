<script lang="ts">
	import { m } from "$lib/site/i18n";
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

<Fieldset title="{m["universal.images"]()}" columns={2}>
	<InstructionText>{m["fakemon.portraitTutorialText"]()}</InstructionText>
	<ImageField label="{m["universal.normalPortrait"]()}" previousValue={originals.data.values.normalPortrait?.href} bind:currentValue={updated.data.values.normalPortrait} {disabled} />
	<ImageField label="{m["universal.shinyPortrait"]()}" previousValue={originals.data.values.shinyPortrait?.href} bind:currentValue={updated.data.values.shinyPortrait} {disabled} />
	<MediaAttributionFields id="{m["universal.portrait"]()}" bind:value={originals.data.attribution.portrait} />
	<hr />
	<InstructionText>{m["fakemon.spriteTutorialText"]()}</InstructionText>
	<ImageField label="{m["universal.normalSprite"]()}" previousValue={originals.data.values.normalSprite?.href} bind:currentValue={updated.data.values.normalSprite} {disabled} />
	<ImageField label="{m["universal.shinySprite"]()}" previousValue={originals.data.values.shinySprite?.href} bind:currentValue={updated.data.values.shinySprite} {disabled} />
	<MediaAttributionFields id="{m["universal.sprite"]()}" bind:value={originals.data.attribution.sprite} />
	<hr />
	<InstructionText>{m["fakemon.hueTutorialText"]()}</InstructionText>
	<HueField label="{m["universal.shinyHueShift"]()}" bind:value={hueShift} />
	<SpeciesPortrait media={huePreview} alt="" shiny />
</Fieldset>
