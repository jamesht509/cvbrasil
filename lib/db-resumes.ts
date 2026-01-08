import { createServerClient } from "./supabase";
import type { UsResume } from "./schemas";

/**
 * Save a resume to the database
 */
export async function saveResume(
  resumeData: UsResume,
  userId?: string,
  originalFilename?: string
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("resumes")
    .insert({
      user_id: userId || null,
      original_filename: originalFilename || null,
      resume_data: resumeData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume to database");
  }

  return data;
}

/**
 * Get a resume by ID
 */
export async function getResumeById(resumeId: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .single();

  if (error) {
    console.error("Error fetching resume:", error);
    throw new Error("Failed to fetch resume from database");
  }

  return data;
}

/**
 * Get all resumes for a user
 */
export async function getUserResumes(userId: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user resumes:", error);
    throw new Error("Failed to fetch user resumes from database");
  }

  return data;
}

/**
 * Update a resume
 */
export async function updateResume(
  resumeId: string,
  resumeData: UsResume
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("resumes")
    .update({
      resume_data: resumeData,
      updated_at: new Date().toISOString()
    })
    .eq("id", resumeId)
    .select()
    .single();

  if (error) {
    console.error("Error updating resume:", error);
    throw new Error("Failed to update resume in database");
  }

  return data;
}

/**
 * Delete a resume
 */
export async function deleteResume(resumeId: string) {
  const supabase = createServerClient();

  const { error } = await supabase
    .from("resumes")
    .delete()
    .eq("id", resumeId);

  if (error) {
    console.error("Error deleting resume:", error);
    throw new Error("Failed to delete resume from database");
  }

  return true;
}

