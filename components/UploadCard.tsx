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
    <div className="space-y-3">
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
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-all cursor-pointer group",
          dragOver
            ? "border-primary bg-primary/5 dark:bg-primary/10"
            : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10"
        )}
      >
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all",
          dragOver
            ? "bg-primary/20 scale-110"
            : "bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110"
        )}>
          <span className="material-symbols-outlined text-primary text-4xl">
            {file ? "check_circle" : "cloud_upload"}
          </span>
        </div>
        
        {file ? (
          <div className="space-y-2">
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              Arquivo selecionado!
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              {file.name}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              Arraste seu PDF aqui
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              ou clique para selecionar do seu computador
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Apenas arquivos PDF • Máximo {maxSizeMB} MB
            </p>
          </div>
        )}
        
        <div className="mt-6">
          <label>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleInputChange}
            />
            <Button
              type="button"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all"
            >
              <span className="material-symbols-outlined mr-2 text-lg">folder_open</span>
              {file ? "Escolher outro arquivo" : "Selecionar arquivo"}
            </Button>
          </label>
        </div>
      </div>
      
      {localError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900">
          <span className="material-symbols-outlined text-red-600 text-lg">error</span>
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            {localError}
          </p>
        </div>
      )}
    </div>
  );
}


