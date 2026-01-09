# Supabase Wiring Implementation Checklist ✅

## ✅ **Completed Implementations**

### **1. Middleware Protection**
- **File**: `middleware.ts`
- **Status**: ✅ Complete
- **Functionality**:
  - Protects `/v2/app/*`, `/v2/dashboard`, `/v2/resume*`, `/v2/application-kit*`, `/v2/linkedin-booster*`, `/v2/move-guide*`
  - Uses proper Supabase session checking with `createServerClient`
  - Redirects to `/v2/login?redirect=<path>` for unauthenticated users

### **2. Supabase Admin Client**
- **File**: `lib/supabase/admin.ts`
- **Status**: ✅ Complete
- **Functionality**: Server-side client using `SUPABASE_SERVICE_ROLE_KEY` for admin operations

### **3. Server Actions (Auth)**
- **File**: `app/v2/login/actions.ts`
- **Status**: ✅ Complete
- **Functionality**: `loginAction` - validates email/password, creates session, redirects to dashboard or intended page

- **File**: `app/v2/register/actions.ts`
- **Status**: ✅ Complete
- **Functionality**: `signupAction` - creates account with user metadata (full_name), auto-creates profile via trigger

- **File**: `app/v2/recover-password/actions.ts`
- **Status**: ✅ Complete
- **Functionality**: `resetPasswordAction` - sends password reset email

### **4. Logout Route**
- **File**: `app/v2/logout/route.ts`
- **Status**: ✅ Complete
- **Functionality**: POST endpoint that signs out user and redirects to `/v2/login`

### **5. FetchJSON Helper**
- **File**: `lib/fetchJSON.ts`
- **Status**: ✅ Complete
- **Functionality**: Client-side fetch helper with error handling, POST/PUT/DELETE helpers

### **6. Data Services**
- **File**: `lib/services/resumes.ts`
- **Status**: ✅ Complete
- **Functionality**: CRUD operations using `createServerClient()` - create, list, get resumes

- **File**: `lib/services/applicationKits.ts`
- **Status**: ✅ Complete
- **Functionality**: CRUD operations - create, list application kits

- **File**: `lib/services/linkedinBoost.ts`
- **Status**: ✅ Complete
- **Functionality**: CRUD operations - create, list LinkedIn boost profiles

- **File**: `lib/services/moveGuides.ts`
- **Status**: ✅ Complete
- **Functionality**: CRUD operations - create, list, get move guides

### **7. Wired TSX Pages**
- **File**: `app/v2/(auth)/login/page.tsx`
- **Status**: ✅ Complete
- **Changes**:
  - Replaced client-side logic with `<form action={loginAction}>`
  - Updated inputs to use `name` attributes instead of controlled components
  - Added loading state management

- **File**: `app/v2/(auth)/register/page.tsx`
- **Status**: ✅ Complete
- **Changes**:
  - Replaced client-side logic with `<form action={signupAction}>`
  - Updated inputs to use `name` attributes
  - Added loading state management

- **File**: `app/v2/(auth)/recover-password/page.tsx`
- **Status**: ✅ Complete
- **Changes**:
  - Replaced static form with `<form action={resetPasswordAction}>`
  - Added conditional success state display
  - Updated input to use `name` attribute

- **File**: `components/v2/AppTopbar.tsx`
- **Status**: ✅ Complete
- **Changes**:
  - Replaced `onClick` handler with `<form action="/v2/logout" method="post">`
  - Simplified component by removing client-side signOut logic

## 🎯 **UI Preservation**
- ✅ **No UI changes** - All styling and layout preserved
- ✅ **Pixel-perfect** - Original designs maintained
- ✅ **Responsive** - Mobile/tablet/desktop layouts intact

## 🔧 **Local Testing Instructions**

