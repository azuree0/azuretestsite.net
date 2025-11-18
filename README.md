https://azuretestsite-net.onrender.com/

<img width="2537" height="1143" alt="a" src="https://github.com/user-attachments/assets/46ee6ae4-556d-457d-9d40-a666cd2932e0" />

## Project Structure

```
AzureSite/
├── Controllers/
│   └── HomeController.cs      # Main controller with actions (Index, About, Projects, Contact)
├── Models/
│   └── ErrorViewModel.cs      # Error view model
├── Views/
│   ├── Home/
│   │   ├── Index.cshtml       # Home page with hero section
│   │   ├── About.cshtml       # About page
│   │   ├── Projects.cshtml    # Projects showcase
│   │   ├── Contact.cshtml     # Contact form
│   │   └── Privacy.cshtml     # Privacy policy page
│   └── Shared/
│       ├── _Layout.cshtml    # Main layout template
│       ├── _Layout.cshtml.css # Layout-specific styles
│       ├── _ViewImports.cshtml # View imports
│       ├── _ViewStart.cshtml  # View start configuration
│       ├── _ValidationScriptsPartial.cshtml # Validation scripts
│       └── Error.cshtml       # Error page
├── wwwroot/
│   ├── css/
│   │   └── site.css           # Custom sci-fi/architecture styles
│   ├── js/
│   │   ├── buildings3d.js     # 3D buildings animation (Three.js)
│   │   └── site.js            # Interactive JavaScript effects
│   └── lib/                   # Third-party libraries
│       ├── bootstrap/          # Bootstrap 5 framework
│       ├── jquery/            # jQuery library
│       ├── jquery-validation/ # jQuery validation
│       └── jquery-validation-unobtrusive/ # Unobtrusive validation
├── Properties/
│   └── launchSettings.json   # Launch configuration
├── Program.cs                 # Application entry point
└── AzureSite.csproj          # Project file
```

## Tech Stack

### Backend
- **.NET 8.0**: Latest .NET framework
- **ASP.NET Core MVC**: Model-View-Controller architecture

### Frontend
- **Bootstrap 5**: Responsive grid system and UI components
- **jQuery**: DOM manipulation and event handling
- **Three.js (r128)**: 3D graphics library for building animations

## Running the Project

1. **Build the project**:
   ```bash
   dotnet build
   ```

2. **Run the application**:
   ```bash
   dotnet run
   ```

3. **Access the site**:
   Whatever localhost, dotnet run prints in the console.

## Deployment to Render

This project is configured for deployment to [Render.com](https://render.com) (Free Tier) with the domain `azuretestsite.net`.

### Quick Start Deployment

#### Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Push your code:
     ```bash
     git remote add origin https://github.com/yourusername/your-repo.git
     git branch -M main
     git push -u origin main
     ```

#### Step 2: Deploy to Render

1. **Sign up for Render**:
   - Go to [render.com](https://render.com)
   - Sign up for a free account (GitHub login available)

2. **Create New Web Service**:
   - In Render Dashboard, click **New** → **Web Service**
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` configuration

3. **Configure Service** (or use render.yaml):
   - **Name:** `azuretestsite`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Runtime:** `Docker` (auto-detected from Dockerfile)
   - **Plan:** `Free`

4. **Deploy**:
   - Click **Create Web Service**
   - Render will build and deploy automatically
   - Your site will initially be available at: `https://azuretestsite.onrender.com`
   - After setting up custom domain: `https://azuretestsite.net`

### Custom Domain Setup (azuretestsite.net) - **Required for azuretestsite.net**

**To use `azuretestsite.net` as your primary domain:**

1. **Add Custom Domain in Render**:
   - Go to your Render dashboard → Your service (`azuretestsite`)
   - Click **Settings** tab
   - Scroll to **Custom Domains** section
   - Click **Add Custom Domain**
   - Enter: `azuretestsite.net`
   - Click **Save**

2. **Configure DNS at Your Domain Registrar**:
   - Render will show DNS configuration instructions
   - **Option A - CNAME (Recommended):**
     - Add a CNAME record:
       - **Type:** CNAME
       - **Name/Host:** `@` or `azuretestsite.net` (root domain)
       - **Value/Target:** The CNAME target provided by Render (e.g., `azuretestsite.onrender.com`)
       - **TTL:** 3600 (or default)
   - **Option B - A Record:**
     - Add an A record with the IP address provided by Render
     - Less common, use if CNAME doesn't work

3. **Wait for DNS Propagation**:
   - DNS changes can take 5 minutes to 48 hours
   - Usually completes within 1-2 hours
   - Check propagation: `nslookup azuretestsite.net` or use online DNS checker

4. **SSL Certificate (Automatic)**:
   - Render automatically provisions free SSL certificates via Let's Encrypt
   - HTTPS will be enabled automatically once DNS propagates
   - Usually takes a few minutes after DNS is verified

5. **Verify Domain**:
   - Render will verify the domain automatically
   - Check status in Render dashboard → Settings → Custom Domains
   - Once verified, `https://azuretestsite.net` will be live

### Deployment Files

- `Dockerfile` - Docker configuration for .NET 8
- `render.yaml` - Render service configuration
- `.github/workflows/` - GitHub Actions workflows (optional)

### Prerequisites

- GitHub account
- Render account (free tier available)
- Domain registered (for custom domain - optional)
- .NET 8.0 SDK (for local development)

### Render Free Tier Features

- ✅ Free SSL certificates
- ✅ Automatic deployments from Git
- ✅ Custom domains
- ✅ 750 hours/month compute time
- ✅ 100 GB bandwidth/month
- ⚠️ Services spin down after 15 minutes of inactivity (free tier)
- ⚠️ First request after spin-down may take 30-60 seconds

### Manual Deployment (Alternative)

If you prefer not to use Git:

1. **Build Docker image locally**:
   ```bash
   docker build -t azuretestsite .
   ```

2. **Test locally**:
   ```bash
   docker run -p 8080:8080 azuretestsite
   ```

3. **Push to Docker Hub** and connect to Render

For detailed deployment instructions, see [RENDER-DEPLOY.md](RENDER-DEPLOY.md).
