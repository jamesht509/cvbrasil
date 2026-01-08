"use client";

import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type Props = {
  file: File | null;
  onFileChange: (file: File | null) => void;
  maxSizeMB: number;
};

export function UploadCard({ file, onFileChange, maxSizeMB }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const validateAndSetFile = useCallback(
    (f: File | null) => {
      setLocalError(null);
      if (!f) {
        onFileChange(null);
        return;
      }
      if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
        setLocalError("Envie um arquivo no formato PDF.");
        onFileChange(null);
        return;
      }
      const maxBytes = maxSizeMB * 1024 * 1024;
      if (f.size > maxBytes) {
        setLocalError(`Tamanho máximo permitido é de ${maxSizeMB} MB.`);
        onFileChange(null);
        return;
      }
      onFileChange(f);
    },
    [onFileChange, maxSizeMB]
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    validateAndSetFile(f);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0] ?? null;
    validateAndSetFile(f);
  }

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40 px-6 py-10 text-center transition-colors",
          dragOver && "border-primary bg-muted"
        )}
      >
        <p className="text-sm font-medium">
          Arraste e solte o PDF aqui ou clique para selecionar.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Apenas arquivos PDF, até {maxSizeMB} MB.
        </p>
        <div className="mt-4">
          <label>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleInputChange}
            />
            <Button type="button" variant="outline">
              Selecionar arquivo
            </Button>
          </label>
        </div>
        {file && (
          <p className="mt-2 text-xs text-muted-foreground">
            Arquivo selecionado: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>
      {localError && (
        <p className="text-xs text-red-600" role="alert">
          {localError}
        </p>
      )}
    </div>
  );
}


