import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
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

    // Generate PDF buffer using React.createElement
    const pdfBuffer = await renderToBuffer(
      React.createElement(ResumePdfDocument, { resume: formattedResume }) as any
    );

    // Convert Buffer to Uint8Array for NextResponse
    const pdfArray = new Uint8Array(pdfBuffer);

    // Return PDF as response
    return new NextResponse(pdfArray, {
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

