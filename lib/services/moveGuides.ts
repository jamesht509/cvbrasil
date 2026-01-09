import { createServerClient } from "@/lib/supabase/server";

export interface MoveGuide {
  id: string;
  user_id: string;
  visa_type?: string;
  timeline?: any;
  budget_estimate?: any;
  checklist?: any;
  documents_needed?: string[];
  status: 'draft' | 'generating' | 'completed' | 'error';
  created_at: string;
  updated_at: string;
}

// Create a new move guide
export async function createMoveGuide(
  userId: string,
  visaType?: string
): Promise<{ moveGuide?: MoveGuide; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('move_guides')
      .insert({
        user_id: userId,
        visa_type: visaType,
        status: 'draft'
      })
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    return { moveGuide: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get user's move guides
export async function getUserMoveGuides(userId: string): Promise<{ moveGuides?: MoveGuide[]; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('move_guides')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      return { error: error.message };
    }

    return { moveGuides: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Get a specific move guide
export async function getMoveGuide(id: string, userId: string): Promise<{ moveGuide?: MoveGuide; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('move_guides')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      return { error: error.message };
    }

    return { moveGuide: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Update move guide
export async function updateMoveGuide(
  id: string,
  userId: string,
  updates: Partial<Omit<MoveGuide, 'id' | 'user_id' | 'created_at'>>
): Promise<{ moveGuide?: MoveGuide; error?: string }> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('move_guides')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    return { moveGuide: data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Delete move guide
export async function deleteMoveGuide(id: string, userId: string): Promise<{ error?: string }> {
  try {
    const supabase = createServerClient();

    const { error } = await supabase
      .from('move_guides')
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