import { expect, test } from '@playwright/test';
import { links } from '../src/lib/constants';


test('external links are working', async ({ request}) => {
  for (const link of links) {
    if (link.link.includes('mailto')) continue;
    const response = await request.get(link.link);
    // Request might be denied by the server.
    expect(response.status() !== 404).toBeTruthy();
  }
});

test('page renders', async ({ request, page }) => {
  await page.goto('/');
  expect(await page.textContent('h1')).toBe('Kai Xiang Yong');
});
