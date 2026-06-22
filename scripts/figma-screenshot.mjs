import { chromium } from "playwright";

const url =
  "https://www.figma.com/design/9FpvT143vtfgqAJJ4ve4va/Azhar-Gul?node-id=0-1";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

console.log("Navigating to Figma...");
await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
await page.waitForTimeout(15000);

await page.screenshot({
  path: "public/figma-full-page.png",
  fullPage: false,
});

const title = await page.title();
console.log("Page title:", title);

const frames = await page.$$eval('[data-testid="canvas"]', (els) =>
  els.map((el) => el.getBoundingClientRect())
);
console.log("Canvas elements:", frames.length);

await browser.close();
console.log("Screenshot saved to public/figma-full-page.png");
