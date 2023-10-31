<script lang="ts">
  import { deviceHeight, deviceWidth, showHorizontalNavBar } from "./device_state";
  import { createEventDispatcher } from "svelte";

  export let sections: [string];
  export let currentIndex: number | undefined = undefined;

  $: showHorizontalNavBar.set($deviceHeight > $deviceWidth || $deviceHeight > 450);
  $: sectionCount = sections?.length || 0;

  const dispatch = createEventDispatcher();

  function onClick(index: number) {
    dispatch('page-scroll', index);
  }
</script>

{#if $showHorizontalNavBar}
  <div class="translate-y-0 z-10 absolute w-screen flex justify-center">
    <nav
      class="flex flex-row overflow-x-auto whitespace-nowrap shadow-gray-1000 shadow-md transition-all "
      class:rounded-3xl={currentIndex !== 0}
      class:m-3={currentIndex !== 0}
      class:shadow-md={currentIndex !== 0}
      class:bg-light_bg_secondary={currentIndex !== 0}
      class:dark:bg-dark_bg_secondary={currentIndex !== 0}
      class:bg-transparent={currentIndex === 0}
      class:dark:bg-transparent={currentIndex === 0}
    >
      <div class="flex items-center"> <!-- Added a container div -->
        {#each { length: sectionCount } as _, i}
          <button
            class="p-4 hidden sm:block portrait:block text-sm sm:text-base"
            on:click={() => onClick(i)}
          >
          <span
            class="hover:text-gray-500 cursor-pointer transition-all border-b-2 font-semibold"
            class:border-transparent={i !== currentIndex}
            class:border-blue-500={i === currentIndex}
          >
            {sections[i]}
          </span>
          </button>
        {/each}
      </div>
    </nav>
  </div>
{/if}
