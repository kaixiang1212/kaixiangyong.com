<script lang="ts">
    import {onMount} from "svelte";

    export let sectionStore;
    export let title = "";
    export let height = 0;

    onMount(() => {
        sectionStore.update((val: string) => {
            return [...val, title]
        })
    })

</script>

<section style="height: {height}px">
    <slot />
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
