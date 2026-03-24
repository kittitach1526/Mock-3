"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// --- Types ---
interface Permission {
  id: string;
  label: string;
  enabled: boolean;
}

interface RoleGroup {
  category: string;
  permissions: Permission[];
}

export default function MemberAccessPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("Administrator");

  const [permissionGroups, setPermissionGroups] = useState<RoleGroup[]>([
    {
      category: "System Control",
      permissions: [
        { id: "sys_1", label: "Access Debug Console", enabled: true },
        { id: "sys_2", label: "Modify System Webhooks", enabled: true },
        { id: "sys_3", label: "Execute Server Reboots", enabled: false },
      ],
    },
    {
      category: "Data Management",
      permissions: [
        { id: "dat_1", label: "Export Raw Analytics", enabled: true },
        { id: "dat_2", label: "Delete Historical Logs", enabled: false },
        { id: "dat_3", label: "Database Migration", enabled: false },
      ],
    },
  ]);

  const roles = [
    { name: "Administrator", desc: "Full system access & security control", icon: "verified_user" },
    { name: "Operator", desc: "Standard operational & monitoring tools", icon: "settings_input_component" },
    { name: "Viewer", desc: "Read-only access to dashboards", icon: "visibility" },
  ];

  return (
    <div className="relative z-10 p-8 max-w-[1600px] mx-auto space-y-8">

      {/* 1. Header */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-800/50 pb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
            <span className="w-8 h-[1px] bg-blue-600"></span>
            Security Infrastructure
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            ROLE <span className="text-blue-600">PERMISSIONS</span>
          </h1>
        </div>

        <button className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 group">
          <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">save</span>
          Update Configuration
        </button>
      </header>

      {/* 🔥 2. Back Button (อยู่ใต้ Header) */}
      <div className="flex justify-between items-center pt-2">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-3 text-slate-500 hover:text-blue-500 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900/50 border border-slate-800/50 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-600/10 transition-all">
            <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none">
              Return to
            </span>
            <span className="text-[11px] font-black text-slate-300 uppercase italic tracking-tighter group-hover:text-blue-400 transition-colors">
              Previous Module
            </span>
          </div>
        </button>
      </div>

      {/* 3. Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <aside className="xl:col-span-1 space-y-3">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-2 mb-2">
            Select Active Protocol
          </p>

          {roles.map((role) => (
            <button
              key={role.name}
              onClick={() => setSelectedRole(role.name)}
              className={`w-full text-left p-5 rounded-[2rem] border transition-all duration-300 group relative overflow-hidden ${
                selectedRole === role.name 
                ? 'bg-blue-600 border-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.15)]' 
                : 'bg-slate-900/40 border-slate-800/50 hover:border-slate-600 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  selectedRole === role.name ? 'bg-white/20' : 'bg-slate-800 group-hover:bg-slate-700'
                }`}>
                  <span className={`material-symbols-outlined ${
                    selectedRole === role.name ? 'text-white' : 'text-slate-500'
                  }`}>
                    {role.icon}
                  </span>
                </div>

                <div>
                  <h4 className={`text-sm font-black uppercase italic tracking-tighter ${
                    selectedRole === role.name ? 'text-white' : 'text-slate-200'
                  }`}>
                    {role.name}
                  </h4>
                  <p className={`text-[9px] mt-1 uppercase font-bold tracking-wide ${
                    selectedRole === role.name ? 'text-blue-100' : 'text-slate-600'
                  }`}>
                    Access: {role.name === 'Administrator' ? 'Level 5' : 'Level 2'}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </aside>

        {/* Permissions */}
        <div className="xl:col-span-3 bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl">
          
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-lg font-black text-white italic uppercase tracking-widest">
              MATRIX: <span className="text-blue-500">{selectedRole}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {permissionGroups.map((group) => (
              <div key={group.category} className="space-y-6">
                <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                  {group.category}
                </h3>

                {group.permissions.map((perm) => (
                  <label
                    key={perm.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/20 border border-slate-800/50 hover:border-blue-500/50 transition-all cursor-pointer"
                  >
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      {perm.label}
                    </span>

                    <input
                      type="checkbox"
                      defaultChecked={perm.enabled}
                      className="accent-blue-600"
                    />
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}