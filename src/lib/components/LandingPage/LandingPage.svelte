<script lang="ts">
  import {onMount, tick} from "svelte";
  import {tweened} from "svelte/motion";
  import {quartOut} from "svelte/easing";
  import {FullpageActivity} from "../../../routes/stores";
  import type {Writable} from 'svelte/store';
  import {writable} from "svelte/store";
  import NavBar from "$lib/components/LandingPage/NavBar.svelte";
  import SlideSection from "$lib/components/LandingPage/Section.svelte";
  import {showHorizontalNavBar} from "$lib/components/LandingPage/navbar_state.js";
  import About from "$lib/components/LandingPage/Sections/About.svelte";
  import Contact from "$lib/components/LandingPage/Sections/Contact.svelte";

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
  let windowHeight: number;
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
        scrollLocation.set(value * windowHeight);
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

    windowHeight = containerHeight !== document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : containerHeight

    window.addEventListener('resize', () => {
      windowHeight = containerHeight !== document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : containerHeight

      scrollLocation.set($activePage * windowHeight);
    })
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
    if (event.deltaY > 1) {
      activePage.next();
    }
    if (event.deltaY < -1) {
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
    const scrollDelta = (hasScrolledUp ? container.scrollTop - windowHeight : container.scrollTop) % windowHeight
    const hasExceededScrollRoundThreshold = Math.abs(scrollDelta) > windowHeight * DRAG_THRESHOLD
    if (hasExceededScrollRoundThreshold) {
      hasScrolledUp ? activePage.previous() : activePage.next();
    } else {
      scrollLocation.set($activePage * windowHeight);
    }
    return true;
  }

</script>

<svelte:window on:keydown={onKeyDown} />

<NavBar sections={$slides} currentIndex={$activePage} on:navbar-clicked={onNavBarClicked} dragging={dragging}/>
<div class="h-screen w-screen overflow-hidden touch-none fixed"
     bind:this={container}
     bind:clientHeight={containerHeight}
     on:wheel|preventDefault={onWheel}
     on:pointerdown={onDragStart}
     on:pointermove={onDragging}
     on:pointerup={onDragEnd}
>

  <SlideSection sectionStore="{slides}" title="Home" height="{windowHeight}">
    <div class="w-full h-full" class:pt-16={$showHorizontalNavBar === true}>
      <h1>Kai Xiang Yong</h1>
      {$showHorizontalNavBar === true}
      <p>I’m a software engineer specializing in building web application.</p>
      <div class="hidden sm:block">sm</div>
      <div class="hidden md:block">md</div>
      <div class="hidden lg:block">lg</div>
      <div class="hidden xl:block">xl</div>
      <div class="hidden xxl:block">xxl</div>
      <div class="hidden sm:block portrait:hidden">sm:block portrait:hidden</div>
      <div class="hidden sm:block landscape:hidden">sm:block landscape:hidden</div>
      <div class="hidden sm:block portrait:hidden md:hidden">block sm:hidden portrait:hidden</div>
    </div>
  </SlideSection>

  <SlideSection sectionStore="{slides}" title="About" height="{windowHeight}">
    <div class="w-full h-full flex justify-center items-center" class:pt-16={$showHorizontalNavBar === true}>
      <About></About>
    </div>
  </SlideSection>

  <SlideSection sectionStore="{slides}" title="Experience" height="{windowHeight}">
    <div class="w-full h-full" class:pt-16={$showHorizontalNavBar === true}>
      <h1>Where I've Worked</h1>
      <ul>
        <li>
          <h2>Company 1</h2>
          <p>Write a brief description of your role and responsibilities at the company.</p>
          <p>Write a list of technologies you used during your time at the company</p>
        </li>
        <li>
          <h2>Company 2</h2>
          <p>Write a brief description of your role and responsibilities at the company.</p>
          <p>Write a list of technologies you used during your time at the company</p>
        </li>
      </ul>
    </div>
  </SlideSection>

  <SlideSection sectionStore="{slides}" title="Contact" height="{windowHeight}">
    <div class="w-full h-full flex justify-center items-center">
      <Contact />
    </div>
  </SlideSection>

  {#if containerHeight !== windowHeight}
    <div style="height: {Math.abs(containerHeight - windowHeight)}px"></div>
  {/if}
</div>
