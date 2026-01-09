"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("Nome, email e senha são obrigatórios");
  }

  if (password.length < 8) {
    throw new Error("A senha deve ter pelo menos 8 caracteres");
  }

  try {
    const supabase = createServerClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("Falha ao criar conta");
    }

    // Profile will be created automatically via database trigger

    revalidatePath("/", "layout");
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro ao criar conta");
  }

  redirect("/v2/dashboard");
}