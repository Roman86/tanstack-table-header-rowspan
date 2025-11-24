import { expect, test } from '@playwright/test';

test('rowspan', async ({ page }, testInfo) => {
  testInfo?.setTimeout(10000);
  page.setDefaultNavigationTimeout(5000);
  page.setDefaultTimeout(1000);

  await page.goto('/');

  const cases: Record<
    string,
    {
      height?: number;
      top?: number;
    }
  > = {
    "[data-test-rowspan='3']": {
      height: 99,
    },
    "[data-test-rowspan='2']": {
      height: 66,
    },
    "[data-test-rowspan='1']": {
      height: 33,
    },
  };

  for (const [selector, validator] of Object.entries(cases)) {
    const elements = await page
      .locator(selector)
      .filter({ visible: true })
      .all();
    for await (const el of elements) {
      const box = await el.boundingBox();
      const targetHeight = validator.height;
      const actualHeight = box?.height;
      const heightError =
        targetHeight != null &&
        actualHeight != null &&
        Math.abs(targetHeight - actualHeight) > 10
          ? `Bad height: expected around ${targetHeight}px, actual ${actualHeight}px`
          : undefined;

      const targetTop = validator.top;
      const actualTop = box?.y;
      const topError =
        targetTop != null &&
        actualTop != null &&
        Math.abs(targetTop - actualTop) > 10
          ? `Bad top position: expected around ${targetTop}px, actual ${actualTop}px`
          : undefined;

      expect(heightError).toBeUndefined();
      expect(topError).toBeUndefined();
    }
  }
});
