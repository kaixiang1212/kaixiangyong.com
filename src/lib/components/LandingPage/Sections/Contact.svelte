<div class="max-w-xl dark:bg-dark_bg_secondary p-4 rounded-lg">
  <h1 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Contact Me</h1>
  <form class="font-normal items-center justify-center">
    <label class="block font-medium" for="name">Name:</label>
    <input class="bg-gray-700 p-2 rounded-lg" type="text" id="name" name="name">
    <label class="block font-medium" for="email">Email:</label>
    <input class="bg-gray-700 p-2 rounded-lg" type="email" id="email" name="email">
    <label class="block font-medium" for="message">Message:</label>
    <textarea id="message" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your message here..."></textarea>
    <button class="inline-flex items-center flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => console.log("somethin")}>
      Button
    </button>
  </form>
</div>
