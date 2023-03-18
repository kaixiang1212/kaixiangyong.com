<script>
  import Tabs from '../../Tabs/Tabs.svelte';
  import TabList from '../../Tabs/TabList.svelte';
  import Tab from '../../Tabs/Tab.svelte';
  import TabPanel from '../../Tabs/TabPanel.svelte';
  import Card from '../../Card.svelte';
  import { experiences } from '../info.ts';
</script>

<Card>
  <article>
    <header>
      <h2 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white left-0 w-full">
        Where I've Been
      </h2>
    </header>

    <Tabs>
      <TabList>
        {#each experiences as experience (experience.name)}
          <Tab>{experience.name}</Tab>
        {/each}
      </TabList>

      <div class="grid">
        {#each experiences as experience, i (experience.name)}
          <TabPanel let:selected={active}>
            <h3>
              <span>{experience.position}</span>
              <span class="text-blue-600 dark:text-blue-400 font-semibold">
                @
                <a tabindex={active ? '0' : '-1'} href={experience.url}>
                  {experience?.full_name || experience.name}
                </a>
              </span>
            </h3>
            <sup>{experience.period}</sup>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm md:text-base transition-all">
              {experience.summary}
            </p>
            {#if experience?.comment}
              <p class="font-light text-gray-500 dark:text-gray-500 text-sm md:text-base transition-all">
                <em>{experience.comment}</em>
              </p>
            {/if}
            {#if experience.points}
              <ul class="text-gray-500 dark:text-gray-400 list-disc list-inside text-sm lg:text-base">
                {#each experience.points as point}
                  <li>{point}</li>
                {/each}
              </ul>
            {/if}
          </TabPanel>
        {/each}
      </div>
    </Tabs>
  </article>
</Card>
