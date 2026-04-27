import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Bell, Search, User, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden select-none relative">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-64 h-full bg-white shadow-xl relative" onClick={e => e.stopPropagation()}>
             <Sidebar />
             <button className="absolute top-4 right-4 p-2" onClick={() => setMobileMenuOpen(false)}>
               <X className="w-5 h-5 text-slate-500" />
             </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-16 border-b border-slate-200 flex items-center px-4 md:px-6 justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <button className="md:hidden p-2 -ml-2" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <div className="hidden md:flex w-10 h-10 bg-indigo-600 rounded-lg items-center justify-center text-white font-bold text-xl">R</div>
            <div>
              <h1 className="text-base md:text-lg font-bold tracking-tight">仁爱版智能教学助手</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center w-64 relative">
              <Search className="absolute left-2 h-4 w-4 text-slate-400" />
              <Input placeholder="搜索教材、知识点..." className="pl-8 h-9 bg-slate-50 border-none rounded-full" />
            </div>
            <div className="hidden md:block h-6 w-px bg-slate-200"></div>
            <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-sm font-medium">李明</div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
