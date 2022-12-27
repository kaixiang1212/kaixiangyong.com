<script lang="ts">
    import {onMount} from "svelte";
    import {tweened} from "svelte/motion";
    import {quartOut} from "svelte/easing";
    import {FullpageActivity} from "../../../routes/stores";
    import {writable} from "svelte/store";
    import DotBar from "$lib/components/LandingPage/DotBar/DotBar.svelte";
    import SlideSection from "$lib/components/LandingPage/Section.svelte";
    import type { Writable } from 'svelte/store';

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
    let clientHeight: number;
    let height: number;

    let scrollLocation = tweened(0, {
        duration: scrollDuration,
        easing: quartOut
    })

    onMount(() => {
        mounted = true
        slideCount = writable($slides.length)
        activePage = FullpageActivity(slideCount);

        new ResizeObserver(() => {
            scrollLocation.set($activePage * height);
        }).observe(document.body)

        activePage.subscribe(value => {
            scrollLocation.set(value * height);
        });

        scrollLocation.subscribe((value) => {
            requestAnimationFrame?.(() => {
                if (container) container.scrollTop = value;
            })
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
        if (!container) return;
        dragging = true;
        dragPosition = event.clientY;
        dragFrom = container.scrollTop;
    }

    const onDragging = (event) => {
        if (dragging) {
            const offset = event.clientY - dragPosition
            scrollLocation.set(dragFrom - offset, {
                duration: 0
            })
        }
    }

    const onDragEnd = () => {
        if (!container) return;
        dragging = false;

        const hasScrolledUp = dragFrom > container.scrollTop
        const scrollDelta = (hasScrolledUp ? container.scrollTop - height : container.scrollTop) % height
        const hasExceededScrollRoundThreshold = Math.abs(scrollDelta) > height * DRAG_THRESHOLD
        if (hasExceededScrollRoundThreshold) {
            hasScrolledUp ? activePage.previous() : activePage.next();
        } else {
            scrollLocation.set($activePage * height);
        }
    }

    let colors = [
        {c: 'red'},
        {c: 'orange'},
        {c: 'yellow'},
        {c: 'green'},
        {c: 'blue'},
        {c: 'indigo'},
        {c: 'purple'}
    ]

</script>

<svelte:window on:keydown={onKeyDown} bind:innerHeight={height}/>

<DotBar sections={$slides} currentIndex={$activePage} on:navbar-clicked={onNavBarClicked}/>
<div class="h-screen w-screen overflow-hidden touch-none fixed"
     bind:this={container}
     bind:clientHeight={clientHeight}
     on:wheel|preventDefault={onWheel}
     on:pointerdown={onDragStart}
     on:pointermove={onDragging}
     on:pointerup|capture={onDragEnd}
>
    {#each colors as color (color.c)}
        <SlideSection sectionStore="{slides}" title="something" height="{height}">
            <div class="w-full h-full bg-{color.c}-500"></div>
        </SlideSection>
    {/each}
    {#if mounted && clientHeight !== height}
        <div style="height: {Math.abs(clientHeight - height)}px"></div>
    {/if}
</div>
