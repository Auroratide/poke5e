<script lang="ts">
	import { page } from "$app/state"
	import { m } from "$lib/site/i18n/paraglide/messages"
	import { getLocale, locales, localizeHref } from "$lib/site/i18n/paraglide/runtime"
	import { RadioFields, type RadioFieldsChangeEvent } from "$lib/ui/forms"

	const options = locales.map((locale) => ({
		name: m.languageName({}, { locale }),
		value: locale,
	}))

	const onChange = (e: RadioFieldsChangeEvent) => {
		const locale = e.detail.checked
		window.location.replace(localizeHref(page.url.pathname, { locale }))
	}
</script>

<fieldset class="language-setting">
	<legend>Select your preferred language:</legend>
	<div class="options">
		<RadioFields label="Select Language" checked={getLocale()} values={options} on:change={onChange} />
	</div>
</fieldset>

<style>
	.language-setting {
		border: none;
		padding: 0;
		margin-inline: 0;
		margin-block-end: 1.5em;
		inline-size: 100%;
	}

	.language-setting legend {
		display: block;
		margin-block-end: 1em;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding-inline-start: 0.75em;
	}
</style>