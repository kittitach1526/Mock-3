"use client";

import React from "react";

/**
 * Performance Page - ZEWELL Industrial Monitoring
 * แสดงผลค่า Performance แยกรายเครื่องจักรในรูปแบบ Gauge Chart
 * 
 * 
 */

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PerformancePage() {


  const { data: cncStatusData, isLoading: isMachineStatusLoading } = useSWR("/api/cnc", fetcher, { refreshInterval: 1000 });
  const { data: pressStatusData, isLoading: isPressStatusLoading } = useSWR("/api/press", fetcher, { refreshInterval: 1000 });
  const { data: latheStatusData, isLoading: isLatheStatusLoading } = useSWR("/api/lathe", fetcher, { refreshInterval: 1000 });
  const { data: weldStatusData, isLoading: isWeldStatusLoading } = useSWR("/api/weld", fetcher, { refreshInterval: 1000 });
  const { data: assyStatusData, isLoading: isAssyStatusLoading } = useSWR("/api/assy", fetcher, { refreshInterval: 1000 });
  const { data: paintStatusData, isLoading: isPaintStatusLoading } = useSWR("/api/paint", fetcher, { refreshInterval: 1000 });
  // ข้อมูลจำลองสำหรับแสดงผล (ในอนาคตเปลี่ยนเป็น useSWR ดึงจาก API)
  const performanceData = [
    { id: "CNC-01", line: "A", perf: cncStatusData ? cncStatusData.perf : 0, target: 85, actual: 95, status: "running", oee: cncStatusData ? cncStatusData.oee : 0 },
    { id: "Press-02", line: "A", perf: pressStatusData ? pressStatusData.perf : 0, target: 85, actual: 88, status: "running", oee: pressStatusData ? pressStatusData.oee : 0 },
    { id: "Lathe-03", line: "B", perf: latheStatusData ? latheStatusData.perf : 0, target: 85, actual: 0, status: "breakdown", oee: latheStatusData ? latheStatusData.oee : 0 },
    { id: "Weld-04", line: "B", perf: weldStatusData ? weldStatusData.perf : 0, target: 85, actual: 100, status: "running", oee: weldStatusData ? weldStatusData.oee : 0 },
    { id: "Assy-05", line: "C", perf: assyStatusData ? assyStatusData.perf : 0, target: 85, actual: 0, status: "idle", oee: assyStatusData ? assyStatusData.oee : 0 },
    { id: "Paint-06", line: "C", perf: paintStatusData ? paintStatusData.perf : 0, target: 85, actual: 86, status: "running", oee: paintStatusData ? paintStatusData.oee : 0 },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-8 gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] mb-2">
            <span className="w-8 h-[1px] bg-blue-600"></span>
            Efficiency Analysis
          </div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">
            Performance <span className="text-blue-600">Gauges</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-900/50 px-6 py-3 rounded-2xl border border-slate-800 shadow-lg shadow-blue-900/10">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Global Target</p>
            <p className="text-xl font-black text-blue-500 italic">85.0%</p>
          </div>
          <button className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:border-blue-500 transition-all">
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </header>

      {/* Grid of Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {performanceData.map((machine) => (
          <PerformanceCard key={machine.id} {...machine} />
        ))}
      </div>

    </div>
  );
}

// --- Sub-component: PerformanceCard ---

function PerformanceCard({ id, line, perf, target, actual, status, oee }: any) {
  // คำนวณองศาสำหรับการหมุนของเกจ (0% = 0deg, 100% = 180deg)
  const rotation = (perf / 100) * 180;
  
  const statusConfig: any = {
    running: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    breakdown: "text-red-500 bg-red-500/10 border-red-500/20 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]",
    idle: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  };

  return (
    <div className="group bg-slate-900/40 border border-slate-800/50 rounded-[3.5rem] p-10 shadow-2xl hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden backdrop-blur-md">
      
      {/* Background Decorative Glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-600/5 blur-[90px] rounded-full group-hover:bg-blue-600/10 transition-colors" />

      {/* Card Header */}
      <div className="flex justify-between items-start mb-10 relative z-10">
        <div>
          <h3 className="text-xl font-black text-white italic tracking-tighter uppercase group-hover:text-blue-400 transition-colors">{id}</h3>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Line Segment {line}</p>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 ${statusConfig[status]}`}>
          <span className={`w-1.5 h-1.5 rounded-full bg-current ${status === 'breakdown' ? 'animate-ping' : ''}`}></span>
          {status}
        </div>
      </div>

      {/* Gauge Visual Area */}
      <div className="relative flex justify-center items-start pt-4 pb-20"> 
        
        {/* Gauge Structure */}
        <div className="relative w-64 h-32 overflow-hidden">
          {/* Base Path (Background) */}
          <div className="absolute top-0 left-0 w-64 h-64 border-[18px] border-slate-800/80 rounded-full"></div>
          
          {/* Active Progress Path */}
          <div 
            className="absolute top-0 left-0 w-64 h-64 border-[18px] border-blue-600 rounded-full transition-all duration-[2000ms] ease-out shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
              transform: `rotate(${rotation - 180}deg)` 
            }}
          ></div>
        </div>

        {/* Data Display - ขยับลงมาด้านล่างเพื่อไม่ให้โดนเกจทับ */}
        <div className="absolute bottom-2 flex flex-col items-center">
          <span className="text-7xl font-black text-white italic leading-none drop-shadow-[0_0_20px_rgba(37,99,235,0.3)] tracking-tighter">
            {perf}%
          </span>
          <div className="flex flex-col items-center mt-5">
            <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em]">Efficiency Rate</span>
            <p className="text-[9px] font-bold text-slate-600 mt-1 uppercase tracking-tighter italic">
              Threshold Limit: {target}%
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="grid grid-cols-2 gap-6 mt-4 pt-10 border-t border-slate-800/60 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Actual Speed</p>
          </div>
          <p className="text-2xl font-black text-white italic leading-none pl-3">{actual}%</p>
        </div>
        
        <div className="space-y-1 text-right border-l border-slate-800/50">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest pr-1">OEE Integration</p>
          <p className="text-2xl font-black text-cyan-400 italic leading-none">{oee}%</p>
        </div>
      </div>

    </div>
  );
}