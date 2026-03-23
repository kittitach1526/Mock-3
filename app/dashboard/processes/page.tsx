"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// --- 1. Sub-Components (ย้ายขึ้นมาไว้ด้านบนเพื่อความชัวร์ในการเรนเดอร์) ---

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Running: "bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]",
    Maintenance: "bg-red-500/10 text-red-500 border-red-500/20",
    Standby: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };
  return (
    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${styles[status] || styles.Standby}`}>
      {status}
    </span>
  );
}

function HourlyTimeline({ data }: { data: number[] }) {
  if (!data) return null;
  
  return (
    <div className="flex gap-[2px] w-[280px] sm:w-[320px] h-8 bg-slate-950/50 p-[3px] rounded-lg border border-slate-800 shadow-inner overflow-visible">
      {data.map((status, index) => {
        // กำหนดสีแบบ Explicit เพื่อให้ Tailwind ทำงานได้แม่นยำขึ้น
        let bgColor = "bg-slate-700";
        let label = "Unknown";
        
        if (status === 0) { bgColor = "bg-amber-500"; label = "Standby"; }
        else if (status === 1) { bgColor = "bg-green-500"; label = "Running"; }
        else if (status === 2) { bgColor = "bg-red-500"; label = "Stopped"; }

        return (
          <div
            key={index}
            className={`flex-1 ${bgColor} rounded-[1px] transition-all relative group/item cursor-pointer hover:scale-y-125 hover:z-30`}
          >
            {/* Tooltip - ปรับแต่งให้แสดงผลแน่นอนขึ้น */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[9px] font-bold rounded opacity-0 group-hover/item:opacity-100 pointer-events-none transition-all whitespace-nowrap z-[100] shadow-2xl border border-slate-700">
              <div className="text-blue-400 font-mono">{index}:00 - {index + 1}:00</div>
              <div className="uppercase tracking-tighter text-center">{label}</div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- 2. Main Component ---

export default function OEEDashboard() {
  const [mounted, setMounted] = useState(false);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeString(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [processes] = useState([
    {
      id: "MC-01",
      name: "Air Compressor A",
      availability: 94.2,
      performance: 88.0,
      quality: 99.5,
      oee: 82.4,
      status: "Running",
      hourlyStatus: [1, 1, 1, 1, 1, 0, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: "MC-02",
      name: "Air Compressor B",
      availability: 88.5,
      performance: 75.2,
      quality: 98.2,
      oee: 65.3,
      status: "Maintenance",
      hourlyStatus: [0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    },
    {
      id: "MC-03",
      name: "Cooling Tower",
      availability: 99.1,
      performance: 92.4,
      quality: 100,
      oee: 91.5,
      status: "Running",
      hourlyStatus: Array(24).fill(1),
    },
  ]);

  // สำคัญมาก: ต้องเช็ค mounted ที่นี่เพื่อหยุดการเรนเดอร์ฝั่ง Server ทั้งหมด
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-blue-500 font-black animate-pulse uppercase tracking-[0.5em]">Initializing Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <main className="p-8 max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <span>Dashboard</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-blue-500">Live Analytics</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic">
              FOSTEC <span className="text-blue-600">OEE Monitoring</span>
            </h1>
          </div>

          <div className="px-4 py-1 text-right border-l border-slate-800">
            <div className="text-[10px] text-blue-400 uppercase font-black tracking-widest">Live Clock</div>
            <div className="text-xl font-mono font-bold text-white mt-1 leading-none">
              {timeString || "00:00:00"}
            </div>
          </div>
        </header>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-800/30 border-b border-slate-800/50">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Machine</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Efficiency</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-blue-400 text-center">24H Status Timeline</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {processes.map((proc) => (
                  <tr key={proc.id} className="hover:bg-blue-500/5 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-500 font-black shadow-inner">
                          {proc.id.split("-")[1]}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{proc.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{proc.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex flex-col items-center">
                        <div className="flex gap-2 text-[9px] font-bold mb-1 uppercase">
                          <span className="text-blue-400">A:{proc.availability}%</span>
                          <span className="text-emerald-400">Q:{proc.quality}%</span>
                        </div>
                        <div className="text-2xl font-black text-white">{proc.oee}%</div>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex flex-col items-center gap-3">
                        <HourlyTimeline data={proc.hourlyStatus} />
                        <div className="flex gap-4 text-[8px] font-black text-slate-500 uppercase tracking-widest">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> RUN</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span> STOP</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full"></span> IDLE</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-6 text-right">
                      <StatusBadge status={proc.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Link href="/dashboard" className="mt-8 inline-flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-all text-xs font-bold uppercase tracking-widest group">
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Main
        </Link>
      </main>
    </div>
  );
}