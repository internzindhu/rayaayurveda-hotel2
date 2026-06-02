import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto('http://localhost:5173/individual-stays', { timeout: 20000 });
  await page.waitForLoadState('networkidle', { timeout: 20000 });

  const inp = await page.locator('input[id="hotel-search"]');
  console.log('Input found:', await inp.count() > 0);

  // Focus the input to open dropdown
  await inp.click();
  await page.waitForTimeout(500);

  // Type something to get hotel suggestions
  await inp.fill('a');
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'ss1-after-type.png', fullPage: false });

  const dropdown = await page.locator('ul.absolute');
  console.log('Dropdown visible count:', await dropdown.count());

  // Check if there are hotel buttons in dropdown
  const buttons = await page.locator('ul.absolute button');
  const btnCount = await buttons.count();
  console.log('Dropdown buttons:', btnCount);

  if (btnCount > 0) {
    const firstBtn = buttons.first();
    const btnText = await firstBtn.textContent();
    console.log('First dropdown item text:', btnText?.trim());

    // Click it and check input value
    await firstBtn.click();
    await page.waitForTimeout(300);

    const inputValue = await inp.inputValue();
    console.log('Input value after selection:', JSON.stringify(inputValue));

    await page.screenshot({ path: 'ss2-after-select.png', fullPage: false });
  } else {
    console.log('No dropdown items found');
    await page.screenshot({ path: 'ss1-no-dropdown.png', fullPage: false });
  }
} catch (e) {
  console.error('Error:', e.message);
  await page.screenshot({ path: 'ss-error.png', fullPage: false }).catch(() => {});
} finally {
  await browser.close();
}
