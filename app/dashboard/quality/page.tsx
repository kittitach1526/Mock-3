"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import useSWR from "swr";
import { useSystemConfig } from '@/hooks/useConfig';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Quality Dashboard Page
 * เน้นการวิเคราะห์คุณภาพการผลิต และสาเหตุของ Defect
 */
export default function QualityPage() {
  const { refreshInterval, isLoading: isConfigLoading } = useSystemConfig();
  // ข้อมูลจำลองสำหรับ Trend Chart
  const trendData = [
    { name: "Mon", oee: 82, avail: 90, perf: 85, qual: 96 },
    { name: "Tue", oee: 85, avail: 92, perf: 87, qual: 97 },
    { name: "Wed", oee: 78, avail: 85, perf: 82, qual: 94 },
    { name: "Thu", oee: 88, avail: 94, perf: 90, qual: 98 },
    { name: "Fri", oee: 91, avail: 95, perf: 92, qual: 98 },
    { name: "Sat", oee: 75, avail: 80, perf: 78, qual: 95 },
    { name: "Sun", oee: 80, avail: 85, perf: 84, qual: 96 },
  ];

  const {data: qualityParetoData, isLoading: isQualityParetoLoading} = useSWR("/api/quality_page", fetcher, { refreshInterval: isConfigLoading ? 0 : refreshInterval });

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800/60 pb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Quality Assurance Matrix
          </div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">
            Quality <span className="text-indigo-500">Analytics</span>
          </h1>
        </div>
      </header>

      {/* --- TOP SECTION: QUALITY KPIs --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIBox label="First Pass Yield" value="96.8" unit="%" target="97%" color="text-emerald-400" />
        <KPIBox label="Scrap Rate" value="2.1" unit="%" target="<1.5%" color="text-red-500" />
        <KPIBox label="Rework Rate" value="1.1" unit="%" target="<1%" color="text-amber-500" />
        <KPIBox label="Total Good Units" value="3,842" unit="PCS" target="Daily" color="text-blue-400" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* --- LEFT: DEFECT PARETO (Cause Analysis) --- */}
        <section className="xl:col-span-5 bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <span className="material-symbols-outlined text-red-500 text-xl">dangerous</span>
            </div>
            <h2 className="text-sm font-black text-slate-200 uppercase tracking-widest italic">Defect Pareto Analysis</h2>
          </div>
          
          <div className="space-y-8">
            <ParetoItem label="Dimensional Error" count={qualityParetoData?.demensional_error} percent={qualityParetoData?.demensional_error} color="bg-red-500" />
            <ParetoItem label="Surface Defect" count={qualityParetoData?.surface_defect} percent={qualityParetoData?.surface_defect} color="bg-orange-500" />
            <ParetoItem label="Assembly Error" count={qualityParetoData?.assembly_error} percent={qualityParetoData?.assembly_error} color="bg-amber-500" />
            <ParetoItem label="Material Defect" count={qualityParetoData?.material_defect} percent={qualityParetoData?.material_defect} color="bg-blue-500" />
            <ParetoItem label="Other" count={qualityParetoData?.other} percent={qualityParetoData?.other} color="bg-slate-500" />
          </div>
        </section>

        {/* --- RIGHT: PERFORMANCE TREND CHART --- */}
        <section className="xl:col-span-7 bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <span className="material-symbols-outlined text-blue-500 text-xl">stacked_line_chart</span>
              </div>
              <h2 className="text-sm font-black text-slate-200 uppercase tracking-widest italic">Weekly Trend Overview</h2>
            </div>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-slate-800 rounded-full text-[9px] font-black text-slate-400">7 DAYS</span>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} domain={[60, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'black', textTransform: 'uppercase' }} />
                <Line type="monotone" dataKey="qual" stroke="#818cf8" strokeWidth={4} dot={{ r: 4, fill: '#818cf8' }} activeDot={{ r: 8 }} name="Quality" />
                <Line type="monotone" dataKey="oee" stroke="#3b82f6" strokeWidth={2} dot={false} name="OEE" />
                <Line type="monotone" dataKey="perf" stroke="#f59e0b" strokeWidth={2} dot={false} name="Perf" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function KPIBox({ label, value, unit, target, color }: any) {
  return (
    <div className="bg-slate-900/40 border border-slate-800/50 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-500">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/5 blur-3xl rounded-full" />
      <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em] mb-6">{label}</p>
      <div className="flex items-baseline gap-1 mb-4">
        <span className={`text-4xl font-black italic tracking-tighter ${color}`}>{value}</span>
        <span className="text-[10px] font-bold text-slate-600 uppercase">{unit}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[8px] font-black text-slate-700 uppercase italic">Target: {target}</span>
      </div>
    </div>
  );
}

function ParetoItem({ label, count, percent, color }: any) {
  return (
    <div className="group cursor-default">
      <div className="flex justify-between items-end mb-3 px-1">
        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-white transition-colors">{label}</span>
        <div className="text-right">
          <span className="text-sm font-black text-white italic mr-2">{count}</span>
          <span className="text-[10px] font-bold text-slate-500">({percent}%)</span>
        </div>
      </div>
      <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden p-[1px]">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.5)]`} 
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}