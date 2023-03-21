<script lang="ts">
  import {onDestroy, onMount} from "svelte";
  import {AsciiEffect} from "./ascii.ts";

  export let ascii = "!@#$%^&*()+";
  export let src;
  export let height;
  export let width;
  export let cellSize = 6;

  export function render() {
    return effect?.draw();
  }

  let canvas;
  let effect: AsciiEffect | undefined;
  let image;
  let interval_task;

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
      canvas.width = width ?? image.width;
      canvas.height = height ?? image.height;
      effect = new AsciiEffect(image, ctx, canvas.width, canvas.height, cellSize, ascii);
      effect.draw();
    };
  })

  onDestroy(() => {
    if (interval_task) clearInterval(interval_task);
  })

</script>

<canvas bind:this={canvas}></canvas>
