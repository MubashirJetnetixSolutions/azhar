/** @type {import('next').NextConfig} */
const nextConfig = {
  // These drive a real Chromium binary; they must stay runtime dependencies
  // resolved from node_modules rather than being bundled into the server
  // build. @sparticuz/chromium additionally carries the browser binary that
  // Vercel's file tracing ships with the PDF API functions.
  serverExternalPackages: ["playwright", "playwright-core", "@sparticuz/chromium"],

  // Force Vercel's file tracer to include the @sparticuz/chromium package
  // (including its compressed Chromium binary) in the serverless function
  // bundles for both PDF API routes. Without this, executablePath() resolves
  // to a path that doesn't exist on the Lambda host at runtime, causing
  // Chromium to fail to launch silently.
  //
  // Keys are picomatch route globs, so literal dynamic segments like
  // [invoiceId] must be escaped — unescaped brackets are parsed as a
  // character class and the pattern never matches the route, dropping the
  // include entirely.
  //
  // playwright-core must be traced wholesale too: it loads browsers.json
  // (and other assets) through dynamically computed paths the tracer cannot
  // follow, which fails at launch with "Cannot find module .../browsers.json".
  outputFileTracingIncludes: {
    "/api/invoices/\\[invoiceId\\]/pdf": [
      "node_modules/@sparticuz/chromium/**",
      "node_modules/playwright-core/**",
    ],
    "/api/reports/\\[reportId\\]/pdf": [
      "node_modules/@sparticuz/chromium/**",
      "node_modules/playwright-core/**",
    ],
    // Diagnostic endpoint runs the same pipeline; remove alongside it.
    "/api/pdf-debug": [
      "node_modules/@sparticuz/chromium/**",
      "node_modules/playwright-core/**",
    ],
  },
};

export default nextConfig;
