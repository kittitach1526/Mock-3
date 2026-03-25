"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useSystemConfig } from '@/hooks/useConfig';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OEEDashboard() {
  const [mounted, setMounted] = useState(false);
  const { refreshInterval, isLoading: isConfigLoading } = useSystemConfig();


  // --- 1. Fetching Data (จากโค้ดเดิมของคุณ) ---
  const { data: overallData, error: overallError, isLoading: isOverallLoading } = useSWR("/api/overall", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const { data: availabilityData, isLoading: isAvailabilityLoading } = useSWR("/api/availability", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const { data: performanceData, isLoading: isPerformanceLoading } = useSWR("/api/performance", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const { data: qualityData, isLoading: isQualityLoading } = useSWR("/api/quality", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });

  const { data: cncStatusData, isLoading: isMachineStatusLoading } = useSWR("/api/cnc", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const { data: pressStatusData, isLoading: isPressStatusLoading } = useSWR("/api/press", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const { data: latheStatusData, isLoading: isLatheStatusLoading } = useSWR("/api/lathe", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const { data: weldStatusData, isLoading: isWeldStatusLoading } = useSWR("/api/weld", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const { data: assyStatusData, isLoading: isAssyStatusLoading } = useSWR("/api/assy", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const { data: paintStatusData, isLoading: isPaintStatusLoading } = useSWR("/api/paint", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });

  const {data: breakdownData, isLoading: isBreakdownLoading} = useSWR("/api/breakdown", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const {data: changeoverData, isLoading: isChangeoverLoading} = useSWR("/api/changeover", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const {data: smallStopsData, isLoading: isSmallStopsLoading} = useSWR("/api/smallStop", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const {data: reducedSpeedData, isLoading: isReducedSpeedLoading} = useSWR("/api/reducedSpeed", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const {data: startupRejectsData, isLoading: isStartupRejectsLoading} = useSWR("/api/startupReject", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });
  const {data: prodRejectsData, isLoading: isProdRejectsLoading} = useSWR("/api/prodReject", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });


  // ข้อมูลจำลองสำหรับ Machine Board & Alerts (ตามรูปที่เพิ่มมา)
  const machines = [
    { id: "CNC-01", status: "RUNNING", oee: cncStatusData?.oee || 0, a: cncStatusData?.avail || 0, p: cncStatusData?.perf || 0, q: cncStatusData?.qual || 0, color: "emerald" },
    { id: "Press-02", status: "RUNNING", oee: pressStatusData?.oee || 0, a: pressStatusData?.avail || 0, p: pressStatusData?.perf || 0, q: pressStatusData?.qual || 0, color: "emerald" },
    { id: "Lathe-03", status: "BREAKDOWN", oee: latheStatusData?.oee || 0, a: latheStatusData?.avail || 0, p: latheStatusData?.perf || 0, q: latheStatusData?.qual || 0, color: "red" },
    { id: "Weld-04", status: "RUNNING", oee: weldStatusData?.oee || 0, a: weldStatusData?.avail || 0, p: weldStatusData?.perf || 0, q: weldStatusData?.qual || 0, color: "emerald" },
    { id: "Assy-05", status: "IDLE", oee: assyStatusData?.oee || 0, a: assyStatusData?.avail || 0, p: assyStatusData?.perf || 0, q: assyStatusData?.qual || 0, color: "amber" },
    { id: "Paint-06", status: "RUNNING", oee: paintStatusData?.oee || 0, a: paintStatusData?.avail || 0, p: paintStatusData?.perf || 0, q: paintStatusData?.qual || 0, color: "emerald" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (overallError) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-500 font-black tracking-widest uppercase">
      ⚠️ API Connection Error
    </div>
  );

  return (
    <div className="relative z-10 p-6 max-w-[1800px] mx-auto space-y-10 text-slate-200">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800/60 pb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            ZEWELL SYSTEM ONLINE
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            FOSTEC <span className="text-blue-600">PRODUCTION HUB</span>
          </h1>
        </div>
      </header>

      {/* --- SECTION 1: 4 MAIN METRIC CARDS (จากโค้ดเดิม) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Overall OEE" value={overallData?.overall || 0} unit="%" color="blue" glow />
        <MetricCard title="Availability" value={availabilityData?.availability || 0} unit="%" color="indigo" />
        <MetricCard title="Performance" value={performanceData?.performance || 0} unit="%" color="cyan" />
        <MetricCard title="Quality Rate" value={qualityData?.quality || 0} unit="%" color="emerald" />
      </div>

      {/* --- SECTION 2: MACHINE STATUS & ANALYSIS (ตามรูปใหม่) --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Machine Status Board */}
        <section className="xl:col-span-5 space-y-4 bg-slate-900/20 p-6 rounded-[2.5rem] border border-slate-800/40">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
             <span className="w-4 h-[1px] bg-slate-700"></span> Machine Status Board
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {machines.map((m) => (
              <MachineStatusCard key={m.id} {...m} />
            ))}
          </div>
        </section>

        {/* MIDDLE: Six Big Losses & MTBF */}
        <section className="xl:col-span-3 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-[2.5rem] p-8 shadow-xl flex flex-col h-full">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-200 italic mb-10 flex items-center gap-3">
             <span className="w-2 h-6 bg-blue-600 rounded-full shadow-[0_0_10px_#2563eb]"></span>
             Six Big Losses
          </h2>
          <div className="space-y-7 flex-grow">
            <LossBar label="Breakdowns" val={breakdownData?.value || 0} color="bg-red-500" cat="Avail" />
            <LossBar label="Setup/Changeover" val={changeoverData?.value || 0} color="bg-orange-500" cat="Avail" />
            <LossBar label="Small Stops" val={smallStopsData?.value || 0} color="bg-yellow-500" cat="Perf" />
            <LossBar label="Reduced Speed" val={reducedSpeedData?.value || 0} color="bg-blue-500" cat="Perf" />
            <LossBar label="Startup Rejects" val={startupRejectsData?.value || 0} color="bg-purple-500" cat="Qual" />
            <LossBar label="Prod. Rejects" val={prodRejectsData?.value || 0} color="bg-indigo-500" cat="Qual" />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/40">
             <div>
                <p className="text-[9px] font-black text-slate-500 uppercase">MTBF</p>
                <p className="text-2xl font-black text-blue-500 italic leading-none">4.2<span className="text-xs ml-1">h</span></p>
             </div>
             <div>
                <p className="text-[9px] font-black text-slate-500 uppercase text-right">MTTR</p>
                <p className="text-2xl font-black text-red-500 italic text-right leading-none">38<span className="text-xs ml-1">m</span></p>
             </div>
          </div>
        </section>

        {/* RIGHT: Active Alerts */}
        <section className="xl:col-span-4 bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] p-8 shadow-xl">
           <div className="flex justify-between items-center mb-8">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-200 italic flex items-center gap-3">
                <span className="w-2 h-6 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"></span>
                Active Alerts
              </h2>
              <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full">4</span>
           </div>
           <div className="space-y-4">
              <AlertCard type="CRITICAL" device="Lathe-03" msg="Spindle bearing overheat" time="08:42" color="border-red-500 bg-red-500/5 text-red-500" />
              <AlertCard type="WARNING" device="Press-02" msg="Cycle time +12% above ideal" time="09:15" color="border-amber-500 bg-amber-500/5 text-amber-500" />
              <AlertCard type="INFO" device="CNC-01" msg="PM due in 3 days" time="07:00" color="border-blue-500 bg-blue-500/5 text-blue-500" />
              <AlertCard type="WARNING" device="Assy-05" msg="Material buffer low (<20%)" time="09:58" color="border-amber-500 bg-amber-500/5 text-amber-500" />
           </div>
        </section>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS (Re-usable) ---

// กล่อง 4 ตัวหลักเดิม
function MetricCard({ title, value, unit, color, glow }: any) {
  const colors: any = {
    blue: "text-blue-500 bg-blue-600",
    indigo: "text-indigo-500 bg-indigo-600",
    cyan: "text-cyan-500 bg-cyan-600",
    emerald: "text-emerald-500 bg-emerald-600",
  };
  return (
    <div className="bg-slate-900/40 border border-slate-800/50 p-8 rounded-[2rem] relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500 shadow-xl">
      {glow && <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full" />}
      <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">{title}</div>
      <div className="flex items-baseline gap-2 mb-8">
        <span className="text-6xl font-black text-white tracking-tighter italic leading-none">{value}</span>
        <span className={`text-xs font-black uppercase ${colors[color].split(" ")[0]}`}>{unit}</span>
      </div>
      <div className="h-[4px] w-full bg-slate-800/80 rounded-full overflow-hidden">
        <div className={`h-full ${colors[color].split(" ")[1]} transition-all duration-[1500ms]`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// การ์ดเครื่องจักร (Grid เล็ก)
function MachineStatusCard({ id, status, oee, a, p, q }: any) {
  const statusColors: any = { RUNNING: "bg-emerald-500", BREAKDOWN: "bg-red-500 animate-pulse", IDLE: "bg-amber-500" };
  return (
    <div className={`p-5 rounded-3xl border border-slate-800/50 bg-slate-950/20 group hover:border-slate-700 transition-colors`}>
      <div className="flex justify-between items-center mb-4">
        <span className="font-black text-white italic text-sm">{id}</span>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[status]}`}></div>
          <span className="text-[9px] font-black text-slate-500 uppercase">{status}</span>
        </div>
      </div>
      <div className="flex items-end gap-2 mb-4">
        <span className="text-3xl font-black text-white italic leading-none">{oee}%</span>
        <span className="text-[8px] text-slate-600 font-bold uppercase mb-1">OEE</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[8px] font-bold text-slate-500">
          <span className="w-2">A</span><div className="flex-grow h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{width:`${a}%`}}></div></div><span>{a}%</span>
        </div>
        <div className="flex items-center gap-2 text-[8px] font-bold text-slate-500">
          <span className="w-2">P</span><div className="flex-grow h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{width:`${p}%`}}></div></div><span>{p}%</span>
        </div>
      </div>
    </div>
  );
}

// แถบแสดง Loss
function LossBar({ label, val, color, cat }: any) {
  return (
    <div>
      <div className="flex justify-between text-[10px] font-black uppercase mb-2">
        <span className="text-slate-200">{label}</span>
        <span className="text-slate-500">{cat} <span className="text-slate-100 ml-1">{val}%</span></span>
      </div>
      <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${val}%` }}></div>
      </div>
    </div>
  );
}

// การ์ด Alert
function AlertCard({ type, device, msg, time, color }: any) {
  return (
    <div className={`border-l-4 p-4 rounded-r-2xl border-y border-r border-slate-800/30 ${color} transition-transform hover:translate-x-1 cursor-pointer`}>
      <div className="flex justify-between mb-1">
        <span className="text-[9px] font-black tracking-widest">{type}</span>
        <span className="text-[9px] font-mono opacity-50">{time}</span>
      </div>
      <p className="text-xs font-black text-white italic leading-tight">{device} — <span className="font-normal not-italic text-slate-400">{msg}</span></p>
    </div>
  );
}