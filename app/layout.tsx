import type { Metadata } from "next";
import "./globals.css";
import { ResumeProvider } from "./providers";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "ResumeUSA - Converter Currículo para Resume Americano",
  description:
    "Converta seu currículo brasileiro em português para um resume em inglês no padrão americano com IA."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-gray-100 min-h-screen flex flex-col">
        <ResumeProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ResumeProvider>
      </body>
    </html>
  );
}


