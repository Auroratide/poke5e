<script lang="ts">
	import { browser } from "$app/environment"
	import { FakemonLocalStorage } from "$lib/fakemon/data/FakemonLocalStorage"
	import { TrainerLocalStorage } from "$lib/trainers/data/TrainerLocalStorage"
	import { CodeBlock } from "$lib/ui/elements"

	const trainers = browser ? TrainerLocalStorage.getReadKeys().map((it) => ({
		readKey: it,
		writeKey: TrainerLocalStorage.getWriteKey(it),
	})) : []

	const fakemon = browser ? FakemonLocalStorage.list() : []

	const toCopy = `# Trainers\n\nTrainer ID   | Access Key\n-------------|-----------------\n${trainers.map((it) => `${it.readKey} | ${it.writeKey ?? ""}`).join("\n")}\n\n\n# Fakemon\n\nFakemon ID    | Access Key\n--------------|-----------------\n${fakemon.map((it) => `${it.readKey} | ${it.writeKey ?? ""}`).join("\n")}`
</script>

<section>
	<h2>Backup and Restoration</h2>
	<p><strong>Backup and Restoration coming soon!</strong> For now, you can back up your trainers/fakémon manually.</p>
	<p>All of the data for your trainers and custom pokemon are stored locally on your computer. This is why you don't need an account to use the Poké 5e app! Unfortunately, it also means you can lose your data if your browser's data gets cleared.</p>
	<p>To protect against this, it's a good idea to <strong>back up</strong> your list of trainers and fakémon so that you can recover them.</p>
	<p>This will be improved in the future. For now, you can copy this list of trainer and fakémon IDs and save them somewhere on your device.</p>
	<CodeBlock title="IDs and Access Keys" copiable>{toCopy}</CodeBlock>
</section>
