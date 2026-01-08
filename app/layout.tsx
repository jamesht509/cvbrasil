import type { Metadata } from "next";
import "./globals.css";
import { ResumeProvider } from "./providers";

export const metadata: Metadata = {
  title: "Converter Currículo (BR) para Resume (EUA)",
  description:
    "Converta seu currículo brasileiro em português para um resume em inglês no padrão americano."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground">
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  );
}


