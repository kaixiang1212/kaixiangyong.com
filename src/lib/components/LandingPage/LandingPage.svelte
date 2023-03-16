<script lang="ts">
  import {onMount, tick} from "svelte";
  import {tweened} from "svelte/motion";
  import {quartOut} from "svelte/easing";
  import {FullpageActivity} from "../../../routes/stores";
  import type {Writable} from 'svelte/store';
  import {writable} from "svelte/store";
  import NavBar from "$lib/components/LandingPage/NavBar.svelte";
  import SlideSection from "$lib/components/LandingPage/Section.svelte";
  import About from "$lib/components/LandingPage/Sections/About.svelte";
  import Contact from "$lib/components/LandingPage/Sections/Contact.svelte";
  import Experience from "$lib/components/LandingPage/Sections/Experience.svelte";
  import Home from "$lib/components/LandingPage/Sections/Home.svelte";
  import {deviceHeight, deviceWidth} from "$lib/components/LandingPage/device_state";

  const slides = writable([]);
  let slideCount: Writable<number>;
  let activePage: FullpageActivity;

  let DRAG_THRESHOLD = 0.05

  let mounted = false;
  let container: HTMLElement | null;
  let dragging = false;
  let scrollDuration = 750;
  let dragPosition = 0;
  let dragFrom = 0;
  let containerHeight: number;
  let transitioning = false;

  $: isTransitioning = transitioning || dragging;

  let scrollLocation = tweened(0, {
    duration: scrollDuration,
    easing: quartOut
  })

  onMount(() => {
    mounted = true
    slideCount = writable($slides.length)
    activePage = FullpageActivity(slideCount);

    activePage.subscribe(value => {
      transitioning = true
      tick().then(() => {
        scrollLocation.set(value * $deviceHeight);
      })
      setTimeout(() => {
        transitioning = false
      }, scrollDuration);
    });

    scrollLocation.subscribe((value) => {
      requestAnimationFrame?.(() => {
        if (container) container.scrollTop = value;
      })
    })

    $deviceHeight = containerHeight !== document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : containerHeight

    window.addEventListener('resize', () => {
      $deviceHeight = containerHeight !== document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : containerHeight

      scrollLocation.set($activePage * $deviceHeight);
    })

    // Disable user zoom by pinching input fields.
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    });

  })

  const scrollTo = async (target) => {
    if ($activePage === target) return;
    const direction = target > $activePage ? 1 : -1;
    while ($activePage !== target) {
      await new Promise(resolve => setTimeout(() => {
        if (direction === -1) {
          activePage.previous();
        } else {
          activePage.next();
        }
        resolve();
      }, 75));
    }
  }

  const onNavBarClicked = (event) => {
    scrollTo(event.detail);
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'PageUp') {
      activePage.previous();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'PageDown') {
      activePage.next();
    } else if (event.key === 'Home') {
      scrollTo(0);
    } else if (event.key === 'End') {
      scrollTo($slideCount - 1);
    }
  }

  const onWheel = (event) => {
    event.preventDefault();
    if (event.deltaY > 1 && !transitioning) {
      activePage.next();
    }
    if (event.deltaY < -1 && !transitioning) {
      activePage.previous();
    }
  }

  const onDragStart = (event) => {
    if (!container) return true;
    if (event.buttons === 2) return true;
    dragging = true;
    dragPosition = event.clientY;
    dragFrom = container.scrollTop;
    return true;
  }

  const onDragging = (event) => {
    if (dragging) {
      const offset = event.clientY - dragPosition
      scrollLocation.set(dragFrom - offset, {
        duration: 0
      })
      return true;
    }
    return true;
  }

  const onDragEnd = () => {
    if (!container) return;
    dragging = false;

    const hasScrolledUp = dragFrom > container.scrollTop
    const scrollDelta = (hasScrolledUp ? container.scrollTop - $deviceHeight : container.scrollTop) % $deviceHeight
    const hasExceededScrollRoundThreshold = Math.abs(scrollDelta) > $deviceHeight * DRAG_THRESHOLD
    if (hasExceededScrollRoundThreshold) {
      hasScrolledUp ? activePage.previous() : activePage.next();
    } else {
      scrollLocation.set($activePage * $deviceHeight);
    }
    return true;
  }
</script>

<svelte:window on:keydown={onKeyDown} bind:innerWidth={$deviceWidth}/>

<NavBar sections={$slides} currentIndex={$activePage} on:navbar-clicked={onNavBarClicked} dragging={dragging}/>
<div class="h-screen w-screen overflow-hidden touch-none fixed"
     bind:this={container}
     bind:clientHeight={containerHeight}
     on:wheel|preventDefault|nonpassive={onWheel}
     on:pointerdown={onDragStart}
     on:pointermove={onDragging}
     on:pointerup={onDragEnd}
>

  <SlideSection sectionStore="{slides}" title="Home">
    <Home/>
  </SlideSection>

  <SlideSection sectionStore="{slides}" title="About">
    <About></About>
  </SlideSection>

  <SlideSection sectionStore="{slides}" title="Experience">
    <Experience />
  </SlideSection>

  <SlideSection sectionStore="{slides}" title="Contact">
    <Contact />
  </SlideSection>

  {#if containerHeight !== $deviceHeight}
    <div style="height: {Math.abs(containerHeight - $deviceHeight)}px"></div>
  {/if}
</div>
