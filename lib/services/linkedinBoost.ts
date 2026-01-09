import { createServerClient } from "@/lib/supabase/server";

export interface LinkedInBoost {
  id: string;
  user_id: string;
  current_headline?: string;
  target_headline?: string;
  current_summary?: string;
  optimized_summary?: string;
  skills_to_add?: string[];
  recommendations?: string[];
  status: 'draft' | 'analyzing' | 'completed' | 'error';
  created_at: string;
  updated_at: string;
}

// Create a new LinkedIn boost
export async function createLinkedInBoost(userId: string): Promise<{ linkedinBoost?: LinkedInBoost; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('linkedin_boosts')
      .insert({
        user_id: userId,
        status: 'draft'
      })
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    return { linkedinBoost: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get user's LinkedIn boosts
export async function getUserLinkedInBoosts(userId: string): Promise<{ linkedinBoosts?: LinkedInBoost[]; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('linkedin_boosts')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      return { error: error.message };
    }

    return { linkedinBoosts: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get a specific LinkedIn boost
export async function getLinkedInBoost(id: string, userId: string): Promise<{ linkedinBoost?: LinkedInBoost; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('linkedin_boosts')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      return { error: error.message };
    }

    return { linkedinBoost: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Update LinkedIn boost
export async function updateLinkedInBoost(
  id: string,
  userId: string,
  updates: Partial<Omit<LinkedInBoost, 'id' | 'user_id' | 'created_at'>>
): Promise<{ linkedinBoost?: LinkedInBoost; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('linkedin_boosts')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    return { linkedinBoost: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Delete LinkedIn boost
export async function deleteLinkedInBoost(id: string, userId: string): Promise<{ error?: string }> {
  try {
    const supabase = createServerClient();

    const { error } = await supabase
      .from('linkedin_boosts')
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