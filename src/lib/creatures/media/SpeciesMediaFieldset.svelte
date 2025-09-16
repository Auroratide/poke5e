<script lang="ts">
	import { Fieldset, ImageField, type ImageInputValue } from "$lib/design/forms"
	import type { SpeciesMedia, UploadedMedia } from "./SpeciesMedia"

	export let originals: SpeciesMedia<UploadedMedia>
	export let updated: SpeciesMedia<ImageInputValue>
	export let disabled = false
</script>

<Fieldset title="Images" columns={2}>
	<ImageField label="Normal Portrait" previousValue={originals.data.normalPortrait?.href} bind:currentValue={updated.data.normalPortrait} {disabled} />
	<ImageField label="Normal Sprite" previousValue={originals.data.normalSprite?.href} bind:currentValue={updated.data.normalSprite} {disabled} />
	<ImageField label="Shiny Portrait" previousValue={originals.data.shinyPortrait?.href} bind:currentValue={updated.data.shinyPortrait} {disabled} />
	<ImageField label="Shiny Sprite" previousValue={originals.data.shinySprite?.href} bind:currentValue={updated.data.shinySprite} {disabled} />
</Fieldset>
