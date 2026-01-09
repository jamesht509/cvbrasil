# Supabase V2 Setup Guide

## Overview
This guide sets up Supabase Auth, Database, and Storage for the ResumeUSA v2 application.

## Prerequisites
- Supabase project created at https://supabase.com
- Environment variables configured in Vercel/.env.local:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  ```

## Step 1: Database Setup

### Run the Initial Schema
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/sql/initial.sql`
4. Click **Run**

This creates:
- ✅ `profiles` table (extends auth.users)
- ✅ `resumes` table
- ✅ `resume_exports` table
- ✅ `application_kits` table
- ✅ `linkedin_boosts` table
- ✅ `move_guides` table
- ✅ Row Level Security (RLS) policies
- ✅ Database triggers for automatic profile creation

## Step 2: Storage Setup

### Create Storage Buckets
1. Go to **Storage** in your Supabase dashboard
2. Copy and paste the contents of `supabase/setup-storage.sql` into SQL Editor
3. Click **Run**

This creates:
- ✅ `uploads` bucket (private, 10MB limit) - for resume files and uploads
- ✅ `exports` bucket (private, 50MB limit) - for generated PDFs and exports
- ✅ RLS policies for both buckets

### Manual Bucket Creation (Alternative)
If you prefer to create buckets manually:

1. Go to **Storage** → **Create bucket**
2. Create bucket `uploads`:
   - **Private** bucket
   - File size limit: 10MB
   - Allowed MIME types: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `text/plain`, `image/jpeg`, `image/png`, `image/webp`

3. Create bucket `exports`:
   - **Private** bucket
   - File size limit: 50MB
   - Allowed MIME types: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `text/plain`, `application/zip`

## Step 3: Authentication Setup

### Configure Auth Providers
1. Go to **Authentication** → **Settings**
2. Configure **Site URL**: `https://yourdomain.com` (or `http://localhost:3000` for development)
3. Configure **Redirect URLs**:
   - `https://yourdomain.com/v2/auth/callback`
   - `http://localhost:3000/v2/auth/callback`

### Enable Email Auth
Email authentication is enabled by default. The app uses email/password authentication.

## Step 4: Environment Variables

Add these to your `.env.local` file (or Vercel environment variables):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: Enable v2 features
NEXT_PUBLIC_UI_V2=1
```

## Step 5: Test the Setup

### Start the Development Server
```bash
npm run dev
```

### Test Authentication Flow
1. Visit `http://localhost:3000/v2/register`
2. Create a new account
3. Check that profile is created automatically
4. Visit `http://localhost:3000/v2/dashboard`
5. Verify dashboard loads with user data

### Test Database Tables
1. Go to **Table Editor** in Supabase
2. Verify all tables were created:
   - `profiles`
   - `resumes`
   - `resume_exports`
   - `application_kits`
   - `linkedin_boosts`
   - `move_guides`

### Test Storage
1. Go to **Storage** in Supabase
2. Verify buckets exist: `uploads`, `exports`
3. Upload a test file to verify permissions work

## Database Schema

### Profiles Table
```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  -- ... additional fields
);
```

### Resumes Table
```sql
CREATE TABLE public.resumes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'My Resume',
  original_file_path TEXT,
  parsed_data JSONB,
  converted_data JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'processing', 'completed', 'error')),
  -- ... timestamps and version
);
```

### Application Kits Table
```sql
CREATE TABLE public.application_kits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
  job_title TEXT,
  company_name TEXT,
  cover_letter_content TEXT,
  networking_script TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'completed', 'error')),
  -- ... timestamps
);
```

## Security Features

### Row Level Security (RLS)
- ✅ All tables have RLS enabled
- ✅ Users can only access their own data
- ✅ Automatic profile creation on signup
- ✅ Secure file access in storage buckets

### Authentication Flow
- ✅ Server-side session validation in middleware
- ✅ Client-side session management
- ✅ Protected routes with redirects
- ✅ Automatic token refresh

### File Security
- ✅ Private storage buckets
- ✅ User-scoped file paths (e.g., `user-id/filename.ext`)
- ✅ Signed URLs for temporary access
- ✅ File type and size restrictions

## Troubleshooting

### Common Issues

1. **"relation public.profiles does not exist"**
   - Run the initial.sql migration in SQL Editor

2. **Authentication not working**
   - Check environment variables are correct
   - Verify Site URL and Redirect URLs in Auth settings

3. **Storage upload fails**
   - Check buckets were created
   - Verify RLS policies are in place
   - Check file size and type restrictions

4. **Dashboard shows no data**
   - Check user profile was created in `profiles` table
   - Verify RLS policies allow access

### Useful Supabase Commands

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies WHERE schemaname = 'public';

-- Check storage buckets
SELECT id, name, public, file_size_limit FROM storage.buckets;
```

## Next Steps

After setup is complete:
1. Test all authentication flows
2. Verify dashboard loads user data
3. Test file upload functionality
4. Implement the remaining pages (resume upload, editor, etc.)
5. Connect to OpenAI API for resume processing

## Support

If you encounter issues:
1. Check Supabase logs in the dashboard
2. Verify environment variables
3. Test with the SQL commands above
4. Check the browser console for client-side errors