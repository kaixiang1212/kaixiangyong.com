<script lang="ts">
  import {onDestroy, onMount} from "svelte";
  import {fade} from 'svelte/transition';

  import {AsciiEffect} from "./ascii";

  export let ascii = "!@#$%^&*()+";
  export let src: string;
  export let height: number;
  export let width: number;
  export let cellSize = 6;

  export function render() {
    return effect?.draw();
  }

  let canvas: HTMLCanvasElement;
  let effect: AsciiEffect | undefined;
  let image: HTMLImageElement | undefined;
  let interval_task: number | undefined;
  let mounted = false;

  $: {
    if (cellSize >= 1) {
      effect?.resize(cellSize);
    }
  }

  $: ctx = canvas?.getContext('2d')

  onMount(() => {
    image = new Image();
    image.src = src
    image.onload = () => {
      canvas.width = width ?? image?.width;
      canvas.height = height ?? image?.height;
      if (image && ctx) {
        effect = new AsciiEffect(image, ctx, canvas.width, canvas.height, cellSize, ascii);
        effect.draw();
      }
    };
    mounted = true;
  })

  onDestroy(() => {
    if (interval_task) clearInterval(interval_task);
  })

</script>

{#if mounted}
  <canvas transition:fade|global bind:this={canvas} width="{width}" height="{height}"></canvas>
{:else}
  <canvas width="{width}" height="{height}"></canvas>
{/if}
