<script lang="ts">
	import InfoTable from "$lib/design/InfoTable.svelte"
</script>

<p>Below is an example d100 table you can roll on at the beginning of each day to determine the weather. Alternatively, it may be fun to determine the weather by what is actually happening outside your game table!</p>
<p>The effects in the table below are optional. Each type of move listed in the "Types Affected" can roll its damage rolls twice and take the higher result.</p>
<h2>Spring/Summer</h2>
<InfoTable label="Spring/Summer Table">
	<thead>
		<tr>
			<th>d100</th>
			<th>Weather</th>
			<th>Types Affected (optional)</th>
		</tr>
	</thead>
	<tbody class="pre">
		<tr>
			<td>1-25</td>
			<td>Harsh Sun, Calm</td>
			<td>Grass, Ground, Fire</td>
		</tr>
		<tr>
			<td>26-35</td>
			<td>Harsh Sun, Windy</td>
			<td>Grass, Ground, Fire, Flying, Dragon, Psychic</td>
		</tr>
		<tr>
			<td>36-65</td>
			<td>Cloudy, Calm</td>
			<td>Normal, Rock, Fairy, Fighting, Poison</td>
		</tr>
		<tr>
			<td>66-75</td>
			<td>Cloudy, Windy</td>
			<td>Normal, Rock, Fairy, Fighting, Poison, Flying, Dragon, Psychic</td>
		</tr>
		<tr>
			<td>76-80</td>
			<td>Foggy</td>
			<td>Dark, Ghost</td>
		</tr>
		<tr>
			<td>81-90</td>
			<td>Light Drizzle</td>
			<td>Water, Electric, Bug</td>
		</tr>
		<tr>
			<td>91-99</td>
			<td>Heavy Rain</td>
			<td>Water, Electric, Bug</td>
		</tr>
		<tr>
			<td>100</td>
			<td>Dangerous Storm</td>
			<td>Water, Electric, Bug</td>
		</tr>
	</tbody>
</InfoTable>

<h2>Fall/Winter</h2>
<InfoTable label="Fall/Winter Table">
	<thead>
		<tr>
			<th>d100</th>
			<th>Weather</th>
			<th>Types Affected (optional)</th>
		</tr>
	</thead>
	<tbody class="pre">
		<tr>
			<td>1-15</td>
			<td>Harsh Sun, Calm</td>
			<td>Grass, Ground, Fire</td>
		</tr>
		<tr>
			<td>16-25</td>
			<td>Harsh Sun, Windy</td>
			<td>Grass, Ground, Fire, Flying, Dragon, Psychic</td>
		</tr>
		<tr>
			<td>26-40</td>
			<td>Cloudy, Calm</td>
			<td>Normal, Rock, Fairy, Fighting, Poison</td>
		</tr>
		<tr>
			<td>41-50</td>
			<td>Cloudy, Windy</td>
			<td>Normal, Rock, Fairy, Fighting, Poison, Flying, Dragon, Psychic</td>
		</tr>
		<tr>
			<td>51-60</td>
			<td>Foggy</td>
			<td>Dark, Ghost</td>
		</tr>
		<tr>
			<td>61-70</td>
			<td>Light Drizzle</td>
			<td>Water, Electric, Bug</td>
		</tr>
		<tr>
			<td>71-80</td>
			<td>Heavy Rain</td>
			<td>Water, Electric, Bug</td>
		</tr>
		<tr>
			<td>81-90</td>
			<td>Light Snow</td>
			<td>Ice, Steel</td>
		</tr>
		<tr>
			<td>91-99</td>
			<td>Heavy Snow</td>
			<td>Ice, Steel</td>
		</tr>
		<tr>
			<td>100</td>
			<td>Dangerous Blizzard</td>
			<td>Ice, Steel</td>
		</tr>
	</tbody>
</InfoTable>

<h2>Hail and Sandstorm</h2>
<p>These are special weather-related phenomenon that can occur naturally or in specific areas as the result of moves/abilities like Hail, Sandstorm, Snow Warning, and Sand Stream.</p>
<InfoTable label="Hail and Sandstorm">
	<thead>
		<tr>
			<th>Weather</th>
			<th>Effect</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Hail</td>
			<td>At the beginning of a creature's turn for 5 rounds, any non ice-type Pokémon take ice damage equal to the level of the creature that created this weather, divided by 2, rounded up. If the weather occurred in nature, no damage is dealt.</td>
		</tr>
		<tr>
			<td>Sandstorm</td>
			<td>At the beginning of a creature's turn for 5 rounds, any non rock-, steel- or ground-type Pokémon take rock damage equal to the level of the creature that created this weather, divide</td>
		</tr>
	</tbody>
</InfoTable>

<style>
	.pre td:first-child, .pre td:nth-child(2) {
		white-space: pre;
	}
</style>