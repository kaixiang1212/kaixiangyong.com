<script lang="ts">
  import Card from "../../Card.svelte";
  import ScalaIcon from "$lib/images/icons/scala.svelte"
  import GoIcon from "$lib/images/icons/golang.svelte"
  import TypescriptIcon from "$lib/images/icons/typescript.svelte"
  import PythonIcon from "$lib/images/icons/python.svelte"
  import AwsIcon from "$lib/images/icons/aws.svelte"
  import {deviceHeight} from "../device_state";
  import {experiences} from "../info.ts";

  $: showIcon = $deviceHeight >= 450
</script>

<Card>
  <article>
    <h2 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">About Me</h2>
    <p class="mb-2 font-normal text-sm md:text-base text-gray-500 dark:text-gray-400 transition-all">
      I am passionate about software development and have had the opportunity to work in both
      <a class="text-blue-600 dark:text-blue-400" href={experiences[1].url}>start-up</a>
      and
      <a class="text-blue-600 dark:text-blue-400" href={experiences[0].url}>corporate</a>
      environments
      throughout my career.
    </p>
    <p class="mb-2 font-normal text-sm md:text-base text-gray-500 dark:text-gray-400 transition-all">
      Although I am primarily interested in
      <strong class="text-neutral-600 dark:text-neutral-300">backend software engineering</strong>,
      I am comfortable with
      <strong class="text-neutral-600 dark:text-neutral-300">front-end development</strong>
      as well. I am committed to staying up-to-date with the
      <strong class="text-neutral-600 dark:text-neutral-300">latest technologies</strong>
      and delivering top-notch code.
    </p>
    <div>
      <p class="text-xs md:text-sm font-normal text-gray-500 dark:text-gray-400 transition-all">
        Technologies that I have been working with recently:
      </p>
      <ul class="flex text-xs pt-2">
        <li class:iconhidden={!showIcon}>
          <div>
            {#if showIcon}
              <div class="icon">
                <PythonIcon/>
              </div>
            {/if}
            <span>Python</span>
          </div>
        </li>
        <li class:iconhidden={!showIcon}>
          <div>
            {#if showIcon}
              <div class="icon">
                <TypescriptIcon/>
              </div>
            {/if}
            <span>Typescript</span>
          </div>
        </li>
        <li class:iconhidden={!showIcon}>
          <div>
            {#if showIcon}
              <div class="icon">
                <ScalaIcon/>
              </div>
            {/if}
            <span>Scala</span>
          </div>
        </li>
        <li class:iconhidden={!showIcon}>
          <div>
            {#if showIcon}
              <div class="icon">
                <GoIcon/>
              </div>
            {/if}
            <span>Golang</span>
          </div>
        </li>
        <li class:iconhidden={!showIcon}>
          <div>
            {#if showIcon}
              <div class="icon">
                <AwsIcon/>
              </div>
            {/if}
            <span>AWS</span>
          </div>
        </li>
      </ul>
    </div>
  </article>
</Card>

<style>
    li {
        width: 100%;
    }
    li > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .icon {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
    }
</style>
