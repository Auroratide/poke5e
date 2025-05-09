<script lang="ts">
	export let level: number
	export let exp: number

	const formatter = Intl.NumberFormat()
</script>

<tr>
	<td>{level}</td>
	<td>{formatter.format(exp)}</td>
</tr>

<style>
	td:nth-child(1) {
		text-align: center;
	}
</style>
