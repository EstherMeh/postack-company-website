# Postack Company Website

**File Structure**

```
/postack-company-website
│
├── /components                  # Your React components
│   ├── /Hosting                 # Hosting-related components
│   │   └── HostingServiceRequestForm.tsx
│   ├── /Navbar                  # Navbar component
│   │   └── Navbar.tsx
│   ├── /Footer                  # Footer component
│   │   └── Footer.tsx
│   └── /Review                  # Review-related components
│       ├── ReviewForm.tsx
│       └── TestimonialSection.tsx
│
├── /api                         # API routes for your forms
│   ├── /contact                 # Contact-related API routes
│   │   └── contact.tsx
│   ├── /services                # Services-related API routes
│   │   └── services.tsx
│   └── /hosting                 # Hosting-related API routes
│   |    └── hosting.tsx
|   |    └── hostingServiceRequest.tsx
|   |
|   └── /reviews                 # Reviews-related API routes
|       └── reviews.tsx
|         └── reviewForm.tsx
│
├── /public                      # Public assets (images, icons)
│   ├── /images
│   │   ├── logo.png
│   │   └── hero-background.jpg
│   └── /favicon.ico
│
├── .gitignore                   # Git ignore file
├── package.json                 # Project dependencies and scripts
├── next.config.js               # Next.js configuration
├── README.md                    # Project documentation
├── tsconfig.json                # TypeScript configuration

```

**Development Guidelines**

- **Pull Requests**:
  - All changes must be made via pull requests.
  - Ensure your pull request has a clear description of the changes made.
  - At least one team member must review and approve the pull request before it can be merged.
  - Only push complete, optimized, and working features to the main branch.

- **Git**:
  - Use meaningful commit messages.
  - Avoid committing sensitive information.

**Build and Deployment**

- Run `npm install` to install dependencies.
- Use `npm run dev` to start the development server.
- Use `npm run build` to create a production build.
- Use `npm start` to serve the production build.

**Testing**

- Ensure all components and API routes are tested before deployment.
- Use appropriate testing libraries for unit and integration tests.

**Notes**

- The `.next` directory is auto-generated and should not be edited manually.
- Follow the file structure and naming conventions for consistency.
