# GitHub Pages Deployment Guide

This guide will help you deploy your Smart Carbon Tracker to GitHub Pages with Firebase authentication.

## Prerequisites

- GitHub account
- Firebase project set up (you already have this!)
- Git repository pushed to GitHub

## Step-by-Step Deployment

### 1. Configure GitHub Secrets

Your Firebase credentials should **NEVER** be committed to the repository. Instead, we'll use GitHub Secrets.

1. Go to your GitHub repository: `https://github.com/harish-ram/carbon-tracker`
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** and add each of the following:

| Secret Name | Value (from your .env file) |
|-------------|----------------------------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyBlQs46HmEjGDFtnC6aEb2FkW4x2KJAn28` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `smart-carbon-tracker.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `smart-carbon-tracker` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `smart-carbon-tracker.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `463600178918` |
| `VITE_FIREBASE_APP_ID` | `1:463600178918:web:36fecbe3408eb90b078d27` |
| `VITE_API_URL` | `http://localhost:5000/api` (or your production API) |
| `VITE_CARBON_API_KEY` | (optional - if you have one) |
| `VITE_ELECTRICITY_MAP_API_KEY` | (optional - if you have one) |

**Important:** Remove any quotes from the values when adding them as secrets!

### 2. Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Under **Branch**, select `gh-pages` and `/ (root)`
4. Click **Save**

### 3. Update Firebase Authorized Domains

Since your app will be hosted on GitHub Pages, you need to authorize the domain:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `smart-carbon-tracker`
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain** and add: `harish-ram.github.io`
5. Click **Add**

### 4. Deploy Your Application

The deployment workflow is already configured and will run automatically when you push to the `main` branch.

To deploy now:

```powershell
# Make sure all changes are committed
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 5. Monitor Deployment

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. You'll see the "Deploy to GitHub Pages" workflow running
4. Wait for it to complete (usually takes 2-3 minutes)
5. Once complete, your app will be live at: `https://harish-ram.github.io/carbon-tracker/`

## Manual Deployment (Alternative)

If you prefer to deploy manually instead of using GitHub Actions:

```powershell
# Build the application
npm run build

# Deploy to GitHub Pages
npm run deploy
```

**Note:** Manual deployment won't include Firebase credentials from GitHub Secrets, so the app won't work properly. Use the automated workflow instead.

## Troubleshooting

### Issue: Firebase authentication not working on GitHub Pages

**Solution:** Make sure you've added `harish-ram.github.io` to Firebase Authorized Domains (Step 3 above).

### Issue: 404 errors when refreshing pages

**Solution:** This is expected with GitHub Pages and HashRouter. The app uses HashRouter specifically to handle this. URLs will have `#` in them (e.g., `https://harish-ram.github.io/carbon-tracker/#/dashboard`).

### Issue: Deployment workflow fails

**Solution:** 
- Check that all GitHub Secrets are added correctly (no quotes, no spaces)
- Verify the secret names match exactly (case-sensitive)
- Check the Actions tab for specific error messages

### Issue: App loads but shows "Invalid API key" error

**Solution:** 
- Verify all Firebase secrets are added to GitHub
- Remove any quotes from secret values
- Re-run the workflow after fixing secrets

## Security Best Practices

✅ **DO:**
- Store Firebase credentials in GitHub Secrets
- Keep `.env` in `.gitignore`
- Use different Firebase projects for development and production
- Regularly rotate API keys

❌ **DON'T:**
- Commit `.env` files to the repository
- Share your Firebase credentials publicly
- Use production credentials in development

## Updating Your Deployment

Whenever you make changes to your code:

1. Commit and push to the `main` branch
2. The GitHub Actions workflow will automatically rebuild and deploy
3. Changes will be live in 2-3 minutes

## Rolling Back

If you need to roll back to a previous version:

1. Go to **Actions** tab
2. Find the successful deployment you want to restore
3. Click **Re-run jobs**

## Custom Domain (Optional)

If you want to use a custom domain instead of `harish-ram.github.io`:

1. Purchase a domain (e.g., `smartcarbontracker.com`)
2. In GitHub Settings → Pages, add your custom domain
3. Configure DNS settings with your domain provider
4. Update Firebase Authorized Domains with your custom domain

---

Your application is now ready for production! 🚀

Access it at: **https://harish-ram.github.io/carbon-tracker/**
