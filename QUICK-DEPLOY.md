# Quick Deployment Guide - Render

## Prerequisites Check ✅

- ✅ Dockerfile created
- ✅ render.yaml configured
- ✅ Program.cs updated for Render
- ⚠️ GitHub account required
- ⚠️ Render account required

## Step 1: Push Code to GitHub

**Initialize Git** (if not already done):
```bash
cd "C:\Users\azure\OneDrive\Documents\Code\Axiom\site"
git init
git add .
git commit -m "Initial commit - Ready for Render"
```

**Create GitHub Repository**:
1. Go to [GitHub](https://github.com/new)
2. Create a new repository
3. Push your code:
```bash
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Render

1. **Sign up for Render**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub (free account)

2. **Create Web Service**:
   - Click **New** → **Web Service**
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml`

3. **Configure**:
   - Name: `azuretestsite`
   - Region: Choose closest to users
   - Branch: `main`
   - Runtime: `Docker` (auto-detected)
   - Plan: `Free`

4. **Deploy**:
   - Click **Create Web Service**
   - Wait for build to complete (5-10 minutes first time)
   - Your site: `https://azuretestsite.onrender.com`

## Step 3: Set Up Custom Domain

1. **In Render Dashboard**:
   - Go to your service → **Settings** → **Custom Domains**
   - Add: `azuretestsite.net`

2. **Configure DNS**:
   - Add CNAME record at your domain registrar
   - Point to Render's CNAME target
   - Wait for DNS propagation (1-2 hours)

3. **SSL**:
   - Render automatically provisions free SSL
   - HTTPS enabled once DNS propagates

## Troubleshooting

### "Build failed"
- Check Dockerfile syntax
- Verify .NET 8.0 is specified
- Review build logs in Render dashboard

### "Service won't start"
- Check application logs
- Verify PORT environment variable is used
- Check Program.cs configuration

### "Domain not working"
- Wait for DNS propagation (up to 48 hours)
- Verify DNS records are correct
- Check Render dashboard for domain status

### "Slow first load"
- Normal on free tier (cold start after 15 min inactivity)
- First request takes 30-60 seconds
- Consider upgrading for always-on service

## Next Steps

After successful deployment:
1. Set up custom domain `azuretestsite.net` (see README.md)
2. Configure monitoring and logging
3. Set up CI/CD with GitHub Actions (optional)

