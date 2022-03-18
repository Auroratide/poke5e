<script lang="ts">
    export let id: string
    export let value: number

    let width = value?.toString()?.length ?? 0

    const onChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        const addOrSubtractPattern = /(\d+)\s*(\+|\-)\s*(\d+)/
        const expression = target.value.match(addOrSubtractPattern)
        if (expression != null) {
            value = parseFloat(expression[1]) + parseFloat(expression[2] + expression[3])
        } else {
            const numericValue = parseFloat(target.value)
            value = isNaN(numericValue) ? 0 : numericValue
        }

        width = value?.toString()?.length ?? 0
    }

    const onInput = (e: Event) => {
        const target = e.target as HTMLInputElement
        width = target.value.length
    }
</script>

<input {id} type="text" {value} on:change={onChange} on:input={onInput} style:width="{width + 1}ch" />

<style>
    input {
        min-width: var(--input-min-width, 100%);
        border: none;
        background-color: var(--skin-input-bg);
    }

    input:focus {
        background-color: var(--skin-content);
    }
</style>