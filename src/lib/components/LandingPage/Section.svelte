<script lang="ts">
    import {onMount} from "svelte";
    import {deviceHeight, showHorizontalNavBar} from "$lib/components/LandingPage/device_state.js";
    import {FullpageActivity} from "./stores";
    import {to_number} from "svelte/internal";

    export let index: number;
    export let controller: FullpageActivity | undefined = undefined;
    export let sectionStore;
    export let title = "";

    onMount(() => {
        sectionStore.update((val: string) => {
            return [...val, title]
        })
    })

    const onFocusIn = () => {
        controller.toPage(to_number(index));
    }

</script>

<section style="height: {$deviceHeight}px"
         on:focusin={onFocusIn}>
  <div class="w-full h-full flex justify-center items-center pl-4 pr-4 pb-4" class:pt-16={$showHorizontalNavBar === true}>
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
