import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function POST() {
  try {
    const supabase = createServerClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
    }

    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error in logout:", error);
  }

  redirect("/v2/login");
}