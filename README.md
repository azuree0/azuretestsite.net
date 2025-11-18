https://azuretestsite.onrender.com

<img width="2537" height="1143" alt="a" src="https://github.com/user-attachments/assets/96b28a87-13a6-4f72-841e-be1cfcf56a1d" />


## Project Structure

```
site/
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
│   │   ├── buildings.wasm     # WebAssembly for 3D rendering
│   │   └── site.js            # Interactive JavaScript effects
│   └── lib/                   # Third-party libraries
│       ├── bootstrap/          # Bootstrap 5 framework
│       ├── jquery/            # jQuery library
│       ├── jquery-validation/ # jQuery validation
│       └── jquery-validation-unobtrusive/ # Unobtrusive validation
├── Properties/
│   └── launchSettings.json   # Launch configuration
├── Dockerfile                # Docker configuration for Render deployment
├── render.yaml               # Render service configuration
├── Program.cs                # Application entry point
├── AzureSite.csproj          # Project file
└── appsettings.json          # Application settings
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
