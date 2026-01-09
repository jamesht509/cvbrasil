import { createServerClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/client";
import { uploadFileServer, createSignedUrlServer } from "@/lib/supabase/storage";

export interface Resume {
  id: string;
  user_id: string;
  title: string;
  original_file_path?: string;
  original_file_name?: string;
  parsed_data?: any;
  converted_data?: any;
  status: 'draft' | 'processing' | 'completed' | 'error';
  created_at: string;
  updated_at: string;
  version: number;
}

// Create a new resume
export async function createResume(
  userId: string,
  title: string = "My Resume"
): Promise<{ resume?: Resume; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('resumes')
      .insert({
        user_id: userId,
        title,
        status: 'draft'
      })
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    return { resume: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get user's resumes
export async function getUserResumes(userId: string): Promise<{ resumes?: Resume[]; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      return { error: error.message };
    }

    return { resumes: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get a specific resume
export async function getResume(id: string, userId: string): Promise<{ resume?: Resume; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      return { error: error.message };
    }

    return { resume: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Update resume
export async function updateResume(
  id: string,
  userId: string,
  updates: Partial<Omit<Resume, 'id' | 'user_id' | 'created_at'>>
): Promise<{ resume?: Resume; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('resumes')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    return { resume: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Upload resume file
export async function uploadResumeFile(
  userId: string,
  file: Buffer,
  fileName: string,
  contentType?: string
): Promise<{ filePath?: string; signedUrl?: string; error?: string }> {
  try {
    const uploadResult = await uploadFileServer(file, 'uploads', fileName, userId, contentType);

    if (uploadResult.error) {
      return { error: uploadResult.error };
    }

    const signedUrlResult = await createSignedUrlServer('uploads', uploadResult.path, 3600);

    if (signedUrlResult.error) {
      return { error: signedUrlResult.error };
    }

    return {
      filePath: uploadResult.path,
      signedUrl: signedUrlResult.signedUrl
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Delete resume
export async function deleteResume(id: string, userId: string): Promise<{ error?: string }> {
  try {
    const supabase = createServerClient();

    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      return { error: error.message };
    }

    return {};
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}