// Corporate-report page chrome. Unlike the SMEs template (five fixed pages),
// the corporate report flows to as many pages as the data needs, so the
// header and footer are position:fixed (Chromium repeats fixed elements on
// every printed page) and a table thead/tfoot reserves space for them.

function AicsLogo({ width = 64 }) {
  return (
    <svg viewBox="0 0 96 44" width={width} height={(width * 44) / 96} aria-label="AICS">
      <ellipse cx="48" cy="22" rx="44" ry="16" fill="none" stroke="#1F9ED9" strokeWidth="2.4" />
      <path d="M6 26 C 26 40, 70 40, 92 22" fill="none" stroke="#1F4E9C" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 18 C 26 4, 70 4, 92 18" fill="none" stroke="#1F9ED9" strokeWidth="1.6" strokeLinecap="round" />
      <text x="48" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontStyle="italic" fontWeight="bold" fontSize="18" fill="#1F4E9C">
        AICS
      </text>
    </svg>
  );
}

function YearsBadge({ width = 48 }) {
  return (
    <svg viewBox="0 0 60 60" width={width} height={width} aria-label="14 years of excellence">
      <circle cx="30" cy="30" r="26" fill="none" stroke="#1F9ED9" strokeWidth="2" strokeDasharray="3 2.4" />
      <circle cx="30" cy="30" r="21" fill="none" stroke="#1F9ED9" strokeWidth="1" />
      <text x="30" y="34" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fill="#1F9ED9">
        14
      </text>
      <text x="30" y="43" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4.6" fill="#2E9E4F" letterSpacing="0.4">
        YEARS OF EXCELLENCE
      </text>
    </svg>
  );
}

function CreditsafeLogo() {
  return (
    <svg viewBox="0 0 150 44" width="112" height="33" aria-label="creditsafe">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="24" fill="#58595B">
        credit<tspan fontWeight="bold" fill="#E2231A">safe</tspan>
      </text>
      <path d="M133 6 l8 8 -6 1 5 9 -9 -8 6 -1 z" fill="#F5821F" />
      <text x="0" y="38" fontFamily="Arial, sans-serif" fontSize="10" fill="#E2231A">
        Simply smarter
      </text>
    </svg>
  );
}

export function CorporateHeader() {
  return (
    <header className="crp-header">
      <div className="crp-wordmark">ACCURATE INTERNATIONAL</div>
      <div className="crp-wordmark-rule" />
      <div className="crp-header-row">
        <AicsLogo width={70} />
        <span className="crp-header-services">Corporate Services</span>
        <YearsBadge width={50} />
      </div>
    </header>
  );
}

export function CorporateFooter() {
  return (
    <footer className="crp-footer">
      <div className="crp-footer-logos">
        <CreditsafeLogo />
        <YearsBadge width={46} />
        <AicsLogo width={78} />
      </div>
      <div className="crp-footer-bar">
        This report may not be reproduced in whole or in part in any from or manner whatsoever
      </div>
      <div className="crp-footer-legal">
        This report is furnished only for reference use in business decision-making and for no other purpose. Information contained
        <br />
        in the report shall not be released to the third party unless otherwise agreed upon by AICS
        <br />
        ( Accurate International Corporate Services SMC Pvt. Ltd. ) AICS Shall not be liable for any loss or damage.
      </div>
      <div className="crp-footer-contact">
        Contact: 0322-5906489 042-37154246&nbsp;&nbsp;E-mail: accurateinternational6@gmail.com
      </div>
    </footer>
  );
}

// Wraps flowing content between per-page header/footer space reservations.
export function CorporateLayout({ children }) {
  return (
    <div className="crp-root">
      <CorporateHeader />
      <CorporateFooter />
      <table className="crp-layout">
        <thead>
          <tr>
            <td>
              <div className="crp-header-space" />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="crp-content">{children}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div className="crp-footer-space" />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
