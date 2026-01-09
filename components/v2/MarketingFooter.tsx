import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="bg-background-dark border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-primary p-1.5 rounded">
              <span className="material-symbols-outlined text-white text-sm">description</span>
            </div>
            <h3 className="text-lg font-bold tracking-tighter">ResumeUSA</h3>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            A primeira plataforma all-in-one para brasileiros focados em alta performance no mercado
            dos Estados Unidos.
          </p>
          <div className="flex gap-4">
            <div className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">language</span>
            </div>
            <div className="size-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">contact_support</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6">Produtos</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li>
              <Link href="/v2/resume/upload" className="hover:text-primary transition-colors">
                Resume Builder
              </Link>
            </li>
            <li>
              <Link href="/v2/linkedin-booster" className="hover:text-primary transition-colors">
                LinkedIn Optimizer
              </Link>
            </li>
            <li>
              <Link href="/v2/application-kit" className="hover:text-primary transition-colors">
                Application Booster
              </Link>
            </li>
            <li>
              <Link href="/v2/move-guide/wizard" className="hover:text-primary transition-colors">
                USA Move Guide
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Empresa</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li>
              <Link href="/v2" className="hover:text-primary transition-colors">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link href="/v2" className="hover:text-primary transition-colors">
                Blog de Carreira
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-primary transition-colors">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-primary transition-colors">
                Privacidade
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Privacidade & Dados</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-500 bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="material-symbols-outlined text-blue-400">verified_user</span>
              <span>GDPR & LGPD Compliant</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="material-symbols-outlined text-blue-400">database</span>
              <span>Criptografia de 256 bits</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-600">
          © 2024 ResumeUSA. Todos os direitos reservados. Não afiliado ao governo dos EUA.
        </p>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-green-500"></span>
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
            Sistemas Operantes
          </span>
        </div>
      </div>
    </footer>
  );
}
