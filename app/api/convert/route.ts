import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPdf } from "@/lib/extractTextFromPdf";
import {
  extractBrazilianResumeData,
  convertToUsResume
} from "@/lib/openai";
import { sanitizeFileName } from "@/lib/sanitize";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MIN_TEXT_LENGTH = 500; // Minimum characters to consider valid text extraction

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const linkedinUrl = formData.get("linkedinUrl") as string | null;
    const linkedinAboutText = formData.get("linkedinAboutText") as string | null;
    const linkedinPdf = formData.get("linkedinPdf") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo foi enviado." },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Apenas arquivos PDF são aceitos." },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB.` },
        { status: 400 }
      );
    }

    // Validate LinkedIn PDF if provided
    let linkedinPdfText = "";
    const importSources = {
      usedLinkedinPdf: false,
      usedLinkedinAbout: false,
      linkedinUrlProvided: false
    };

    if (linkedinPdf) {
      if (linkedinPdf.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `PDF do LinkedIn muito grande. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB.` },
          { status: 400 }
        );
      }
      try {
        const linkedinArrayBuffer = await linkedinPdf.arrayBuffer();
        const linkedinBuffer = Buffer.from(linkedinArrayBuffer);
        linkedinPdfText = await extractTextFromPdf(linkedinBuffer);
        if (linkedinPdfText.trim().length > 0) {
          importSources.usedLinkedinPdf = true;
        } else {
          console.warn("LinkedIn PDF extraction yielded empty text");
        }
      } catch (error) {
        console.error("LinkedIn PDF extraction error:", error);
        // Continue without LinkedIn PDF text
      }
    }

    if (linkedinAboutText && linkedinAboutText.trim().length > 0) {
      importSources.usedLinkedinAbout = true;
    }

    if (linkedinUrl && linkedinUrl.trim().length > 0) {
      importSources.linkedinUrlProvided = true;
    }

    // Read file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    let extractedText: string;
    try {
      extractedText = await extractTextFromPdf(buffer);
    } catch (error) {
      console.error("PDF extraction error:", error);
      return NextResponse.json(
        {
          error:
            "Não consegui ler o texto do PDF. Envie um PDF com texto selecionável ou copie/cole o conteúdo."
        },
        { status: 400 }
      );
    }

    // Check if text extraction was successful
    const trimmedText = extractedText.trim();
    console.log(`Texto extraído: ${trimmedText.length} caracteres`);
    
    if (trimmedText.length < MIN_TEXT_LENGTH) {
      console.error(`Texto muito curto: ${trimmedText.length} caracteres (mínimo: ${MIN_TEXT_LENGTH})`);
      return NextResponse.json(
        {
          error:
            `Não consegui ler texto suficiente do PDF (${trimmedText.length} caracteres encontrados). Envie um PDF com texto selecionável ou copie/cole o conteúdo.`
        },
        { status: 400 }
      );
    }

    // Build combined context with LinkedIn data
    const supplementaryEvidence = [
      linkedinAboutText?.trim() || "",
      linkedinPdfText.trim()
    ].filter(Boolean).join("\n\n");

    // Step A: Extract structured data from Portuguese text
    let brazilianData;
    try {
      console.log("Iniciando extração de dados estruturados com OpenAI...");
      brazilianData = await extractBrazilianResumeData(trimmedText, supplementaryEvidence || undefined);
      console.log("Dados brasileiros extraídos com sucesso");
    } catch (error: any) {
      console.error("Step A (extraction) error:", error);
      console.error("Erro completo:", {
        message: error?.message,
        stack: error?.stack,
        name: error?.name
      });
      
      // Verificar se é erro de API key
      if (error?.message?.includes("OPENAI_API_KEY") || error?.message?.includes("API key")) {
        return NextResponse.json(
          {
            error: "Erro de configuração: Chave da API OpenAI não configurada. Entre em contato com o suporte."
          },
          { status: 500 }
        );
      }
      
      // Verificar se é erro de parsing JSON
      if (error?.message?.includes("JSON") || error?.message?.includes("parse")) {
        return NextResponse.json(
          {
            error: "Erro ao processar a resposta da IA. O PDF pode ter formato muito complexo. Tente novamente ou entre em contato com o suporte."
          },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        {
          error: `Erro ao processar o conteúdo do currículo: ${error?.message || "Erro desconhecido"}. Verifique se o PDF contém texto selecionável e tente novamente.`
        },
        { status: 500 }
      );
    }

    // Step B: Convert to US resume format
    let usResume;
    try {
      console.log("Iniciando conversão para formato americano...");
      usResume = await convertToUsResume(brazilianData, supplementaryEvidence || undefined);
      console.log("Conversão concluída com sucesso!");
    } catch (error: any) {
      console.error("Step B (conversion) error:", error);
      console.error("Erro completo:", {
        message: error?.message,
        stack: error?.stack,
        name: error?.name
      });
      
      return NextResponse.json(
        {
          error: `Erro ao converter o currículo para o formato americano: ${error?.message || "Erro desconhecido"}. Tente novamente.`
        },
        { status: 500 }
      );
    }

    // Add metadata to resume
    const resumeWithMetadata = {
      ...usResume,
      metadata: {
        importSources,
        conflictsDetected: usResume.metadata?.conflictsDetected
      }
    };

    return NextResponse.json({ resume: resumeWithMetadata });
  } catch (error) {
    console.error("Unexpected error in /api/convert:", error);
    return NextResponse.json(
      {
        error: "Erro inesperado ao processar o arquivo. Tente novamente."
      },
      { status: 500 }
    );
  }
}

