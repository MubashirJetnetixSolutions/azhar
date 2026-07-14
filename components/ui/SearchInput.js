export default function SearchInput({ placeholder, value, onChange }) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        width="12"
        height="12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#66686f"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-8 pr-3 rounded-md outline-none w-full h-[34px] bg-[#141519] border border-[#252525] text-[#9b9ca1] text-[12px] leading-[12px]"
      />
    </div>
  );
}
