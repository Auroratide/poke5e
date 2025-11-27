<script lang="ts">
	import { Url } from "$lib/url"
	import HelpIcon from "$lib/design/icon/HelpIcon.svelte"
	import Popover from "../Popover.svelte"
	import { rulesVersion } from "./RulesVersion"

	export let id: string = "rules-version-fieldset"
</script>

<fieldset {id}>
	<legend>
		<slot name="legend">
			<Popover id="{id}-popover">
				<HelpIcon slot="activator" label="Rules Version" />
				<p>You may choose to use either the updated "2024" rules, or use the "2018" rules found in the original handbook.<br />See: <a href="{Url.reference.introduction()}#rulesets">2024 Rule Updates</a></p>
			</Popover>
		</slot>
	</legend>
	<span class="skew-tags">
		<input id="{id}-2018-input" bind:group={$rulesVersion} value="2018" type="radio" class="visually-hidden" />
		<label for="{id}-2018-input" class="skew-tag left">
			<span class="text unskew">'18</span>
		</label>
		<input id="{id}-2024-input" bind:group={$rulesVersion} value="2024" type="radio" class="visually-hidden" />
		<label for="{id}-2024-input" class="skew-tag right">
			<span class="text unskew">'24</span>
		</label>
	</span>
</fieldset>

<style>
	fieldset {
		border: none;
		padding: 0;
		margin: 0;
		font-size: var(--font-sz-venus);
		display: block;
		block-size: 1.667em;
	}

	legend {
		float: inline-start;
		margin: 0.25em 0.5em;
	}

	legend a {
		color: var(--theme-light);
	}

	.skew-tags {
		border-radius: 1em;
		filter: var(--elev-stratus-filter);
		display: inline-block;
		overflow: hidden;
	} .skew-tags:has(input:focus-visible) {
		outline: 0.15em solid var(--skin-focus);
	}

	.skew-tag {
		display: inline-block;
		transform: skewX(var(--skew-angle));
		padding: 0.25em 1em;
		background: var(--skin-none-bg);
		border: none;
		color: var(--skin-bg-text);
		cursor: pointer;
	}

	.unskew {
		display: inline-block;
		transform: skewX(var(--skew-undo));
	}

	.left {
		margin-left: -1em;
		padding-left: 2em;
	}

	.right {
		margin-right: -1em;
		padding-right: 2em;
	}

	input + .skew-tag .text {
		font-size: var(--font-sz-venus);
	} input:checked + .skew-tag .text {
		font-size: var(--font-sz-earth);
	}

	input:checked + .skew-tag {
		color: var(--skin-content-text);
		background: var(--skin-content);
		font-weight: bold;
	}

	.visually-hidden {
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		height: 1px;
		width: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
	}
</style>
