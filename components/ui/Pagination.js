export default function Pagination({ showing = "Showing 7 of 62 orders" }) {
  return (
    <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#1e1e1e]">
      <span className="text-xs text-[#555]">{showing}</span>
      <div className="flex items-center gap-1">
        <button className="flex items-center gap-1 text-xs px-3 py-1 rounded transition-colors text-[#888] bg-[#1a1a1a] border border-[#262626]">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>
        <button className="flex items-center gap-1 text-xs px-3 py-1 rounded transition-colors text-[#888] bg-[#1a1a1a] border border-[#262626]">
          Next
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
