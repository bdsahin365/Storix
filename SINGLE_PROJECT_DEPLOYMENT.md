# Single Vercel Project Deployment Guide

## Overview
This configuration deploys both frontend (Next.js) and backend (NestJS) to a single Vercel project at `storix-pro.vercel.app`.

## How It Works

- **Frontend**: Served from root (`/`)
- **Backend API**: Served from `/api/*` routes
- Both deployed together in one Vercel project

## Configuration Files

### `vercel.json`
- Defines build configuration for both apps
- Routes `/api/*` to backend
- Routes everything else to frontend

### Root `package.json`
- Added `vercel-build` script that builds both apps
- Vercel automatically runs this during deployment

## Environment Variables

Add these to your Vercel project settings:

```env
# Supabase (both frontend and backend need these)
NEXT_PUBLIC_SUPABASE_URL=https://hzsryztinvxrmqtooqxi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6c3J5enRpbnZ4cm1xdG9vcXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDU4NDcsImV4cCI6MjA4MzM4MTg0N30.6PV-QrwdqC7PV7o_1NCzyEdT1KvI5qz96xX4_JJLIaE

# Backend only
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6c3J5enRpbnZ4cm1xdG9vcXhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzgwNTg0NywiZXhwIjoyMDgzMzgxODQ3fQ.0LHjZWSBRvMP1IsZOxyCuf8uyAV5JLIEy60taYzI2m8
SUPABASE_JWT_SECRET=3ROERAYMSg0OTeTY8qV0f1+9NCpNd5Z26I39hcY/TpM15wnBE7gMphOLKsHpmsmqR7sg7WplZEk4pfu+FCFgSg==
SUPABASE_URL=https://hzsryztinvxrmqtooqxi.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6c3J5enRpbnZ4cm1xdG9vcXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDU4NDcsImV4cCI6MjA4MzM4MTg0N30.6PV-QrwdqC7PV7o_1NCzyEdT1KvI5qz96xX4_JJLIaE
DATABASE_URL=postgresql://postgres.hzsryztinvxrmqtooqxi:Storix-pro-5858@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres

# API URL (automatically set to /api for same-domain deployment)
NEXT_PUBLIC_API_URL=/api
```

## Deployment Steps

### 1. Commit Changes
```bash
git add .
git commit -m "feat: single Vercel project deployment configuration"
git push origin main
```

### 2. Configure Vercel Project
1. Go to your existing project: https://vercel.com/your-team/storix-pro
2. Go to **Settings** → **General**
3. **Root Directory**: Leave blank (deploy from root)
4. **Framework Preset**: Next.js
5. **Build Command**: `npm run vercel-build` (or leave default, Vercel will auto-detect)
6. **Output Directory**: Leave default

### 3. Add Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Add all variables listed above
3. Make sure to select **Production**, **Preview**, and **Development** for each

### 4. Redeploy
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**

Or just push a new commit and it will auto-deploy.

## Testing

After deployment:
- Frontend: `https://storix-pro.vercel.app/`
- Backend API: `https://storix-pro.vercel.app/api/shops/my-shop`

## Important Notes

⚠️ **Before Production**:
1. Re-enable auth guards in `apps/backend/src/shops/shops.controller.ts`
2. Set `synchronize: false` in `apps/backend/src/app.module.ts`
3. Remove debug logging if desired

## Troubleshooting

If backend routes don't work:
1. Check Vercel function logs
2. Ensure `apps/backend/dist/main.js` exists after build
3. Verify environment variables are set correctly
