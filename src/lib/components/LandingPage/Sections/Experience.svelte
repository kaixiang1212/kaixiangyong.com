<script>
    import Tabs from "$lib/components/Tabs/Tabs.svelte";
    import TabList from "$lib/components/Tabs/TabList.svelte";
    import Tab from "$lib/components/Tabs/Tab.svelte";
    import TabPanel from "$lib/components/Tabs/TabPanel.svelte";
    import Card from "$lib/components/Card.svelte";

    const experiences = [
        {
            position: 'Dev Tools Software Engineer',
            company: 'Intel',
            company_url: 'https://www.intel.com/content/www/us/en/homepage.html',
            period: 'April 2021 - Present',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ante erat, fringilla nec lobortis efficitur, faucibus eget arcu.',
            points: ['Make some point', 'Make another Point']
        },
        {
            position: 'Backend Software Engineer',
            company: 'Whenso Labs',
            company_url: 'https://whenso.com/',
            period: 'November 2020 - April 2021',
            summary: 'this will hold summary',
            points: []
        }
    ]
</script>


<Card>
  <h1 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white left-0 w-full">Where I've Worked</h1>

  <Tabs>
    <TabList>
      <Tab>Intel</Tab>
      <Tab>Whenso</Tab>
    </TabList>

    <div class="grid">
      {#each experiences as experience}
        <TabPanel>
          <h3>
            <span>{experience.position}</span>
            <span class="text-blue-500"> @
              <a href="{experience.company_url}">{experience.company}
              </a>
            </span>
          </h3>
          <sup>{experience.period}</sup>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm md:text-base transition-all">{experience.summary}</p>
          {#if experience.points}
            <ul class="text-gray-500 list-disc list-inside text-sm lg:text-base">
              {#each experience.points as point}
                <li>{point}</li>
              {/each}
            </ul>
          {/if}
        </TabPanel>
      {/each}
    </div>
  </Tabs>
</Card>
