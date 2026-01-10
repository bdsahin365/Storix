# Railway Deployment Guide

## Quick Start

1. **Go to Railway**: https://railway.app
2. **Sign in** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select**: `bdsahin365/Storix`

## Configuration

### Build Settings
Railway will auto-detect the configuration from `railway.json`, but verify:
- **Root Directory**: Leave blank (monorepo detected automatically)
- **Build Command**: `cd apps/backend && npm install && npm run build`
- **Start Command**: `cd apps/backend && npm run start:prod`

### Environment Variables

Add these in Railway dashboard (Settings → Variables):

```env
SUPABASE_URL=https://hzsryztinvxrmqtooqxi.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6c3J5enRpbnZ4cm1xdG9vcXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDU4NDcsImV4cCI6MjA4MzM4MTg0N30.6PV-QrwdqC7PV7o_1NCzyEdT1KvI5qz96xX4_JJLIaE
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6c3J5enRpbnZ4cm1xdG9vcXhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzgwNTg0NywiZXhwIjoyMDgzMzgxODQ3fQ.0LHjZWSBRvMP1IsZOxyCuf8uyAV5JLIEy60taYzI2m8
SUPABASE_JWT_SECRET=3ROERAYMSg0OTeTY8qV0f1+9NCpNd5Z26I39hcY/TpM15wnBE7gMphOLKsHpmsmqR7sg7WplZEk4pfu+FCFgSg==
DATABASE_URL=postgresql://postgres.hzsryztinvxrmqtooqxi:Storix-pro-5858@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres
PORT=3001
NODE_ENV=production
```

## After Backend Deployment

1. **Copy your Railway URL** (e.g., `https://storix-backend.up.railway.app`)

2. **Update Vercel Frontend**:
   - Go to: https://vercel.com/bdsahin365gmailcoms-projects/storix-pro/settings/environment-variables
   - Update these variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-railway-url.up.railway.app
     NEXT_PUBLIC_BACKEND_URL=https://your-railway-url.up.railway.app
     ```
   - Redeploy frontend

3. **Test**:
   - Frontend: `https://storix-pro.vercel.app/`
   - Backend: `https://your-railway-url.up.railway.app/shops/my-shop`

## Notes

- Railway auto-deploys on every push to `main`
- Free tier: 500 hours/month (plenty for development)
- Logs available in Railway dashboard
- Can upgrade to paid tier later if needed
