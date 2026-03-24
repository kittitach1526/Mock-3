"use client";

import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EquipmentPage() {
  const { data: cncStatusData, isLoading: isMachineStatusLoading } = useSWR(
    "/api/cnc",
    fetcher,
    { refreshInterval: 1000 },
  );
  const { data: pressStatusData, isLoading: isPressStatusLoading } = useSWR(
    "/api/press",
    fetcher,
    { refreshInterval: 1000 },
  );
  const { data: latheStatusData, isLoading: isLatheStatusLoading } = useSWR(
    "/api/lathe",
    fetcher,
    { refreshInterval: 1000 },
  );
  const { data: weldStatusData, isLoading: isWeldStatusLoading } = useSWR(
    "/api/weld",
    fetcher,
    { refreshInterval: 1000 },
  );
  const { data: assyStatusData, isLoading: isAssyStatusLoading } = useSWR(
    "/api/assy",
    fetcher,
    { refreshInterval: 1000 },
  );
  const { data: paintStatusData, isLoading: isPaintStatusLoading } = useSWR(
    "/api/paint",
    fetcher,
    { refreshInterval: 1000 },
  );
  const {data: downtimeParetoData, isLoading: isDowntimeParetoLoading} = useSWR("/api/downtimePareto", fetcher, { refreshInterval: 1000 });

  

  const equipmentData = [
    {
      id: "CNC-01",
      line: "A",
      oee: cncStatusData ? cncStatusData.oee : 0,
      avail: cncStatusData ? cncStatusData.avail : 0,
      perf: cncStatusData ? cncStatusData.perf : 0,
      qual: cncStatusData ? cncStatusData.qual : 0,
      status: "running",
    },
    {
      id: "Press-02",
      line: "A",
      oee: pressStatusData ? pressStatusData.oee : 0,
      avail: pressStatusData ? pressStatusData.avail : 0,
      perf: pressStatusData ? pressStatusData.perf : 0,
      qual: pressStatusData ? pressStatusData.qual : 0,
      status: "running",
    },
    {
      id: "Lathe-03",
      line: "B",
      oee: latheStatusData ? latheStatusData.oee : 0,
      avail: latheStatusData ? latheStatusData.avail : 0,
      perf: latheStatusData ? latheStatusData.perf : 0,
      qual: latheStatusData ? latheStatusData.qual : 0,
      status: "breakdown",
    },
    {
      id: "Weld-04",
      line: "B",
      oee: weldStatusData ? weldStatusData.oee : 0,
      avail: weldStatusData ? weldStatusData.avail : 0,
      perf: weldStatusData ? weldStatusData.perf : 0,
      qual: weldStatusData ? weldStatusData.qual : 0,
      status: "running",
    },
    {
      id: "Assy-05",
      line: "C",
      oee: assyStatusData ? assyStatusData.oee : 0,
      avail: assyStatusData ? assyStatusData.avail : 0,
      perf: assyStatusData ? assyStatusData.perf : 0,
      qual: assyStatusData ? assyStatusData.qual : 0,
      status: "idle",
    },
    {
      id: "Paint-06",
      line: "C",
      oee: paintStatusData ? paintStatusData.oee : 0,
      avail: paintStatusData ? paintStatusData.avail : 0,
      perf: paintStatusData ? paintStatusData.perf : 0,
      qual: paintStatusData ? paintStatusData.qual : 0,
      status: "running",
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
            Technical Assets
          </h2>
          <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">
            Equipment <span className="text-blue-600">Intelligence</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-600 uppercase">
              Total Assets
            </p>
            <p className="text-2xl font-black text-white italic">06</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: DOWNTIME PARETO */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-500 text-sm">
                analytics
              </span>
              Downtime Pareto
            </h3>

            <div className="space-y-8">
              <ParetoRow
                label="Mechanical Failure"
                time="142m"
                percent={downtimeParetoData?.machanical_failure|| 0}
                color="bg-red-500"
              />
              <ParetoRow
                label="Material Shortage"
                time="96m"
                percent={downtimeParetoData?.material_shortage || 0}
                color="bg-orange-500"
              />
              <ParetoRow
                label="Changeover"
                time="74m"
                percent={downtimeParetoData?.changeover || 0}
                color="bg-amber-500"
              />
              <ParetoRow
                label="Operator Absence"
                time="41m"
                percent={downtimeParetoData?.operator_absence || 0}
                color="bg-blue-500"
              />
              <ParetoRow
                label="Quality Check"
                time="19m"
                percent={downtimeParetoData?.quality_check || 0}
                color="bg-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-12">
              <div className="bg-slate-950/40 border border-slate-800/50 p-6 rounded-3xl">
                <p className="text-[9px] font-black text-emerald-500 uppercase mb-1">
                  Planned Downtime
                </p>
                <p className="text-3xl font-black text-white italic">
                  {downtimeParetoData?.planed_downtime || 0} <span className="text-xs font-normal">min</span>
                </p>
              </div>
              <div className="bg-slate-950/40 border border-slate-800/50 p-6 rounded-3xl">
                <p className="text-[9px] font-black text-red-500 uppercase mb-1">
                  Unplanned Downtime
                </p>
                <p className="text-3xl font-black text-white italic">
                  {downtimeParetoData?.unplaned_downtime || 0} <span className="text-xs font-normal">min</span>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT: EQUIPMENT DETAIL TABLE */}
        <div className="lg:col-span-7">
          <section className="bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] p-8 shadow-2xl h-full backdrop-blur-md">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-500 text-sm">
                list_alt
              </span>
              Equipment Detail
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest px-4">
                    <th className="pb-2 pl-4">Machine</th>
                    <th className="pb-2">Line</th>
                    <th className="pb-2">OEE</th>
                    <th className="pb-2">Avail</th>
                    <th className="pb-2">Perf</th>
                    <th className="pb-2">Qual</th>
                    <th className="pb-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {equipmentData.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-slate-800/20 hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-5 pl-6 rounded-l-2xl font-black text-white italic group-hover:text-blue-400">
                        {item.id}
                      </td>
                      <td className="py-5 font-bold text-slate-400">
                        {item.line}
                      </td>
                      <td
                        className={`py-5 font-black italic ${item.oee < 50 ? "text-red-500" : "text-emerald-500"}`}
                      >
                        {item.oee}%
                      </td>
                      <td className="py-5 font-mono text-slate-300">
                        {item.avail}%
                      </td>
                      <td className="py-5 font-mono text-slate-300">
                        {item.perf}%
                      </td>
                      <td className="py-5 font-mono text-slate-300">
                        {item.qual}%
                      </td>
                      <td className="py-5 pr-6 rounded-r-2xl">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              item.status === "running"
                                ? "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                                : item.status === "breakdown"
                                  ? "bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]"
                                  : "bg-amber-500 shadow-[0_0_8px_#f59e0b]"
                            }`}
                          ></div>
                          <span className="text-[10px] font-black uppercase italic tracking-tighter opacity-80">
                            {item.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Pareto Rows
function ParetoRow({ label, time, percent, color }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-3">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">
          {label}
        </span>
        <span className="text-xs font-bold text-white italic">
          {time}{" "}
          <span className="text-slate-500 font-normal ml-1">({percent}%)</span>
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden p-[1px]">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
