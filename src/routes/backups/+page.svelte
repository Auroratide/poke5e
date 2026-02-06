<script lang="ts">
	import { slide } from "svelte/transition"
	import { Card } from "$lib/ui/page"
	import { Page } from "$lib/ui/layout"
	import { Title } from "$lib/ui/layout"
	import { BackupIcon } from "$lib/ui/icons"
	import { Button, CodeBlock, FileUploadButton } from "$lib/ui/elements"
	import { LiteBackup, ManualBackup } from "$lib/site/backups"
	import { browser } from "$app/environment"
	import { m } from "$lib/site/i18n"
	import * as Analytics from "$lib/site/analytics"
	import { Saveable } from "$lib/ui/forms"

	const TRANSITION_DURATION_MS = 200

	let status: undefined | {
		type: "success" | "error",
		message: string,
	} = undefined
	let statusTimeout = -1
	const showStatus = (type: "success" | "error") => (message: string) => {
		window.clearTimeout(statusTimeout)
		if (status != null) {
			status = undefined
			statusTimeout = window.setTimeout(() => {
				status = { type, message }
			}, TRANSITION_DURATION_MS + 10)
		} else {
			status = { type, message }
		}
	}
	const hideStatus = () => {
		window.clearTimeout(statusTimeout)
		status = undefined
	}

	const showSuccess = showStatus("success")
	const showError = showStatus("error")

	const onSaveBackup = async () => {
		const backup = await LiteBackup.create()
		const url = URL.createObjectURL(backup)
		const date = new Date()
		const filename = `backup-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}${date.getHours().toString().padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date.getSeconds().toString().padStart(2, "0")}.poke5e`

		const link = document.createElement("a")
		link.href = url
		link.download = filename
		link.click()

		URL.revokeObjectURL(url)

		showSuccess(m["backups.downloadSuccessful"]())
	}

	let restoring = false
	const onRestoreBackup = async (e: Event) => {
		const file = (e.target as HTMLInputElement).files[0]
		if (file) {
			try {
				restoring = true
				const stats = await LiteBackup.restore(file)
				showSuccess(m["backups.restoreSuccessful"](stats))
				Analytics.createBackupRecoveryEvent("success")
			} catch (e) {
				showError(m["backups.restoreError"]({ message: e.message }))
				Analytics.createBackupRecoveryEvent("error")
			} finally {
				restoring = false
			}
		}
	}

	const manualBackup = browser ? ManualBackup.create() : ""
</script>

<Title value="Backup and Restoration" />
<Page theme="grey">
	<BackupIcon slot="icon" />
	<Card title="Backup and Restoration">
		<section>
			{@html m["backups.introduction"]()}
		</section>
		<Saveable saving={restoring} caption="{m["backups.restoring"]()}">
			<div class="row">
				<section>
					<p class="button-wrapper">
						<Button on:click={onSaveBackup} disabled={restoring}>{m["backups.download"]()}</Button>
					</p>
					<p class="description">
						{@html m["backups.downloadDescription"]()}
					</p>
				</section>
				<section>
					<p class="button-wrapper">
						<FileUploadButton id="restore-backup" on:change={onRestoreBackup} accept=".poke5e" disabled={restoring}>
							{m["backups.restore"]()}
						</FileUploadButton>
					</p>
					<p class="description">
						{@html m["backups.restoreDescription"]()}
					</p>
				</section>
			</div>
		</Saveable>
		{#if status}
			<section aria-live="assertive" class="status status-{status.type}" transition:slide={{ duration: TRANSITION_DURATION_MS }}>
				<button class="close-button" aria-label="dismiss" on:click={hideStatus}>&times;</button>
				<p>{status.message}</p>
			</section>
		{/if}
		<section>
			<h2>{m["backups.manual"]()}</h2>
			<p>{m["backups.manualDescription"]()}</p>
			<CodeBlock title="{m["backups.manualCodeBlockTitle"]()}" copiable>{manualBackup}</CodeBlock>
			<p>{@html m["backups.manualDisclaimer"]()}</p>
		</section>
	</Card>
</Page>

<style>
	section :global(code) { font-size: var(--font-sz-venus); }
	.row {
		text-align: center;
		padding-block: 1em;
		display: flex;
		flex-direction: column;
		row-gap: 1.5em;
	}

	.button-wrapper { font-size: var(--font-sz-neptune); }
	.description { font-size: var(--font-sz-venus); }

	.status {
		text-align: center;
		padding: 1em;
		margin-block-end: 1.5em;
		border: 0.25em solid;
		margin-inline: auto;
		max-inline-size: 25em;
		box-shadow: var(--elev-stratus);
		border-radius: 0.5em;
		position: relative;
	} .status.status-success {
		border-color: var(--skin-success-bg);
		background: var(--skin-success-light);
	} .status.status-error {
		border-color: var(--skin-danger-bg);
		background: var(--skin-danger-light);
	} .status p {
		margin: 0;
	}

	.close-button {
		position: absolute;
		inset: 0 0 auto auto;
		font-size: 1em;
		border: none;
		background: none;
		border-radius: 1em;
		cursor: pointer;
	} .close-button:hover, .close-button:focus {
		background: oklch(0 0 0 / 0.125);
	}

	@media screen and (min-width: 37.5rem) {
		.row {
			display: flex;
			flex-direction: row;
		} .row > * {
			flex: 1;
		}
	}
</style>
