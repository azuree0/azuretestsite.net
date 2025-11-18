# Render Deployment Guide

Complete guide for deploying Azure site to Render.com with custom domain `azuretestsite.net`.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Deployment Steps](#deployment-steps)
4. [Custom Domain Configuration](#custom-domain-configuration)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Accounts

1. **GitHub Account** - [Sign up](https://github.com)
   - Your code needs to be in a Git repository
   - Render connects directly to GitHub for automatic deployments

2. **Render Account** - [Sign up](https://render.com)
   - Free tier available
   - Can sign up with GitHub for easy integration
   - No credit card required for free tier

### Required Tools

1. **Git** - [Download](https://git-scm.com/downloads)
   ```bash
   git --version
   ```

2. **.NET 8.0 SDK** (for local development/testing)
   ```bash
   dotnet --version
   ```

3. **Docker** (optional, for local testing)
   ```bash
   docker --version
   ```

## Initial Setup

### Step 1: Prepare Your Code

Your project already includes:
- ✅ `Dockerfile` - Docker configuration for .NET 8
- ✅ `render.yaml` - Render service configuration
- ✅ `Program.cs` - Updated to use PORT environment variable

### Step 2: Initialize Git Repository

If you haven't already:

```bash
cd "C:\Users\azure\OneDrive\Documents\Code\Axiom\site"
git init
git add .
git commit -m "Initial commit - Ready for Render deployment"
```

### Step 3: Push to GitHub

1. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository (e.g., `azure-site`)
   - Don't initialize with README (you already have one)

2. **Push Your Code**:
   ```bash
   git remote add origin https://github.com/yourusername/azure-site.git
   git branch -M main
   git push -u origin main
   ```

## Deployment Steps

### Step 1: Sign Up for Render

1. Go to [render.com](https://render.com)
2. Click **Get Started for Free**
3. Sign up with GitHub (recommended) or email
4. Verify your email if required

### Step 2: Create New Web Service

1. **In Render Dashboard**:
   - Click **New** button (top right)
   - Select **Web Service**

2. **Connect Repository**:
   - Click **Connect account** if not already connected
   - Authorize Render to access your GitHub repositories
   - Select your repository from the list

3. **Configure Service**:
   - **Name:** `azuretestsite` (or your preferred name)
   - **Region:** Choose closest to your users
     - `Oregon (US West)` - US West Coast
     - `Ohio (US East)` - US East Coast
     - `Frankfurt (EU)` - Europe
     - `Singapore (APAC)` - Asia Pacific
   - **Branch:** `main` (or `master`)
   - **Root Directory:** Leave empty (or `.` if needed)
   - **Runtime:** `Docker` (auto-detected from Dockerfile)
   - **Dockerfile Path:** `./Dockerfile` (auto-detected)
   - **Docker Context:** `.` (auto-detected)
   - **Plan:** `Free`

4. **Environment Variables** (optional):
   - `ASPNETCORE_ENVIRONMENT` = `Production` (already in render.yaml)
   - Add any custom variables your app needs

5. **Create Service**:
   - Click **Create Web Service**
   - Render will start building your application

### Step 3: Monitor Deployment

1. **Watch Build Logs**:
   - Render will show real-time build logs
   - First build takes 5-10 minutes
   - Subsequent deployments are faster

2. **Build Process**:
   - Docker image is built
   - Dependencies are restored
   - Application is compiled
   - Container is started

3. **Deployment Complete**:
   - You'll see "Your service is live"
   - URL: `https://azuretestsite.onrender.com`

### Step 4: Verify Deployment

1. **Visit Your Site**:
   - Open `https://azuretestsite.onrender.com`
   - Check all pages load correctly
   - Verify static files (CSS/JS) are loading

2. **Check Logs**:
   - Go to **Logs** tab in Render dashboard
   - Look for any errors or warnings

## Custom Domain Configuration

### Step 1: Add Custom Domain in Render

1. **In Render Dashboard**:
   - Go to your service
   - Click **Settings** tab
   - Scroll to **Custom Domains**
   - Click **Add Custom Domain**

2. **Enter Domain**:
   - Domain: `azuretestsite.net`
   - Click **Save**

3. **Get DNS Instructions**:
   - Render will show DNS configuration options
   - You'll see either:
     - **CNAME record** (recommended)
     - **A record** (alternative)

### Step 2: Configure DNS at Domain Registrar

#### Option A: CNAME Record (Recommended)

1. **Go to Your Domain Registrar**:
   - Log in to your domain provider (Namecheap, GoDaddy, etc.)
   - Navigate to DNS management

2. **Add CNAME Record**:
   - **Type:** CNAME
   - **Name/Host:** `@` or `azuretestsite.net`
   - **Value/Target:** The CNAME target provided by Render
     - Example: `azuretestsite.onrender.com` or similar
   - **TTL:** 3600 (or default)

3. **For www Subdomain** (optional):
   - **Type:** CNAME
   - **Name/Host:** `www`
   - **Value/Target:** `azuretestsite.net`
   - **TTL:** 3600

#### Option B: A Record (Alternative)

1. **Get IP Address from Render**:
   - Render will provide an IP address in the DNS instructions

2. **Add A Record**:
   - **Type:** A
   - **Name/Host:** `@` or `azuretestsite.net`
   - **Value:** IP address from Render
   - **TTL:** 3600

### Step 3: SSL Certificate

1. **Automatic Provisioning**:
   - Render automatically provisions SSL certificates
   - Uses Let's Encrypt (free)
   - Certificate is issued automatically once DNS propagates

2. **Wait for DNS Propagation**:
   - DNS changes can take 5 minutes to 48 hours
   - Usually completes within 1-2 hours
   - Check propagation: `nslookup azuretestsite.net`

3. **Verify SSL**:
   - Once DNS propagates, visit `https://azuretestsite.net`
   - You should see a valid SSL certificate
   - Browser will show padlock icon

## Render Free Tier

### Features

- ✅ **750 hours/month** compute time
- ✅ **100 GB/month** bandwidth
- ✅ **Free SSL certificates** (Let's Encrypt)
- ✅ **Automatic deployments** from Git
- ✅ **Custom domains** support
- ✅ **Unlimited** deployments

### Limitations

- ⚠️ **Spin-down**: Services spin down after 15 minutes of inactivity
- ⚠️ **Cold start**: First request after spin-down takes 30-60 seconds
- ⚠️ **No persistent storage**: Use external services for databases
- ⚠️ **Shared resources**: CPU and memory are shared

### Upgrading

If you need:
- No spin-down (always-on)
- More resources
- Faster performance
- Dedicated resources

Consider upgrading to **Starter** ($7/month) or **Standard** ($25/month) plans.

## Environment Variables

### Setting Environment Variables

1. **In Render Dashboard**:
   - Go to your service
   - Click **Environment** tab
   - Click **Add Environment Variable**

2. **Common Variables**:
   - `ASPNETCORE_ENVIRONMENT` = `Production`
   - `ASPNETCORE_URLS` = `http://+:8080` (already set in Dockerfile)

3. **Custom Variables**:
   - Add any variables your application needs
   - They're available as `Environment.GetEnvironmentVariable("VAR_NAME")`

## Continuous Deployment

### Automatic Deployments

Render automatically deploys when you:
- Push to the connected branch (main/master)
- Merge pull requests (if configured)
- Manually trigger deployment

### Manual Deployment

1. **In Render Dashboard**:
   - Go to your service
   - Click **Manual Deploy**
   - Select branch
   - Click **Deploy latest commit**

## Monitoring and Logs

### View Logs

1. **In Render Dashboard**:
   - Go to your service
   - Click **Logs** tab
   - View real-time logs
   - Download logs if needed

### Metrics

1. **In Render Dashboard**:
   - Go to your service
   - View **Metrics** tab
   - See CPU, memory, and request metrics
   - Monitor performance

## Troubleshooting

### Build Fails

**Issue:** Docker build fails
- **Solution:** 
  - Check Dockerfile syntax
  - Verify .NET 8.0 SDK is available
  - Check build logs for specific errors

**Issue:** Dependencies not found
- **Solution:**
  - Ensure `*.csproj` file is correct
  - Check `dotnet restore` works locally
  - Verify all NuGet packages are available

### Deployment Fails

**Issue:** Service won't start
- **Solution:**
  - Check logs for errors
  - Verify PORT environment variable is used
  - Check Program.cs configuration

**Issue:** 502 Bad Gateway
- **Solution:**
  - Service may be spinning up (wait 30-60 seconds)
  - Check application logs
  - Verify health check path is correct

### Custom Domain Issues

**Issue:** Domain not resolving
- **Solution:**
  - Wait for DNS propagation (up to 48 hours)
  - Verify DNS records are correct
  - Use `nslookup` or `dig` to check DNS

**Issue:** SSL certificate not issued
- **Solution:**
  - Wait for DNS to fully propagate
  - Verify domain points to Render
  - Check Render dashboard for SSL status

### Performance Issues

**Issue:** Slow first load
- **Solution:**
  - This is normal on free tier (cold start)
  - Consider upgrading to paid plan for always-on
  - Use a service like UptimeRobot to keep service warm

**Issue:** Timeout errors
- **Solution:**
  - Free tier has request timeout limits
  - Optimize your application
  - Consider upgrading plan

## Local Testing

### Test Docker Build

```bash
# Build Docker image
docker build -t azuretestsite .

# Run container
docker run -p 8080:8080 -e PORT=8080 azuretestsite

# Visit http://localhost:8080
```

### Test with Render Environment

```bash
# Set environment variables
$env:PORT = "8080"
$env:ASPNETCORE_ENVIRONMENT = "Production"

# Run application
dotnet run
```

## Next Steps

After successful deployment:

1. ✅ **Set up custom domain** (see above)
2. ✅ **Configure monitoring** (Render dashboard)
3. ✅ **Set up alerts** (optional)
4. ✅ **Optimize performance** (if needed)
5. ✅ **Set up staging environment** (optional)

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [.NET on Render](https://render.com/docs/deploy-dotnet)
- [Docker Documentation](https://docs.docker.com/)
- [Render Status Page](https://status.render.com/)

---

**Need Help?**
- Check Render dashboard logs
- Review Render documentation
- Contact Render support (available on paid plans)

