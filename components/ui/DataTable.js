"use client";

export default function DataTable({
  columns,
  data = [],
  onRowClick,
  minWidth,
  emptyText = "No data",
  rowKey = (row, i) => i,
  headerBorder = true,
}) {
  return (
    <div className="overflow-x-auto">
      <table
        className="w-full border-collapse"
        style={minWidth ? { minWidth } : undefined}
      >
        <thead className="bg-[#1A191A]">
          <tr className={headerBorder ? "border-t border-[#262626] border-b border-[#262626]" : "border-b border-[#1e1e1e]"}>
            {columns.map((col) => (
              <th
                key={col.key ?? col.header}
                className={`text-[#aaaaaa] text-[14px] font-normal whitespace-nowrap px-[16px] py-[14px] ${
                  col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                }`}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-[40px] px-[12px] text-center text-[#555] text-[13px]"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={rowKey(row, i)}
                onClick={onRowClick ? () => onRowClick(row, i) : undefined}
                className={`border-b border-[#202124] transition-colors duration-100 ${
                  onRowClick
                    ? "cursor-pointer hover:bg-[rgba(255,255,255,0.015)]"
                    : "cursor-default"
                }`}
              >
                {columns.map((col) => {
                  const val = col.key ? row[col.key] : undefined;
                  const cellStyle = {
                    color: col.color ?? "#8b8c92",
                  };
                  if (col.maxWidth) cellStyle.maxWidth = col.maxWidth;

                  return (
                    <td
                      key={col.key ?? col.header}
                      className={`text-[11px] px-[16px] py-[14px] ${
                        col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                      } ${col.maxWidth ? "truncate" : ""} ${col.wrap ? "whitespace-normal" : "whitespace-nowrap"}`}
                      style={cellStyle}
                    >
                      {col.render ? col.render(val, row, i) : val}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