### **Prerequisites**
```bash
# Install dependencies (if not done)
npm install

# Set environment variables in .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### **Start Development Server**
```bash
npm run dev
```

### **Testing Flow**

#### **1. Test Registration**
```bash
# Visit: http://localhost:3000/v2/register
# Fill form:
# - Name: João Silva
# - Email: joao@example.com
# - Password: password123
# - Check terms checkbox
# - Click "Criar Minha Conta"
# Expected: Redirects to /v2/dashboard
```

#### **2. Test Login**
```bash
# Visit: http://localhost:3000/v2/login
# Fill form:
# - Email: joao@example.com
# - Password: password123
# - Click "Entrar na Plataforma"
# Expected: Redirects to /v2/dashboard
```

#### **3. Test Dashboard Access**
```bash
# Visit: http://localhost:3000/v2/dashboard (while logged in)
# Expected: Shows dashboard with user data

# Visit: http://localhost:3000/v2/dashboard (while logged out)
# Expected: Redirects to /v2/login?redirect=/v2/dashboard
```

#### **4. Test Password Recovery**
```bash
# Visit: http://localhost:3000/v2/recover-password
# Fill form:
# - Email: joao@example.com
# - Click "Enviar Link de Recuperação"
# Expected: Shows success message
```

#### **5. Test Logout**
```bash
# While on dashboard, click "Sair" in topbar
# Expected: Signs out and redirects to /v2/login
```

#### **6. Test Protected Routes**
```bash
# Visit any of these while logged out:
# - /v2/dashboard
# - /v2/resume/upload
# - /v2/application-kit
# Expected: Redirects to /v2/login with redirect parameter
```

### **Database Verification**
After testing, check Supabase dashboard:
- **Table**: `profiles` - Should have user record with email and full_name
- **Table**: `resumes` - Initially empty (will be populated by resume creation)
- **Table**: `application_kits` - Initially empty
- **Table**: `linkedin_boosts` - Initially empty
- **Table**: `move_guides` - Initially empty

## 🐛 **Troubleshooting**

### **Common Issues**

1. **"TypeError: Cannot read properties of undefined (reading 'auth')"**
   - Check environment variables are set correctly
   - Restart dev server after adding env vars

2. **"AuthApiError: User already registered"**
   - Try a different email address
   - Or delete the user from Supabase Auth users

3. **"Middleware redirect loop"**
   - Check middleware.ts matcher config
   - Ensure protected routes don't include static assets

4. **"Form submission not working"**
   - Check browser console for errors
   - Verify form inputs have correct `name` attributes
   - Ensure server actions are properly exported

5. **"Dashboard shows no data"**
   - Check user profile was created in `profiles` table
   - Verify RLS policies allow access to user's data

### **Debug Commands**
```bash
# Check if server is running
curl -I http://localhost:3000/v2

# Check middleware logs
# Look in terminal where npm run dev is running

# Check database directly in Supabase SQL Editor
SELECT * FROM profiles;
SELECT * FROM resumes;
```

## 📁 **Files Modified Summary**

### **New Files (6)**
- `lib/supabase/admin.ts` - Admin client
- `app/v2/login/actions.ts` - Login server action
- `app/v2/register/actions.ts` - Register server action
- `app/v2/recover-password/actions.ts` - Password reset server action
- `app/v2/logout/route.ts` - Logout POST route
- `SUPABASE_WIRING_CHECKLIST.md` - This file

### **Modified Files (4)**
- `app/v2/(auth)/login/page.tsx` - Wired to server action
- `app/v2/(auth)/register/page.tsx` - Wired to server action
- `app/v2/(auth)/recover-password/page.tsx` - Wired to server action
- `components/v2/AppTopbar.tsx` - Wired logout to POST route

### **Existing Files (7)**
- `lib/fetchJSON.ts` - Already implemented
- `lib/services/resumes.ts` - Already implemented
- `lib/services/applicationKits.ts` - Already implemented
- `lib/services/linkedinBoost.ts` - Already implemented
- `lib/services/moveGuides.ts` - Already implemented
- `middleware.ts` - Already implemented
- Dashboard already loads data from Supabase

## ✅ **Production Safety**
- ✅ No existing routes touched
- ✅ All changes under `/v2` namespace
- ✅ Server-side authentication validation
- ✅ Proper error handling
- ✅ No secrets exposed to client

## 🚀 **Next Steps**
1. Test all flows locally using the instructions above
2. Run `supabase/sql/initial.sql` in Supabase to create tables
3. Run `supabase/setup-storage.sql` to create storage buckets
4. Implement resume upload, editor, and other features
5. Connect to OpenAI for resume processing