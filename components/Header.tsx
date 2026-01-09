"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">description</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-[#0d121b] dark:text-white">ResumeUSA</h2>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <a className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">
            Como funciona
          </a>
          <a className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">
            Privacidade
          </a>
          <a className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-primary/20">
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
}
