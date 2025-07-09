<script lang="ts">
	import DisloyalIcon from "./DisloyalIcon.svelte"
	import IndifferentIcon from "./IndifferentIcon.svelte"
	import UpsetIcon from "./UpsetIcon.svelte"
	import NeutralIcon from "./NeutralIcon.svelte"
	import ContentIcon from "./ContentIcon.svelte"
	import PleasedIcon from "./PleasedIcon.svelte"
	import LoyalIcon from "./LoyalIcon.svelte"

	const icons = [DisloyalIcon, IndifferentIcon, UpsetIcon, NeutralIcon, ContentIcon, PleasedIcon, LoyalIcon]

	export let level: number
	
	$: Icon = icons[Math.round(level + 3)]
</script>

<svelte:component this={Icon} />
