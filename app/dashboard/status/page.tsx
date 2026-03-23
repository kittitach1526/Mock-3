"use client";

import React from "react";

export default function ProcessesPage() {
  // จำลองข้อมูลสถานะของแต่ละ Process
  const processSteps = [
    { id: "P1", name: "Material Feeding", status: "Running", load: 85, temp: 42, operator: "Somchai. K" },
    { id: "P2", name: "Heating Unit", status: "Warning", load: 92, temp: 185, operator: "Wichai. S" },
    { id: "P3", name: "Molding Press", status: "Running", load: 78, temp: 65, operator: "Auto-System" },
    { id: "P4", name: "Cooling Zone", status: "Running", load: 40, temp: 22, operator: "Auto-System" },
    { id: "P5", name: "Quality Check", status: "Down", load: 0, temp: 28, operator: "Anucha. P" },
    { id: "P6", name: "Packaging", status: "Idle", load: 0, temp: 30, operator: "Somsak. M" },
  ];

  return (
    <div className="relative z-10 p-8 max-w-[1600px] mx-auto space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-800/50 pb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span className="w-8 h-[1px] bg-blue-600"></span>
            Line Monitoring
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            PRODUCTION <span className="text-blue-600">PROCESS FLOW</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
            <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Line</p>
                <p className="text-xl font-black text-white italic">LINE-A4 / SECTION-01</p>
            </div>
        </div>
      </header>

      {/* Process Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {processSteps.map((step, index) => (
          <ProcessCard key={step.id} step={step} index={index + 1} />
        ))}
      </div>

      {/* Footer System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 opacity-60">
        <div className="bg-slate-900/20 p-6 rounded-2xl border border-slate-800/50 flex items-center gap-4">
            <span className="material-symbols-outlined text-blue-500">memory</span>
            <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Controller CPU</p>
                <p className="text-sm font-bold text-slate-300">PLC-S7-1200 (Active)</p>
            </div>
        </div>
        <div className="bg-slate-900/20 p-6 rounded-2xl border border-slate-800/50 flex items-center gap-4">
            <span className="material-symbols-outlined text-emerald-500">sync_alt</span>
            <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Data Latency</p>
                <p className="text-sm font-bold text-slate-300">12ms (Optimized)</p>
            </div>
        </div>
        <div className="bg-slate-900/20 p-6 rounded-2xl border border-slate-800/50 flex items-center gap-4">
            <span className="material-symbols-outlined text-indigo-500">database</span>
            <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Logging Server</p>
                <p className="text-sm font-bold text-slate-300">ZEWELL-CLOUD-01</p>
            </div>
        </div>
      </div>
    </div>
  );
}

function ProcessCard({ step, index }: { step: any, index: number }) {
  const isRunning = step.status === "Running";
  const isWarning = step.status === "Warning";
  const isDown = step.status === "Down";

  return (
    <div className={`relative bg-slate-900/40 backdrop-blur-md border rounded-[2.5rem] p-8 shadow-2xl transition-all duration-500 hover:scale-[1.02]
        ${isWarning ? 'border-amber-500/30' : isDown ? 'border-red-500/30' : 'border-slate-800/50'}
    `}>
      {/* Step Number Badge */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center shadow-2xl">
        <span className="text-blue-500 font-black italic">0{index}</span>
      </div>

      {/* Status Glow */}
      <div className={`absolute -right-2 top-10 w-24 h-24 blur-[60px] opacity-20 pointer-events-none
        ${isRunning ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : isDown ? 'bg-red-500' : 'bg-slate-500'}
      `} />

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-black text-white italic uppercase tracking-tight mb-1">{step.name}</h3>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{step.id} MACHINE UNIT</p>
        </div>
        <div className={`px-4 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest animate-pulse
            ${isRunning ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
              isWarning ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
              isDown ? 'bg-red-500/10 text-red-500 border-red-500/20' :
              'bg-slate-500/10 text-slate-400 border-slate-500/20'}
        `}>
          {step.status}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
        <div className="bg-slate-800/20 p-4 rounded-2xl border border-slate-800/50">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Load Rate</p>
          <p className="text-2xl font-black text-white italic">{step.load}%</p>
        </div>
        <div className="bg-slate-800/20 p-4 rounded-2xl border border-slate-800/50">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Temperature</p>
          <p className="text-2xl font-black text-white italic">{step.temp}°C</p>
        </div>
      </div>

      {/* Progress Bar (Load) */}
      <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden mb-8 relative z-10">
        <div 
          className={`h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.3)]
            ${isRunning ? 'bg-blue-600' : isWarning ? 'bg-amber-500' : isDown ? 'bg-red-600' : 'bg-slate-600'}
          `}
          style={{ width: `${step.load}%` }}
        />
      </div>

      {/* Operator Info */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800/50 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
             <span className="material-symbols-outlined text-slate-500 text-lg text-white">person</span>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{step.operator}</span>
        </div>
        <button className="material-symbols-outlined text-slate-600 hover:text-blue-500 transition-colors">settings</button>
      </div>
    </div>
  );
}