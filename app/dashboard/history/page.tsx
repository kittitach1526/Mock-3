"use client";

import React, { useState } from "react";

export default function HistoryPage() {
  // จำลองข้อมูลประวัติย้อนหลัง
  const historyData = [
    { date: "2026-03-22", oee: 84.5, availability: 92, performance: 89, quality: 99, status: "Normal", downtime: "45m" },
    { date: "2026-03-21", oee: 72.1, availability: 80, performance: 85, quality: 98, status: "Issue", downtime: "2h 15m" },
    { date: "2026-03-20", oee: 88.2, availability: 95, performance: 92, quality: 99, status: "Optimal", downtime: "20m" },
    { date: "2026-03-19", oee: 65.4, availability: 70, performance: 82, quality: 97, status: "Critical", downtime: "3h 40m" },
    { date: "2026-03-18", oee: 81.0, availability: 88, performance: 88, quality: 99, status: "Normal", downtime: "55m" },
  ];

  return (
    <div className="relative z-10 p-8 max-w-[1600px] mx-auto space-y-10">
      {/* Header & Filter */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-800/50 pb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span className="w-8 h-[1px] bg-blue-600"></span>
            Performance Archive
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            OPERATION <span className="text-blue-600">HISTORY LOGS</span>
          </h1>
        </div>

        <div className="flex gap-3">
          <input 
            type="month" 
            className="bg-slate-900 border border-slate-700 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition-colors"
            defaultValue="2026-03"
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            Export CSV
          </button>
        </div>
      </header>

      {/* History Table Container */}
      <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/20 border-b border-slate-800/50">
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Date Period</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">OEE Index</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Performance Metrics (A/P/Q)</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Total Downtime</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Status</th>
                <th className="px-8 py-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {historyData.map((log) => (
                <HistoryRow key={log.date} log={log} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Summary Footer */}
      <div className="flex justify-between items-center px-4 py-2 border-t border-slate-800/20 opacity-40">
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic italic">System logging active since Jan 2026</p>
        <div className="flex gap-4">
             <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">AVG OEE: 78.6%</span>
             <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Total Loss: 12.4H</span>
        </div>
      </div>
    </div>
  );
}

function HistoryRow({ log }: { log: any }) {
  const isCritical = log.oee < 70;
  const isOptimal = log.oee >= 85;

  return (
    <tr className="hover:bg-slate-800/20 transition-colors group">
      {/* Date */}
      <td className="px-8 py-6">
        <p className="text-sm font-black text-white italic tracking-widest uppercase">{log.date}</p>
        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">24H Operations</p>
      </td>

      {/* OEE Index */}
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <span className={`text-2xl font-black italic ${isCritical ? 'text-red-500' : isOptimal ? 'text-blue-500' : 'text-white'}`}>
            {log.oee}%
          </span>
          <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full ${isCritical ? 'bg-red-500' : isOptimal ? 'bg-blue-500' : 'bg-slate-400'}`} 
              style={{ width: `${log.oee}%` }}
            />
          </div>
        </div>
      </td>

      {/* Performance Metrics (A/P/Q) */}
      <td className="px-8 py-6">
        <div className="flex gap-6 text-[11px] font-bold">
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-0.5">AVAIL</span>
            <span className="text-slate-200">{log.availability}%</span>
          </div>
          <div className="flex flex-col border-x border-slate-800 px-6">
            <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-0.5">PERF</span>
            <span className="text-slate-200">{log.performance}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-0.5">QUAL</span>
            <span className="text-slate-200">{log.quality}%</span>
          </div>
        </div>
      </td>

      {/* Downtime */}
      <td className="px-8 py-6">
        <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-600 text-sm">timer</span>
            <span className="text-xs font-mono font-bold text-slate-300 italic uppercase">{log.downtime}</span>
        </div>
      </td>

      {/* Status */}
      <td className="px-8 py-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest
            ${log.status === 'Optimal' ? 'bg-blue-600/10 text-blue-500 border-blue-500/20' : 
              log.status === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse' :
              'bg-slate-800 text-slate-400 border-slate-700'}
        `}>
          {log.status}
        </div>
      </td>

      {/* Action */}
      <td className="px-8 py-6 text-right">
        <button className="material-symbols-outlined text-slate-600 hover:text-white transition-colors cursor-pointer group-hover:translate-x-1 transition-transform">
          arrow_forward_ios
        </button>
      </td>
    </tr>
  );
}