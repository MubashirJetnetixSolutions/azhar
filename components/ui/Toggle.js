export default function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      className={`relative shrink-0 transition-colors w-[34px] h-[20px] rounded-[10px] ${checked ? "bg-[#2563eb]" : "bg-[#2a2a2a]"}`}
    >
      <span
        className={`absolute rounded-full bg-white transition-transform w-[16px] h-[16px] top-[2px] left-[2px] ${checked ? "translate-x-[14px]" : "translate-x-0"}`}
      />
    </button>
  );
}
