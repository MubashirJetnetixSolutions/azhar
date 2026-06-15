export default function SearchInput({ placeholder, value, onChange }) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2"
        width="14" height="14" fill="none" viewBox="0 0 24 24"
        stroke="#666" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-9 pr-4 py-2 text-sm rounded-lg outline-none w-full placeholder-gray-600"
        style={{ backgroundColor: "#1a1a1a", border: "1px solid #262626", color: "#fff" }}
      />
    </div>
  );
}
