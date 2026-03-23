'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans relative overflow-hidden">
      {/* Background Glows (Global) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      {/* Sidebar Fixed - ขยายความกว้างจาก 20 เป็น 24 (96px) เพื่อรองรับตัวหนังสือ */}
      <aside className="fixed left-0 top-0 bottom-0 w-24 flex flex-col items-center py-10 bg-slate-900/40 backdrop-blur-2xl border-r border-slate-800/50 z-50">
        <div className="mb-14">
          <Link href="/dashboard">
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer hover:scale-105 transition-all border border-blue-400/30">
              <span className="text-white font-black text-xs italic">F</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex flex-col gap-6 w-full px-2">
          <NavItem href="/dashboard" icon="dashboard" label="Home" active={pathname === '/dashboard'} />
          <NavItem href="/dashboard/processes" icon="analytics" label="Timeline" active={pathname === '/dashboard/processes'} />
          <NavItem href="/dashboard/history" icon="history" label="Logs" active={pathname === '/dashboard/history'} />
          <NavItem href="/dashboard/settings" icon="settings" label="Setup" active={pathname === '/dashboard/settings'} />
        </nav>

        <div className="mt-auto pb-4 w-full px-2">
           <NavItem href="/" icon="logout" label="Exit" active={false} isLogout />
        </div>
      </aside>

      {/* Main Content Wrapper - ขยับ Margin Left ตามความกว้าง Sidebar */}
      <div className="ml-24">
        {children}
      </div>
      
      {/* Footer Branding */}
      <footer className="fixed bottom-6 right-10 text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] z-0 pointer-events-none italic opacity-50">
        © 2026 ZEWELL SOLUTION SYSTEMS
      </footer>
    </div>
  );
}

// Sub-component สำหรับเมนู พร้อม Label
function NavItem({ 
    href, 
    icon, 
    label, 
    active, 
    isLogout = false 
}: { 
    href: string, 
    icon: string, 
    label: string, 
    active: boolean,
    isLogout?: boolean 
}) {
  return (
    <Link href={href} className="w-full">
      <button className={`w-full flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-300 group relative
        ${active 
            ? 'bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] border border-blue-500/20' 
            : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/40'
        }
        ${isLogout ? 'hover:text-red-400 hover:bg-red-500/5' : ''}
      `}>
        {/* ไอคอน */}
        <span className={`material-symbols-outlined text-[24px] mb-1.5 transition-transform duration-300 group-hover:scale-110 
            ${active ? 'fill-current' : ''}`}>
          {icon}
        </span>
        
        {/* ตัวหนังสือหัวข้อเมนู */}
        <span className={`text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 italic
            ${active ? 'text-white' : 'text-slate-600 group-hover:text-slate-300'}`}>
          {label}
        </span>

        {/* Indicator Bar (แถบข้างๆ เมื่อ Active) */}
        {active && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full shadow-[2px_0_10px_rgba(255,255,255,0.5)]" />
        )}
      </button>
    </Link>
  );
}