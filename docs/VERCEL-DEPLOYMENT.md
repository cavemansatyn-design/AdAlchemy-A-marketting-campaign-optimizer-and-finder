# Vercel Deployment

This project is ready to deploy as a standard Next.js app on Vercel.

## Import Settings

Use these settings when importing the GitHub repository:

```txt
Framework Preset: Next.js
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

## Environment Variables

Add these in Vercel Project Settings -> Environment Variables:

```env
ANAKIN_API_KEY=your-anakin-key
ANAKIN_WIRE_CHATGPT_ACTION_ID=your-chatgpt-wire-action-id
GROQ_API_KEY=your-groq-key
GROQ_MODEL=llama-3.1-8b-instant
```

Notes:

- Keep `.env.local` local only. It is ignored by git.
- Commit `.env.example` only as a safe template.
- Do not use `NEXT_PUBLIC_` for backend API keys.

## Pre-Deploy Check

Run this before pushing:

```bash
npm run lint
npm run build
```

Warnings are acceptable, but errors should be fixed before deployment.

## Redeploying

After pushing to GitHub, Vercel should redeploy automatically. If it does not, open the Vercel project and click:

```txt
Deployments -> latest deployment -> Redeploy
```
