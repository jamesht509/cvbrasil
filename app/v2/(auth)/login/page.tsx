"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { loginAction } from "../../login/actions";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/v2/dashboard";

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    formData.append("redirect", redirect);

    try {
      await loginAction(formData);
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
            <h1 className="text-white text-3xl font-bold mb-2">Bem-vindo de volta</h1>
            <p className="text-slate-400 text-sm">Sua carreira nos EUA começa com um login.</p>
          </div>
          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3 mb-8">
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full bg-[#232f48] hover:bg-[#2d3b5a] text-white font-semibold py-3 px-4 rounded-xl transition-all border border-white/5"
            >
              <span className="size-5 flex items-center justify-center">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
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
              </span>
              Entrar com Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full bg-[#232f48] hover:bg-[#2d3b5a] text-white font-semibold py-3 px-4 rounded-xl transition-all border border-white/5"
            >
              <span className="size-5 flex items-center justify-center">
                <svg className="size-5" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-2 .7-2.3 1.2v-1h-2.5V18.5h2.5v-4.4c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3v4.4h2.4M6.7 8.1C7.5 8.1 8 7.6 8 6.9c0-.7-.5-1.2-1.3-1.2s-1.3.5-1.3 1.2c0 .7.5 1.2 1.3 1.2m1.2 10.4V9.4H5.5v9.1h2.4z"></path>
                </svg>
              </span>
              Entrar com LinkedIn
            </button>
          </div>
          {/* Divider */}
          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-xs font-medium uppercase tracking-widest">
              ou entre com e-mail
            </span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>
          {/* Email/Password Form */}
          <form className="space-y-5" action={handleSubmit}>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5 ml-1" htmlFor="email">
                E-mail Profissional
              </label>
              <input
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-600"
                id="email"
                name="email"
                placeholder="seu@email.com.br"
                type="email"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="block text-slate-300 text-sm font-medium" htmlFor="password">
                  Senha
                </label>
                <Link
                  href="/v2/recover-password"
                  className="text-primary hover:text-blue-400 text-xs font-semibold transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <input
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-600"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Entrando..." : "Entrar na Plataforma"}
            </button>
          </form>
          <p className="text-center text-slate-400 text-sm mt-8">
            Não tem uma conta?{" "}
            <Link
              href="/v2/register"
              className="text-white font-semibold hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
            >
              Começar Agora
            </Link>
          </p>
        </div>
        {/* Footer Meta Links */}
        <div className="mt-8 flex justify-center gap-6 text-slate-500 text-xs font-medium">
          <Link href="/privacidade" className="hover:text-slate-300 transition-colors">
            Termos de Uso
          </Link>
          <Link href="/privacidade" className="hover:text-slate-300 transition-colors">
            Privacidade
          </Link>
          <Link href="/v2/faq" className="hover:text-slate-300 transition-colors">
            Suporte
          </Link>
        </div>
      </div>
      {/* Visual Footer Branding */}
      <footer className="py-6 px-10 border-t border-white/5 bg-background-dark flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 opacity-50">
          <div className="size-4 bg-white rounded-full"></div>
          <p className="text-white text-[10px] tracking-widest uppercase font-bold">
            Premium Brazilian Career Hub
          </p>
        </div>
        <p className="text-slate-500 text-xs">© 2024 ResumeUSA. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-[480px] z-10">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-400">Carregando...</p>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
