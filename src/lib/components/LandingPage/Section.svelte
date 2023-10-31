<script lang="ts">
  import { onMount } from 'svelte';
  import { to_number } from 'svelte/internal';
  import { deviceHeight, showHorizontalNavBar } from './device_state.js';
  import type { FullpageActivity } from "$lib/components/LandingPage/stores";

  export let index: number;
  export let controller: typeof FullpageActivity | undefined = undefined;
  export let sectionStore;
  export let title = '';

  onMount(() => {
    sectionStore.update((val: string) => {
      return [...val, title];
    });
  });

  const onFocusIn = () => {
    controller.toPage(to_number(index));
  };
</script>

<section style="height: {$deviceHeight}px" on:focusin={onFocusIn}>
  <div
    class="w-full h-full flex justify-center items-center pl-4 pr-4 pb-4"
    class:pt-16={$showHorizontalNavBar === true}
  >
    <slot />
  </div>
</section>

<style>
  section {
    height: 100%;
    width: 100%;
    position: relative;
    touch-action: none;
    overflow: hidden;
    user-select: none;
  }
</style>
