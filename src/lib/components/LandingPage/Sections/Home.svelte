<script>
  import {deviceHeight} from "../device_state";
  import {fade} from 'svelte/transition'
  import {onDestroy, onMount} from "svelte";

  let index = 0;
  let task = undefined;

  $: imageHeight = $deviceHeight < 320 ? `${$deviceHeight - 32}px` : 'auto'

  onMount(() => {
      task = setInterval(() => {
          next();
      }, 5000)
  })

  onDestroy(() => {
      if (task) clearInterval(task);
  })

  const quotes = [
      'Swag for life',
      'Because I can'
  ]

  const next = () => {
      index = (index + 1) % quotes.length
  }

</script>

<div class="flex items-center justify-center transition-all">
  <img class="max-h-80" style="height: {imageHeight}" src="img.png" alt="Under Construction" draggable="false">
  <div class="flex flex-col md:pl-6">
    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white break-keep md:whitespace-nowrap text-center">
      Kai Xiang Yong
    </h1>
    {#each [quotes[index]] as quote (index)}
      <p in:fade class="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm md:text-base">{quote}</p>
    {/each}
  </div>
</div>
