"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SettingsTabProps {
  label: string;
  icon: string;
  href: string; // เพิ่ม href เพื่อบอกว่าจะให้ Link ไปที่ไหน
}

function SettingsTab({ label, icon, href }: SettingsTabProps) {
  const pathname = usePathname();
  
  // เช็คว่า URL ปัจจุบันตรงกับ href ของปุ่มนี้หรือไม่ 
  // (รองรับทั้งแบบตรงเป๊ะ และแบบที่เป็นหน้าย่อยในหมวดนั้น)
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} className="block w-full group">
      <div className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 border ${
        isActive 
          ? 'bg-blue-600/10 border-blue-500/30 text-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
          : 'border-transparent text-slate-500 hover:text-slate-200 hover:bg-slate-800/40'
      }`}>
        {/* Icon */}
        <span className={`material-symbols-outlined transition-colors ${isActive ? 'text-blue-500' : 'group-hover:text-blue-400'}`}>
          {icon}
        </span>

        {/* Label */}
        <span className="text-[11px] font-black uppercase tracking-widest">
          {label}
        </span>
        
        {/* Blue Status Dot (ไฟสีฟ้าจะติดเมื่อ Active) */}
        {isActive && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,1)]"></div>
        )}
      </div>
    </Link>
  );
}

export default function SettingsPage() {
  // จำลองข้อมูลสมาชิกในทีม
  const [members, setMembers] = useState([
    { id: 1, name: "Sphx (Kittitach)", email: "sphx@zewell.io", role: "Administrator", status: "Active", lastLogin: "2 mins ago" },
    { id: 2, name: "Somchai K.", email: "somchai.k@factory.com", role: "Operator", status: "Active", lastLogin: "1 hour ago" },
    { id: 3, name: "Wichai S.", email: "wichai.s@factory.com", role: "Operator", status: "Inactive", lastLogin: "2 days ago" },
    { id: 4, name: "Anucha P.", email: "anucha.p@support.io", role: "Viewer", status: "Active", lastLogin: "5 hours ago" },
  ]);

  return (
    <div className="relative z-10 p-8 max-w-[1600px] mx-auto space-y-10">
      
      {/* Header & Add Member Button */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-800/50 pb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span className="w-8 h-[1px] bg-blue-600"></span>
            System Configuration
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            MEMBER <span className="text-blue-600">MANAGEMENT</span>
          </h1>
        </div>

        <button className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3.5 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 group">
          <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">add</span>
          Invite New Member
        </button>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Sidebar Settings Menu */}
        <aside className="xl:col-span-1 space-y-2">
          <SettingsTab label="Account Management" icon="shield_lock" href="/dashboard/settings" />
          <SettingsTab label="Member Access" icon="group" href="/dashboard/memberRoleSetting" />
          <SettingsTab label="Permissions" icon="key_vertical" href="/dashboard/roleSetting" />
          {/*}
          <SettingsTab label="Alert Notifications" icon="notifications_active" href="/"/>
          <SettingsTab label="Cloud Integration" icon="cloud" href="/"/>*/}

        </aside>

        {/* Member List Table */}
        <div className="xl:col-span-3 bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-10 px-2">
            <h3 className="text-lg font-black text-white italic tracking-widest uppercase flex items-center gap-3">
              <span className="w-2 h-6 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></span>
              Active Members
            </h3>
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search member..." 
                    className="bg-slate-800/40 border border-slate-700/50 rounded-xl px-10 py-2 text-xs text-slate-300 outline-none focus:border-blue-500 transition-all w-64"
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-sm">search</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-6 pb-2">Full Name / Email</th>
                  <th className="px-6 pb-2">Access Role</th>
                  <th className="px-6 pb-2">Last Active</th>
                  <th className="px-6 pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="bg-slate-800/20 hover:bg-slate-800/40 transition-colors group">
                    <td className="px-6 py-5 first:rounded-l-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 flex items-center justify-center text-blue-500 font-black italic">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-white tracking-tight italic">{member.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold lowercase">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                        member.role === 'Administrator' ? 'text-blue-500 border-blue-500/30 bg-blue-500/10' :
                        member.role === 'Operator' ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10' :
                        'text-slate-400 border-slate-500/30 bg-slate-500/10'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                        <span className="text-[11px] font-bold text-slate-400 italic">{member.lastLogin}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 last:rounded-r-2xl text-right">
                      <div className="flex gap-2 justify-end">
                        <button className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-slate-400 hover:text-white group">
                            <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-colors text-slate-400 hover:text-white">
                            <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Internal UI Components ---

// function SettingsTab({ label, icon, active }: { label: string, icon: string, active?: boolean }) {
//   return (
//     <button className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 border ${
//       active ? 'bg-blue-600/10 border-blue-500/30 text-blue-500 shadow-lg' : 'border-transparent text-slate-500 hover:text-slate-200 hover:bg-slate-800/40'
//     }`}>
//       <span className="material-symbols-outlined">{icon}</span>
//       <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
//       {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,1)]"></div>}
//     </button>
//   );
// }