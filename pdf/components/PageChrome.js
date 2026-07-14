// Per-page header and footer, repeated on every A4 page of the report.
// Logos are drawn as inline SVG so they print as vectors.

export function PageHeader() {
  return (
    <header className="rpt-header">
      <div className="rpt-header-inner">
        <div className="rpt-wordmark">ACCURATE INTERNATIONAL</div>
        <div className="rpt-wordmark-rule" />
        <div className="rpt-wordmark-sub">Corporate Services SMC Pvt. Ltd.</div>
      </div>
    </header>
  );
}

function CreditsafeLogo() {
  return (
    <svg viewBox="0 0 150 44" width="108" height="32" aria-label="creditsafe">
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

function YearsBadge() {
  return (
    <svg viewBox="0 0 60 60" width="44" height="44" aria-label="14 years of excellence">
      <circle cx="30" cy="30" r="26" fill="none" stroke="#2E9E4F" strokeWidth="2" strokeDasharray="3 2.4" />
      <circle cx="30" cy="30" r="21" fill="none" stroke="#2E9E4F" strokeWidth="1" />
      <text x="30" y="34" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold" fill="#2E9E4F">
        14
      </text>
      <text x="30" y="43" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4.6" fill="#2E9E4F" letterSpacing="0.4">
        YEARS OF EXCELLENCE
      </text>
    </svg>
  );
}

function AicsLogo() {
  return (
    <svg viewBox="0 0 96 44" width="86" height="38" aria-label="AICS">
      <ellipse cx="48" cy="22" rx="44" ry="16" fill="none" stroke="#1F9ED9" strokeWidth="2.4" />
      <path d="M6 26 C 26 40, 70 40, 92 22" fill="none" stroke="#1F4E9C" strokeWidth="3" strokeLinecap="round" />
      <text x="48" y="28" textAnchor="middle" fontFamily="Arial, sans-serif" fontStyle="italic" fontWeight="bold" fontSize="18" fill="#1F4E9C">
        AICS
      </text>
    </svg>
  );
}

export function PageFooter() {
  return (
    <footer className="rpt-footer">
      <div className="rpt-footer-logos">
        <CreditsafeLogo />
        <YearsBadge />
        <AicsLogo />
      </div>
      <div className="rpt-footer-bar">
        This report may not be reproduced in whole or in part in any from or manner whatsoever
      </div>
      <div className="rpt-footer-legal">
        This report is furnished only for reference use in business decision-making and for no other purpose. Information contained
        <br />
        in the report shall not be released to the third party unless otherwise agreed upon by AICS
        <br />
        ( Accurate International Corporate Services SMC Pvt. Ltd. ) AICS Shall not be liable for any loss or damage.
      </div>
      <div className="rpt-footer-contact">
        Contact: 0322-5906489 042-37154246&nbsp;&nbsp;E-mail: accurateinternational6@gmail.com
      </div>
    </footer>
  );
}

export function Page({ children }) {
  return (
    <section className="rpt-page">
      <PageHeader />
      <div className="rpt-body">{children}</div>
      <PageFooter />
    </section>
  );
}
