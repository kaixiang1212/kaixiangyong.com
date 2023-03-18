<script lang="ts">
  import {deviceHeight, deviceWidth, showHorizontalNavBar} from "./device_state";
  import {createEventDispatcher} from "svelte";

  export let sections: [string] | undefined;
  export let currentIndex: number | undefined = undefined;

  $: showHorizontalNavBar.set($deviceHeight > $deviceWidth || $deviceHeight > 450);
  $: sectionCount = sections?.length;

  const dispatch = createEventDispatcher();

  function onClick(index) {
    dispatch('page-scroll', index);
  }

</script>


{#if ($showHorizontalNavBar)}

  <div class="translate-y-0 z-10 absolute w-screen">
    <nav class="flex flex-row overflow-x-auto whitespace-nowrap shadow-gray-1000 shadow-md transition-all"
         class:rounded-md={currentIndex !== 0}
         class:m-2={currentIndex !== 0}
         class:shadow-md={currentIndex !== 0}
         class:bg-light_bg_secondary={currentIndex !== 0}
         class:dark:bg-dark_bg_secondary={currentIndex !== 0}
         class:bg-light_bg_primary={currentIndex === 0}
         class:dark:bg-dark_bg_primary={currentIndex === 0}
    >
      {#each {length: sectionCount} as _, i}
        <button class="p-4 hidden sm:block portrait:block text-sm sm:text-base" on:click={() => onClick(i)}>
          <span class="hover:text-gray-500 cursor-pointer transition-all border-b-2 font-semibold"
                class:border-transparent={i !== currentIndex}
                class:border-blue-500={i === currentIndex}
          >
            {sections[i]}
          </span>
        </button>
      {/each}
    </nav>
  </div>
{/if}
