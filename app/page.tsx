"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { UploadCard } from "../components/UploadCard";
import { useResume } from "./providers";
import type { UsResume } from "../lib/schemas";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setResume } = useResume();

  async function handleGenerate() {
    setError(null);
    if (!file) {
      setError("Envie um arquivo PDF antes de continuar.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/convert", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Ocorreu um erro ao converter o currículo.");
        return;
      }

      const resume: UsResume = data.resume;
      setResume(resume);
      router.push("/preview");
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-page">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">
            Converter Currículo (BR) para Resume (EUA)
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Envie um currículo brasileiro em PDF (português) e receba um resume em
            inglês, no padrão americano, pronto para ATS.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload do currículo em PDF</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <UploadCard file={file} onFileChange={setFile} maxSizeMB={10} />

            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• Envie um PDF com texto selecionável (não escaneado).</p>
              <p>
                • Seu arquivo é processado para gerar um resume em inglês no padrão
                americano.
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <div>
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </div>
              </Alert>
            )}

            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? "Convertendo…" : "Gerar resume em PDF"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}


