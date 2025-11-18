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
   - Your site will be available at: `https://azuretestsite.onrender.com`

### Custom Domain Setup (azuretestsite.net)

1. **Add Custom Domain in Render**:
   - Go to your service → **Settings** → **Custom Domains**
   - Click **Add Custom Domain**
   - Enter: `azuretestsite.net`

2. **Configure DNS**:
   - Render will provide DNS instructions
   - Add a CNAME record at your domain registrar:
     - **Name:** `@` or `azuretestsite.net`
     - **Value:** The CNAME target provided by Render
   - Or add an A record with the IP address provided

3. **SSL Certificate**:
   - Render automatically provisions free SSL certificates
   - HTTPS will be enabled once DNS propagates (usually within minutes)

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