import { writable } from 'svelte/store';

export const showHorizontalNavBar = writable<boolean>(true);
export const showVerticalNavBar = writable<boolean>(true);

export const deviceHeight = writable<number>(0);
export const deviceWidth = writable<number>(0);
