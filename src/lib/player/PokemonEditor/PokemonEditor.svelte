<script lang="ts">
    import { attributeList } from '../../dnd/attributes'
    import { skillList } from '../../dnd/proficiency'

    const noSpaces = (s: string) => s.replace(/\s/g, '')
</script>

<form>
    <label for="nickname-input">Nickname</label>
    <input type="text" name="nickname" id="nickname-input" />
    <label for="level-input">Level</label>
    <input type="number" name="level" id="level-input" min="1" max="20" />
    <label for="ac-input">AC</label>
    <input type="number" name="ac" id="ac-input" min="0" max="30" />
    <label for="max-hp-input">Max HP</label>
    <input type="number" name="max-hp" id="max-hp-input" min="1" />
    <fieldset>
        <legend>Gender</legend>
        <input type="radio" id="gender-input-male" name="gender" />
        <label for="gender-input-male">Male</label>
        <input type="radio" id="gender-input-female" name="gender" />
        <label for="gender-input-female">Female</label>
        <input type="radio" id="gender-input-none" name="gender" />
        <label for="gender-input-none">None</label>
        <input type="radio" id="gender-input-other" name="gender" />
        <label for="gender-input-other">Other</label>
    </fieldset>
    <fieldset>
        <legend>Attributes</legend>
        {#each attributeList as attr}
            <label for="{attr.abbr}-input">{attr.abbr}</label>
            <input type="number" name="{attr.abbr}" id="{attr.abbr}-input" min="0" max="30" />
        {/each}
    </fieldset>
    <fieldset>
        <legend>Proficiencies</legend>
        {#each skillList as skill}
            {@const nameId = noSpaces(skill.name)}
            <input type="checkbox" id="proficiencies-input-{nameId}" name="proficiencies" />
            <label for="proficiencies-input-{nameId}">{skill.name}</label>
        {/each}
    </fieldset>
    <fieldset>
        <legend>Saving Throws</legend>
        {#each attributeList as attr}
            <input type="checkbox" id="saves-input-{attr.abbr}" name="saves" />
            <label for="saves-input-{attr.abbr}">{attr.name}</label>
        {/each}
    </fieldset>
</form>
