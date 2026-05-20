<script lang="ts">
	import { type MoveType } from "./MoveType"
	import { TypeTag } from "$lib/pokemon/types"

	let {
		value,
	}: {
		value: MoveType,
	} = $props()
</script>

<TypeTag type={[value]} />
