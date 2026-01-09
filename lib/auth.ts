import { createServerClient } from "./supabase";
import { cookies } from "next/headers";

/**
 * Get the current user session on the server
 * Returns null if not authenticated
 */
export async function getServerSession() {
  try {
    const supabase = createServerClient();
    
    // Get session from cookies
    const cookieStore = cookies();
    const accessToken = cookieStore.get("sb-access-token")?.value;
    const refreshToken = cookieStore.get("sb-refresh-token")?.value;

    if (!accessToken) {
      return null;
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return null;
    }

    return { user };
  } catch (error) {
    console.error("Error getting server session:", error);
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession();
  return session !== null;
}
