import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto('http://localhost:5173/individual-stays/sri-lanka', { timeout: 20000 });
  await page.waitForLoadState('networkidle', { timeout: 20000 });

  const inp = page.locator('input[id="hotel-search"]');
  await inp.click();
  await inp.fill('a');
  await page.waitForTimeout(1000);

  // List all dropdown buttons and their text to find a hotel vs city
  const buttons = page.locator('ul.absolute button');
  const count = await buttons.count();
  console.log('Total buttons:', count);

  for (let i = 0; i < Math.min(count, 10); i++) {
    const text = await buttons.nth(i).textContent();
    console.log(`Button ${i}:`, JSON.stringify(text?.trim().substring(0, 80)));
  }

  // Check if there are "Hotels" section header li's
  const sectionHeaders = page.locator('ul.absolute li.text-\\[10px\\]');
  const headerCount = await sectionHeaders.count();
  console.log('Section headers:', headerCount);
  for (let i = 0; i < headerCount; i++) {
    const text = await sectionHeaders.nth(i).textContent();
    console.log(`Section header ${i}:`, text?.trim());
  }

  // Find the Hotels section - look for button after a "Hotels" li
  // Hotels buttons should have a span.font-medium child
  const hotelButtons = page.locator('ul.absolute button:has(span.font-medium)');
  const hotelCount = await hotelButtons.count();
  console.log('\nHotel buttons (with font-medium span):', hotelCount);

  if (hotelCount > 0) {
    const firstHotelBtn = hotelButtons.first();
    const hotelText = await firstHotelBtn.textContent();
    console.log('First hotel button text:', JSON.stringify(hotelText?.trim().substring(0, 80)));

    console.log('\n--- Clicking hotel button ---');
    const urlBefore = page.url();
    await firstHotelBtn.click();
    await page.waitForTimeout(1000);

    const urlAfter = page.url();
    console.log('URL before:', urlBefore);
    console.log('URL after:', urlAfter);
    console.log('Navigated away:', urlBefore !== urlAfter);

    if (urlBefore === urlAfter) {
      const inputValue = await inp.inputValue().catch(() => '(input gone)');
      console.log('Input value after hotel click:', JSON.stringify(inputValue));
    }
  }

} catch (e) {
  console.error('Error:', e.message);
} finally {
  await browser.close();
}
