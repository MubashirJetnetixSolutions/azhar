// Prints an app print-view route to an A4 PDF buffer. Locally this uses the
// project's installed Playwright Chromium (same browser the capture scripts
// rely on). On Vercel/AWS the Playwright browser cache from the build machine
// is not shipped with the serverless function, so we launch the
// @sparticuz/chromium binary instead — it lives in node_modules and is traced
// into the function bundle. Charts and logos are inline SVG, so they are
// embedded as vectors — never rasterised.

const isServerless = Boolean(
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
);

export async function launchBrowser() {
  if (isServerless) {
    const [{ chromium }, sparticuz] = await Promise.all([
      import("playwright-core"),
      import("@sparticuz/chromium"),
    ]);

    const executablePath = await sparticuz.default.executablePath();
    console.log("[PDF] Chromium executablePath:", executablePath);

    return chromium.launch({
      args: sparticuz.default.args,
      executablePath,
      // @sparticuz/chromium v121+ ships only the headless-shell binary and no
      // longer exports a `headless` property (reading it yields undefined).
      // The binary is always headless; sparticuz.args already carries the
      // required --headless flag.
      headless: true,
    });
  }
  const { chromium } = await import("playwright");
  return chromium.launch({ headless: true });
}

export async function generatePdfFromPath({ origin, path }) {
  const url = `${origin}${path}`;
  console.log("[PDF] Launching browser, target URL:", url);

  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();

    // Vercel Deployment Protection answers the self-request to the print
    // route with a 401 auth page (previews have protection on by default).
    // Sending the bypass secret lets the headless browser through; see
    // https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection
    if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
      await page.setExtraHTTPHeaders({
        "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
      });
    }

    page.on("console", (msg) => console.log("[PDF page]", msg.text()));
    page.on("pageerror", (err) =>
      console.error("[PDF page error]", err.message)
    );

    // "load" fires once all resources in the HTML are fetched. This is the
    // correct signal for SSR pages that have no client-side data fetching.
    // "networkidle" is unreliable in production because Google Fonts preconnect
    // links and React hydration keep the network busy indefinitely, causing the
    // function to hang until the 60 s timeout fires.
    const response = await page.goto(url, {
      waitUntil: "load",
      timeout: 60000,
    });

    // Vercel Deployment Protection redirects unauthenticated requests to
    // vercel.com/sso-api, and the login page there answers 200 — so a plain
    // status check would happily PDF the Vercel login screen. Detect the
    // off-site redirect explicitly and fail with an actionable message.
    const finalHost = new URL(page.url()).host;
    const expectedHost = new URL(url).host;
    if (finalHost !== expectedHost) {
      throw new Error(
        `[PDF] Redirected off-site to ${page.url()} — the deployment is behind ` +
          "Vercel Deployment Protection, so the headless browser cannot reach " +
          "the print route. Enable 'Protection Bypass for Automation' in " +
          "Vercel Project Settings → Deployment Protection (this code already " +
          "sends the VERCEL_AUTOMATION_BYPASS_SECRET header), or disable " +
          "Vercel Authentication for production deployments."
      );
    }

    // Surface HTTP errors immediately rather than silently PDF-ing a 404 page.
    if (!response || !response.ok()) {
      const status = response ? response.status() : "no response";
      throw new Error(
        `[PDF] Print route responded with HTTP ${status} for ${url}`
      );
    }

    console.log("[PDF] Page loaded, generating PDF…");

    return await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    });
  } catch (err) {
    console.error("[PDF] Generation failed:", err.stack ?? err);
    throw err;
  } finally {
    await browser.close();
  }
}

export function generateReportPdf({ origin, reportIndex }) {
  return generatePdfFromPath({ origin, path: `/print/report/${reportIndex}` });
}

export function generateInvoicePdf({ origin, invoiceIndex }) {
  return generatePdfFromPath({ origin, path: `/print/invoice/${invoiceIndex}` });
}
