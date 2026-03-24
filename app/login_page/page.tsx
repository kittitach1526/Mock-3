"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#020617] relative overflow-hidden text-slate-200">
      
      {/* 🌌 Background Dynamic Glows (ปรับให้สว่างขึ้นเพื่อให้สะท้อนกระจก) */}
      <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[140px]" />

      <div className="w-full max-w-md z-10">
        
        {/* BACK BUTTON */}
        <button
          onClick={() => router.push("/")}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 border border-white/10">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
        </button>

        {/* 🛡️ GLASS CARD (White Frost Theme) */}
        <div className="relative group">
          {/* ขอบเรืองแสงรอบการ์ด (Outer Glow) */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-10 overflow-hidden">
            
            {/* เส้นแสงสะท้อนบนกระจก (Glass Reflection Effect) */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

            {/* HEADER */}
            <div className="text-center mb-10 relative z-10">
              <div className="relative inline-block mb-6">
                 {/* วงแหวนรอบโลโก้ */}
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
                {/*}
                <img
                  src="/Logo-FOSTEC.png"
                  alt="FOSTEC Logo"
                  className="w-auto h-20 mx-auto relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                />*/}
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
                FOS<span className="text-blue-500">TEC</span>
              </h1>
              <p className="text-slate-400 mt-3 text-[10px] font-bold uppercase tracking-[0.2em]">
                IoT Infrastructure Access Port
              </p>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase py-3 px-4 rounded-xl mb-6 flex items-center gap-3 animate-shake">
                <span className="material-symbols-outlined text-sm">warning</span> {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                  Access Key (Username)
                </label>
                <div className="relative group/input">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. administrator"
                    className="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all shadow-inner hover:bg-white/[0.08]"
                    required
                  />
                  <span className="material-symbols-outlined absolute left-4 top-4 text-slate-500 text-sm group-focus-within/input:text-blue-400 transition-colors">person</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Security Token (Password)
                  </label>
                </div>
                <div className="relative group/input">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all shadow-inner hover:bg-white/[0.08]"
                    required
                  />
                  <span className="material-symbols-outlined absolute left-4 top-4 text-slate-500 text-sm group-focus-within/input:text-blue-400 transition-colors">lock</span>
                </div>
              </div>

              <button
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl text-white text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 mt-4 shadow-xl shadow-blue-600/20 overflow-hidden relative
                  ${isLoading ? "bg-blue-800 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 active:scale-[0.98] group/btn"}`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {/*<span>Execute Sign-In</span>*/}
                    <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">login</span>
                  </>
                )}
                {/* ปุ่มมีแสงวิ่งผ่าน (Shine Effect) */}
                <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000"></div>
              </button>
            </form>

            {/* REGISTER LINK */}
            <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                New to Hub?
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="ml-2 text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4"
                >
                  Register Node
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER INFO */}
        <p className="mt-8 text-center text-slate-600 text-[9px] font-black uppercase tracking-[0.4em] italic opacity-50">
          Secured by FOSTEC Intelligence © 2026
        </p>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
}