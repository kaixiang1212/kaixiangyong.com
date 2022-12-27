<script lang="ts">
    import {slideSection} from "$lib/components/LandingPage/slideSection";

    export let sectionStore;
    export let title;
    export let height;
</script>

<section use:slideSection={{store: sectionStore, title}} style="height: {height}px">
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
