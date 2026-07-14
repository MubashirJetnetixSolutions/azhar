// Screenshots each A4 page of the credit-report print view for visual QA.
// Usage: node scripts/capture-report-pdf-pages.mjs [reportIndex] [outDir]
import { chromium } from "playwright";

const reportId = process.argv[2] ?? "0";
const outDir = process.argv[3] ?? "public";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 900, height: 1400 } });
await page.emulateMedia({ media: "print" });
await page.goto(`http://127.0.0.1:3000/print/report/${reportId}`, { waitUntil: "networkidle", timeout: 60000 });
const pages = page.locator(".rpt-page");
const count = await pages.count();
for (let i = 0; i < count; i++) {
  await pages.nth(i).screenshot({ path: `${outDir}/report-page-${i + 1}.png` });
}
await browser.close();
console.log(`captured ${count} pages to ${outDir}`);
