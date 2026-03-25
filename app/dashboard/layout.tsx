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

  // 🔥 helper function สำหรับเช็คสถานะเมนู
  const isActive = (paths: string[], exact?: boolean) => {
    if (exact) {
      return paths.some((p) => pathname === p);
    }
    return paths.some((p) => pathname.startsWith(p));
  };

  // 🔥 menu config
  const menus = [
    { href: "/dashboard", icon: "dashboard", label: "OVERVIEW", match: ["/dashboard"], exact: true },
    { href: "/dashboard/equipment", icon: "precision_manufacturing", label: "Equipment", match: ["/dashboard/equipment"] },
    { href: "/dashboard/availability", icon: "history", label: "Availability", match: ["/dashboard/availability"] },
    { href: "/dashboard/performance", icon: "speed", label: "Performance", match: ["/dashboard/performance"] },
    { href: "/dashboard/quality", icon: "fact_check", label: "Quality", match: ["/dashboard/quality"] },
    { href: "/dashboard/analytics", icon: "analytics", label: "Analytics", match: ["/dashboard/analytics"] },
    { href: "/dashboard/alerts", icon: "notification_important", label: "Alerts", match: ["/dashboard/alerts"] },
    // เพิ่มเมนูทดสอบเพื่อให้เห็นการ Scroll
    { href: "/dashboard/settings", icon: "settings", label: "Settings", match: ["/dashboard/settings"] },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      {/* ⚡ Sidebar: ปรับปรุงให้ Scroll ได้ */}
      <aside className="fixed left-0 top-0 bottom-0 w-24 flex flex-col bg-slate-900/40 backdrop-blur-2xl border-r border-slate-800/50 z-50">
        
        {/* ส่วนที่ 1: รายการเมนู (Scrollable) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-10 px-2 scrollbar-zewell">
          <nav className="flex flex-col gap-6 w-full">
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
        </div>

        {/* ส่วนที่ 2: ปุ่ม Exit (Fixed Bottom - ไม่เลื่อนตามเมนู) */}
        <div className="py-6 px-2 border-t border-slate-800/30 bg-slate-950/20">
          <NavItem href="/" icon="logout" label="Exit" active={false} isLogout />
        </div>

      </aside>

      {/* Content Area */}
      <main className="ml-24">
        {children}
      </main>

      {/* Footer Branding */}
      <footer className="fixed bottom-6 right-10 text-slate-800 text-[10px] font-black uppercase tracking-[0.5em] italic opacity-50 pointer-events-none select-none">
        © 2026 ZEWELL SOLUTION SYSTEMS
      </footer>

      {/* ⚡ Custom Scrollbar Style (ใส่ไว้ตรงนี้หรือ globals.css ก็ได้) */}
      <style jsx global>{`
        /* ความกว้างของแถบ Scroll */
        .scrollbar-zewell::-webkit-scrollbar {
          width: 3px;
        }
        /* พื้นหลังของแถบ Scroll */
        .scrollbar-zewell::-webkit-scrollbar-track {
          background: transparent;
        }
        /* ตัวเลื่อน (Thumb) */
        .scrollbar-zewell::-webkit-scrollbar-thumb {
          background: rgba(51, 65, 85, 0.4); /* slate-700/40 */
          border-radius: 10px;
        }
        /* เมื่อเอาเมาส์ไปวางบนตัวเลื่อน */
        .scrollbar-zewell::-webkit-scrollbar-thumb:hover {
          background: rgba(37, 99, 235, 0.6); /* blue-600/60 */
        }
      `}</style>
    </div>
  );
}

// 🔥 NavItem Component (ดึงออกมาไว้ด้านนอกเพื่อความเป็นระเบียบ)
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

        {/* Active Indicator Line */}
        {active && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full shadow-[2px_0_10px_rgba(255,255,255,0.5)]" />
        )}
      </button>
    </Link>
  );
}