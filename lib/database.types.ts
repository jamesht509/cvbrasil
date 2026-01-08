// Database types for Supabase
// These should match your Supabase database schema

export interface Database {
  public: {
    Tables: {
      resumes: {
        Row: {
          id: string;
          user_id: string | null;
          original_filename: string | null;
          resume_data: any; // JSONB field for UsResume
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          original_filename?: string | null;
          resume_data: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          original_filename?: string | null;
          resume_data?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Add more tables as needed
    };
  };
}

