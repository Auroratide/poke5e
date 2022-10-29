<script lang="ts">
    import type { PlayerPokemon } from '../types'
    import { Gender } from '../types'
    import { attributeList } from '../../dnd/attributes'
    import { skillList } from '../../dnd/proficiency'
    import { Natures } from '../types'

    const noSpaces = (s: string) => s.replace(/\s/g, '')

    export let pokemon: PlayerPokemon

    let nickname = pokemon.nickname
    let nature = pokemon.nature
    let natureCustom = pokemon.nature
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
        <legend><span class="unskew">Basic Info</span></legend>
        <div class="input-group">
            <label for="nickname-input">Nickname</label>
            <input name="nickname" id="nickname-input" type="text" bind:value={nickname} />
            <label for="nature-input">Nature</label>
            <select id="nature-input" class="cap" bind:value={nature}>
                {#each Natures as natureOption}
                    <option value="{natureOption}">{natureOption}</option>
                {/each}
                <option value="other">Other</option>
            </select>
            {#if nature === 'other'}
                <span></span>
                <span class="hrow">
                    <label for="nature-input-custom">Specify:</label>
                    <input class="full-width" name="nature-custom" id="nature-input-custom" type="text" bind:value={natureCustom} />
                </span>
            {/if}
            <label for="level-input">Level</label>
            <input name="level" id="level-input" type="number" min="1" max="20" bind:value={level} />
            <label for="ac-input">AC</label>
            <input name="ac" id="ac-input" min="0" max="30" type="number" bind:value={ac} />
            <label for="max-hp-input">Max HP</label>
            <input name="max-hp" id="max-hp-input" min="1" type="number" bind:value={maxHp} />
        </div>
    </fieldset>
    <fieldset class="gender">
        <legend><span class="unskew">Gender</span></legend>
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
        <legend><span class="unskew">Attributes</span></legend>
        <div class="input-group">
            {#each attributeList as attr}
                <label for="{attr.abbr}-input">{attr.abbr}</label>
                <input name="{attr.abbr}" id="{attr.abbr}-input" min="0" max="30" type="number" bind:value={attributes[attr.abbr]} />
            {/each}
        </div>
    </fieldset>
    <fieldset class="proficiencies">
        <legend><span class="unskew">Proficiencies</span></legend>
        <div class="input-group">
            {#each skillList as skill}
                {@const nameId = noSpaces(skill.name)}
                <input value={skill.name} bind:group={proficiencies} type="checkbox" id="proficiencies-input-{nameId}" name="proficiencies" />
                <label for="proficiencies-input-{nameId}">{skill.name}</label>
            {/each}
        </div>
    </fieldset>
    <fieldset class="saving-throws">
        <legend><span class="unskew">Saving Throws</span></legend>
        <div class="input-group">
            {#each attributeList as attr}
                <input value={attr.abbr} bind:group={savingThrows} type="checkbox" id="saves-input-{attr.abbr}" name="saves" />
                <label for="saves-input-{attr.abbr}">{attr.name}</label>
            {/each}
        </div>
    </fieldset>
    <fieldset hidden class="moves">
        <legend><span class="unskew">Moves</span></legend>
        {#each pokemon.moves as move, i}
            <div class="input-group">
                <label for="move-input-{i}">Move</label>
                <input id="move-input-{i}" name="move[{i}]" value={move.moveId} />
                <label for="max-pp-input-{i}">Max PP</label>
                <input id="max-pp-input-{i}" type="number" name="max-pp[{i}]" value={move.pp.max} />
                <label for="notes-input-{i}" class="align-start">Notes</label>
                <textarea id="notes-input-{i}" name="notes[{i}]" rows="3">{move.notes ?? ''}</textarea>
                <span></span>
                <button>Remove this move</button>
            </div>
            <hr />
        {/each}
        <button>Add a move</button>
    </fieldset>
</form>

<style lang="scss">
    fieldset {
        border: none;
        padding: 0.5em 1em;
        margin-bottom: 1em;
    }

    .cap {
        text-transform: capitalize;
    }

    legend {
        display: block;
        background-color: var(--skin-bg);
        color: var(--skin-bg-text);
        margin-left: -4em;
        padding: 0.25em 1em 0.25em 4em;
        transform: skewX(var(--skew-angle));

        .unskew {
            display: inline-block;
            transform: skewX(var(--skew-undo));
        }
    }

    .input-group {
        display: grid;
        column-gap: 0.5em;
        row-gap: 0.25em;
        align-items: center;
    }

    .basic-info, .moves {
        .input-group {
            grid-template-columns: auto 1fr;
        }
    }

    .gender {
        .input-group {
            grid-template-columns: repeat(4, auto 1fr);
        }
    }

    .attributes {
        .input-group {
            grid-template-columns: repeat(3, auto 1fr);
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
            grid-template-columns: repeat(2, auto 1fr);
        }

        label {
            text-transform: capitalize;
        }
    }

    .hrow {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .full-width {
        width: 100%;
    }

    .align-start {
        align-self: flex-start;
    }

    hr {
        margin-block: 1rem;
        margin-inline: 2rem;
    }
</style>