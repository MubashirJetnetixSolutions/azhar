"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const SEGMENT_COUNT = 22;
const ACTIVE_COLOR = "#2563eb";
const INACTIVE_COLOR = "#323234";

function SegmentTooltip({ active, payload, percentage }) {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;
  const isConverted = item.active;
  return (
    <div className="bg-[#1c1c1f] border border-[#2d2d30] rounded-[8px] px-[12px] py-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.4)] pointer-events-none">
      <p className="text-[#8a8b90] text-[11px] mb-[4px]">
        {isConverted ? "Converted" : "Remaining"}
      </p>
      <p
        className={`text-[15px] font-semibold tracking-[-0.01em] ${
          isConverted ? "text-[#2563eb]" : "text-[#8a8b90]"
        }`}
      >
        {isConverted ? `${percentage}%` : `${(100 - percentage).toFixed(1)}%`}
      </p>
    </div>
  );
}

function buildSegments(percentage) {
  const activeCount = Math.round((percentage / 100) * SEGMENT_COUNT);
  return Array.from({ length: SEGMENT_COUNT }, (_, i) => ({
    name: i < activeCount ? "Converted" : "Remaining",
    value: 1,
    active: i < activeCount,
  }));
}

export default function ReportsConversionGauge({
  percentage,
  requests,
  reportsGenerated,
  availability,
}) {
  const segments = useMemo(() => buildSegments(percentage), [percentage]);
  const displayPercentage = `${percentage}%`;

  const stats = [
    { label: "Requests", value: requests },
    { label: "Reports Generated", value: reportsGenerated },
    { label: "Availability", value: availability },
  ];

  return (
    <div className="bg-[#1e1d1e] rounded-[14px] p-[24px] h-full flex flex-col box-border overflow-hidden">
      <p className="text-[#8a8b90] text-[14px] font-normal leading-[20px] mb-[8px] mt-0 shrink-0">
        Reports Conversion
      </p>

      <div className="flex-1 flex flex-col justify-between min-h-0">
        {/* Segmented semicircle gauge */}
        <div className="relative w-full flex-1 min-h-[120px] max-h-[155px] shrink">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
              <Tooltip
                content={<SegmentTooltip percentage={percentage} />}
                allowEscapeViewBox={{ x: true, y: true }}
                wrapperStyle={{ zIndex: 50 }}
              />
              <Pie
                data={segments}
                dataKey="value"
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={72}
                outerRadius={118}
                paddingAngle={4}
                cornerRadius={14}
                strokeWidth={0}
                isAnimationActive={false}
              >
                {segments.map((entry, index) => (
                  <Cell
                    key={`segment-${index}`}
                    fill={entry.active ? ACTIVE_COLOR : INACTIVE_COLOR}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute bottom-[4px] left-0 right-0 flex justify-center pointer-events-none">
            <span className="text-[#e0e0e0] text-[36px] font-normal leading-none tracking-[-0.02em]">
              {displayPercentage}
            </span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-[8px] mt-[14px] shrink-0">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="bg-[#323234] rounded-[10px] pt-[10px] h-full flex flex-col justify-between pr-[10px] pl-[10px] pb-[9px]"
            >
              <p className="text-[#8a8b90] text-[12px] font-normal leading-[16px] mb-[6px] mt-0">
                {label}
              </p>
              <p className="text-white text-[28px] font-medium leading-none tracking-[-0.01em] m-0">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
