<script lang="ts">
    import {onMount} from "svelte";
    import {deviceHeight, showHorizontalNavBar} from "$lib/components/LandingPage/device_state.js";

    export let sectionStore;
    export let title = "";

    onMount(() => {
        sectionStore.update((val: string) => {
            return [...val, title]
        })
    })

</script>

<section style="height: {$deviceHeight}px">
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
