<script lang="ts">
	import StaticPage from "$lib/design/StaticPage.svelte"
	import Title from "$lib/design/Title.svelte"
</script>

<Title value="Privacy Policy" />
<StaticPage title="Privacy Policy">
	<section>
		<p><strong>Effective Date</strong>: <time datetime="2025-04-25">25 Apr 2025</time></p>
		<p>Pokémon 5e Reference ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of information when you visit our website.</p>
	</section>
	<section>
		<h2>Information We Do Not Collect</h2>
		<ul>
			<li>We do not collect, store, or share any personal data.</li>
			<li>We do not use cookies or tracking technologies.</li>
			<li>We do not log any information about your visit, including IP addresses, browser details, or browsing history.</li>
		</ul>
	</section>
	<section>
		<h2>Hosting and Third-Party Data Collection</h2>
		<p>Our website is hosted on GitHub Pages. While we do not collect any personal data, GitHub may log visitor information such as IP addresses and browser details as part of their standard hosting operations. For more details, please refer to <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noreferrer">GitHub’s Privacy Policy</a>.</p>
	</section>
	<section>
		<h2>Application Data</h2>
		<p>Our application stores data related to user activity or configuration (referred to as ‘application data’). This data is stored securely on our servers and identified through unique IDs saved in your browser’s local storage.</p>
		<p>We use local storage in your browser to store non-personal identifiers that help retrieve your application data. This data is not shared with third parties and remains on your device unless deleted by you.</p>
		<p>We take reasonable precautions to protect the data stored on our servers, including encryption and access control.</p>
	</section>
	<section>
		<h2>Your Privacy</h2>
		<p>Because we do not collect any personal data, there is no personal data to access, modify, or delete.</p>
		<p>You may contact us directly for assistance in deleting your application data.</p>
		<address>
			<p>If you have any concerns, you may contact us at <a href="mailto:contact@auroratide.com">contact@auroratide.com</a>.</p>
		</address>
	</section>
	<section>
		<h2>Changes to This Policy</h2>
		<p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with the updated effective date.</p>
	</section>
</StaticPage>

<style>
	address { font-style: normal; }
</style>
