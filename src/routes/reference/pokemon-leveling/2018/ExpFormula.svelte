<script lang="ts">
	import { EXPERIENCE_MATRIX_2018 } from "$lib/creatures/experience"
	import InfoTable from "$lib/design/InfoTable.svelte"
	import Details from "$lib/design/Details.svelte"
</script>

<p>This value is derived from the following table.</p>
<Details title="Award Experience Table">
	<InfoTable label="Experience to Award">
		<thead>
			<tr>
				<th style:white-space="pre">Level :: SR</th>
				<th>1/8</th>
				<th>1/4</th>
				<th>1/2</th>
				<th>1</th>
				<th>2</th>
				<th>3</th>
				<th>4</th>
				<th>5</th>
				<th>6</th>
				<th>7</th>
				<th>8</th>
				<th>9</th>
				<th>10</th>
				<th>11</th>
				<th>12</th>
				<th>13</th>
				<th>14</th>
				<th>15</th>
			</tr>
		</thead>
		<tbody>
			{#each EXPERIENCE_MATRIX_2018 as levelRow, level}
				<tr>
					<th>{level}</th>
					{#each levelRow as exp}
						<td>{exp ?? ""}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</InfoTable>
</Details>
