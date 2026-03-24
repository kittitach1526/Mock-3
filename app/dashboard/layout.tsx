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

  // 🔥 helper function
const isActive = (paths: string[], exact?: boolean) => {
  if (exact) {
    return paths.some((p) => pathname === p);
  }
  return paths.some((p) => pathname.startsWith(p));
};

  // 🔥 menu config (แก้/เพิ่ม route ได้ง่ายมาก)
  const menus = [
    {
      href: "/dashboard",
      icon: "dashboard",
      label: "OVERVIEW",
      match: ["/dashboard"],
      exact: true,
    },
    {
      href: "/dashboard/equipment",
      icon: "precision_manufacturing",
      label: "Equipment",
      match: [
        "/dashboard/equipment",
      ]
    },
    {
      href: "/dashboard/availability",
      icon: "history",
      label: "Availability",
      match: [
        "/dashboard/availability",
      ]
    },
    {
      href: "/dashboard/performance",
      icon: "speed",
      label: "Performance",
      match: [
        "/dashboard/performance",
      ]
    },
    {
      href: "/dashboard/quality",
      icon: "fact_check",
      label: "Quality",
      match: [
        "/dashboard/quality",
      ]
    },
    {
      href: "/dashboard/analytics",
      icon: "analytics",
      label: "Analytics",
      match: [
        "/dashboard/analytics",
      ]
    },
    {
      href: "/dashboard/alerts",
      icon: "notification_important",
      label: "Alerts",
      match: [
        "/dashboard/alerts",
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/5 blur-[120px]" />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-24 flex flex-col items-center py-10 bg-slate-900/40 backdrop-blur-2xl border-r border-slate-800/50 z-50">
        
        {/* Logo
        <div className="mb-14">
          <Link href="/dashboard">
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer hover:scale-105 transition-all border border-blue-400/30">
              <span className="text-white font-black text-xs italic">F</span>
            </div>
          </Link>
        </div> */}

        {/* Menu */}
        <nav className="flex flex-col gap-6 w-full px-2">
          {menus.map((menu) => (
            <NavItem
              key={menu.href}
              href={menu.href}
              icon={menu.icon}
              label={menu.label}
              active={isActive(menu.match, menu.exact)} 
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto pb-4 w-full px-2">
          <NavItem href="/" icon="logout" label="Exit" active={false} isLogout />
        </div>

      </aside>

      {/* Content */}
      <div className="ml-24">
        {children}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-6 right-10 text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] italic opacity-50">
        © 2026 ZEWELL SOLUTION SYSTEMS
      </footer>
    </div>
  );
}


// 🔥 NavItem Component
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
      <button
        className={`w-full flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-300 group relative
          ${active 
            ? 'bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] border border-blue-500/20' 
            : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/40'
          }
          ${isLogout ? 'hover:text-red-400 hover:bg-red-500/5' : ''}
        `}
      >
        {/* Icon */}
        <span className={`material-symbols-outlined text-[24px] mb-1.5 transition-transform duration-300 group-hover:scale-110 
          ${active ? 'fill-current' : ''}`}>
          {icon}
        </span>

        {/* Label */}
        <span className={`text-[9px] font-black uppercase tracking-[0.15em] italic
          ${active ? 'text-white' : 'text-slate-600 group-hover:text-slate-300'}`}>
          {label}
        </span>

        {/* Active Indicator */}
        {active && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full shadow-[2px_0_10px_rgba(255,255,255,0.5)]" />
        )}
      </button>
    </Link>
  );
}