<script lang="ts">
	import { browser } from "$app/environment"
	import { page } from "$app/stores"
	import { onDestroy, onMount } from "svelte"
	import { migrationStatus } from "./store"
	import { respondToMessage } from "./respond-to-message"
	import { OLD_ORIGIN } from "./origins"
	import Button from "$lib/design/Button.svelte"
	import { trainers } from "../trainers"
	import TransferredTrainers from "./TransferredTrainers.svelte"
	import Loader from "$lib/design/Loader.svelte"
	import * as Analytics from "$lib/analytics"

	let modal: HTMLDialogElement
	let popupInitiated = false

	const initialMigrationStatus = $migrationStatus

	$: {
		if (modal != null && ($migrationStatus === "not started" || $migrationStatus === "manual") && $page.url.pathname.startsWith("/trainers")) {
			modal.showModal()
		}
	}

	onMount(() => {
		if (initialMigrationStatus !== "done") {
			window.addEventListener("message", respondToMessage)
	
			modal.addEventListener("close", () => {
				migrationStatus.set("done")
			}, { once: true })
		}
	})

	onDestroy(() => {
		if (browser) {
			window.removeEventListener("message", respondToMessage)
		}
	})

	const popup = () => {
		popupInitiated = true
		const succeeded = window.open(`${OLD_ORIGIN}/storage-migration/poke5e/popup`, "trainertransfer", "popup")

		if (!succeeded) {
			console.warn("Failed to auto-transfer via popup window")
			migrationStatus.set("failed")
			Analytics.createTrainerRecoveryEvent("popup-blocked")
		}
	}
</script>

{#if initialMigrationStatus !== "done"}
	<dialog bind:this={modal}>
		<header>Trainer Data Transfer</header>
		<div class="content-area">
			<section>
				<p>Poke 5e has a new home! We moved from <strong>auroratide.github.io/poke5e</strong> to <strong>poke5e.app</strong>, much less of a mouthful. You are seeing this dialog because we could not transparently transfer your trainer data from the old location.</p>
			</section>
			<section>
				{#if $migrationStatus === "not started" || $migrationStatus === "manual"}
					<p class="no-margin">Simply click the following "Start Transfer" button, and that's it!</p>
					<div class="action-window">
						{#if popupInitiated}
							<p class="loader"><Loader /></p>
						{:else}
							<div class="center larger" style:--skin-local-color="var(--skin-bg-dark)">
								<Button on:click={popup}>Start Transfer</Button>
							</div>
						{/if}
					</div>
					<details>
						<summary>Why is this necessary?</summary>
						<p>Curious about the technical details, are you?</p>
						<p>Poke 5e knows which trainers are <em>yours</em> by storing their IDs on the browser. This is why you don't need an account at all to use the app.</p>
						<p>Different websites cannot access each others' data. That's great! It means, for example, that malicious websites cannot access data stored by your bank.</p>
						<p>By moving this site to <strong>poke5e.app</strong>, it's <em>technically</em> a different website. Therefore, it cannot grab data at the old location. However, if code at the old location cooperates with the new location, data transfer becomes possible.</p>
						<p>The "Start Transfer" button is simply you granting this website permission to access data at the old location.</p>
					</details>
					<p>Or, if you're new here, you can simply close this dialog.</p>
					<form method="dialog">
						<div class="center">
							<Button type="submit" variant="danger">Close</Button>
						</div>
					</form>
				{:else if $migrationStatus === "failed"}
					<p class="failure">We apologize! Your trainer data could not be automatically transferred.</p>
					<p class="failure">Your data is <strong>not</strong> lost! You will have to manually transfer your trainers using their IDs. Follow the link below to get your list of trainer IDs.</p>
					<form method="dialog">
						<div class="center">
							<Button href="https://auroratide.github.io/storage-migration/poke5e">Your Trainer IDs</Button>
							<Button type="submit" variant="danger">Close</Button>
						</div>
					</form>
				{:else if $migrationStatus === "done"}
					{#await trainers.all()}
						<p>Almost done...</p><!-- in theory won't see this -->
					{:then allTrainers}
						<TransferredTrainers trainers={allTrainers} />
					{:catch error}
						<p class="failure">Failed to get list of trainers: {error}</p>
					{/await}
				{/if}
			</section>
		</div>
	</dialog>
{/if}

<style>
	dialog {
		border-radius: 2em;
		border: none;
		padding: 0;
		box-shadow: var(--elev-cirrus);
		position: fixed;
		inset: 50%;
		transform: translate(-50%, -50%);
		inline-size: 95vw;
		max-inline-size: calc(var(--container-width) / 2);
		background: none;
	} dialog::backdrop {
		background: var(--skin-shade);
	}

	header {
		background-color: var(--skin-bg);
		color: var(--skin-bg-text);
		padding: 0.5em 1em;
		font-weight: 700;
		font-size: var(--font-sz-neptune);
	}

	.content-area {
		background: var(--skin-content);
		padding: 0 0 1em 0;
	}

	section {
		padding: 0.5em 1em;
	}

	p { line-height: 1.4; }

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1em;
	} .larger {
		font-size: var(--font-sz-neptune);
	}

	.failure { color: var(--skin-danger-text); }

	details {
		font-size: var(--font-sz-venus);
	} summary {
		cursor: pointer;
		margin-block-end: 0.5em;
	}

	.action-window {
		height: 6em;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	} p.loader {
		--skin-local-color: var(--skin-bg-dark);
		font-size: 0.333em;
		line-height: 1;
		margin: 0;
	}

	.no-margin { margin: 0; }
</style>