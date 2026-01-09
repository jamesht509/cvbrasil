export function Footer() {
  return (
    <footer className="py-12 px-6 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-sm">description</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">ResumeUSA</span>
        </div>

        <div className="flex items-center gap-8">
          <a className="text-xs font-semibold text-gray-500 hover:text-primary transition-colors uppercase tracking-widest" href="/privacidade">
            Termos
          </a>
          <a className="text-xs font-semibold text-gray-500 hover:text-primary transition-colors uppercase tracking-widest" href="/privacidade">
            Privacidade
          </a>
          <a className="text-xs font-semibold text-gray-500 hover:text-primary transition-colors uppercase tracking-widest" href="/faq">
            FAQ
          </a>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600 max-w-xs text-center md:text-right">
          © 2024 ResumeUSA. Ajudando profissionais brasileiros a conquistarem carreiras globais. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
