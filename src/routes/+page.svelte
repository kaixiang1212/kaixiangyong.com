<script lang="ts">
  import GithubIcon from "$lib/images/icons/github.svelte";
  import MailIcon from "$lib/images/icons/mail.svelte";
  import InstagramIcon from "$lib/images/icons/instagram.svelte";
  import AsciiPixelate from "$lib/components/Ascii/AsciiPixelate.svelte";
  import LinkedinIcon from "$lib/images/icons/linkedin.svelte";
  import {fade} from "svelte/transition";
  import {onMount} from "svelte";
  import SvelteFooter from "$lib/components/SvelteFooter.svelte";
  import RippleBackground from "$lib/components/RippleBackground.svelte";

  let draw: () => void;

  let mounted = false;
  let cellSize = 8;

  function render() {
    const reduceMotionPreferred = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
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

  onMount(() => {
    mounted = true;
    render();
  });

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
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4 flex items-center justify-center">
    <div class="max-h-80" in:fade>
      <AsciiPixelate src="me.webp"
                     cellSize="{cellSize}"
                     ascii="01"
                     height="{320}"
                     width="{150}"
                     bind:render={draw}
                     on:animation-start={render}/>
    </div>
    <div class="flex flex-col md:pl-6 pl-2" in:fade>
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white break-keep md:whitespace-nowrap">
        Kai Xiang Yong
      </h1>
      <h2 in:fade class="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm md:text-base">
        Software Engineer @ Intel
      </h2>
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

  <RippleBackground />
  <SvelteFooter />
{/if}
