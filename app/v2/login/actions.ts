"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirect") as string || "/v2/dashboard";

  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  try {
    const supabase = createServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("Falha na autenticação");
    }

    revalidatePath("/", "layout");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro ao fazer login");
  }

  redirect(redirectTo);
}