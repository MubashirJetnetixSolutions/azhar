// Temporary diagnostic endpoint — remove after the PDF issue is resolved.
// Visit /api/pdf-debug in the browser (while logged in) on the Vercel
// deployment: it runs the full PDF pipeline stage by stage and reports
// exactly where it fails, instead of the generic toast message.
import { existsSync } from "fs";
import { launchBrowser } from "@/pdf/lib/generatePdf";

export const maxDuration = 60;

export async function GET(request) {
  const origin = new URL(request.url).origin;
  const info = {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    origin,
    env: {
      VERCEL: process.env.VERCEL ?? null,
      VERCEL_ENV: process.env.VERCEL_ENV ?? null,
      VERCEL_REGION: process.env.VERCEL_REGION ?? null,
      VERCEL_PROJECT_PRODUCTION_URL:
        process.env.VERCEL_PROJECT_PRODUCTION_URL ?? null,
      // Presence only — never echo the secret itself.
      HAS_AUTOMATION_BYPASS_SECRET: Boolean(
        process.env.VERCEL_AUTOMATION_BYPASS_SECRET
      ),
    },
    stages: {},
    error: null,
  };

  const isServerless = Boolean(
    process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
  );

  let stage = "executablePath";
  let browser = null;
  try {
    if (isServerless) {
      const started = Date.now();
      const sparticuz = await import("@sparticuz/chromium");
      const executablePath = await sparticuz.default.executablePath();
      info.stages.executablePath = {
        ok: true,
        ms: Date.now() - started,
        path: executablePath,
        exists: existsSync(executablePath),
      };
    } else {
      info.stages.executablePath = { ok: true, skipped: "local playwright" };
    }

    stage = "launch";
    {
      const started = Date.now();
      browser = await launchBrowser();
      info.stages.launch = { ok: true, ms: Date.now() - started };
    }

    stage = "goto";
    const page = await browser.newPage();
    if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
      await page.setExtraHTTPHeaders({
        "x-vercel-protection-bypass":
          process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
      });
    }
    const url = `${origin}/print/invoice/0`;
    {
      const started = Date.now();
      const response = await page.goto(url, {
        waitUntil: "load",
        timeout: 45000,
      });
      info.stages.goto = {
        ok: true,
        ms: Date.now() - started,
        requestedUrl: url,
        finalUrl: page.url(),
        status: response ? response.status() : null,
        redirectedOffSite: new URL(page.url()).host !== new URL(url).host,
      };
    }

    stage = "pdf";
    {
      const started = Date.now();
      const pdf = await page.pdf({ format: "A4", printBackground: true });
      info.stages.pdf = {
        ok: true,
        ms: Date.now() - started,
        bytes: pdf.length,
        looksLikePdf: pdf.subarray(0, 5).toString() === "%PDF-",
      };
    }
  } catch (err) {
    info.error = {
      stage,
      message: err?.message || String(err),
      stack: err?.stack ?? null,
    };
  } finally {
    if (browser) await browser.close().catch(() => {});
  }

  return Response.json(info, {
    headers: { "Cache-Control": "no-store" },
  });
}
