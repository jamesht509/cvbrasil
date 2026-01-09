"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-border-dark flex flex-col bg-white dark:bg-background-dark h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
          <span className="material-symbols-outlined">flight_takeoff</span>
        </div>
        <div>
          <h1 className="text-lg font-bold leading-none">ResumeUSA</h1>
          <p className="text-xs text-text-muted">Premium SaaS</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        <Link
          href="/v2/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive("/v2/dashboard")
              ? "bg-primary/10 text-primary font-medium"
              : "text-slate-600 dark:text-text-muted hover:bg-slate-100 dark:hover:bg-card-dark"
          }`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link
          href="/v2/resume/upload"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive("/v2/resume/upload")
              ? "bg-primary/10 text-primary font-medium"
              : "text-slate-600 dark:text-text-muted hover:bg-slate-100 dark:hover:bg-card-dark"
          }`}
        >
          <span className="material-symbols-outlined">description</span>
          <span className="text-sm">Resume Builder</span>
        </Link>
        <Link
          href="/v2/move-guide/wizard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive("/v2/move-guide/wizard")
              ? "bg-primary/10 text-primary font-medium"
              : "text-slate-600 dark:text-text-muted hover:bg-slate-100 dark:hover:bg-card-dark"
          }`}
        >
          <span className="material-symbols-outlined">map</span>
          <span className="text-sm">Guia de Mudança</span>
        </Link>
        <Link
          href="/v2/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive("/v2/dashboard")
              ? "bg-primary/10 text-primary font-medium"
              : "text-slate-600 dark:text-text-muted hover:bg-slate-100 dark:hover:bg-card-dark"
          }`}
        >
          <span className="material-symbols-outlined">folder_shared</span>
          <span className="text-sm">Documentos</span>
        </Link>
        <Link
          href="/v2/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive("/v2/dashboard")
              ? "bg-primary/10 text-primary font-medium"
              : "text-slate-600 dark:text-text-muted hover:bg-slate-100 dark:hover:bg-card-dark"
          }`}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm">Configurações</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-border-dark space-y-4">
        <button className="w-full bg-primary hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">support_agent</span>
          Falar com Consultor
        </button>
        <div className="flex items-center gap-3 px-3 py-2">
          <span className="material-symbols-outlined text-yellow-500">workspace_premium</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-yellow-500">
              Plano Executive
            </p>
            <p className="text-[10px] text-text-muted">Assinatura Ativa</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
