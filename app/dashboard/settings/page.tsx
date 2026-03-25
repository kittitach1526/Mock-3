"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mutate } from "swr"; // 1. Import mutate มาด้วย

// --- Components ---

function SettingsTab({ label, icon, href }: { label: string; icon: string; href: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} className="block w-full group">
      <div className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 border ${
        isActive 
          ? 'bg-blue-600/10 border-blue-500/30 text-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
          : 'border-transparent text-slate-500 hover:text-slate-200 hover:bg-slate-800/40'
      }`}>
        <span className={`material-symbols-outlined transition-colors ${isActive ? 'text-blue-500' : 'group-hover:text-blue-400'}`}>
          {icon}
        </span>
        <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
        {isActive && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,1)]"></div>
        )}
      </div>
    </Link>
  );
}

export default function SystemSettingsPage() {
  const [refreshRate, setRefreshRate] = useState(15);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 🔥 1. ดึงค่าจาก SQLite มาเช็คตอนเปิดหน้า
  useEffect(() => {
    const fetchCurrentSettings = async () => {
      try {
        const res = await fetch('/api/set_interval');
        const data = await res.json();
        if (data.refreshRate) {
          setRefreshRate(data.refreshRate);
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentSettings();
  }, []);

  // 🔥 2. ฟังก์ชันบันทึกลง SQLite
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/set_interval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshRate }),
      });
      if (res.ok) {
        mutate('/api/set_interval'); // 2. สั่งให้ SWR รีเฟรชข้อมูลใหม่หลังบันทึก
        alert("✅ Configuration Updated Successfully!");
      }
    } catch (err) {
      alert("❌ Error saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  const timeOptions = [
    { label: "Ultra Real-time", value: 1, desc: "Extreme sync, maximum resources" },
    { label: "High Frequency", value: 3, desc: "Fast monitoring for critical data" },
    { label: "Turbo Mode", value: 5, desc: "High performance IoT tracking" },
    { label: "Standard Sync", value: 15, desc: "Optimal balance for general use" },
    { label: "Eco Mode", value: 30, desc: "Power saving & low bandwidth" },
    { label: "Lazy Refresh", value: 60, desc: "Minimum updates for static data" },
  ];

  if (isLoading) return <div className="p-20 text-blue-500 font-black italic animate-pulse text-center">INITIALIZING SYSTEM...</div>;

  return (
    <div className="relative z-10 p-8 max-w-[1600px] mx-auto space-y-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-800/50 pb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span className="w-8 h-[1px] bg-blue-600"></span>
            System Preferences
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            DATA <span className="text-blue-600">REFRESH RATE</span>
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Sidebar Settings Menu */}
        <aside className="xl:col-span-1 space-y-2">
          <SettingsTab label="Refresh Configuration" icon="sync" href="/dashboard/settings" />
        </aside>

        {/* Refresh Rate Selector Content */}
        <div className="xl:col-span-3 space-y-6">
          
          <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-xl font-black text-white italic tracking-widest uppercase mb-2">Interval Timing</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">ค่าที่ใช้อยู่ในปัจจุบันจะแสดงเป็นแถบสีน้ำเงิน</p>
                </div>
                <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 transition-all ${isAutoRefresh ? 'border-blue-500/50 bg-blue-500/10 text-blue-400' : 'border-slate-700 bg-slate-800/50 text-slate-500'}`}>
                    <span className="text-[10px] font-black uppercase tracking-widest italic">{isAutoRefresh ? 'Auto Sync ON' : 'Auto Sync OFF'}</span>
                    <button 
                        onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                        className={`w-10 h-5 rounded-full relative transition-all ${isAutoRefresh ? 'bg-blue-600' : 'bg-slate-700'}`}
                    >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isAutoRefresh ? 'right-1' : 'left-1'}`}></div>
                    </button>
                </div>
              </div>

              {/* Grid Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRefreshRate(option.value)}
                    className={`flex flex-col gap-4 p-6 rounded-[2rem] border transition-all duration-500 text-left group ${
                      refreshRate === option.value 
                        ? 'bg-blue-600 border-blue-400 shadow-[0_20px_40px_rgba(37,99,235,0.2)] scale-[1.02]' 
                        : 'bg-slate-800/30 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        refreshRate === option.value ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'
                        }`}>
                        <span className="material-symbols-outlined text-2xl font-light italic">timer</span>
                        </div>
                        {refreshRate === option.value && (
                            <span className="material-symbols-outlined text-white text-xl animate-pulse">check_circle</span>
                        )}
                    </div>
                    <div>
                      <p className={`text-xs font-black italic tracking-wider uppercase ${refreshRate === option.value ? 'text-white' : 'text-slate-300'}`}>
                        {option.label}
                      </p>
                      <p className={`text-[10px] font-bold mt-1 ${refreshRate === option.value ? 'text-blue-100' : 'text-slate-500'}`}>
                        {option.value < 60 ? `${option.value} Seconds` : '1 Minute'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Status Footer */}
              <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Current State</p>
                        <p className="text-lg font-black text-white italic">{refreshRate <= 5 ? 'HIGH SPEED' : 'STABLE'}</p>
                    </div>
                    <div className="w-[1px] h-10 bg-slate-800"></div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Sync Interval</p>
                        <p className="text-lg font-black text-blue-500 italic">{refreshRate < 60 ? `${refreshRate}s` : '1m'}</p>
                    </div>
                 </div>

                 <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-10 py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-3 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                 >
                    {isSaving && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                    {isSaving ? 'Updating...' : 'Save Configuration'}
                 </button>
              </div>
            </div>
          </div>

          {/* Dynamic Warning Card */}
          <div className={`transition-all duration-500 border rounded-[2rem] p-6 flex items-center gap-5 ${
            refreshRate <= 5 ? 'bg-red-500/5 border-red-500/20' : 'bg-amber-500/5 border-amber-500/20'
          }`}>
             <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                 refreshRate <= 5 ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
             }`}>
                <span className="material-symbols-outlined">{refreshRate <= 5 ? 'bolt' : 'warning'}</span>
             </div>
             <div>
                <p className={`text-[11px] font-black uppercase tracking-widest italic ${
                    refreshRate <= 5 ? 'text-red-500' : 'text-amber-500'
                }`}>
                    {refreshRate <= 5 ? 'High Resource Warning' : 'Performance Impact'}
                </p>
                <p className="text-[10px] text-slate-400 font-bold italic">
                    {refreshRate <= 5 
                        ? 'การดึงข้อมูลความเร็วสูงจะทำให้เซิร์ฟเวอร์ทำงานหนักขึ้น' 
                        : 'การปรับความถี่จะมีผลต่อการอัปเดต Dashboard ของสมาชิกทุกคน'}
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}