-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  country TEXT DEFAULT 'Brazil',
  target_country TEXT DEFAULT 'United States',
  current_job_title TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  resume_usa_status TEXT DEFAULT 'not_started' CHECK (resume_usa_status IN ('not_started', 'in_progress', 'completed')),
  linkedin_boost_status TEXT DEFAULT 'not_started' CHECK (linkedin_boost_status IN ('not_started', 'in_progress', 'completed')),
  application_kit_status TEXT DEFAULT 'not_started' CHECK (application_kit_status IN ('not_started', 'in_progress', 'completed')),
  move_guide_status TEXT DEFAULT 'not_started' CHECK (move_guide_status IN ('not_started', 'in_progress', 'completed'))
);

-- Create resumes table
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'My Resume',
  original_file_path TEXT,
  original_file_name TEXT,
  parsed_data JSONB,
  converted_data JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'processing', 'completed', 'error')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  version INTEGER DEFAULT 1
);

-- Create resume_exports table
CREATE TABLE IF NOT EXISTS public.resume_exports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  format TEXT DEFAULT 'pdf' CHECK (format IN ('pdf', 'docx', 'txt')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  download_count INTEGER DEFAULT 0
);

-- Create application_kits table
CREATE TABLE IF NOT EXISTS public.application_kits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
  job_title TEXT,
  company_name TEXT,
  job_description TEXT,
  cover_letter_content TEXT,
  networking_script TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'completed', 'error')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create linkedin_boosts table
CREATE TABLE IF NOT EXISTS public.linkedin_boosts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  current_headline TEXT,
  target_headline TEXT,
  current_summary TEXT,
  optimized_summary TEXT,
  skills_to_add TEXT[],
  recommendations TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'analyzing', 'completed', 'error')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create move_guides table
CREATE TABLE IF NOT EXISTS public.move_guides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  visa_type TEXT,
  timeline JSONB, -- Structured timeline data
  budget_estimate JSONB, -- Cost breakdown
  checklist JSONB, -- Action items
  documents_needed TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'completed', 'error')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.linkedin_boosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.move_guides ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for resumes
CREATE POLICY "Users can view own resumes" ON public.resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resumes" ON public.resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes" ON public.resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes" ON public.resumes
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for resume_exports
CREATE POLICY "Users can view own resume exports" ON public.resume_exports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resume exports" ON public.resume_exports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for application_kits
CREATE POLICY "Users can view own application kits" ON public.application_kits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own application kits" ON public.application_kits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own application kits" ON public.application_kits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own application kits" ON public.application_kits
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for linkedin_boosts
CREATE POLICY "Users can view own linkedin boosts" ON public.linkedin_boosts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own linkedin boosts" ON public.linkedin_boosts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own linkedin boosts" ON public.linkedin_boosts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own linkedin boosts" ON public.linkedin_boosts
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for move_guides
CREATE POLICY "Users can view own move guides" ON public.move_guides
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own move guides" ON public.move_guides
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own move guides" ON public.move_guides
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own move guides" ON public.move_guides
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_resumes
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_application_kits
  BEFORE UPDATE ON public.application_kits
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_linkedin_boosts
  BEFORE UPDATE ON public.linkedin_boosts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_move_guides
  BEFORE UPDATE ON public.move_guides
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();