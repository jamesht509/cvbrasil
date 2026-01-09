"use server";

import { getUserResumes } from "@/lib/services/resumes";
import { getUserMoveGuides } from "@/lib/services/moveGuides";
import { getUserLinkedInBoosts } from "@/lib/services/linkedinBoost";
import { getUserApplicationKits } from "@/lib/services/applicationKits";
import { createServerClient } from "@/lib/supabase/server";

export interface DashboardStats {
  resumes: number;
  moveGuides: number;
  linkedinBoosts: number;
  applicationKits: number;
  completedResumes: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const supabase = createServerClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    // Fetch all data in parallel
    const [resumesResult, moveGuidesResult, linkedinResult, kitsResult] = await Promise.all([
      getUserResumes(user.id),
      getUserMoveGuides(user.id),
      getUserLinkedInBoosts(user.id),
      getUserApplicationKits(user.id)
    ]);

    return {
      resumes: resumesResult.resumes?.length || 0,
      moveGuides: moveGuidesResult.moveGuides?.length || 0,
      linkedinBoosts: linkedinResult.linkedinBoosts?.length || 0,
      applicationKits: kitsResult.applicationKits?.length || 0,
      completedResumes: resumesResult.resumes?.filter(r => r.status === 'completed').length || 0
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    // Return empty stats on error
    return {
      resumes: 0,
      moveGuides: 0,
      linkedinBoosts: 0,
      applicationKits: 0,
      completedResumes: 0
    };
  }
}