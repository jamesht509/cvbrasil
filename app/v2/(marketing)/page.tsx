import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      {/* Abstract Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px] -z-10"></div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            Padrão Executivo Americano
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          Sua Carreira nos EUA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            Começa Aqui.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed mb-10">
          A plataforma definitiva para executivos brasileiros. Otimize seu currículo para ATS,
          localize seu LinkedIn e conquiste sua vaga no mercado americano com estratégia de alto
          nível.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/v2/precos"
            className="w-full sm:w-auto px-8 py-4 bg-primary rounded-xl text-lg font-bold hover:scale-105 transition-transform glow-effect"
          >
            Ver Planos e Módulos
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-lg font-bold hover:bg-white/10 transition-all">
            Falar com Consultor
          </button>
        </div>
        {/* Dashboard Mockup Placeholder */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="aspect-video glass-card rounded-2xl overflow-hidden shadow-2xl border-white/10">
            <div className="bg-white/5 h-8 w-full border-b border-white/10 flex items-center px-4 gap-2">
              <div className="size-2 rounded-full bg-red-500/50"></div>
              <div className="size-2 rounded-full bg-yellow-500/50"></div>
              <div className="size-2 rounded-full bg-green-500/50"></div>
            </div>
            <div className="p-8 flex gap-6 h-full">
              <div className="w-1/4 space-y-4">
                <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                <div className="h-4 w-full bg-white/5 rounded"></div>
                <div className="h-4 w-2/3 bg-white/5 rounded"></div>
              </div>
              <div className="flex-1 space-y-6">
                <div className="h-32 w-full bg-primary/20 rounded-xl border border-primary/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary scale-150">analytics</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-white/5 rounded-xl"></div>
                  <div className="h-24 bg-white/5 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trust Signals */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-y border-white/5">
        <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">
          Nossos clientes atuam em gigantes globais
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale contrast-125">
          <div className="h-8 w-24 bg-slate-500 rounded flex items-center justify-center font-bold text-background-dark">
            GOOGLE
          </div>
          <div className="h-8 w-24 bg-slate-500 rounded flex items-center justify-center font-bold text-background-dark">
            AMAZON
          </div>
          <div className="h-8 w-24 bg-slate-500 rounded flex items-center justify-center font-bold text-background-dark">
            META
          </div>
          <div className="h-8 w-24 bg-slate-500 rounded flex items-center justify-center font-bold text-background-dark">
            APPLE
          </div>
          <div className="h-8 w-24 bg-slate-500 rounded flex items-center justify-center font-bold text-background-dark">
            MICROSOFT
          </div>
        </div>
      </section>
      {/* Hub Modules Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O Ecossistema da sua Transição</h2>
          <p className="text-slate-400">
            Quatro pilares integrados para garantir sua aprovação nos Estados Unidos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Module 1 */}
          <Link
            href="/v2/resume/upload"
            className="glass-card p-8 rounded-2xl group hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="size-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: "32px" }}>
                description
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">Resume Builder</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Crie currículos no padrão americano. Templates otimizados para sistemas ATS de
              recrutamento.
            </p>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Formatação One-Page
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Keywords Específicas
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Power Verbs em Inglês
              </li>
            </ul>
          </Link>
          {/* Module 2 */}
          <Link
            href="/v2/application-kit"
            className="glass-card p-8 rounded-2xl group hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="size-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-blue-400" style={{ fontSize: "32px" }}>
                rocket_launch
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">Application Booster</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Estratégia avançada para aplicação em vagas. Aprenda a furar a fila do processo
              seletivo.
            </p>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Cold Outreach Scripts
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Networking Hacks
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Cover Letter Templates
              </li>
            </ul>
          </Link>
          {/* Module 3 */}
          <Link
            href="/v2/linkedin-booster"
            className="glass-card p-8 rounded-2xl group hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="size-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-cyan-400" style={{ fontSize: "32px" }}>
                share
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">LinkedIn Optimizer</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Localize seu perfil para recrutadores americanos. Apareça nas buscas corretas.
            </p>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Headline Estratégico
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Skills Endorsement
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Localização de Cidade
              </li>
            </ul>
          </Link>
          {/* Module 4 */}
          <Link
            href="/v2/move-guide/wizard"
            className="glass-card p-8 rounded-2xl group hover:border-primary/50 transition-all cursor-pointer"
          >
            <div className="size-14 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-indigo-400" style={{ fontSize: "32px" }}>
                flight_takeoff
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">USA Move Guide</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              O guia logístico completo. Do visto à moradia, sem cometer erros de principiante.
            </p>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Roadmap de Vistos
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Planejamento Financeiro
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>{" "}
                Escola e Moradia
              </li>
            </ul>
          </Link>
        </div>
      </section>
      {/* Como Funciona Section */}
      <section className="bg-white/5 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Como funciona a jornada?</h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="size-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold shrink-0">
                      1
                    </div>
                    <div className="w-px h-full bg-white/10 mt-2"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Diagnóstico de Perfil</h4>
                    <p className="text-slate-400 text-sm">
                      Avaliamos sua elegibilidade e pontos fortes para o mercado americano de acordo
                      com sua área de atuação.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="size-10 rounded-full border border-white/20 flex items-center justify-center text-sm font-bold shrink-0">
                      2
                    </div>
                    <div className="w-px h-full bg-white/10 mt-2"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Construção dos Ativos</h4>
                    <p className="text-slate-400 text-sm">
                      Nossa IA e consultores geram seu currículo, cover letter e perfil LinkedIn
                      focados em conversão.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="size-10 rounded-full border border-white/20 flex items-center justify-center text-sm font-bold shrink-0">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Ataque ao Mercado</h4>
                    <p className="text-slate-400 text-sm">
                      Iniciamos a fase de aplicações e networking direto com tomadores de decisão nos
                      EUA.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] -z-10"></div>
              <div className="glass-card rounded-2xl p-4 overflow-hidden shadow-2xl">
                <img
                  className="w-full h-[400px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Modern high-rise office buildings in New York financial district"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOsvqV6dqfMi4lUIYxLoeU9L_54_ar9wzY8EbfbFpvvEWHSvXgljncYDhWkkbNyPGI97SVuwU6N4fV5sipQq-ukN7Og43jglGr35bPWd8QIKJBvq1Jkb5G71WWMs4xWY3FbNXAKGtBDQARuNbYECKRx_sklejBMegJaMb4u713tvOIvkqXy4GmPJF3uYpUKAchr5rUprgyLQpyofU9JvpS8rdJmblaf_xMf9RCJh5FkFyR3UN7lRDimaNReKf3VPARs56FRDmE6nYK"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">Histórias de Sucesso</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl border-l-4 border-l-primary">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-full bg-slate-700 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Professional executive headshot for testimonial"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Bqq3qRO5TCoibou3-Rp6RjSMvyFAve30S24iVbwNHux_ksnLOR19GIe0n2miV1k3AeXKnOD2_TKb2x1vWwGWlGniitbCXyIcQbWed1gnrh8tGC_pruLFSuzyNQTpD8V512kk5mUgQ70gu_A3az8zWqI9GBIBhUKKmkbWKIraqrd0RnIQVbI6VF8PqFmir5_pxjprfqNReJ58xoR0y1RaRDy4xoS96NKu7-R2eyCjahvOgkkEDpYHrwO9EjRU_md8XRky5nNhwjX4"
                />
              </div>
              <div>
                <h5 className="font-bold">Ricardo S.</h5>
                <p className="text-xs text-slate-500 italic">VP of Engineering - Florida</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "O Resume Builder mudou completamente como eu via meu próprio valor. Em 3 semanas após
              otimizar o LinkedIn, recebi dois convites para entrevistas em Austin."
            </p>
          </div>
          <div className="glass-card p-8 rounded-2xl border-l-4 border-l-primary">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-full bg-slate-700 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Female professional portrait for testimonial"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1e1cT7LyvVSlh6aFfMvTLjbnIT53j0WSh-inhTrS6COd5tH7_OtFnNn-qsQNOxiMDHEsjZB7us0R0iHFs8byGiD9eruNC7iybS9OYXn9jVM4JCwrKhF0p6Aw2I3AzLcVShTUjruTqrQWEsbbJTpHUP_ka5_7pECIdjodEJUdgKcBasu4haCz7VOQ7X7PrwlEKs4J-Pydek0Fk5khKUAQ6lbQngMAOjROATfe8OnTU8gHNb2D5Gm0qYcj8xCTjGluDwWFOfwqIuGVh"
                />
              </div>
              <div>
                <h5 className="font-bold">Amanda M.</h5>
                <p className="text-xs text-slate-500 italic">Senior Marketing Manager - NY</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "A parte de logística do Move Guide foi essencial para mim e minha família. Sem as
              dicas de documentação, teríamos gastado o triplo do tempo."
            </p>
          </div>
          <div className="glass-card p-8 rounded-2xl border-l-4 border-l-primary">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-full bg-slate-700 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Male executive headshot for testimonial"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhWWJig4SXZtDRlnRNmqTeuU4D6VWXenC1mi2lF6wH-GL4r6jT1zfC8fbqJKN2n8S5bFoHtknLZDwkZ5FubkFeC_WLcHFQ8q69XJJ5gOazWcJtBH-X93eWqWiz-EatZnP-UCNRATEecYO3w7WJehsnMj2WNmtTjucBhSaggidP_wZRpVSn4ZAXj2F96wWIGfFAsWFKr2UznDU_8-t15oDsPFWUdZqvc5XiTGQ95tpVeSM9wbbrPyMcjMtqaNnvlP75CN03TPNmx4HW"
                />
              </div>
              <div>
                <h5 className="font-bold">Luís F.</h5>
                <p className="text-xs text-slate-500 italic">Product Lead - California</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "O Application Booster me deu a confiança necessária para abordar recrutadores
              diretamente. Consegui meu H1-B através de uma conexão estratégica."
            </p>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-primary to-indigo-900 rounded-[2rem] p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
          <h2 className="text-4xl font-bold mb-6 relative">Pronto para seu próximo capítulo?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg relative">
            Junte-se a mais de 2.000 profissionais que já iniciaram sua transição para o maior
            mercado do mundo.
          </p>
          <Link
            href="/v2/register"
            className="bg-white text-primary px-10 py-4 rounded-xl font-black text-lg hover:bg-slate-100 transition-colors relative shadow-2xl inline-block"
          >
            Começar minha Transição
          </Link>
        </div>
      </section>
    </>
  );
}
