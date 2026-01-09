"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useResume } from "./providers";
import type { UsResume } from "../lib/schemas";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setResume } = useResume();

  function handleFileSelect(selectedFile: File | null) {
    setError(null);
    if (!selectedFile) {
      setFile(null);
      return;
    }
    
    console.log("Arquivo selecionado:", selectedFile.name, "Tipo:", selectedFile.type, "Tamanho:", selectedFile.size);
    
    // Validar tipo de arquivo - apenas PDF por enquanto (a API só aceita PDF)
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Por favor, envie um arquivo PDF. DOCX ainda não é suportado.");
      setFile(null);
      return;
    }
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      setError("O arquivo deve ter no máximo 10 MB.");
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  async function handleGenerate() {
    setError(null);
    if (!file) {
      setError("Envie um arquivo antes de continuar.");
      return;
    }

    console.log("Iniciando conversão do arquivo:", file.name, file.size, file.type);
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("Enviando arquivo para API...");
      const res = await fetch("/api/convert", {
        method: "POST",
        body: formData
      });

      console.log("Resposta da API:", res.status, res.statusText);
      const data = await res.json();
      console.log("Dados recebidos:", data);

      if (!res.ok) {
        setError(data?.error || "Ocorreu um erro ao converter o currículo.");
        setLoading(false);
        return;
      }

      if (!data.resume) {
        setError("Resposta inválida do servidor.");
        setLoading(false);
        return;
      }

      const resume: UsResume = data.resume;
      setResume(resume);
      router.push("/preview");
    } catch (err) {
      console.error("Erro ao converter:", err);
      setError("Ocorreu um erro ao conectar com o servidor. Verifique o console para mais detalhes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full">
            Padrão Americano (ATS-ready)
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-gray-900 dark:text-white mb-6">
            Transforme seu currículo brasileiro em um <span className="text-primary">resume americano</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12">
            Converta seu CV para o padrão exigido nos EUA de forma automática, profissional e otimizada para sistemas de recrutamento.
          </p>

          {/* Main Upload Card */}
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl p-8 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null;
                handleFileSelect(selectedFile);
              }}
            />
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragOver(false);
              }}
              onDrop={handleDrop}
              onClick={handleClick}
              className={`flex flex-col items-center gap-6 rounded-xl border-2 border-dashed px-6 py-12 bg-gray-50/50 dark:bg-gray-800/30 group cursor-pointer transition-colors ${
                dragOver ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-primary'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-4xl">
                  {file ? 'check_circle' : 'cloud_upload'}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {file ? file.name : 'Arraste seu arquivo aqui'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'ou clique para selecionar (PDF)'}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="mt-2 px-6 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                {file ? 'Escolher outro arquivo' : 'Selecionar arquivo'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={handleGenerate}
                disabled={!file || loading}
                className="w-full py-4 bg-primary text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="animate-spin material-symbols-outlined">refresh</span>
                    <span className="truncate">Convertendo...</span>
                  </>
                ) : (
                  <>
                    <span className="truncate">Gerar resume em PDF</span>
                    <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">auto_awesome</span>
                  </>
                )}
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 text-center flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm">lock</span>
              Seus dados estão seguros e não serão compartilhados.
            </p>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Trust Row / Features Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Por que usar o ResumeUSA?</h2>
            <p className="text-gray-500 dark:text-gray-400">Siga os padrões exigidos pelas empresas americanas e aumente suas chances.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col gap-6 p-8 rounded-xl border border-gray-100 dark:border-gray-800 bg-background-light dark:bg-gray-900 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">ATS-friendly</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Estrutura otimizada para passar nos sistemas de recrutamento automatizados usados pelas Big Techs.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col gap-6 p-8 rounded-xl border border-gray-100 dark:border-gray-800 bg-background-light dark:bg-gray-900 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">translate</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Inglês corporativo</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Tradução e adaptação por IA treinada no mercado americano. Seus termos técnicos adaptados ao mercado global.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col gap-6 p-8 rounded-xl border border-gray-100 dark:border-gray-800 bg-background-light dark:bg-gray-900 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">shield</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Privacidade total</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Remoção automática de foto, idade e estado civil, seguindo rigorosamente as leis anti-discriminação dos EUA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


