<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { HintText, TextareaField } from "$lib/ui/forms"
	import { MoveDice } from "./dice"

	let {
		value = $bindable(),
		dice,
		label = m.atHigherLevels(),
		name = "move-higher-levels",
		disabled = false,
	}: {
		value: string | undefined,
		dice: MoveDice | undefined,
		label?: string,
		name?: string,
		disabled?: boolean,
	} = $props()

	const generatedText = $derived(dice != null ? MoveDice.higherLevelsText(dice) : undefined)
</script>

<div class="higher-levels-field">
	<TextareaField {label} {name} rows={4} placeholder={generatedText ?? "If something about the move changes as the pokemon levels up, describe it here. Otherwise, leave blank."} bind:value={
		() => value ?? "",
		(v) => value = v.trim() === "" ? undefined : v
	} {disabled} />
	{#if generatedText != null}
		<HintText>If left blank, this will be based on the dice: <em>{generatedText}</em></HintText>
	{/if}
</div>

<style>
	.higher-levels-field {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
</style>
