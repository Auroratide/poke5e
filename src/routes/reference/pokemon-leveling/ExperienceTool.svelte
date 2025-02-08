<script lang="ts">
	import { experienceAwarded } from "$lib/creatures/experience"

	let level = 1
	let sr = "1"

	$: srNum = parseFloat(sr)
	$: expToAward = experienceAwarded(level, srNum)
</script>

<form>
	<div class="inputs">
		<label for="level-for-exp">Level:</label>
		<input id="level-for-exp" type="number" bind:value={level} min="1" max="20" />
		<span></span>
		<label for="sr-for-exp">SR:</label>
		<select id="sr-for-exp" bind:value={sr}>
			<option value="0.125">1/8</option>
			<option value="0.25">1/4</option>
			<option value="0.5">1/2</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
			<option value="13">13</option>
			<option value="14">14</option>
			<option value="15">15</option>
		</select>
	</div>
	<div class="outputs">
		<label for="exp-to-award">Exp Awarded:</label>
		<output id="exp-to-award" aria-live="polite">{Intl.NumberFormat().format(expToAward)}</output>
	</div>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1em;
		align-items: center;
	}

	.inputs {
		display: flex;
		gap: 0.5em;
		align-items: center;
	}

	.outputs {
		font-size: var(--font-sz-neptune);
	}

	label {
		font-weight: bold;
	}

	output {
		border-bottom: 0.125em solid var(--skin-bg);
	}
</style>
