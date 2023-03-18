// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import type { PageLoad } from '../../.svelte-kit/types/src/routes/$types';

export const prerender = true;

export const load = (() => {
  return {
    screens: [{ id: '1' }, { id: '2' }, { id: '3' }]
  };
}) satisfies PageLoad;
