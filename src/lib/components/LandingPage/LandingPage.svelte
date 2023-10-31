<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { quartOut } from 'svelte/easing';
  import { FullpageActivity } from './stores';
  import type { Writable } from 'svelte/store';
  import { writable } from 'svelte/store';
  import NavBar from './NavBar.svelte';
  import SlideSection from './Section.svelte';
  import About from './Sections/About.svelte';
  import Contact from './Sections/Contact.svelte';
  import Experience from './Sections/Experience.svelte';
  import Home from './Sections/Home.svelte';
  import { deviceHeight, deviceWidth } from './device_state';
  import Indicator from './Indicator.svelte';

  const slides = writable([]);
  let slideCount: Writable<number>;
  let activePage: typeof FullpageActivity;

  // Auxiliary variables
  let container: HTMLElement | null;
  let mounted = false;
  let dragging = false;
  let transitioning = false;
  let dragPosition = 0;
  let dragFrom = 0;
  let DRAG_THRESHOLD = 0.05;
  let scrollTime = 0;
  $: containerHeight = container?.clientHeight || 0;

  // Config variables
  let scrollDuration = 750;

  let scrollLocation = tweened(0, {
    duration: scrollDuration,
    easing: quartOut
  });

  onMount(() => {
    mounted = true;
    slideCount = writable($slides.length);
    activePage = FullpageActivity(slideCount);

    activePage.subscribe((value) => {
      transitioning = true;
      tick().then(() => {
        scrollLocation.set(value * $deviceHeight);
      });
      setTimeout(() => {
        transitioning = false;
      }, scrollDuration);
    });

    scrollLocation.subscribe((value) => {
      requestAnimationFrame?.(() => {
        if (container) container.scrollTop = value;
      });
    });

    $deviceHeight =
      containerHeight !== document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : containerHeight;

    window.addEventListener('resize', () => {
      $deviceHeight =
        containerHeight !== document.documentElement.clientHeight
          ? document.documentElement.clientHeight
          : containerHeight;

      scrollLocation.set($activePage * $deviceHeight);
    });

    // Disable user zoom by pinching input fields.
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    });
  });

  /**
   * Creates a chaining effect for the indicators instead of jumping right into target page.
   * @param {number} target - target page index.
   */
  const scrollTo = async (target: number) => {
    if ($activePage === target) return;
    const direction = target > $activePage ? 1 : -1;
    while ($activePage !== target) {
      await new Promise((resolve) =>
        setTimeout(() => {
          if (direction === -1) {
            activePage.previous();
          } else {
            activePage.next();
          }
          resolve();
        }, 75)
      );
    }
  };

  const onNavBarClicked = (event) => {
    scrollTo(event.detail);
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'PageUp') {
      activePage.previous();
    } else if (
      event.key === 'ArrowDown' ||
      event.key === 'ArrowRight' ||
      event.key === 'PageDown'
    ) {
      activePage.next();
    } else if (event.key === 'Home') {
      scrollTo(0);
    } else if (event.key === 'End') {
      scrollTo($slideCount - 1);
    }
  };

  const onWheel = (event) => {
    const now = Date.now();
    const deltaY = event.deltaY;

    if (Math.abs(deltaY) > 20 && now - scrollTime >= scrollDuration) {
      deltaY < 0 ? activePage.previous() : activePage.next();
      scrollTime = now;
    }
  };

  const onDragStart = (event) => {
    if (!container) return true;
    if (event.buttons === 2) return true;
    dragging = true;
    dragPosition = event.clientY;
    dragFrom = container.scrollTop;
    return true;
  };

  const onDragging = (event) => {
    if (dragging) {
      const offset = event.clientY - dragPosition;
      scrollLocation.set(dragFrom - offset, {
        duration: 0
      });
      return true;
    }
    return true;
  };

  const onDragEnd = () => {
    if (!container) return;
    dragging = false;

    const scrollDelta = dragFrom - container.scrollTop;
    const hasExceededScrollRoundThreshold = Math.abs(scrollDelta) > $deviceHeight * DRAG_THRESHOLD;

    if (hasExceededScrollRoundThreshold) {
      scrollDelta > 0 ? activePage.previous() : activePage.next();
    } else {
      scrollLocation.set($activePage * $deviceHeight);
    }
    return true;
  };
</script>

<svelte:window on:keydown={onKeyDown} bind:innerWidth={$deviceWidth} />

<Indicator
  sections={$slides}
  currentIndex={$activePage}
  on:page-scroll={onNavBarClicked}
  {dragging}
/>
<NavBar sections={$slides} currentIndex={$activePage} on:page-scroll={onNavBarClicked} {dragging} />
<div
  class="h-screen w-screen overflow-hidden touch-none fixed"
  bind:this={container}
  on:wheel|preventDefault|nonpassive={onWheel}
  on:pointerdown={onDragStart}
  on:pointermove={onDragging}
  on:pointerup={onDragEnd}
>
  <SlideSection index="0" controller={activePage} sectionStore={slides} title="Home">
    <Home />
  </SlideSection>

  <SlideSection index="1" controller={activePage} sectionStore={slides} title="About">
    <About />
  </SlideSection>

  <SlideSection index="2" controller={activePage} sectionStore={slides} title="Experience">
    <Experience />
  </SlideSection>

  <SlideSection index="3" controller={activePage} sectionStore={slides} title="Contact">
    <Contact />
  </SlideSection>

  {#if containerHeight !== $deviceHeight}
    <div style="height: {Math.abs(containerHeight - $deviceHeight)}px"> </div>
  {/if}
</div>
