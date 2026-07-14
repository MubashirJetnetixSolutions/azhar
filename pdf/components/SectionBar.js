const ICONS = {
  overview: (
    <g>
      <rect x="1" y="4" width="14" height="9" rx="1" fill="#fff" />
      <rect x="2.5" y="5.5" width="5" height="6" fill="#1F9ED9" />
      <rect x="9" y="6" width="5" height="1.2" fill="#1F4E9C" />
      <rect x="9" y="8.4" width="5" height="1.2" fill="#1F4E9C" />
    </g>
  ),
  people: (
    <g fill="#fff">
      <circle cx="5.5" cy="6" r="2.4" />
      <path d="M1.5 13 a4 4 0 0 1 8 0 z" />
      <circle cx="11.5" cy="6.4" r="2" />
      <path d="M8.8 13 a3.4 3.4 0 0 1 6.4 0 z" />
    </g>
  ),
  chart: (
    <g fill="#fff">
      <rect x="2" y="8" width="2.6" height="6" />
      <rect x="6" y="5" width="2.6" height="9" />
      <rect x="10" y="2" width="2.6" height="12" />
    </g>
  ),
  handshake: (
    <g fill="#fff">
      <path d="M1 6 l4 -2 3 2 3 -2 4 2 v5 l-4 3 -3 -2 -3 2 -4 -3 z" />
    </g>
  ),
  arrows: (
    <g fill="#fff">
      <path d="M2 5 h8 v-2.4 l4 4 -4 4 v-2.4 h-8 z" />
      <path d="M14 11 h-8 v-2.4 l-4 4 4 4 v-2.4 h8 z" transform="translate(0,-1)" />
    </g>
  ),
  trademark: (
    <g fill="#fff">
      <circle cx="8" cy="8" r="6.4" fill="none" stroke="#fff" strokeWidth="1.4" />
      <text x="8" y="10.6" textAnchor="middle" fontSize="7" fontFamily="Arial" fontWeight="bold" fill="#fff">
        TM
      </text>
    </g>
  ),
};

export default function SectionBar({ icon, children }) {
  return (
    <div className="rpt-section-bar">
      {icon && ICONS[icon] && (
        <span className="rpt-section-icon">
          <svg viewBox="0 0 16 16" width="13" height="13">{ICONS[icon]}</svg>
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
