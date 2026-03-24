"use client";

import React from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Cell, ReferenceLine
} from "recharts";

export default function AnalyticsPage() {
  // --- DATA SOURCE ---
  const trendData = [
    { name: "Mon", oee: 82, avail: 90, perf: 85, qual: 96 },
    { name: "Tue", oee: 85, avail: 92, perf: 87, qual: 97 },
    { name: "Wed", oee: 78, avail: 85, perf: 82, qual: 94 },
    { name: "Thu", oee: 88, avail: 94, perf: 90, qual: 98 },
    { name: "Fri", oee: 91, avail: 95, perf: 92, qual: 98 },
    { name: "Sat", oee: 75, avail: 80, perf: 78, qual: 95 },
    { name: "Sun", oee: 80, avail: 85, perf: 84, qual: 96 },
  ];

  const hourlyData = [
    { hour: "06", output: 120, target: 125 },
    { hour: "07", output: 128, target: 125 },
    { hour: "08", output: 115, target: 125 },
    { hour: "09", output: 132, target: 125 },
    { hour: "10", output: 98, target: 125 },
    { hour: "11", output: 125, target: 125 },
    { hour: "12", output: 110, target: 125 },
    { hour: "13", output: 118, target: 125 },
  ];

  const heatMapData = [
    { shift: "Day", mon: 88, tue: 82, wed: 75, thu: 91, fri: 87, sat: 72, sun: 79 },
    { shift: "Afternoon", mon: 84, tue: 79, wed: 81, thu: 88, fri: 92, sat: 68, sun: 75 },
    { shift: "Night", mon: 76, tue: 71, wed: 65, thu: 85, fri: 89, sat: 64, sun: 72 },
  ];

  return (
    <div className="p-8 max-w-[1650px] mx-auto space-y-8 animate-in fade-in duration-1000">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800 pb-8 gap-4">
        <div>
          <h2 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] mb-2">Deep Intelligence</h2>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">
            Production <span className="text-blue-600">Analytics</span>
          </h1>
        </div>
        <div className="flex gap-3">
           <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 text-right">
              <p className="text-[9px] font-black text-slate-500 uppercase">Avg. OEE Week</p>
              <p className="text-xl font-black text-blue-500 italic">82.7%</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* --- 1. SEVEN-DAY TREND --- */}
        <section className="xl:col-span-8 bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-10 shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest italic flex items-center gap-3">
              <span className="w-2 h-6 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></span>
              7-Day Performance Trend
            </h3>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} fontWeight="bold" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight="bold" axisLine={false} tickLine={false} domain={[60, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }} />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="qual" stroke="#818cf8" strokeWidth={4} dot={{ r: 4 }} name="Quality" />
                <Line type="monotone" dataKey="perf" stroke="#fbbf24" strokeWidth={3} dot={false} name="Performance" />
                <Line type="monotone" dataKey="avail" stroke="#10b981" strokeWidth={3} dot={false} name="Availability" />
                <Line type="monotone" dataKey="oee" stroke="#3b82f6" strokeWidth={5} dot={{ r: 6 }} name="OEE Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* --- 2. OEE HEATMAP (SHIFT-BASED) --- */}
        <section className="xl:col-span-4 bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-10 shadow-2xl flex flex-col">
          <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest italic mb-10">OEE Shift Heatmap</h3>
          <div className="flex-grow space-y-4">
            <div className="grid grid-cols-8 text-[9px] font-black text-slate-500 uppercase mb-4 pl-12 text-center">
              <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
            </div>
            {heatMapData.map((row) => (
              <div key={row.shift} className="flex items-center gap-4">
                <div className="w-12 text-[9px] font-black text-slate-400 uppercase">{row.shift}</div>
                <div className="flex-grow grid grid-cols-7 gap-2">
                  {[row.mon, row.tue, row.wed, row.thu, row.fri, row.sat, row.sun].map((val, i) => (
                    <div 
                      key={i} 
                      className={`h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all hover:scale-110 cursor-default
                        ${val >= 85 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                          val >= 75 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 
                          val >= 65 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                          'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                    >
                      {val}%
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between pt-6 border-t border-slate-800 text-[8px] font-black text-slate-500 uppercase">
             <div className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-sm"></span> ≥85%</div>
             <div className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-sm"></span> 75-84%</div>
             <div className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-sm"></span> 65-74%</div>
             <div className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-sm"></span> &lt;65%</div>
          </div>
        </section>

        {/* --- 3. HOURLY OUTPUT VS TARGET --- */}
        <section className="xl:col-span-12 bg-slate-900/40 border border-slate-800/50 rounded-[3.5rem] p-12 shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-black text-white italic tracking-tight uppercase flex items-center gap-4">
              <span className="material-symbols-outlined text-blue-500">inventory_2</span>
              Hourly Output Analysis <span className="text-slate-600 text-sm font-normal not-italic tracking-normal">— Current Shift</span>
            </h3>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#1e293b', radius: 10}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }} />
                <ReferenceLine y={125} stroke="#3b82f6" strokeDasharray="8 8" label={{ position: 'right', value: 'TARGET: 125', fill: '#3b82f6', fontSize: 10, fontWeight: 'black' }} />
                <Bar dataKey="output" radius={[10, 10, 0, 0]} barSize={60}>
                  {hourlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.output >= entry.target ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>
    </div>
  );
}