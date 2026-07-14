"use client";

import { useState } from "react";
import { dashboardStats, recentOrders } from "@/data/mockData";
import AppSelect from "@/components/ui/AppSelect";
import {
  BarChart, Bar, XAxis, Cell, ResponsiveContainer, Tooltip,
} from "recharts";
import RecentOrdersTable from "@/components/RecentOrdersTable";
import ReportsConversionGauge from "@/components/ReportsConversionGauge";

const monthlyData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 95 },
  { month: "Mar", value: 140 },
  { month: "Apr", value: 80 },
  { month: "May", value: 110 },
  { month: "Jun", value: 130 },
  { month: "Jul", value: 75 },
  { month: "Aug", value: 160 },
  { month: "Sep", value: 90 },
  { month: "Oct", value: 200 },
  { month: "Nov", value: 85 },
  { month: "Dec", value: 105 },
];

function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1c1c1f] border border-[#2d2d30] rounded-[8px] px-[12px] py-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.4)] pointer-events-none">
      <p className="text-[#8a8b90] text-[11px] mb-[4px]">{label}</p>
      <p className="text-white text-[15px] font-semibold tracking-[-0.01em]">{payload[0].value}</p>
    </div>
  );
}

const STAT_ICON_SRCS = {
  "Total Orders":          "/icons/order-icon.svg",
  "Total Reports":         "/icons/file.svg",
  "Total Pending Invoice": "/icons/invoice.svg",
  "Total Revenue":         "/icons/bank-icon.svg",
};

function StatCard({ label, value }) {
  return (
    <div className="relative bg-[#1c1c1f] rounded-[14px] p-[24px] flex flex-col justify-between h-full overflow-hidden">
      <div className="absolute left-0 top-[21px] bottom-[21px] w-[4px] rounded-[2px] bg-[#1d4ed8]" />
      <div className="flex items-start justify-between">
        <p className="text-[#8a8b90] text-[14px] font-normal">{label}</p>
        <div className="w-[40px] h-[40px] shrink-0 bg-[#323234] rounded-[10px] flex items-center justify-center">
          <img src={STAT_ICON_SRCS[label]} width={20} height={20} alt="" className="block" />
        </div>
      </div>
      <p className="text-white text-[30px] font-medium tracking-[-0.01em]">{value}</p>
    </div>
  );
}

function ReportsBarChart({ data }) {
  return (
    <div className="bg-[#1e1d1e] rounded-[14px] pt-[24px] pr-[24px] pl-[24px] pb-[16px] h-full flex flex-col">
      <p className="text-[#8a8b90] text-[14px] mb-[16px]">Reports per month</p>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="8%" margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#5a5a5e", fontSize: 11, fontFamily: "inherit" }}
              dy={8}
            />
            <Tooltip
              content={<BarTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)", radius: 6 }}
              allowEscapeViewBox={{ x: false, y: true }}
              wrapperStyle={{ zIndex: 50 }}
            />
            <Bar dataKey="value" radius={[6, 6, 6, 6]}>
              {data.map((_, index) => (
                <Cell key={index} fill={index === 9 ? "#2563eb" : "#323234"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const PERIOD_OPTIONS = [
  { value: "Daily",   label: "Daily"   },
  { value: "Weekly",  label: "Weekly"  },
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Yearly", label: "Yearly" },
];

export default function DashboardPage() {
  const s = dashboardStats;
  const [searchTerm, setSearchTerm] = useState("");
  const [period, setPeriod] = useState("Daily");
  const filteredOrders = searchTerm
    ? recentOrders.filter(row =>
        ["id","company","country","bank","branch","assignedTo"].some(k =>
          String(row[k] ?? "").toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : recentOrders;
  return (
    <div className="flex flex-col gap-[14px] min-w-0 w-full py-4 px-4 md:py-5 md:px-7">

      {/* Welcome row */}
      <div className="flex items-start justify-between gap-[16px]">
        <div>
          <h1 className="text-white text-[20px] font-bold tracking-[-0.01em] leading-[24px]">
            Welcome, Azhar
          </h1>
          <p className="text-[#555] text-[12px] leading-[16px] m-0 mt-[3px]">
            Review and manage your analytics here.
          </p>
        </div>
        <div className="shrink-0 w-[110px]">
          <AppSelect
            variant="dash"
            size="sm"
            value={{ value: period, label: period }}
            onChange={(opt) => setPeriod(opt?.value ?? "Daily")}
            options={PERIOD_OPTIONS}
          />
        </div>
      </div>

      {/* Stat cards + bar chart + gauge */}
      <div
        className="grid gap-[16px] w-full min-w-0
          grid-cols-2 auto-rows-auto
          lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,2.68fr)_minmax(0,1.76fr)]
          lg:grid-rows-[148px_148px]"
      >
        <StatCard label="Total Orders" value={s.totalOrders} />
        <StatCard label="Total Reports" value={s.totalReports} />
        <div className="col-span-2 lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-end-3 min-w-0 h-[200px] lg:h-auto">
          <ReportsBarChart data={monthlyData} />
        </div>
        {/* min-h (not fixed h) on mobile: the gauge card's legend pills need room
            to render below the chart without being clipped by overflow-hidden */}
        <div className="col-span-2 lg:col-start-4 lg:col-span-1 lg:row-start-1 lg:row-end-3 min-w-0 min-h-[200px] lg:h-auto">
          <ReportsConversionGauge
            percentage={s.reportsConversion}
            requests={s.conversionNumbers.a}
            reportsGenerated={s.conversionNumbers.b}
            availability={s.conversionNumbers.c}
          />
        </div>
        <StatCard label="Total Pending Invoice" value={s.totalPendingInvoice} />
        <StatCard label="Total Revenue" value={s.totalRevenue} />
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable
        data={filteredOrders}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
