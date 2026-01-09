import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumePdfDocument } from "@/lib/pdfTemplates";
import { UsResumeSchema } from "@/lib/schemas";
import { normalizeResume, compactResumeToOnePageHeuristics } from "@/lib/resumeNormalizers";
import { z } from "zod";
import React from "react";

const PdfRequestSchema = z.object({
  resume: UsResumeSchema,
  style: z.enum(["ats", "premium"]).default("ats"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = PdfRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Dados do resume inválidos.", details: validationResult.error },
        { status: 400 }
      );
    }

    const { resume: resumeData, style } = validationResult.data;

    // Strip metadata (UI-only, not included in PDF)
    const { metadata, ...resumeWithoutMetadata } = resumeData;

    // Normalize and compact resume
    const normalized = normalizeResume(resumeWithoutMetadata);
    const compacted = compactResumeToOnePageHeuristics(normalized);

    // Generate PDF buffer using React.createElement
    const pdfBuffer = await renderToBuffer(
      React.createElement(ResumePdfDocument, { resume: compacted, style }) as any
    );

    // Convert Buffer to Uint8Array for NextResponse
    const pdfArray = new Uint8Array(pdfBuffer);

    // Return PDF as response
    return new NextResponse(pdfArray, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume-us.pdf"'
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

