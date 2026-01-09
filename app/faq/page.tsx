"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { useState } from "react";

export default function FAQPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "O que é um resume americano?",
      answer: "Um resume americano é um documento profissional usado nos Estados Unidos para candidaturas de emprego. Diferente do currículo brasileiro, ele é mais conciso (geralmente 1 página), focado em realizações e resultados, e não inclui informações pessoais como foto, idade ou estado civil."
    },
    {
      question: "Meu currículo será armazenado permanentemente?",
      answer: "Não. Seus dados são processados apenas em memória durante a conversão e não são armazenados permanentemente. Após gerar o PDF, os dados são descartados automaticamente."
    },
    {
      question: "O resume gerado é compatível com sistemas ATS?",
      answer: "Sim! Oferecemos dois estilos: ATS (ultra-seguro, recomendado) e Premium (visual mais polido, mas ainda ATS-friendly). Ambos são otimizados para passar em sistemas de recrutamento automatizados."
    },
    {
      question: "Posso editar o resume após a conversão?",
      answer: "Sim! Após a conversão, você pode revisar e editar todas as informações antes de baixar o PDF final. Ajuste detalhes, corrija traduções e personalize conforme necessário."
    },
    {
      question: "Quanto tempo leva para converter meu currículo?",
      answer: "O processo completo leva aproximadamente 20-60 segundos. Isso inclui a extração de dados, conversão para inglês e otimização para o formato americano."
    },
    {
      question: "Preciso fornecer informações do LinkedIn?",
      answer: "Não, é totalmente opcional. Você pode fornecer apenas o link do LinkedIn, o texto da seção 'About', ou nenhum dos dois. As informações do LinkedIn ajudam a melhorar a qualidade da conversão, mas não são obrigatórias."
    },
    {
      question: "O serviço é gratuito?",
      answer: "Sim, o ResumeUSA oferece conversão gratuita de currículos. Você pode converter seu currículo quantas vezes precisar sem custos adicionais."
    },
    {
      question: "Meus dados são compartilhados com terceiros?",
      answer: "Nunca. Seus dados são usados exclusivamente para converter seu currículo e nunca são vendidos ou compartilhados com terceiros. Levamos a privacidade muito a sério."
    }
  ];

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
            Perguntas Frequentes (FAQ)
          </h1>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <span className="material-symbols-outlined text-gray-400">
                    {openIndex === index ? "expand_less" : "expand_more"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Não encontrou sua resposta?
            </p>
            <Button
              onClick={() => router.push("/contato")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Entre em Contato
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
