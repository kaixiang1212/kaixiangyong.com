<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import {
    deviceHeight,
    deviceWidth,
    showHorizontalNavBar,
    showVerticalNavBar
  } from "$lib/components/LandingPage/device_state";
  import {quartOut} from "svelte/easing";
  import {tweened} from "svelte/motion";

  export let sections: [string] | undefined;
  export let currentIndex: number | undefined = undefined;
  export let dragging: boolean;

  let visibilityTimeout = null;

  $: showHorizontalNavBar.set($deviceHeight > $deviceWidth || $deviceHeight > 450);
  $: showVerticalNavBar.set($deviceWidth >= $deviceHeight);

  let visibility = tweened(0, {
    duration: 200,
    easing: quartOut
  })

  $: sectionCount = sections?.length;

  $: // Show dot bar when dragging.
    if (dragging) {
      showDotBar();
    } else {
      hideDotBar();
    }

  $: {
    // Temporarily show dot bar when currentIndex changed.
    currentIndex
    showDotBar();
    hideDotBar();
  }

  const dispatch = createEventDispatcher();

  function onClick(index) {
    dispatch('navbar-clicked', index);
  }

  function showDotBar() {
    if (!$showVerticalNavBar) return;
    if (visibilityTimeout) clearTimeout(visibilityTimeout);
    visibility.set(1, {duration: 10})
  }

  function hideDotBar() {
    if (!$showVerticalNavBar) return;
    if (visibilityTimeout) clearTimeout(visibilityTimeout);
    visibilityTimeout = setTimeout(() => {
      visibility.set(0);
      visibilityTimeout = null;
    }, 1500)
  }

</script>

{#if ($showVerticalNavBar)}
  <div class="fixed flex flex-col h-full items-center place-content-center right-10 z-10"
       on:mouseenter={showDotBar}
       on:mouseleave={hideDotBar}
       style="opacity: {$visibility}"
       on:focusin={showDotBar}
       on:focusout={hideDotBar}
  >
    {#each {length: sectionCount} as _, i}
      <button tabindex="-1" class="relative flex items-center justify-center h-6 w-6 mt-2 mb-2 rounded-3xl hover:bg-blue-500 hover:rounded-lg transition-all ease-linear cursor-pointer group shadow-lg"
           on:click={() => onClick(i)}
           class:bg-gray-400={currentIndex === i}
           class:bg-gray-600={currentIndex !== i}
      >
            <span class="absolute w-auto p-2 m-2 min-w-max right-6 rounded-md shadow-md text-white dark:bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100 shadow-md shadow-gray-900">
                {sections[i]}
            </span>
      </button>
    {/each}
  </div>
{/if}

{#if ($showHorizontalNavBar)}

  <div class="translate-y-0 z-10 absolute w-screen">
    <nav class="flex shadow-gray-1000 shadow-md transition-all"
         class:rounded-md={currentIndex !== 0}
         class:m-2={currentIndex !== 0}
         class:shadow-md={currentIndex !== 0}
         class:bg-light_bg_secondary={currentIndex !== 0}
         class:dark:bg-dark_bg_secondary={currentIndex !== 0}
         class:bg-light_bg_primary={currentIndex === 0}
         class:dark:bg-dark_bg_primary={currentIndex === 0}
    >
      {#each {length: sectionCount} as _, i}
        <button class="link-container p-4 hidden sm:block portrait:block text-sm sm:text-base" on:click={() => onClick(i)}>
          <span class="hover:text-gray-500 cursor-pointer transition-all border-b-2"
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
