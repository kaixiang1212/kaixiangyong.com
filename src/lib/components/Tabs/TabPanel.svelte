<script>
    import {getContext} from 'svelte';
    import {TABS_CONTEXT} from "$lib/components/Tabs/tab_context.ts";

    const panel = {};
    const { registerPanel, selectedPanel } = getContext(TABS_CONTEXT);

    registerPanel(panel);
</script>

<div style:--opacity={$selectedPanel === panel ? 100 : 0}
     style="pointer-events: {$selectedPanel === panel ? 'auto' : 'none'}" class="mt-4 sm:ml-4 sm:mt-0">
  <slot></slot>
</div>

<style>
    /* Using var(--opacity) to prevent tab container height change. */
    div {
        opacity: var(--opacity);
        transition: opacity 0.2s;
        grid-column: 1;
        grid-row: 1;
    }
</style>
