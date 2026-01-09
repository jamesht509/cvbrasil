"use client";

import { useState } from "react";
import Link from "next/link";
import { resetPasswordAction } from "../recover-password/actions";

export default function RecoverPasswordPage() {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);

    try {
      await resetPasswordAction(formData);
      setSuccess(true);
    } catch (error) {
      setIsPending(false);
      // Error will be handled by Next.js error boundary
    }
  };

  return (
    <>
      {/* Abstract Background Shape */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
      <div className="w-full max-w-[480px] z-10">
        {/* Success State Toast */}
        {success && (
          <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-400 mb-8">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            <p className="text-sm font-medium">E-mail enviado! Verifique sua caixa de entrada.</p>
          </div>
        )}
        {/* Recovery Card */}
        <div className="bg-[#192233] border border-[#232f48] rounded-xl p-8 shadow-2xl">
          {/* Headline Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <span className="material-symbols-outlined text-3xl">lock_reset</span>
            </div>
            <h1 className="text-white text-3xl font-bold leading-tight mb-2">Recuperar Acesso</h1>
            <p className="text-slate-400 text-base font-normal">
              Insira seu e-mail cadastrado para receber um link de redefinição de senha.
            </p>
          </div>
          {/* Form Section */}
          {!success && (
            <form className="space-y-6" action={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">mail</span>
                  E-mail
                </label>
                <input
                  className="form-input flex w-full rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-[#324467] bg-[#101622] focus:border-primary h-14 placeholder:text-slate-500 p-4 text-base transition-all"
                  placeholder="exemplo@email.com"
                  required
                  type="email"
                  name="email"
                />
              </div>
              <div className="pt-2">
                <button
                  className="flex w-full cursor-pointer items-center justify-center rounded-xl h-14 px-6 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isPending}
                >
                  <span className="truncate">
                    {isPending ? "Enviando..." : "Enviar Link de Recuperação"}
                  </span>
                </button>
              </div>
            </form>
          )}
          {/* Footer Action */}
          <div className="mt-8 text-center">
            <Link
              href="/v2/login"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold transition-colors group"
            >
              <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
              Voltar para o Login
            </Link>
          </div>
        </div>
        {/* Additional Info/Help */}
        <p className="text-center text-slate-500 text-xs px-10 mt-8">
          Se você não receber o e-mail em alguns minutos, verifique sua pasta de spam ou tente
          novamente.
        </p>
      </div>
    </>
  );
}
