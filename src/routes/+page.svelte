<script lang="ts">
  import GithubIcon from "$lib/images/icons/github.svelte";
  import MailIcon from "$lib/images/icons/mail.svelte";
  import InstagramIcon from "$lib/images/icons/instagram.svelte";
  import AsciiPixelate from "$lib/components/Ascii/AsciiPixelate.svelte";
  import LinkedinIcon from "$lib/images/icons/linkedin.svelte";
  import {fly, slide} from "svelte/transition";
  import {onDestroy, onMount} from "svelte";
  import SvelteFooter from "$lib/components/SvelteFooter.svelte";
  import RippleBackground from "$lib/components/RippleBackground.svelte";

  // Constants.
  const links = [
    {
      name: 'GitHub',
      link: 'https://github.com/kaixiang1212'
    },
    {
      name: 'Mail',
      link: 'mailto:yongkaixiang@me.com'
    },
    {
      name: 'Linkedin',
      link: 'https://www.linkedin.com/in/kai-xiang-yong/'
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/kaixiang1212/'
    }
  ];

  const subtitles = [
    'Software Engineer @ Intel',
    'UNSW Comp Sci Graduate',
    'Full Stack Developer',
    'Svelte Enthusiastic',
  ]

  // Render States.
  let mounted = false;
  let reduceMotionPreferred = false;

  // Ascii Art.
  let draw: () => void;
  const cellSize = 8;

  // Text roller animation.
  const timeout = 3000;
  let roller: number;
  let subtitleIndex = 0;

  onMount(() => {
    reduceMotionPreferred = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    mounted = true;

    render();
    roller = setInterval(() => {
      subtitleIndex = (subtitleIndex + 1) % subtitles.length;
    }, timeout);
  });

  onDestroy(() => {
    clearInterval(roller);
  });

  function render() {
    if (reduceMotionPreferred) {
      draw();
    } else {
      setInterval(() => {
        requestAnimationFrame(() => {
          draw();
        })
      }, 500);
    }
  }
</script>

<style>
    :global(body) {
        margin: 0;
        overflow: hidden;
    }
</style>

<svelte:head>
  <title>Kai Xiang Yong's Portfolio</title>
  <meta
    name="description"
    content="Kai Xiang Yong is a software engineer who specializes in building web applications."
  />
</svelte:head>


{#if mounted}
  <div class="container px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 flex items-center justify-center">
    <div class="max-h-80" in:fly={{ x: -200, duration: 1000 }}>
      <AsciiPixelate src="me.webp"
                     cellSize="{cellSize}"
                     ascii="01"
                     height="{320}"
                     width="{150}"
                     bind:render={draw}
                     on:animation-start={render}/>
    </div>
    <div class="flex flex-col md:pl-6 pl-2" in:fly={{ x: 200, duration: 1000 }}>
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white break-keep md:whitespace-nowrap">
        Kai Xiang Yong
      </h1>
      {#key subtitleIndex}
        <h2 class="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm md:text-base" transition:slide>
          {subtitles[subtitleIndex]}
        </h2>
      {/key}

      <div class="text-xl flex space-x-2">
        {#each links as link (link.name)}
          <div class="w-6 h-6 ml-1">
            <a href={link.link} target="_blank" rel="noopener noreferrer">
              <div class="h-full w-full block fill-neutral-600 dark:fill-neutral-300 pt-0.5 hover:pt-0 transition-all">
                {#if link.name === 'GitHub'}
                  <GithubIcon />
                {:else if link.name === 'Mail'}
                  <MailIcon />
                {:else if link.name === 'Linkedin'}
                  <LinkedinIcon />
                {:else if link.name === 'Instagram'}
                  <InstagramIcon />
                {/if}
              </div>
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>

  {#if !reduceMotionPreferred}
    <RippleBackground />
  {/if}
  <SvelteFooter />
{/if}
