import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

async function testPage(url, label) {
  console.log(`\n=== Testing: ${label} (${url}) ===`);
  await page.goto(url, { timeout: 20000 });
  await page.waitForLoadState('networkidle', { timeout: 20000 });

  const inp = page.locator('input[id="hotel-search"]');
  const found = await inp.count() > 0;
  console.log('Input found:', found);
  if (!found) return;

  await inp.click();
  await page.waitForTimeout(500);

  // Type something
  await inp.fill('a');
  await page.waitForTimeout(1000);

  const dropdown = page.locator('ul.absolute');
  const ddCount = await dropdown.count();
  console.log('Dropdown visible:', ddCount > 0);

  const buttons = page.locator('ul.absolute button');
  const btnCount = await buttons.count();
  console.log('Dropdown buttons:', btnCount);

  if (btnCount > 0) {
    const firstBtn = buttons.first();
    const btnText = await firstBtn.textContent();
    console.log('First item text:', btnText?.trim().substring(0, 60));

    await firstBtn.click();
    await page.waitForTimeout(500);

    // Check if we navigated away
    const currentUrl = page.url();
    console.log('URL after click:', currentUrl);

    // Check input value (page might have changed)
    try {
      const inputValue = await inp.inputValue({ timeout: 2000 });
      console.log('Input value after selection:', JSON.stringify(inputValue));
    } catch {
      console.log('Input no longer in DOM (navigated away)');
    }
  } else {
    // No typed results — try without typing
    await inp.fill('');
    await page.waitForTimeout(500);
    const allButtons = page.locator('ul.absolute button');
    const allCount = await allButtons.count();
    console.log('Buttons with empty input:', allCount);
  }
}

try {
  await testPage('http://localhost:5173/individual-stays', 'Individual Stays (generic)');
  await testPage('http://localhost:5173/individual-stays/sri-lanka', 'Sri Lanka');
} catch(e) {
  console.error('Error:', e.message);
} finally {
  await browser.close();
}
