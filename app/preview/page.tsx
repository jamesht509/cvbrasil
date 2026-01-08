"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ResumePreview } from "../../components/ResumePreview";
import { ResumeEditor } from "../../components/ResumeEditor";
import { useResume } from "../providers";
import type { UsResume } from "../../lib/schemas";

export default function PreviewPage() {
  const { resume, setResume } = useResume();
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  if (!resume) {
    return (
      <main className="container-page">
        <Card>
          <CardContent className="py-10 text-center space-y-4">
            <p className="text-muted-foreground">
              Nenhum resume encontrado. Por favor, faça o upload de um currículo primeiro.
            </p>
            <Button onClick={() => router.push("/")}>Voltar</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resume })
      });

      if (!res.ok) {
        throw new Error("Erro ao gerar PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resume-en.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      alert("Erro ao baixar o PDF. Tente novamente.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <main className="container-page">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pré-visualização do Resume</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/")}>
              Voltar
            </Button>
            <Button onClick={handleDownload} disabled={downloading}>
              {downloading ? "Gerando PDF…" : "Baixar PDF"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Visualização</CardTitle>
            </CardHeader>
            <CardContent>
              <ResumePreview resume={resume} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Editar</CardTitle>
            </CardHeader>
            <CardContent>
              <ResumeEditor resume={resume} onResumeChange={setResume} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

