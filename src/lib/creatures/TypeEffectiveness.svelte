<script lang="ts">
    import type { PokeType } from '../pokemon/types'
    import { vulnerabilities, resistances, immunities } from '../pokemon/type-interactions'

    export let type: PokeType[]

    $: vul = Array.from(vulnerabilities(type))
    $: res = Array.from(resistances(type))
    $: imm = Array.from(immunities(type))

    const showTypeList = (list: PokeType[]) => list.length === 0 ? 'none' : list.join(', ')
</script>

<dt>Vulnerabilities</dt>
<dd>{showTypeList(vul)}</dd>
<dt>Resistances</dt>
<dd>{showTypeList(res)}</dd>
<dt>Immunities</dt>
<dd>{showTypeList(imm)}</dd>

<style>
    dd {
        text-transform: capitalize;
    }
</style>
