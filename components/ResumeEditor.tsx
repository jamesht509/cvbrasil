"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import type { UsResume } from "../lib/schemas";

interface ResumeEditorProps {
  resume: UsResume;
  onResumeChange: (resume: UsResume) => void;
}

export function ResumeEditor({ resume, onResumeChange }: ResumeEditorProps) {
  const [editedResume, setEditedResume] = useState<UsResume>(resume);

  useEffect(() => {
    setEditedResume(resume);
  }, [resume]);

  function updateField(path: string[], value: unknown) {
    const newResume = { ...editedResume };
    let current: any = newResume;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setEditedResume(newResume);
    onResumeChange(newResume);
  }

  return (
    <div className="space-y-6 text-sm">
      {/* Contact Info */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm uppercase text-primary border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">person</span>
          Informações de Contato
        </h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
              Nome Completo
            </label>
            <Input
              value={editedResume.contact.fullName}
              onChange={(e) =>
                updateField(["contact", "fullName"], e.target.value)
              }
              className="h-10 border-slate-300 dark:border-slate-700 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
              Headline (opcional)
            </label>
            <Input
              value={editedResume.contact.headline || ""}
              onChange={(e) =>
                updateField(["contact", "headline"], e.target.value)
              }
              className="h-10 border-slate-300 dark:border-slate-700 focus:border-primary"
              placeholder="Ex: Senior Software Engineer"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
              Localização
            </label>
            <Input
              value={editedResume.contact.location}
              onChange={(e) =>
                updateField(["contact", "location"], e.target.value)
              }
              className="h-10 border-slate-300 dark:border-slate-700 focus:border-primary"
              placeholder="Ex: New York, NY"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
              Telefone
            </label>
            <Input
              value={editedResume.contact.phone || ""}
              onChange={(e) =>
                updateField(["contact", "phone"], e.target.value)
              }
              className="h-10 border-slate-300 dark:border-slate-700 focus:border-primary"
              placeholder="Ex: +1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
              Email
            </label>
            <Input
              value={editedResume.contact.email || ""}
              onChange={(e) =>
                updateField(["contact", "email"], e.target.value)
              }
              className="h-10 border-slate-300 dark:border-slate-700 focus:border-primary"
              placeholder="Ex: email@example.com"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm uppercase text-primary border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">description</span>
          Resumo Profissional
        </h4>
        <Textarea
          value={editedResume.summary}
          onChange={(e) => updateField(["summary"], e.target.value)}
          rows={5}
          className="text-sm border-slate-300 dark:border-slate-700 focus:border-primary"
          placeholder="Descreva sua experiência e objetivos profissionais em inglês..."
        />
      </div>

      {/* Skills */}
      <div className="space-y-3">
        <h4 className="font-bold text-sm uppercase text-primary border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">psychology</span>
          Habilidades
        </h4>
        <Textarea
          value={editedResume.skills.join(", ")}
          onChange={(e) => {
            const skills = e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s.length > 0);
            updateField(["skills"], skills);
          }}
          rows={3}
          className="text-sm border-slate-300 dark:border-slate-700 focus:border-primary"
          placeholder="Ex: JavaScript, React, Node.js, Python (separe por vírgulas)"
        />
      </div>

      {/* Experience - Edit bullets for first experience only for simplicity */}
      {editedResume.experience && editedResume.experience.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-bold text-sm uppercase text-primary border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">work</span>
            Experiência Profissional
          </h4>
          {editedResume.experience.map((exp, idx) => (
            <div key={idx} className="space-y-3 p-4 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Experiência {idx + 1}
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
                    Cargo
                  </label>
                  <Input
                    value={exp.title}
                    onChange={(e) => {
                      const newExp = [...editedResume.experience];
                      newExp[idx] = { ...newExp[idx], title: e.target.value };
                      updateField(["experience"], newExp);
                    }}
                    className="h-9 text-sm border-slate-300 dark:border-slate-700"
                    placeholder="Ex: Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
                    Empresa
                  </label>
                  <Input
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...editedResume.experience];
                      newExp[idx] = { ...newExp[idx], company: e.target.value };
                      updateField(["experience"], newExp);
                    }}
                    className="h-9 text-sm border-slate-300 dark:border-slate-700"
                    placeholder="Ex: Google Inc."
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 block">
                  Conquistas e Responsabilidades (uma por linha)
                </label>
                <Textarea
                  value={exp.bullets.join("\n")}
                  onChange={(e) => {
                    const bullets = e.target.value
                      .split("\n")
                      .map((b) => b.trim())
                      .filter((b) => b.length > 0);
                    const newExp = [...editedResume.experience];
                    newExp[idx] = { ...newExp[idx], bullets };
                    updateField(["experience"], newExp);
                  }}
                  rows={5}
                  className="text-sm border-slate-300 dark:border-slate-700"
                  placeholder="Ex: Led team of 5 developers&#10;Increased performance by 40%&#10;Implemented new features"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

