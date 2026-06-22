import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1630, height: 900 } });
await page.goto("http://127.0.0.1:3000/dashboard", { waitUntil: "networkidle", timeout: 120000 });
await page.screenshot({ path: "public/local-dashboard.png", fullPage: false });
await browser.close();
console.log("saved public/local-dashboard.png");
