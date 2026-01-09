"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/button";

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("code") || "ERR_CONV_924";
  const errorMessage = searchParams.get("message") || "Tivemos um problema técnico momentâneo. Suas informações não foram perdidas. Por favor, tente novamente em alguns instantes.";

  return (
    <main className="flex-grow flex items-center justify-center p-6 md:p-10">
      <div className="layout-content-container flex flex-col max-w-[640px] w-full bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-8 md:p-12">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Illustration/Icon */}
          <div className="relative w-48 h-48 flex items-center justify-center bg-primary/5 dark:bg-primary/10 rounded-full">
            <div className="absolute inset-0 bg-primary/10 animate-pulse rounded-full"></div>
            <span className="material-symbols-outlined text-primary text-7xl relative z-10">
              error_outline
            </span>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-3">
            <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
              Algo deu errado na conversão
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-md mx-auto">
              {errorMessage}
            </p>
          </div>

          {/* Action Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mt-4">
            <Button
              onClick={() => router.push("/")}
              className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/25"
            >
              <span className="material-symbols-outlined mr-2">refresh</span>
              <span className="truncate">Tentar novamente</span>
            </Button>
            <Button
              onClick={() => window.open("mailto:suporte@resumeusa.com", "_blank")}
              variant="outline"
              className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-transparent border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-base font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span className="material-symbols-outlined mr-2">support_agent</span>
              <span className="truncate">Falar com suporte</span>
            </Button>
          </div>

          {/* Helper Text */}
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-4">
            Código do erro: {errorCode}. Se o problema persistir, anote este código.
          </p>
        </div>
      </div>
    </main>
  );
}
