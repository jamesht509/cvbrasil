import { NextRequest, NextResponse } from "next/server";
import { saveResume, getUserResumes, getResumeById, updateResume, deleteResume } from "@/lib/db-resumes";
import { UsResumeSchema } from "@/lib/schemas";

// POST - Salvar um novo resume
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resume, userId, originalFilename } = body;

    if (!resume) {
      return NextResponse.json(
        { error: "Dados do resume não fornecidos." },
        { status: 400 }
      );
    }

    // Validar schema
    const validationResult = UsResumeSchema.safeParse(resume);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Dados do resume inválidos.", details: validationResult.error },
        { status: 400 }
      );
    }

    const saved = await saveResume(
      validationResult.data,
      userId || null,
      originalFilename || null
    );

    return NextResponse.json({ success: true, resume: saved });
  } catch (error) {
    console.error("Error saving resume:", error);
    return NextResponse.json(
      { error: "Erro ao salvar o resume. Verifique se o Supabase está configurado." },
      { status: 500 }
    );
  }
}

// GET - Buscar resumes (com query params para filtros)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resumeId = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (resumeId) {
      // Buscar um resume específico
      const resume = await getResumeById(resumeId);
      return NextResponse.json({ resume });
    }

    if (userId) {
      // Buscar todos os resumes de um usuário
      const resumes = await getUserResumes(userId);
      return NextResponse.json({ resumes });
    }

    return NextResponse.json(
      { error: "Forneça 'id' ou 'userId' como parâmetro de busca." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { error: "Erro ao buscar resumes." },
      { status: 500 }
    );
  }
}

// PUT - Atualizar um resume
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, resume } = body;

    if (!id || !resume) {
      return NextResponse.json(
        { error: "ID e dados do resume são obrigatórios." },
        { status: 400 }
      );
    }

    // Validar schema
    const validationResult = UsResumeSchema.safeParse(resume);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Dados do resume inválidos.", details: validationResult.error },
        { status: 400 }
      );
    }

    const updated = await updateResume(id, validationResult.data);
    return NextResponse.json({ success: true, resume: updated });
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar o resume." },
      { status: 500 }
    );
  }
}

// DELETE - Deletar um resume
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID do resume é obrigatório." },
        { status: 400 }
      );
    }

    await deleteResume(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return NextResponse.json(
      { error: "Erro ao deletar o resume." },
      { status: 500 }
    );
  }
}

