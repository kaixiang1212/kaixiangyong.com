<script>
  import { getContext } from 'svelte';
  import { TABS_CONTEXT } from '$lib/components/Tabs/tab_context.ts';

  const tab = {};
  const { registerTab, selectTab, selectedTab } = getContext(TABS_CONTEXT);

  registerTab(tab);

  $: borderColor =
    $selectedTab === tab
      ? 'border-active_highlight dark:border-dark_active_highlight'
      : 'border-inactive_highlight dark:border-dark_inactive_highlight';
</script>

<button
  class="p-2 active:bg-invisible border-b-2 sm:border-l-2 sm:border-b-0 transition-all text-left {borderColor}"
  class:selected={$selectedTab === tab}
  on:click={() => selectTab(tab)}
>
  <slot />
</button>
