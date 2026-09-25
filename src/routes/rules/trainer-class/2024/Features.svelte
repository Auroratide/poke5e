<script lang="ts">
	import { m } from "$lib/site/i18n"
	import { Heading } from "$lib/ui/elements"
</script>

<Heading level="3" id="trainer-license">Trainer License</Heading>
<p>Only licensed trainers are permitted to capture Pokémon, and this license identifies you as having such authorization. It also allows trainers to gain access to special services at Pokémon centers and to purchase goods at the Poké Mart.</p>
<p>Trainers can lose their license for attacking other trainers or their Pokémon, or failing to take care of their own Pokémon.</p>

<Heading level="3" id="starter-pokemon">Starter Pokemon</Heading>
<p>A trainer must begin with any single unevolved Pokemon of Species Rating (SR) 1/2 or lower with the base stats in its stat block. This Pokemon starts with a nature and non-hidden ability of the player's choice.</p>

<Heading level="3" id="pokedex">Pokédex</Heading>
<p>A hand-held computer with an advanced camera and image recognition software. A trainer can use a <strong>bonus action</strong> to identify a Pokemon within 60 feet using the Pokedex's scanner. Doing so registers the Pokemon on the Pokedex, and reveals the base SR and some brief facts about the species.</p>

<Heading level="3" id="pokeslots">Pokeslots</Heading>
<p>A Trainer’s Pokéslots are the number of Pokémon a Trainer can carry in their pack. At level 1, a Trainer carries their Starter and has two empty slots. Trainers can carry an additional Pokémon at levels 5, 10, and 15.</p>

<Heading level="3" id="control-upgrade">Control Upgrade</Heading>
<p>Each species of Pokemon is given its own <dfn>Species Rating</dfn> (<abbr>SR</abbr>). The stronger the Pokemon, the more difficult they are to control. The type of Pokemon you can control in the game depends on the level of your character (as seen in the Trainer Level Table).</p>
<p>Without the proper level, a Pokemon with a higher SR than allowed will refuse to leave their Pokeball or obey the trainer's orders. The maximum SR you can control increases at levels 3, 6, 8, 11, 14, and 17.</p>

<Heading level="3" id="trainers-resolve">{m.trainerResolve()}</Heading>
{@html m.trainerResolveDescriptionHtml()}

<Heading level="3" id="pokemon-tracker">{m.pokemonTracker()}</Heading>
{@html m.pokemonTrackerDescriptionHtml()}

<Heading level="3" id="epic-boon">Epic Boon</Heading>
<p>You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Fate is recommended.</p>
<p>A list of Epic Boons can be found in the D&D Player Handbook, page 210.</p>
<p>Be creative roleplaying boons that seem "magical" for a Pokémon universe. For example, perhaps Boon of Fate could be interpretted as your trainer giving a last-minute critical command that gets your Pokémon out of danger.</p>

<Heading level="3" id="master-trainer">{m.masterTrainer()}</Heading>
{@html m.masterTrainerDescriptionHtml()}
