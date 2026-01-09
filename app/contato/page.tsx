"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

export default function ContatoPage() {
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
            Entre em Contato
          </h1>

          <div className="space-y-8">
            <section className="text-gray-600 dark:text-gray-300">
              <p className="leading-relaxed mb-6">
                Tem alguma dúvida, sugestão ou precisa de ajuda? Estamos aqui para ajudar! Preencha o formulário abaixo ou entre em contato através dos canais disponíveis.
              </p>
            </section>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome
                </label>
                <Input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assunto
                </label>
                <Input
                  type="text"
                  placeholder="Sobre o que você gostaria de falar?"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensagem
                </label>
                <Textarea
                  placeholder="Sua mensagem..."
                  rows={6}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Enviar Mensagem
              </Button>
            </form>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Outras Formas de Contato
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">email</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Email</p>
                    <p>contato@resumeusa.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Horário de Atendimento</p>
                    <p>Segunda a Sexta, 9h às 18h (BRT)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
