# Postack Company Website

![Version](https://img.shields.io/badge/version-1.0.0-blue) 
![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-13.0+-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue?logo=typescript)

> POSTACK SOLUTIONS - Empowering African businesses with cutting-edge digital solutions.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)
- [FAQ](#faq)

## 🚀 Project Overview

POSTACK SOLUTIONS is a technology solutions provider focused on empowering African businesses with cutting-edge digital solutions. The website showcases our services, hosting solutions, team members, and client testimonials.

### Main Sections

- **Hero**: Main landing section with call-to-action
- **Services**: Our core service offerings
- **Hosting Solutions**: Web hosting packages and options
- **About Us**: Company mission, vision, values, and team
- **Testimonials**: Client reviews and feedback
- **Contact**: Contact form and information

## ✨ Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Dynamic Content**: Interactive service cards and testimonial carousel
- **Animated UI**: Smooth animations and transitions using Framer Motion
- **Form Validation**: Client and server-side validation for all forms
- **SEO Optimized**: Structured metadata and semantic HTML
- **Dark/Light Mode**: Theme toggle functionality
- **Performance Optimized**: Image optimization, code splitting, and lazy loading

## 📸 Screenshots

**

## 💻 Technologies Used

- **Frontend**:
  - Next.js 13+ (App Router)
  - React.js 18
  - TypeScript
  - Tailwind CSS
  - Framer Motion (for animations)
  - DaisyUI (component library)

- **Backend/API**:
  - Next.js API Routes
  - Server Components
  - Database (Neon - Postgres DB)

- **Tooling**:
  - ESLint
  - Prettier
  - PostCSS
  - npm

## 📁 File Structure

```
/postack-company-website
│
├── /app                         # Next.js App Router pages
│   ├── page.tsx                 # Home page
│   └── layout.tsx               # Root layout
│
├── /components                  # Your React components
│   ├── /AboutUs                 # About Us section components
│   │   └── AboutUs.tsx
│   ├── /Hero                    # Hero section components
│   │   └── Hero.tsx
│   ├── /Hosting                 # Hosting-related components
│   │   ├── Hosting.tsx
│   │   └── HostingServiceRequestForm.tsx
│   ├── /Navbar                  # Navbar component
│   │   └── Navbar.tsx
│   ├── /Footer                  # Footer component
│   │   └── Footer.tsx
│   ├── /Services                # Services section components
│   │   ├── Services.tsx
│   │   └── ServiceRequestForm.tsx
│   └── /Review                  # Review-related components
│       ├── ReviewForm.tsx
│       └── TestimonialSection.tsx
│
├── /api                         # API routes for your forms
│   ├── /contact                 # Contact-related API routes
│   │   └── contact.tsx
│   ├── /services                # Services-related API routes
│   │   └── services.tsx
│   ├── /hosting                 # Hosting-related API routes
│   │   ├── hosting.tsx
│   │   └── hostingServiceRequest.tsx
│   │
│   └── /reviews                 # Reviews-related API routes
│       ├── reviews.tsx
│       └── reviewForm.tsx
│
├── /public                      # Public assets (images, icons)
│   ├── /images
│   │   ├── logo.png
│   │   ├── hero-background.jpg
│   │   └── team-members         # Team member images
│   └── /favicon.ico
│
├── /styles                      # Global styles
│   └── globals.css              # Global CSS styles
│
├── .gitignore                   # Git ignore file
├── package.json                 # Project dependencies and scripts
├── next.config.js               # Next.js configuration
├── README.md                    # Project documentation
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/EstherMeh/postack-company-website
   cd postack-company-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
```bash
# Create a new .env file
touch .env

# Then edit .env with your own values
```

4. Start the development server:
   ```bash
   npm run dev

   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Development Guidelines

### Pull Requests
- All changes must be made via pull requests.
- Ensure your pull request has a clear description of the changes made.
- At least one team member must review and approve the pull request before it can be merged.
- Only push complete, optimized, and working features to the main branch.

### Git Workflow
- Use meaningful commit messages.
- Follow conventional commits format: `type(scope): message` (e.g., `feat(navbar): add mobile responsive menu`)
- Avoid committing sensitive information.
- Branch naming: `feature/feature-name`, `bugfix/issue-description`, etc.

### Code Style
- Follow consistent naming conventions (camelCase for variables, PascalCase for components)
- Add proper comments for complex logic
- Create reusable components when possible
- Run linting and formatting before committing:
  ```bash
  npm run lint
  npm run format
  ```

## 📚 API Documentation

### Available Endpoints

- **POST /api/contact**
  - Process contact form submissions
  - Required fields: name, email, message

- **POST /api/services**
  - Submit service requests
  - Required fields: name, email, service, details

- **POST /api/hosting**
  - Submit hosting inquiries
  - Required fields: name, email, plan, requirements

- **POST /api/reviews**
  - Submit client testimonials
  - Required fields: name, position, rating, review
  - Optional fields: image

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deployment Platforms
- Vercel (recommended)
- Netlify
- AWS Amplify
- Custom server deployment

## 🧪 Testing

- Ensure all components and API routes are tested before deployment.
- Use appropriate testing libraries for unit and integration tests.

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Project Lead - [@estherMehe](https://twitter.com/estherneh) [@isaac](https://twitter.com/isaac)

Project Link: [https://github.com/EstherMeh/postack-company-website](https://github.com/EstherMeh/postack-company-website)

## 👏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [DaisyUI](https://daisyui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## ❓ FAQ

### Q: How do I add a new service?
A: Add a new service object to the services array in `components/Services/Services.tsx`.

### Q: How do I update team members?
A: Edit the team members array in `components/AboutUs/AboutUs.tsx`.

### Notes

- The `.next` directory is auto-generated and should not be edited manually.
- Follow the file structure and naming conventions for consistency.
