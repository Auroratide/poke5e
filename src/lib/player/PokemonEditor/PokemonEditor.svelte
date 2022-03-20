<script lang="ts">
    import type { PlayerPokemon } from '../types'
    import { Gender } from '../types'
    import { attributeList } from '../../dnd/attributes'
    import { skillList } from '../../dnd/proficiency'

    const noSpaces = (s: string) => s.replace(/\s/g, '')

    export let pokemon: PlayerPokemon

    let nickname = pokemon.nickname
    let level = pokemon.level
    let ac = pokemon.ac
    let maxHp = pokemon.hp.max

    let gender = pokemon.gender

    let attributes = { ...pokemon.attributes }
    let proficiencies = pokemon.proficiencies
    let savingThrows = pokemon.savingThrows

    const onSubmit = () => {

    }
</script>

<form on:submit|preventDefault={onSubmit}>
    <fieldset class="basic-info">
        <legend>Basic Info</legend>
        <div class="input-group">
            <label for="nickname-input">Nickname</label>
            <input name="nickname" id="nickname-input" type="text" bind:value={nickname} />
            <label for="level-input">Level</label>
            <input name="level" id="level-input" type="number" min="1" max="20" bind:value={level} />
            <label for="ac-input">AC</label>
            <input name="ac" id="ac-input" min="0" max="30" type="number" bind:value={ac} />
            <label for="max-hp-input">Max HP</label>
            <input name="max-hp" id="max-hp-input" min="1" type="number" bind:value={maxHp} />
        </div>
    </fieldset>
    <fieldset class="gender">
        <legend>Gender</legend>
        <div class="input-group">
            <input value={Gender.Male} type="radio" id="gender-input-male" name="gender" bind:group={gender} />
            <label for="gender-input-male">Male</label>
            <input value={Gender.Female} type="radio" id="gender-input-female" name="gender" bind:group={gender} />
            <label for="gender-input-female">Female</label>
            <input value={Gender.None} type="radio" id="gender-input-none" name="gender" bind:group={gender} />
            <label for="gender-input-none">None</label>
            <input value={Gender.Other} type="radio" id="gender-input-other" name="gender" bind:group={gender} />
            <label for="gender-input-other">Other</label>
        </div>
    </fieldset>
    <fieldset class="attributes">
        <legend>Attributes</legend>
        <div class="input-group">
            {#each attributeList as attr}
                <label for="{attr.abbr}-input">{attr.abbr}</label>
                <input name="{attr.abbr}" id="{attr.abbr}-input" min="0" max="30" type="number" bind:value={attributes[attr.abbr]} />
            {/each}
        </div>
    </fieldset>
    <fieldset class="proficiencies">
        <legend>Proficiencies</legend>
        <div class="input-group">
            {#each skillList as skill}
                {@const nameId = noSpaces(skill.name)}
                <input value={skill.name} bind:group={proficiencies} type="checkbox" id="proficiencies-input-{nameId}" name="proficiencies" />
                <label for="proficiencies-input-{nameId}">{skill.name}</label>
            {/each}
        </div>
    </fieldset>
    <fieldset class="saving-throws">
        <legend>Saving Throws</legend>
        <div class="input-group">
            {#each attributeList as attr}
                <input value={attr.abbr} bind:group={savingThrows} type="checkbox" id="saves-input-{attr.abbr}" name="saves" />
                <label for="saves-input-{attr.abbr}">{attr.name}</label>
            {/each}
        </div>
    </fieldset>
</form>

<style lang="scss">
    .basic-info {
        .input-group {
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
            gap: 0.25em;
        }
    }

    .gender {
        .input-group {
            display: grid;
            grid-template-columns: repeat(4, auto 1fr);
            align-items: center;
            gap: 0.25em;
        }
    }

    .attributes {
        .input-group {
            display: grid;
            grid-template-columns: repeat(3, auto 1fr);
            gap: 0.25em;
            align-items: center;
        }

        label {
            text-transform: uppercase;
        }

        input {
            max-width: 4em;
        }
    }

    .proficiencies, .saving-throws {
        .input-group {
            display: grid;
            grid-template-columns: repeat(2, auto 1fr);
            gap: 0.25em;
            align-items: center;
        }

        label {
            text-transform: capitalize;
        }
    }
</style>