import { createServerClient } from "@/lib/supabase/server";

export interface ApplicationKit {
  id: string;
  user_id: string;
  resume_id?: string;
  job_title?: string;
  company_name?: string;
  job_description?: string;
  cover_letter_content?: string;
  networking_script?: string;
  status: 'draft' | 'generating' | 'completed' | 'error';
  created_at: string;
  updated_at: string;
}

// Create a new application kit
export async function createApplicationKit(
  userId: string,
  resumeId?: string
): Promise<{ applicationKit?: ApplicationKit; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('application_kits')
      .insert({
        user_id: userId,
        resume_id: resumeId,
        status: 'draft'
      })
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    return { applicationKit: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get user's application kits
export async function getUserApplicationKits(userId: string): Promise<{ applicationKits?: ApplicationKit[]; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('application_kits')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      return { error: error.message };
    }

    return { applicationKits: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get a specific application kit
export async function getApplicationKit(id: string, userId: string): Promise<{ applicationKit?: ApplicationKit; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('application_kits')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      return { error: error.message };
    }

    return { applicationKit: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Update application kit
export async function updateApplicationKit(
  id: string,
  userId: string,
  updates: Partial<Omit<ApplicationKit, 'id' | 'user_id' | 'created_at'>>
): Promise<{ applicationKit?: ApplicationKit; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('application_kits')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    return { applicationKit: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Delete application kit
export async function deleteApplicationKit(id: string, userId: string): Promise<{ error?: string }> {
  try {
    const supabase = createServerClient();

    const { error } = await supabase
      .from('application_kits')
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