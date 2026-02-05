<script lang="ts">
	import { Card } from "$lib/ui/page"
	import { Page } from "$lib/ui/layout"
	import { Title } from "$lib/ui/layout"
	import { CogIcon } from "$lib/ui/icons"
	import { Button } from "$lib/ui/elements"
	import { LiteBackup } from "$lib/site/backups"

	const onSaveBackup = async () => {
		const backup = await LiteBackup.create()
		const url = URL.createObjectURL(backup)

		const link = document.createElement("a")
		link.href = url
		link.download = `backup-${new Date().toISOString()}.poke5e`
		link.click()

		URL.revokeObjectURL(url)
	}

	let succeeded = false
	let error: string | undefined = undefined

	const onRestoreBackup = async (e: Event) => {
		const file = (e.target as HTMLInputElement).files[0]
		if (file) {
			try {
				await LiteBackup.restore(file)
				succeeded = true
			} catch (e) {
				error = e.message
			}
		}
	}
</script>

<Title value="Backups" />
<Page theme="grey">
	<CogIcon slot="icon" />
	<Card title="Backups">
		<section>
			<p>This is a work in progress.</p>
		</section>
		<section>
			<h2>Save Backup</h2>
			<Button on:click={onSaveBackup}>Download Backup File</Button>
		</section>
		<section style:margin-block-end="1em">
			<h2>Restore Backup</h2>
			<label for="restore-backup">Upload Backup File</label>
			<input id="restore-backup" type="file" on:change={onRestoreBackup} accept=".poke5e" />
			{#if succeeded}
				<p>Backup is restored!</p>
			{/if}
			{#if error}
				<p><strong>Error:</strong> {error}</p>
			{/if}
		</section>
	</Card>
</Page>
