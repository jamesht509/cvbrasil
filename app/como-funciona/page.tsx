"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";

export default function ComoFuncionaPage() {
  const router = useRouter();

  return (
    <main className="container-page min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-6">
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="mb-8"
        >
          <span className="material-symbols-outlined mr-2">arrow_back</span>
          Voltar
        </Button>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 md:p-12 shadow-sm border border-gray-200 dark:border-gray-800">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
            Como Funciona
          </h1>

          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Envie seu Currículo
              </h2>
              <p className="leading-relaxed">
                Faça upload do seu currículo em PDF. Nosso sistema extrai automaticamente todas as informações importantes, incluindo experiência profissional, educação, habilidades e certificações.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Conversão Inteligente
              </h2>
              <p className="leading-relaxed">
                Usando inteligência artificial avançada, convertemos seu currículo brasileiro para o formato americano (US Resume). Isso inclui:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                <li>Tradução para inglês corporativo formal</li>
                <li>Adaptação de termos técnicos ao mercado global</li>
                <li>Remoção de informações sensíveis (foto, idade, estado civil)</li>
                <li>Otimização para sistemas ATS (Applicant Tracking Systems)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Revise e Edite
              </h2>
              <p className="leading-relaxed">
                Após a conversão, você pode revisar e editar todas as informações antes de gerar o PDF final. Ajuste detalhes, corrija traduções e personalize conforme necessário.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Baixe seu Resume
              </h2>
              <p className="leading-relaxed">
                Escolha entre dois estilos de PDF:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                <li><strong>ATS (Recomendado):</strong> Formato ultra-seguro, otimizado para passar em sistemas de recrutamento automatizados</li>
                <li><strong>Premium:</strong> Visual mais polido, mantendo compatibilidade ATS com elementos visuais sutis</li>
              </ul>
            </section>

            <section className="bg-primary/5 dark:bg-primary/10 p-6 rounded-lg border border-primary/20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Por que usar o ResumeUSA?
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                  <span><strong>ATS-Friendly:</strong> Estrutura otimizada para sistemas de recrutamento automatizados</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                  <span><strong>Inglês Corporativo:</strong> Tradução profissional adaptada ao mercado americano</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                  <span><strong>Privacidade:</strong> Remoção automática de informações sensíveis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                  <span><strong>Rápido e Fácil:</strong> Processo completo em menos de 60 segundos</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={() => router.push("/")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Começar Agora
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
