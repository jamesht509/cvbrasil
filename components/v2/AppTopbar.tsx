"use client";

import { useAuth } from "@/app/v2/providers";

export function AppTopbar() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    // This will be handled by the form action
  };
  return (
    <header className="h-16 border-b border-slate-200 dark:border-border-dark bg-white/50 dark:bg-background-dark/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-text-muted cursor-pointer">menu</span>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">
            search
          </span>
          <input
            className="bg-slate-100 dark:bg-card-dark border-none rounded-lg pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-1 focus:ring-primary"
            placeholder="Buscar documentos..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-text-muted hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-slate-200 dark:border-border-dark pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">{user?.email || "Usuário"}</p>
            <form action="/v2/logout" method="post">
              <button
                type="submit"
                className="text-xs text-text-muted hover:text-primary transition-colors"
              >
                Sair
              </button>
            </form>
          </div>
          <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
            <span className="material-symbols-outlined text-primary text-xl">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
