"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ResumePreview } from "../../components/ResumePreview";
import { ResumeEditor } from "../../components/ResumeEditor";
import { useResume } from "../providers";
import type { UsResume } from "../../lib/schemas";

export default function PreviewPage() {
  const { resume, setResume } = useResume();
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  if (!resume) {
    return (
      <main className="flex-grow flex items-center justify-center p-6 md:p-10">
        <div className="layout-content-container flex flex-col max-w-[640px] w-full bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-8 md:p-12">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="relative w-48 h-48 flex items-center justify-center bg-primary/5 dark:bg-primary/10 rounded-full">
              <div className="absolute inset-0 bg-primary/10 animate-pulse rounded-full"></div>
              <span className="material-symbols-outlined text-primary text-7xl relative z-10">
                description
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
                Nenhum resume encontrado
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                Por favor, faça o upload de um currículo primeiro para visualizar e editar seu resume.
              </p>
            </div>
            <Button
              onClick={() => router.push("/")}
              className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/25"
            >
              <span className="material-symbols-outlined mr-2">arrow_back</span>
              <span className="truncate">Voltar ao início</span>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resume })
      });

      if (!res.ok) {
        throw new Error("Erro ao gerar PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume-en.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      alert("Erro ao baixar o PDF. Tente novamente.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <main className="container-page">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Resume Convertido!
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Revise e edite seu resume antes de baixar
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="material-symbols-outlined mr-2 text-lg">arrow_back</span>
              Voltar
            </Button>
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {downloading ? (
                <>
                  <span className="material-symbols-outlined mr-2 animate-spin">refresh</span>
                  Gerando PDF...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined mr-2">download</span>
                  Baixar PDF
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview Card */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">visibility</span>
                <CardTitle className="text-lg">Visualização do Resume</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 max-h-[800px] overflow-y-auto">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-slate-200 dark:border-slate-800 shadow-inner">
                <ResumePreview resume={resume} />
              </div>
            </CardContent>
          </Card>

          {/* Editor Card */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">edit</span>
                <CardTitle className="text-lg">Editar Informações</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 max-h-[800px] overflow-y-auto">
              <ResumeEditor resume={resume} onResumeChange={setResume} />
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="border-slate-200 dark:border-slate-800 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">lightbulb</span>
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Dicas para um resume eficaz
                </h3>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• Use verbos de ação no início de cada bullet point</li>
                  <li>• Quantifique suas conquistas sempre que possível</li>
                  <li>• Mantenha o resume em uma página se você tem menos de 10 anos de experiência</li>
                  <li>• Revise cuidadosamente a tradução e adapte termos técnicos se necessário</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

