import { writable, type Writable, type Readable } from 'svelte/store'

interface FullpageActivityStore extends Readable<number> {
    previous: () => void,
    next: () => void,
    toPage: (pageId: number) => void,
    activePage: number
}

function FullpageActivity(pageCountStore: Writable<number>): FullpageActivityStore {
    let activePage = 0
    let pageCount = 0
    pageCountStore.subscribe((value) => {
        pageCount = value
    })
    const { subscribe, set } = writable(activePage)
    const previous = () => {
        if (activePage > 0) {
            activePage--
            set(activePage)
        }
    }
    const next = () => {
        if (activePage < pageCount - 1) {
            activePage++
            set(activePage)
        }
    }
    const toPage = (pageId: number) => {
        if (pageId >= 0 && pageId < pageCount) {
            set(pageId)
        }
    }
    return {
        subscribe,
        previous,
        next,
        toPage,
        activePage
    }
}

export {
    FullpageActivity
}
export type {
    FullpageActivityStore
}
