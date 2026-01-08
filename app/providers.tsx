"use client";

import React, { createContext, useContext, useState } from "react";
import type { UsResume } from "../lib/schemas";

type ResumeContextValue = {
  resume: UsResume | null;
  setResume: (value: UsResume | null) => void;
};

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<UsResume | null>(null);

  return (
    <ResumeContext.Provider value={{ resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return ctx;
}


