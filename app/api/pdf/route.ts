import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { ResumePdfDocument } from "@/lib/pdfTemplate";
import { UsResumeSchema } from "@/lib/schemas";
import { formatResumeForPdf } from "@/lib/resumeFormatters";
import React from "react";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const resumeData = body.resume;

    if (!resumeData) {
      return NextResponse.json(
        { error: "Dados do resume não fornecidos." },
        { status: 400 }
      );
    }

    // Validate with Zod schema
    const validationResult = UsResumeSchema.safeParse(resumeData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Dados do resume inválidos.", details: validationResult.error },
        { status: 400 }
      );
    }

    const resume = validationResult.data;
    const formattedResume = formatResumeForPdf(resume);

    // Generate PDF stream
    const stream = await renderToStream(
      React.createElement(ResumePdfDocument, { resume: formattedResume })
    );

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const pdfBuffer = Buffer.concat(chunks);

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume-en.pdf"'
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Erro ao gerar o PDF. Tente novamente." },
      { status: 500 }
    );
  }
}

