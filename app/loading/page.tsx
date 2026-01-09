"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useResume } from "../providers";
import type { UsResume } from "../../lib/schemas";

export default function LoadingPage() {
  const router = useRouter();
  const { setResume } = useResume();
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<
    Array<{
      id: number;
      title: string;
      status: "pending" | "active" | "completed";
      description: string;
    }>
  >([
    { id: 0, title: "Lendo PDF", status: "pending", description: "Aguardando" },
    { id: 1, title: "Estruturando informações", status: "pending", description: "Aguardando" },
    { id: 2, title: "Convertendo para o padrão EUA", status: "pending", description: "Aguardando" },
    { id: 3, title: "Gerando layout", status: "pending", description: "Aguardando" }
  ]);

  useEffect(() => {
    // Verificar se há arquivo pendente
    const pendingFile = sessionStorage.getItem("pendingFile");
    const fileName = sessionStorage.getItem("pendingFileName");
    
    if (!pendingFile || !fileName) {
      // Se não há arquivo, redirecionar para home
      router.push("/");
      return;
    }

    // Obter dados do LinkedIn se disponíveis
    const linkedinUrl = sessionStorage.getItem("linkedinUrl") || undefined;
    const linkedinAboutText = sessionStorage.getItem("linkedinAboutText") || undefined;
    const linkedinPdf = sessionStorage.getItem("linkedinPdf") || undefined;
    const linkedinPdfName = sessionStorage.getItem("linkedinPdfName") || undefined;

    // Iniciar barra de progresso falsa (animação suave)
    let fakeProgress = 0;
    const targetProgress = 95; // Vai até 95%, os últimos 5% quando realmente terminar
    const duration = 45000; // 45 segundos para chegar a 95%
    const interval = 100; // Atualizar a cada 100ms
    const increment = (targetProgress / duration) * interval;

    const fakeProgressInterval = setInterval(() => {
      fakeProgress += increment;
      if (fakeProgress < targetProgress) {
        setProgress((prev) => Math.max(prev, Math.min(fakeProgress, targetProgress)));
      } else {
        clearInterval(fakeProgressInterval);
      }
    }, interval);

    // Iniciar conversão
    startConversion(pendingFile, fileName, linkedinUrl, linkedinAboutText, linkedinPdf, linkedinPdfName);

    // Limpar intervalo quando componente desmontar
    return () => clearInterval(fakeProgressInterval);
  }, []);

  async function startConversion(
    base64String: string,
    fileName: string,
    linkedinUrl?: string,
    linkedinAboutText?: string,
    linkedinPdfBase64?: string,
    linkedinPdfName?: string
  ) {
    try {
      // Step 1: Lendo PDF
      updateStep(0, "active", "Processando...");
      
      // Aguardar um pouco para mostrar o step ativo
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Converter base64 para File
      const response = await fetch(base64String);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });

      // Step 1: Completo
      updateStep(0, "completed", "Concluído");

      // Step 2: Estruturando informações
      updateStep(1, "active", "Processando...");
      await new Promise(resolve => setTimeout(resolve, 1000));

      const formData = new FormData();
      formData.append("file", file);

      // Adicionar dados do LinkedIn se disponíveis
      if (linkedinUrl) {
        formData.append("linkedinUrl", linkedinUrl);
      }
      if (linkedinAboutText) {
        formData.append("linkedinAboutText", linkedinAboutText);
      }
      if (linkedinPdfBase64 && linkedinPdfName) {
        const linkedinResponse = await fetch(linkedinPdfBase64);
        const linkedinBlob = await linkedinResponse.blob();
        const linkedinFile = new File([linkedinBlob], linkedinPdfName, { type: linkedinBlob.type });
        formData.append("linkedinPdf", linkedinFile);
      }

      // Step 2: Completo
      updateStep(1, "completed", "Concluído");

      // Step 3: Convertendo para padrão EUA
      updateStep(2, "active", "Processando...");

      const res = await fetch("/api/convert", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        // Limpar sessionStorage
        sessionStorage.removeItem("pendingFile");
        sessionStorage.removeItem("pendingFileName");
        sessionStorage.removeItem("pendingFileType");
        sessionStorage.removeItem("linkedinUrl");
        sessionStorage.removeItem("linkedinAboutText");
        sessionStorage.removeItem("linkedinPdf");
        sessionStorage.removeItem("linkedinPdfName");
        
        router.push(
          `/error?code=ERR_CONV_${Date.now()}&message=${encodeURIComponent(
            data?.error || "Ocorreu um erro ao converter o currículo."
          )}`
        );
        return;
      }

      if (!data.resume) {
        sessionStorage.removeItem("pendingFile");
        sessionStorage.removeItem("pendingFileName");
        sessionStorage.removeItem("pendingFileType");
        sessionStorage.removeItem("linkedinUrl");
        sessionStorage.removeItem("linkedinAboutText");
        sessionStorage.removeItem("linkedinPdf");
        sessionStorage.removeItem("linkedinPdfName");
        
        router.push(
          `/error?code=ERR_INVALID&message=${encodeURIComponent("Resposta inválida do servidor.")}`
        );
        return;
      }

      // Step 3: Completo
      updateStep(2, "completed", "Concluído");

      // Step 4: Gerando layout
      updateStep(3, "active", "Processando...");
      await new Promise(resolve => setTimeout(resolve, 500));

      const resume: UsResume = data.resume;
      setResume(resume);

      // Step 4: Completo
      updateStep(3, "completed", "Concluído");
      
      // Completar progresso até 100% (os últimos 5%)
      setProgress(100);

      // Limpar sessionStorage
      sessionStorage.removeItem("pendingFile");
      sessionStorage.removeItem("pendingFileName");
      sessionStorage.removeItem("pendingFileType");

      // Aguardar um pouco para mostrar o progresso completo
      setTimeout(() => {
        router.push("/preview");
      }, 800);
    } catch (err) {
      console.error("Erro ao converter:", err);
      sessionStorage.removeItem("pendingFile");
      sessionStorage.removeItem("pendingFileName");
      sessionStorage.removeItem("pendingFileType");
      
      router.push(
        `/error?code=ERR_NETWORK&message=${encodeURIComponent(
          "Ocorreu um erro ao conectar com o servidor. Tente novamente."
        )}`
      );
    }
  }

  function updateStep(stepId: number, status: "pending" | "active" | "completed", description: string) {
    setSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === stepId ? { ...step, status, description } : step
      )
    );
  }

  function handleCancel() {
    if (confirm("Tem certeza que deseja cancelar a conversão?")) {
      // Limpar sessionStorage
      sessionStorage.removeItem("pendingFile");
      sessionStorage.removeItem("pendingFileName");
      sessionStorage.removeItem("pendingFileType");
      router.push("/");
    }
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
      <div className="layout-container flex h-full grow flex-col">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7ebf3] dark:border-[#2d3748] px-4 md:px-10 py-3 bg-white dark:bg-background-dark/50">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              ResumeUSA
            </h2>
          </div>
        </header>

        {/* Main Content Container */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="layout-content-container flex flex-col max-w-[520px] w-full bg-white dark:bg-[#1a2130] rounded-xl shadow-sm border border-[#e7ebf3] dark:border-[#2d3748] overflow-hidden">
            {/* Headline Section */}
            <div className="pt-8 pb-4">
              <h1 className="text-[#0d121b] dark:text-white tracking-tight text-[24px] md:text-[28px] font-bold leading-tight px-6 text-center">
                Estamos transformando seu currículo...
              </h1>
            </div>

            {/* Progress Bar Component */}
            <div className="flex flex-col gap-3 px-8 py-4">
              <div className="flex gap-6 justify-between items-center">
                <p className="text-[#0d121b] dark:text-white text-sm font-medium leading-normal">
                  Progresso da conversão
                </p>
                <p className="text-primary text-sm font-bold leading-normal">{Math.min(progress, 100).toFixed(0)}%</p>
              </div>
              <div className="rounded-full bg-[#cfd7e7] dark:bg-[#2d3748] h-2 w-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <p className="text-[#4c669a] dark:text-[#94a3b8] text-xs font-normal leading-normal text-center mt-1">
                Isso leva ~20–60 segundos. Por favor, não feche esta aba.
              </p>
            </div>

            {/* Vertical Stepper / Timeline */}
            <div className="px-8 py-6">
              <div className="grid grid-cols-[40px_1fr] gap-x-2">
                {steps.map((step, index) => {
                  const isCompleted = step.status === "completed";
                  const isActive = step.status === "active";
                  const isPending = step.status === "pending";
                  const isLast = index === steps.length - 1;

                  return (
                    <div key={step.id} className="contents">
                      {/* Icon */}
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <div
                          className={`flex items-center justify-center ${
                            isCompleted || isActive
                              ? "text-primary"
                              : "text-[#94a3b8] dark:text-[#4a5568]"
                          }`}
                        >
                          {isCompleted ? (
                            <span className="material-symbols-outlined text-[24px]">check_circle</span>
                          ) : isActive ? (
                            <span className="material-symbols-outlined text-[24px] animate-spin">
                              sync
                            </span>
                          ) : (
                            <span className="material-symbols-outlined text-[24px]">circle</span>
                          )}
                        </div>
                        {!isLast && (
                          <div
                            className={`w-[2px] h-8 ${
                              isCompleted
                                ? "bg-primary"
                                : "bg-[#cfd7e7] dark:bg-[#2d3748]"
                            }`}
                          ></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col pb-6">
                        <p
                          className={`text-base leading-none mb-1 ${
                            isPending
                              ? "text-[#94a3b8] dark:text-[#4a5568] font-medium"
                              : "text-[#0d121b] dark:text-white font-semibold"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p
                          className={`text-sm leading-normal ${
                            isPending
                              ? "text-[#94a3b8] dark:text-[#4a5568] font-normal"
                              : isActive
                              ? "text-primary font-bold"
                              : "text-primary font-normal"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cancel Button */}
            <div className="flex px-8 py-6 justify-center border-t border-[#e7ebf3] dark:border-[#2d3748] bg-[#fcfcfd] dark:bg-background-dark/20">
              <button
                onClick={handleCancel}
                className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent hover:bg-[#f1f3f7] dark:hover:bg-[#2d3748] text-[#4c669a] dark:text-[#94a3b8] text-sm font-bold leading-normal transition-colors"
              >
                <span className="truncate">Cancelar Processo</span>
              </button>
            </div>
          </div>

          {/* Bottom trust elements */}
          <div className="mt-8 flex items-center gap-6 text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span className="text-xs">Dados criptografados</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="text-xs">Padrão ATS Profissional</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
