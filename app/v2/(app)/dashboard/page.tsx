"use client";

import Link from "next/link";
import { useAuth } from "@/app/v2/providers";
import { useEffect, useState } from "react";
import { getDashboardStats, type DashboardStats } from "./actions";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    resumes: 0,
    moveGuides: 0,
    linkedinBoosts: 0,
    applicationKits: 0,
    completedResumes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;

      try {
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);
  return (
    <div className="p-8 space-y-8 overflow-y-auto">
      {/* Welcome Heading */}
      <section className="flex flex-wrap justify-between items-end gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Bem-vindo{user?.email ? `, ${user.email.split("@")[0]}` : ""}
          </h2>
          <p className="text-text-muted text-base">
            Sua jornada para os Estados Unidos começa aqui. Confira seu progresso.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-lg text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-lg">person</span>
            Ver Perfil
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            Novo Projeto
          </button>
        </div>
      </section>
      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl p-6 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <p className="text-text-muted text-sm font-medium">Currículos Criados</p>
            <span className="bg-green-500/10 text-green-500 text-xs px-2 py-0.5 rounded font-bold">
              {stats.completedResumes} concluídos
            </span>
          </div>
          <p className="text-3xl font-bold">{stats.resumes}</p>
          <p className="text-xs text-text-muted">Total de currículos</p>
        </div>
        <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl p-6 flex flex-col gap-2">
          <p className="text-text-muted text-sm font-medium">Guias de Mudança</p>
          <p className="text-3xl font-bold">{stats.moveGuides}</p>
          <p className="text-xs text-text-muted">Planos de migração criados</p>
        </div>
        <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl p-6 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <p className="text-text-muted text-sm font-medium">Aplicações Preparadas</p>
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded font-bold">
              {stats.applicationKits} kits
            </span>
          </div>
          <p className="text-3xl font-bold">{stats.linkedinBoosts + stats.applicationKits}</p>
          <p className="text-xs text-text-muted">LinkedIn + Application Kits</p>
        </div>
      </section>
      {/* Quick Actions Grid */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight">Ações Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/v2/resume/upload"
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl gap-3 hover:border-primary/50 transition-all group"
          >
            <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">post_add</span>
            </div>
            <span className="text-sm font-bold">Novo Currículo</span>
          </Link>
          <Link
            href="/v2/move-guide/wizard"
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl gap-3 hover:border-primary/50 transition-all group"
          >
            <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">explore</span>
            </div>
            <span className="text-sm font-bold">Guia de Mudança</span>
          </Link>
          <button className="flex flex-col items-center justify-center p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl gap-3 hover:border-primary/50 transition-all group">
            <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">translate</span>
            </div>
            <span className="text-sm font-bold">Traduzir Doc</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl gap-3 hover:border-primary/50 transition-all group">
            <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <span className="text-sm font-bold">Guia Financeiro</span>
          </button>
        </div>
      </section>
      {/* Recent Items Table */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-xl font-bold tracking-tight">Atividade Recente</h3>
          <Link href="/v2/dashboard" className="text-primary text-sm font-semibold hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="overflow-hidden bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted">
                  Documento / Relatório
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted">
                  Tipo
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted">
                  Modificado
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-border-dark">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">description</span>
                    <span className="text-sm font-medium">Resume_Senior_Engineer_ATS.pdf</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">Currículo</td>
                <td className="px-6 py-4 text-sm text-text-muted">Há 2 horas</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-tight">
                    Otimizado
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="material-symbols-outlined text-text-muted hover:text-white">
                    more_vert
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                    <span className="text-sm font-medium">Relatório_Custo_Vida_Miami.xlsx</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">Relatório</td>
                <td className="px-6 py-4 text-sm text-text-muted">Ontem</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-tight">
                    Em Revisão
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="material-symbols-outlined text-text-muted hover:text-white">
                    more_vert
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">article</span>
                    <span className="text-sm font-medium">Cover_Letter_Viseu_Corp.docx</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">Carta</td>
                <td className="px-6 py-4 text-sm text-text-muted">3 dias atrás</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded bg-slate-500/10 text-slate-500 text-[10px] font-bold uppercase tracking-tight">
                    Rascunho
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="material-symbols-outlined text-text-muted hover:text-white">
                    more_vert
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
