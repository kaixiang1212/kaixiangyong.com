<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let sections: [string];

    export let currentIndex: number;

    $: sectionCount = sections.length;

    let height;

    const dispatch = createEventDispatcher();

    function onClick(index) {
        dispatch('navbar-clicked', index);
    }
</script>

<svelte:window bind:innerHeight={height} />

<div class="fixed flex flex-col h-full items-center place-content-center right-10 z-10 invisible sm:visible">
    {#each {length: sectionCount} as _, i}
        <div class="relative flex items-center justify-center h-6 w-6 mt-2 mb-2 rounded-3xl hover:bg-green-600 hover:rounded-lg transition-all ease-linear cursor-pointer group shadow-lg"
             on:click={() => onClick(i)}
             class:bg-gray-400={currentIndex !== i}
             class:bg-gray-800={currentIndex === i}
        >
            <span class="absolute w-auto p-2 m-2 min-w-max right-6 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100 shadow-md shadow-gray-900">
                {sections[i]}
            </span>
        </div>
    {/each}
</div>

<style>
</style>
