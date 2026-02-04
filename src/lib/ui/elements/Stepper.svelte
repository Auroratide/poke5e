<script lang="ts">
  import { createEventDispatcher } from "svelte"

  export let value = 0
  export let min = -Infinity
  export let max = Infinity
  export let step = 1
  export let disabled = false
  export let deleteOnZero = false

  $: canBeDeleted = deleteOnZero && value - step <= 0

  const dispatch = createEventDispatcher()

  function increment() {
    if (value + step <= max) {
      value += step
      dispatch("change", value)
    }
  }

  function decrement() {
	if (deleteOnZero && value - step <= 0) {
		dispatch("delete")
	}
    if (value - step >= min) {
      value -= step;
      dispatch("change", value)
    }
  }
</script>

<div class="stepper">
  <button
    on:click={increment}
    disabled={disabled || value >= max}
    aria-label="Increase"
  >
    +
  </button>

  <span class="value">{value}</span>

  <button
    on:click={decrement}
    disabled={disabled || value <= min}
	  class={canBeDeleted ? 'can-be-deleted' : ''}
    aria-label="Decrease"
  >
  	{#if canBeDeleted}
		x
	{:else}
		-
	{/if}
  </button>
</div>

<style>
  .stepper {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  button {
    width: 2rem;
    height: 2rem;
    border-radius: 6px;
    border: none;
    background: var(--skin-bg-dark);
    color: var(--skin-bg-text);
    font-size: 1rem;
    cursor: pointer;
  }

  button.can-be-deleted {
	background: var(--skin-danger-bg);
  }

  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .value {
    min-width: 2ch;
    text-align: center;
    font-weight: 600;
  }
</style>