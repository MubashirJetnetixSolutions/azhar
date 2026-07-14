// End-to-end check: click the report-hub download button and confirm a PDF
// file is produced. Usage: node scripts/verify-report-download.mjs [outDir]
import { chromium } from "playwright";

const outDir = process.argv[2] ?? "public";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1630, height: 900 } });
const page = await ctx.newPage();
await page.addInitScript(() => localStorage.setItem("autosystem_auth", "1"));
await page.goto("http://localhost:3000/report-hub", { waitUntil: "networkidle", timeout: 120000 });

const [download] = await Promise.all([
  page.waitForEvent("download", { timeout: 120000 }),
  page.locator("tbody tr").first().locator("button").first().click(),
]);
const path = `${outDir}/downloaded-${download.suggestedFilename()}`;
await download.saveAs(path);
console.log("downloaded:", download.suggestedFilename(), "->", path);
await browser.close();
