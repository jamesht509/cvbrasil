"use client";

import { useState } from "react";
import Link from "next/link";
import { signupAction } from "../register/actions";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);

    try {
      await signupAction(formData);
    } catch (error) {
      setIsPending(false);
      // Error will be handled by Next.js error boundary or can be caught in form
    }
  };

  return (
    <>
      {/* Abstract Background Shape */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
      <div className="w-full max-w-[480px] z-10">
        {/* Auth Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl">
          {/* Headline Section */}
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">Criar Conta</h1>
            <p className="text-slate-400 text-sm">
              Comece sua jornada para o mercado americano.
            </p>
          </div>
          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all rounded-lg h-12 text-sm font-semibold border border-transparent dark:border-white/10"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all rounded-lg h-12 text-sm font-semibold border border-transparent dark:border-white/10"
            >
              <svg className="w-5 h-5 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
              LinkedIn
            </button>
          </div>
          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
            <span className="flex-shrink mx-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
              Ou com e-mail
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
          </div>
          {/* Registration Form Fields */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}
          <form className="space-y-5" action={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                Nome Completo
              </label>
              <input
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-500"
                placeholder="Ex: João Silva"
                type="text"
                name="name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                E-mail Corporativo ou Pessoal
              </label>
              <input
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-500"
                placeholder="nome@exemplo.com"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                Senha
              </label>
              <div className="relative">
                <input
                  className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-500"
                  placeholder="Mínimo 8 caracteres"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {/* Strength Indicator */}
              <div className="pt-2 px-1">
                <div className="flex gap-1 h-1 w-full">
                  <div className="h-full w-1/3 bg-primary rounded-full"></div>
                  <div className="h-full w-1/3 bg-primary rounded-full"></div>
                  <div className="h-full w-1/3 bg-white/10 rounded-full"></div>
                </div>
                <p className="text-[10px] mt-1 text-primary font-bold uppercase tracking-wide">
                  Força: Média
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-2">
              <input
                className="mt-1 size-4 rounded border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 text-primary focus:ring-primary"
                id="terms"
                type="checkbox"
                required
              />
              <label className="text-xs text-slate-500 leading-snug" htmlFor="terms">
                Eu concordo com os{" "}
                <Link href="/privacidade" className="text-primary underline">
                  Termos de Serviço
                </Link>{" "}
                e com a{" "}
                <Link href="/privacidade" className="text-primary underline">
                  Política de Privacidade
                </Link>
                .
              </label>
            </div>
            <button
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg h-12 font-bold text-base shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Criando conta..." : "Criar Minha Conta"}
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>
          <p className="text-center mt-8 text-sm text-slate-500">
            Já tem uma conta?{" "}
            <Link href="/v2/login" className="text-primary font-bold hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
