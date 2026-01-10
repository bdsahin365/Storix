# Vercel Deployment Guide

## Environment Variables for Vercel

Add these to your Vercel project settings:

### Frontend (Web App)
```
NEXT_PUBLIC_SUPABASE_URL=https://hzsryztinvxrmqtooqxi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6c3J5enRpbnZ4cm1xdG9vcXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDU4NDcsImV4cCI6MjA4MzM4MTg0N30.6PV-QrwdqC7PV7o_1NCzyEdT1KvI5qz96xX4_JJLIaE
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.vercel.app
```

### Backend API
```
SUPABASE_URL=https://hzsryztinvxrmqtooqxi.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6c3J5enRpbnZ4cm1xdG9vcXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDU4NDcsImV4cCI6MjA4MzM4MTg0N30.6PV-QrwdqC7PV7o_1NCzyEdT1KvI5qz96xX4_JJLIaE
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6c3J5enRpbnZ4cm1xdG9vcXhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzgwNTg0NywiZXhwIjoyMDgzMzgxODQ3fQ.0LHjZWSBRvMP1IsZOxyCuf8uyAV5JLIEy60taYzI2m8
SUPABASE_JWT_SECRET=3ROERAYMSg0OTeTY8qV0f1+9NCpNd5Z26I39hcY/TpM15wnBE7gMphOLKsHpmsmqR7sg7WplZEk4pfu+FCFgSg==
DATABASE_URL=postgresql://postgres.hzsryztinvxrmqtooqxi:Storix-pro-5858@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres
PORT=3001
```

## Deployment Steps

### 1. Commit and Push Changes
```bash
git add .
git commit -m "feat: settings UI with tabs, improved auth logging"
git push origin main
```

### 2. Deploy Backend First
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. **Root Directory**: `apps/backend`
5. **Framework Preset**: Other
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`
8. **Install Command**: `npm install`
9. Add all backend environment variables listed above
10. Deploy

### 3. Deploy Frontend
1. Create another Vercel project
2. Import the same Git repository
3. **Root Directory**: `apps/web`
4. **Framework Preset**: Next.js
5. Add all frontend environment variables
6. **IMPORTANT**: Update `NEXT_PUBLIC_API_URL` with your backend URL from step 2
7. Deploy

### 4. Update Frontend Environment
After backend deployment, update the frontend's `NEXT_PUBLIC_API_URL` to point to your backend URL.

## Important Notes

⚠️ **BEFORE PRODUCTION**: Re-enable auth guards in `shops.controller.ts` - they are currently disabled for testing!

⚠️ **Database Sync**: Set `synchronize: false` in `app.module.ts` for production to prevent accidental schema changes.
