<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {
        deviceHeight,
        deviceWidth,
        showVerticalNavBar
    } from "./device_state";
    import {quartOut} from "svelte/easing";
    import {tweened} from "svelte/motion";

    export let sections: [string] | undefined;
    export let currentIndex: number | undefined = undefined;
    export let dragging: boolean;

    let visibilityTimeout = null;

    $: showVerticalNavBar.set($deviceWidth >= $deviceHeight);

    let visibility = tweened(0, {
        duration: 200,
        easing: quartOut
    })

    $: sectionCount = sections?.length;

    $: // Show dot bar when dragging.
        if (dragging) {
            show();
        } else {
            hide();
        }

    $: {
        // Temporarily show dot bar when currentIndex changed.
        currentIndex
        show();
        hide();
    }

    const dispatch = createEventDispatcher();

    function onClick(index) {
        dispatch('page-scroll', index);
    }

    function show() {
        if (!$showVerticalNavBar) return;
        if (visibilityTimeout) clearTimeout(visibilityTimeout);
        visibility.set(1, {duration: 10})
    }

    function hide() {
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
       on:mouseenter={show}
       on:mouseleave={hide}
       style="opacity: {$visibility}"
       on:focusin={show}
       on:focusout={hide}
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
