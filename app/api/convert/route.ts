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
    if (trimmedText.length < MIN_TEXT_LENGTH) {
      return NextResponse.json(
        {
          error:
            "Não consegui ler o texto do PDF. Envie um PDF com texto selecionável ou copie/cole o conteúdo."
        },
        { status: 400 }
      );
    }

    // Step A: Extract structured data from Portuguese text
    let brazilianData;
    try {
      brazilianData = await extractBrazilianResumeData(trimmedText);
    } catch (error) {
      console.error("Step A (extraction) error:", error);
      return NextResponse.json(
        {
          error:
            "Erro ao processar o conteúdo do currículo. Verifique se o PDF contém texto selecionável."
        },
        { status: 500 }
      );
    }

    // Step B: Convert to US resume format
    let usResume;
    try {
      usResume = await convertToUsResume(brazilianData);
    } catch (error) {
      console.error("Step B (conversion) error:", error);
      return NextResponse.json(
        {
          error:
            "Erro ao converter o currículo para o formato americano. Tente novamente."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ resume: usResume });
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

