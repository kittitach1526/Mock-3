"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OEEDashboard() {
  // ✅ 1. Hooks ทั้งหมดต้องอยู่บนสุดและรันทุกครั้งในลำดับเดิม
  const [mounted, setMounted] = useState(false);

  // 🟢 ดึงค่า Overall
  const {
    data: overallData,
    error: overallError,
    isLoading: isOverallLoading,
  } = useSWR("/api/overall", fetcher, { refreshInterval: 3000 });

  const {
    data: availabilityData,
    error: availabilityError,
    isLoading: isAvailabilityLoading,
  } = useSWR("/api/availability", fetcher, { refreshInterval: 3000 });

  const {
    data: performanceData,
    error: performanceError,
    isLoading: isPerformanceLoading,
  } = useSWR("/api/performance", fetcher, { refreshInterval: 3000 });

  const {
    data: qualityData,
    error: qualityError,
    isLoading: isQualityLoading,
  } = useSWR("/api/quality", fetcher, { refreshInterval: 3000 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ 2. Conditional Returns: แก้ไขลำดับเพื่อป้องกัน Hydration Mismatch

  // รอบแรกที่เรนเดอร์ (ทั้ง Server และ Client) จะต้องเห็น UI ชุดนี้เหมือนกันเป๊ะ
  /*
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-blue-500 font-black animate-pulse uppercase tracking-[0.5em]">
          System Loading...
        </div>
      </div>
    );
  }
    */

  // หลังจาก Mounted แล้ว (Client side เท่านั้น) ถึงจะเช็คสถานะ Data
  if (overallError || availabilityError || performanceError || qualityError) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-red-500 font-black uppercase tracking-widest">
          API Connection Error
        </div>
      </div>
    );
  }

  if (
    isOverallLoading ||
    isAvailabilityLoading ||
    !overallData ||
    !availabilityData ||
    isPerformanceLoading ||
    !performanceData ||
    isQualityLoading ||
    !qualityData
  ) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-blue-500 font-black animate-pulse uppercase tracking-[0.5em]">
          Syncing Engine Data...
        </div>
      </div>
    );
  }

  // ✅ 3. ข้อมูลจำลองสำหรับ UI (รันหลังจากเช็ค Data เสร็จ)
  const alerts = [
    {
      id: 1,
      type: "Critical",
      msg: "Main Compressor Overheated",
      time: "11:42:05",
      status: "Active",
    },
    {
      id: 2,
      type: "Warning",
      msg: "Low Air Pressure - Line 4",
      time: "11:35:12",
      status: "Pending",
    },
    {
      id: 3,
      type: "Info",
      msg: "Routine Maintenance Scheduled",
      time: "10:00:00",
      status: "Notified",
    },
  ];

  const timelineData = [
    1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  ];

  return (
    <div className="relative z-10 p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800/50 pb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span className="w-8 h-[1px] bg-blue-600"></span>
            PRODUCTION ENGINE
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            FOSTEC <span className="text-blue-600">OEE MONITOR</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-slate-900/40 px-5 py-2.5 rounded-2xl border border-slate-800 shadow-lg shadow-black/20">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em]">
              Live Stream
            </span>
          </div>
        </div>
      </header>

      {/* Metric Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Overall OEE"
          value={overallData?.overall}
          unit="%"
          color="blue"
          glow
        />
        <MetricCard
          title="Availability"
          value={availabilityData?.availability}
          unit="%"
          color="indigo"
        />
        <MetricCard
          title="Performance"
          value={performanceData?.performance}
          unit="%"
          color="cyan"
        />
        <MetricCard
          title="Quality Rate"
          value={qualityData?.quality}
          unit="%"
          color="emerald"
        />
      </div>

      {/* Alerts & Loss Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <section className="lg:col-span-2 bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 px-2 relative z-10">
            <h3 className="text-lg font-black text-white italic tracking-widest uppercase flex items-center gap-3">
              <span className="w-2 h-6 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]"></span>
              System Alerts
            </h3>
            <button className="text-[10px] font-black text-slate-500 hover:text-blue-500 uppercase tracking-[0.2em] transition-colors">
              Clear All
            </button>
          </div>

          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-6 pb-2">Priority</th>
                  <th className="px-6 pb-2">Description</th>
                  <th className="px-6 pb-2">Timestamp</th>
                  <th className="px-6 pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold">
                {alerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="bg-slate-800/20 hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-6 py-4 first:rounded-l-2xl">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          alert.type === "Critical"
                            ? "text-red-500 border-red-500/30 bg-red-500/10"
                            : alert.type === "Warning"
                              ? "text-amber-500 border-amber-500/30 bg-amber-500/10"
                              : "text-blue-500 border-blue-500/30 bg-blue-500/10"
                        }`}
                      >
                        {alert.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-200">{alert.msg}</td>
                    <td className="px-6 py-4 font-mono text-slate-400 text-xs">
                      {alert.time}
                    </td>
                    <td className="px-6 py-4 last:rounded-r-2xl">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${alert.status === "Active" ? "bg-red-500 animate-pulse" : "bg-slate-500"}`}
                        ></span>
                        <span className="text-xs italic text-slate-400 font-medium">
                          {alert.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-[2.5rem] p-10 shadow-2xl flex flex-col h-full min-h-[450px]">
          <h3 className="text-lg font-black text-white italic tracking-widest uppercase mb-12 flex items-center gap-3">
            <span className="w-2 h-6 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></span>
            Loss Analysis
          </h3>
          <div className="space-y-8 flex-grow px-2">
            <DowntimeRow
              label="Mechanical Failure"
              time="42m"
              percent={60}
              color="bg-red-500"
            />
            <DowntimeRow
              label="Tooling / Setup"
              time="28m"
              percent={40}
              color="bg-blue-500"
            />
            <DowntimeRow
              label="Material Supply"
              time="15m"
              percent={20}
              color="bg-amber-500"
            />
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800/40">
            <Link
              href="/dashboard/timeline"
              className="group w-full py-4 rounded-2xl bg-slate-800/40 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 transition-all text-white font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 active:scale-[0.97]"
            >
              <span>Timeline View</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Machine Status Timeline Section */}
      <section className="bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div>
            <h3 className="text-lg font-black text-white italic tracking-widest flex items-center gap-3 uppercase">
              <span className="w-2 h-6 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></span>
              Machine Status Timeline
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2 ml-5">
              Past 24 Hours Operation Status
            </p>
          </div>
          <div className="flex items-center gap-6 bg-slate-800/30 px-6 py-3 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[9px] font-black uppercase text-slate-400">
                Running
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-[9px] font-black uppercase text-slate-400">
                Down
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-[9px] font-black uppercase text-slate-400">
                Idle
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="h-16 w-full bg-slate-800/20 rounded-2xl flex overflow-hidden border border-slate-700/30 p-1 shadow-inner">
            {timelineData.map((status, i) => (
              <div
                key={i}
                className={`h-full flex-1 transition-all duration-300 cursor-help relative group/segment
                        ${
                          status === 1
                            ? "bg-emerald-500/80 hover:bg-emerald-400 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]"
                            : status === 0
                              ? "bg-red-500/80 hover:bg-red-400"
                              : "bg-amber-500/80 hover:bg-amber-400"
                        }
                        ${i === 0 ? "rounded-l-xl" : ""}
                        ${i === timelineData.length - 1 ? "rounded-r-xl" : ""}
                        mx-[0.5px]
                    `}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-2 bg-slate-900 border border-slate-700 text-[10px] text-white font-black uppercase tracking-widest rounded-lg opacity-0 group-hover/segment:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-2xl">
                  Status:{" "}
                  {status === 1 ? "Running" : status === 0 ? "Down" : "Idle"}
                  <br />
                  <span className="text-slate-500 font-mono text-[9px]">
                    Time Slot: {i}:00 - {i + 1}:00
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between px-2">
            {[
              "08:00",
              "12:00",
              "16:00",
              "20:00",
              "00:00",
              "04:00",
              "08:00",
            ].map((time, i) => (
              <span
                key={i}
                className="text-[10px] font-black text-slate-600 font-mono tracking-tighter"
              >
                {time}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Sub-components ---

function MetricCard({ title, value, unit, color, glow }: any) {
  const colors: any = {
    blue: "text-blue-500 bg-blue-600",
    indigo: "text-indigo-500 bg-indigo-600",
    cyan: "text-cyan-500 bg-cyan-600",
    emerald: "text-emerald-500 bg-emerald-600",
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 p-7 rounded-[2rem] relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500 hover:bg-slate-900/60 shadow-xl">
      {glow && (
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full" />
      )}
      <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
        <span
          className={`w-1.5 h-1.5 rounded-full ${colors[color].split(" ")[1]}`}
        ></span>
        {title}
      </div>
      <div className="flex items-baseline gap-2 mb-8">
        <span className="text-6xl font-black text-white tracking-tighter italic leading-none">
          {value}
        </span>
        <span
          className={`text-xs font-black uppercase ${colors[color].split(" ")[0]}`}
        >
          {unit}
        </span>
      </div>
      <div className="h-[3px] w-full bg-slate-800/80 rounded-full overflow-hidden p-[0.5px]">
        <div
          className={`h-full transition-all duration-[1200ms] ease-in-out ${colors[color].split(" ")[1]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function DowntimeRow({ label, time, percent, color }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-4">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-slate-200 transition-colors">
          {label}
        </span>
        <span className="text-sm font-mono font-bold text-white italic tracking-widest">
          {time}
        </span>
      </div>
      <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden p-[1px] border border-slate-800/30 shadow-inner">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
