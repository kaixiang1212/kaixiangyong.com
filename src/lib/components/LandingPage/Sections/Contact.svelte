<script lang="ts">
  import {deviceHeight} from "$lib/components/LandingPage/device_state";
  import { fade } from 'svelte/transition';

</script>

{#if $deviceHeight >= 540}
  <div class="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-dark_bg_secondary dark:border-gray-700" in:fade>
    <form class="space-y-6" action="#">
      <h1 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Contact Me</h1>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required>
      </div>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="hello@domain.com" required>
      </div>
      <div>
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
        <textarea id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Message goes here..."></textarea>
      </div>
      <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
    </form>
  </div>
{:else }
  <div in:fade>
    <p>Smaller Contact Info</p>
  </div>
{/if}
