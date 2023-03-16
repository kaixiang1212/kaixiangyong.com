<script>
    import {onDestroy, setContext} from 'svelte';
    import {writable} from 'svelte/store';
    import {TABS_CONTEXT} from "$lib/components/Tabs/tab_context.ts";

    const tabs = [];
    const panels = [];
    const selectedTab = writable(null);
    const selectedPanel = writable(null);

    setContext(TABS_CONTEXT, {
        registerTab: tab => {
            tabs.push(tab);
            selectedTab.update(current => current || tab);

            onDestroy(() => {
                const i = tabs.indexOf(tab);
                tabs.splice(i, 1);
                selectedTab.update(current => current === tab ? (tabs[i] || tabs[tabs.length - 1]) : current);
            });
        },

        registerPanel: panel => {
            panel.index = panels.length
            panels.push(panel);
            selectedPanel.update(current => current || panel);

            onDestroy(() => {
                const i = panels.indexOf(panel);
                panels.splice(i, 1);
                selectedPanel.update(current => current === panel ? (panels[i] || panels[panels.length - 1]) : current);
            });
        },

        selectTab: tab => {
            const i = tabs.indexOf(tab);
            selectedTab.set(tab);
            selectedPanel.set(panels[i]);
        },

        selectedTab,
        selectedPanel
    });
</script>

<div class="flex flex-col sm:flex-row">
  <slot></slot>
</div>
