"use server";

import { createServerClient } from "@/lib/supabase/server";

export async function resetPasswordAction(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    throw new Error("Email é obrigatório");
  }

  try {
    const supabase = createServerClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/v2/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro ao enviar email de recuperação");
  }
}