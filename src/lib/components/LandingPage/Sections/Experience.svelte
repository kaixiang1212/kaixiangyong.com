<script>
    import Tabs from "$lib/components/Tabs/Tabs.svelte";
    import TabList from "$lib/components/Tabs/TabList.svelte";
    import Tab from "$lib/components/Tabs/Tab.svelte";
    import TabPanel from "$lib/components/Tabs/TabPanel.svelte";
    import Card from "$lib/components/Card.svelte";

    const experiences = [
        {
            position: 'Dev Tools Software Engineer',
            name: 'Intel',
            full_name: 'Intel',
            url: 'https://www.intel.com/content/www/us/en/homepage.html',
            period: 'April 2021 - Present',
            summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ante erat, fringilla nec lobortis efficitur, faucibus eget arcu.',
            points: ['Make some point', 'Make another Point']
        },
        {
            position: 'Backend Software Engineer',
            name: 'Whenso',
            full_name: 'Whenso Labs',
            url: 'https://whenso.com/',
            period: 'November 2020 - April 2021',
            summary: 'Id diam maecenas ultricies mi eget. Faucibus in ornare quam viverra orci sagittis eu volutpat. Risus nec feugiat in fermentum posuere urna.',
            points: ['Make some point', 'Make another Point']
        },
        {
            position: 'Bachelor of Computer Science (AI)',
            name: 'UNSW',
            url: 'https://www.unsw.edu.au/',
            period: 'July 2017 - September 2020',
            summary: 'Risus pretium quam vulputate dignissim suspendisse in. Purus non enim praesent elementum facilisis.',
            points: []
        }
    ]
</script>


<Card>
  <h1 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white left-0 w-full">Where I've Been</h1>

  <Tabs>
    <TabList>
      {#each experiences as experience (experience.name)}
        <Tab>{experience.name}</Tab>
      {/each}
    </TabList>

    <div class="grid">
      {#each experiences as experience (experience.name)}
        <TabPanel>
          <h2>
            <span>{experience.position}</span>
            <span class="text-blue-600 dark:text-blue-400 font-semibold"> @
              <a href="{experience.url}">{experience?.full_name || experience.name}
              </a>
            </span>
          </h2>
          <sup>{experience.period}</sup>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm md:text-base transition-all">{experience.summary}</p>
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
</Card>
