<script>
  import { fade } from 'svelte/transition';
  import { deviceHeight } from '../device_state';
  import MyImage from '$lib/images/me.webp';
  import GithubIcon from '$lib/images/icons/github.svelte';
  import MailIcon from '$lib/images/icons/mail.svelte';
  import LinkedinIcon from '$lib/images/icons/linkedin.svelte';
  import InstagramIcon from '$lib/images/icons/instagram.svelte';

  $: imageHeight = $deviceHeight < 320 ? `${$deviceHeight - 32}px` : 'auto';

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

<div class="flex items-center justify-center transition-all">
  <img
    class="max-h-80"
    width="150"
    height="320"
    style="height: {imageHeight}"
    src={MyImage}
    alt="Me"
    title="My Very Cool Portrait"
    draggable="false"
  />
  <div class="flex flex-col md:pl-6">
    <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white break-keep md:whitespace-nowrap text-center"
    >
      Kai Xiang Yong
    </h1>
    <h2 in:fade class="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm md:text-base">
      Software Engineer @ Intel
    </h2>
    <div class="text-xl	flex ">
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

<style>
  img {
    object-fit: contain;
  }
</style>
