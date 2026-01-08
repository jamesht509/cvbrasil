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
    <div className="space-y-4 text-sm">
      {/* Contact Info */}
      <div className="space-y-3">
        <h4 className="font-semibold text-xs uppercase">Informações de Contato</h4>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-muted-foreground">Nome Completo</label>
            <Input
              value={editedResume.contact.fullName}
              onChange={(e) =>
                updateField(["contact", "fullName"], e.target.value)
              }
              className="h-8"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Headline (opcional)</label>
            <Input
              value={editedResume.contact.headline || ""}
              onChange={(e) =>
                updateField(["contact", "headline"], e.target.value)
              }
              className="h-8"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Localização</label>
            <Input
              value={editedResume.contact.location}
              onChange={(e) =>
                updateField(["contact", "location"], e.target.value)
              }
              className="h-8"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Telefone</label>
            <Input
              value={editedResume.contact.phone || ""}
              onChange={(e) =>
                updateField(["contact", "phone"], e.target.value)
              }
              className="h-8"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Email</label>
            <Input
              value={editedResume.contact.email || ""}
              onChange={(e) =>
                updateField(["contact", "email"], e.target.value)
              }
              className="h-8"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <h4 className="font-semibold text-xs uppercase">
          Resumo Profissional (em inglês)
        </h4>
        <Textarea
          value={editedResume.summary}
          onChange={(e) => updateField(["summary"], e.target.value)}
          rows={4}
          className="text-xs"
        />
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <h4 className="font-semibold text-xs uppercase">Habilidades</h4>
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
          className="text-xs"
          placeholder="Separe por vírgulas"
        />
      </div>

      {/* Experience - Edit bullets for first experience only for simplicity */}
      {editedResume.experience && editedResume.experience.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-xs uppercase">Experiência Profissional</h4>
          {editedResume.experience.map((exp, idx) => (
            <div key={idx} className="space-y-2 p-3 border rounded">
              <div className="space-y-1">
                <Input
                  value={exp.title}
                  onChange={(e) => {
                    const newExp = [...editedResume.experience];
                    newExp[idx] = { ...newExp[idx], title: e.target.value };
                    updateField(["experience"], newExp);
                  }}
                  className="h-7 text-xs"
                  placeholder="Título"
                />
                <Input
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...editedResume.experience];
                    newExp[idx] = { ...newExp[idx], company: e.target.value };
                    updateField(["experience"], newExp);
                  }}
                  className="h-7 text-xs"
                  placeholder="Empresa"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Bullets (um por linha)</label>
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
                  rows={4}
                  className="text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

