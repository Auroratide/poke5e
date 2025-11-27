<script lang="ts">
	import { StaticPage } from "$lib/ui/layout"
	import { Title } from "$lib/ui/layout"
	import { Url } from "$lib/url"
</script>

<Title value="Accessibility Statement" />
<StaticPage title="Accessibility Statement">
	<section>
		<p>The Internet is for all people, not just some people. As such, it is both my aspiration and my duty to make this website and all my products as accessible to everyone as possible, regardless of ability. Whether it be articles, videos, games, or whatever it is I even make, I want everyone to feel included.</p>
		<p>To that end, I devote time to studying and applying good accessibility practices. Some of the things I do include:</p>
		<ul>
			<li>Reading established guidelines and standards, and evaluating my content against them.</li>
			<li>Testing every widget and article in a variety of conditions (for example, using a screen reader or foregoing a mouse).</li>
			<li>Providing at least two ways of accessing content (what I call the principle of engaging two senses).</li>
			<li>Only utilizing third-party components which themselves consider accessibility.</li>
		</ul>
	</section>

	<section>
		<h2>Conformance</h2>
		<p>The <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" rel="noreferrer">Web Content Accessibility Guidelines (WCAG)</a> defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. My website is partially conformant with WCAG 2.1 Level AA, meaning some parts of the website may not fully conform to the standard.</p>
		<p>Partial compliance is due to the WCAG being a large and verbose standard. As a single person, I do what I can to meet as many of its principles as possible.</p>
	</section>

	<section>
		<h2>Feedback</h2>
		<p>I am very open to discourse about improving the accessibility of anything I do! If anything hinders you using this site, please let me know.</p>
		<p><strong><a href="{Url.feedback()}">Leave me a note</a></strong>, and I will definitely look into it!</p>
	</section>
</StaticPage>
