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
  import {links, subtitles} from "$lib/constants";

  // Render States.
  $: innerHeight = 0;
  $: innerWidth = 0;
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
  <meta name="description" content="Explore the professional profile of Kai Xiang Yong. Connect with Kai Xiang Yong on GitHub, LinkedIn, Instagram, and via email. Stay updated on the latest projects and expertise in software development." />
  <meta name="keywords" content="software engineer, Kai Xiang Yong, developer, coding, programming, portfolio, GitHub, LinkedIn, Instagram, email">
  <meta name="author" content="Kai Xiang Yong">
  <meta name="robots" content="index, follow">

  <meta property="og:title" content="Kai Xiang Yong" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://kaixiangyong.com/thumbnail.png" />
  <meta property="og:image:alt" content="Website Preview" />
  <meta property="og:description" content="Explore the professional profile of Kai Xiang Yong. Connect with Kai Xiang Yong on GitHub, LinkedIn, Instagram, and via email. Stay updated on the latest projects and expertise in software development." />
  <meta property="og:url" content="https://kaixiangyong.com/" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="@kaixiang1212" />
  <meta name="twitter:title" content="Kai Xiang Yong" />
  <meta name="twitter:description" content="Explore the professional profile of Kai Xiang Yong. Connect with Kai Xiang Yong on GitHub, LinkedIn, Instagram, and via email. Stay updated on the latest projects and expertise in software development." />
  <meta name="twitter:image" content="https://kaixiangyong.com/thumbnail.png" />
  <meta name="twitter:image:alt" content="Website Preview" />
</svelte:head>

<svelte:window bind:innerHeight={innerHeight} bind:innerWidth/>

{#if mounted}
  <div class="absolute md:px-4 lg:py-4 top-1/2 left-1/2 transform -translate-x-1/2 flex items-center justify-center rounded-2xl {innerHeight < 450 ? '-translate-y-1/2' : '-translate-y-3/4'}">
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
        <span class="{innerWidth <= 360 ? '' : 'whitespace-nowrap'}">Kai Xiang</span> Yong
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
