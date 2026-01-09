"use client";

"use client";

import Link from "next/link";
import { useAuth } from "@/app/v2/providers";

export function MarketingHeader() {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/v2" className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <span className="material-symbols-outlined text-white" style={{ fontSize: "24px" }}>
              description
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tighter">
            Resume<span className="text-primary">USA</span>
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/v2" className="text-sm font-medium hover:text-primary transition-colors">
            Ferramentas
          </Link>
          <Link href="/v2/como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
            Como Funciona
          </Link>
          <Link href="/v2" className="text-sm font-medium hover:text-primary transition-colors">
            Sucesso
          </Link>
          <Link href="/v2/precos" className="text-sm font-medium hover:text-primary transition-colors">
            Preços
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/v2/login"
            className="text-sm font-semibold hover:text-primary transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/v2/register"
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20"
          >
            Começar Agora
          </Link>
        </div>
      </div>
    </header>
  );
}
