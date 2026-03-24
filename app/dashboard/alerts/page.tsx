"use client";

import React, { useState } from "react";

export default function AlertsLogPage() {
  // ข้อมูลจำลองประวัติการแจ้งเตือนจากรูปภาพ
  const initialAlerts = [
    { id: 1, machine: "Lathe-03", code: "M03", message: "Spindle bearing overheat", severity: "critical", time: "10:52", date: "Mar 24", status: "ACK" },
    { id: 2, machine: "Press-02", code: "M02", message: "Cycle time +12% above ideal", severity: "warning", time: "10:25", date: "Mar 24", status: "ACK" },
    { id: 3, machine: "Assy-05", code: "M05", message: "Material buffer low (<20%)", severity: "warning", time: "09:58", date: "Mar 24", status: "ACK" },
    { id: 4, machine: "Press-02", code: "M02", message: "Cycle time +12% above ideal", severity: "warning", time: "09:15", date: "Mar 24", status: "ACK" },
    { id: 5, machine: "Lathe-03", code: "M03", message: "Spindle bearing overheat", severity: "critical", time: "08:42", date: "Mar 24", status: "ACK" },
    { id: 6, machine: "CNC-01", code: "M01", message: "PM due in 3 days", severity: "info", time: "07:00", date: "Mar 24", status: "ACK" },
  ];

  // ข้อมูล PM Schedule จากรูปภาพ
  const pmSchedules = [
    { machine: "CNC-01", task: "Spindle Lubrication", date: "Mar 27", status: "upcoming" },
    { machine: "Press-02", task: "Die Inspection", date: "Apr 01", status: "scheduled" },
    { machine: "Lathe-03", task: "Bearing Replacement", date: "Today", status: "overdue" },
    { machine: "Weld-04", task: "Electrode Cleaning", date: "Apr 05", status: "scheduled" },
    { machine: "Assy-05", task: "Conveyor Check", date: "Mar 29", status: "upcoming" },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Header & Stats */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-800 pb-8">
        <div>
          <h2 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em] mb-2">Security & Maintenance</h2>
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">
            Alerts <span className="text-red-500">& Logs</span>
          </h1>
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <StatMini label="Critical" value="2" color="text-red-500" />
          <StatMini label="Warnings" value="3" color="text-amber-500" />
          <StatMini label="Active PM" value="5" color="text-blue-500" />
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT: MAIN ALERTS HISTORY */}
        <section className="xl:col-span-8 bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-8 shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest italic flex items-center gap-3">
              <span className="material-symbols-outlined text-red-500">history</span>
              Historical Incident Log
            </h3>
            <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">
              Clear All Logs
            </button>
          </div>

          <div className="space-y-4">
            {initialAlerts.map((alert) => (
              <AlertRow key={alert.id} {...alert} />
            ))}
          </div>
        </section>

        {/* RIGHT: PM SCHEDULE & FILTERS */}
        <section className="xl:col-span-4 space-y-8">
          
          {/* PM Schedule Card */}
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-8 shadow-2xl">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest italic mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-500">event_note</span>
              PM Schedule
            </h3>
            <div className="space-y-6">
              {pmSchedules.map((pm, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <div>
                    <p className="text-xs font-black text-white italic uppercase group-hover:text-blue-400 transition-colors">{pm.machine}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">{pm.task}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 mb-1">{pm.date}</p>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border
                      ${pm.status === 'overdue' ? 'text-red-500 border-red-500/20 bg-red-500/5' : 
                        pm.status === 'scheduled' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 
                        'text-amber-500 border-amber-500/20 bg-amber-500/5'}
                    `}>
                      {pm.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] p-8">
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Log Filters</h4>
            <div className="flex flex-wrap gap-2">
              <FilterBtn label="All" active />
              <FilterBtn label="Critical" />
              <FilterBtn label="Warning" />
              <FilterBtn label="Maintenance" />
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatMini({ label, value, color }: any) {
  return (
    <div className="flex-1 bg-slate-900/40 border border-slate-800/50 p-4 rounded-2xl min-w-[100px]">
      <p className="text-[9px] font-black text-slate-500 uppercase mb-1">{label}</p>
      <p className={`text-xl font-black italic ${color}`}>{value}</p>
    </div>
  );
}

function AlertRow({ machine, message, severity, time, date, status }: any) {
  const severityStyles: any = {
    critical: "border-l-red-500 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.05)]",
    warning: "border-l-amber-500 bg-amber-500/5",
    info: "border-l-blue-500 bg-blue-500/5"
  };

  const iconMap: any = {
    critical: "error",
    warning: "warning",
    info: "info"
  };

  return (
    <div className={`flex items-center gap-6 p-4 rounded-2xl border border-slate-800/50 border-l-4 transition-all hover:scale-[1.01] ${severityStyles[severity]}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center
        ${severity === 'critical' ? 'text-red-500 bg-red-500/10' : 
          severity === 'warning' ? 'text-amber-500 bg-amber-500/10' : 
          'text-blue-500 bg-blue-500/10'}
      `}>
        <span className="material-symbols-outlined text-xl">{iconMap[severity]}</span>
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-[10px] font-black text-white italic uppercase tracking-tighter">{machine}</span>
          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{date} • {time}</span>
        </div>
        <p className="text-xs font-bold text-slate-300 uppercase leading-none">{message}</p>
      </div>

      <div className="text-right flex items-center gap-4">
        <span className="text-[9px] font-black text-slate-500 uppercase italic tracking-widest">{status}</span>
        <button className="w-8 h-8 rounded-lg bg-slate-800/50 text-slate-500 hover:text-white flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined text-sm">visibility</span>
        </button>
      </div>
    </div>
  );
}

function FilterBtn({ label, active = false }: any) {
  return (
    <button className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all
      ${active ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800/50 text-slate-500 hover:bg-slate-800'}
    `}>
      {label}
    </button>
  );
}