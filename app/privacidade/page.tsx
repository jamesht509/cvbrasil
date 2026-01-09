"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";

export default function PrivacidadePage() {
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
            Política de Privacidade
          </h1>

          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Seus Dados Estão Seguros
              </h2>
              <p className="leading-relaxed">
                No ResumeUSA, levamos a privacidade muito a sério. Seus dados pessoais e profissionais são tratados com o máximo de cuidado e segurança.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                O que Coletamos
              </h2>
              <p className="leading-relaxed mb-4">
                Coletamos apenas as informações necessárias para converter seu currículo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Conteúdo do seu currículo em PDF</li>
                <li>Informações opcionais do LinkedIn (se fornecidas)</li>
                <li>Dados de uso básicos para melhorar o serviço</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Como Usamos seus Dados
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Processamento:</strong> Usamos seus dados exclusivamente para converter seu currículo</li>
                <li><strong>Armazenamento:</strong> Seus dados são processados em memória e não são armazenados permanentemente</li>
                <li><strong>Não Compartilhamos:</strong> Nunca vendemos ou compartilhamos seus dados com terceiros</li>
                <li><strong>Remoção Automática:</strong> Informações sensíveis (foto, idade, estado civil) são removidas automaticamente</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Segurança
              </h2>
              <p className="leading-relaxed">
                Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Seus Direitos
              </h2>
              <p className="leading-relaxed mb-4">
                Você tem o direito de:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acessar seus dados pessoais</li>
                <li>Solicitar a correção de dados incorretos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Opor-se ao processamento de seus dados</li>
              </ul>
            </section>

            <section className="bg-primary/5 dark:bg-primary/10 p-6 rounded-lg border border-primary/20">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Dúvidas?
              </h2>
              <p className="leading-relaxed">
                Se você tiver alguma dúvida sobre nossa política de privacidade ou como tratamos seus dados, entre em contato conosco.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={() => router.push("/")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
