# Scoutflair

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/scoutflair/scoutflair-web-revamp)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/scoutflair/scoutflair-web-revamp)

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Styling & Design System](#styling--design-system)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About the Project

**Scoutflair** is a cutting-edge digital platform that bridges the gap between grassroots and professional football. Our mission is to democratize talent discovery by providing elite scouting tools, comprehensive performance data, and intelligent talent mapping to clubs, coaches, and scouts worldwide.

By leveraging modern technology and data-driven insights, Scoutflair empowers football organizations to:

- Discover exceptional talent at all levels
- Analyze player performance with precision
- Make informed recruitment decisions
- Streamline the scouting workflow

This repository contains the official Scoutflair marketing landing page—a modern, fully responsive web experience showcasing our platform's capabilities and vision.

---

## ⚡ Key Features

### 🏆 Platform Capabilities

- **Elite Scouting Tools** – Advanced analytics and player profiling for professional-grade talent evaluation
- **Performance Mapping** – Data-driven insights into player statistics, development trajectories, and potential
- **Talent Database** – Comprehensive player data accessible to clubs and scouts
- **Responsive Gallery** – Interactive image showcase adapting seamlessly across devices (carousel on mobile, grid on desktop)

### 🌐 Landing Page Features

- **Hero Section** – Compelling value proposition with prominent call-to-action ("Unleash Your Potential, Get Discovered!")
- **Core Features Section** – Detailed breakdown of platform capabilities with intuitive iconography
- **About Section** – In-depth narrative about Scoutflair's mission and vision
- **Testimonials Section** – Social proof from coaches, scouts, and players
- **FAQ Section** – Comprehensive answers to common questions
- **Final CTA Section** – Strategic conversion point for user sign-ups

---

## 🛠️ Built With

- **[Next.js 14+](https://nextjs.org/)** – React framework with App Router for production-ready applications
- **[React 18+](https://react.dev/)** – Modern UI library with hooks and component composition
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for rapid UI development
- **[Shadcn/ui](https://ui.shadcn.com/)** – High-quality, accessible component library (Button, Dialog, Accordion, etc.)
- **[Lucide React](https://lucide.dev/)** – Modern icon library with consistent design
- **[TypeScript](https://www.typescriptlang.org/)** – Static typing for enhanced code reliability
- **[PostCSS](https://postcss.org/)** – CSS transformation tool for advanced styling capabilities
- **Google Fonts** – Typography: Merriweather, Lato, and Poppins for premium brand aesthetics

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18.17 or later ([Download](https://nodejs.org/))
- **npm** v9+ or **yarn** v3+ or **pnpm** v8+
- Git for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/valuegate/scoutflair-web-revamp.git
   cd scoutflair-web-revamp
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables) section)

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see the Scoutflair landing page

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Add additional environment variables as needed
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
# NEXT_PUBLIC_ENVIRONMENT=development
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Sensitive keys should not be prefixed.

---

## 📁 Project Structure

```
scoutflair-web-revamp/
├── src/
│   ├── app/                          # Next.js App Router (pages and layouts)
│   │   ├── layout.tsx                # Root layout with global styles
│   │   ├── page.tsx                  # Homepage
│   │   ├── api/                      # API routes (gallery, news, posts, etc.)
│   │   ├── about/                    # About page
│   │   ├── contact/                  # Contact page
│   │   ├── features/                 # Features page
│   │   ├── signin/                   # Sign-in pages (coach, player, scout)
│   │   ├── signup/                   # Sign-up pages (coach, player, scout)
│   │   ├── profile/                  # User profile pages
│   │   └── ...                       # Additional pages
│   ├── components/                   # Reusable React components
│   │   ├── layout/                   # Layout components (header, footer, etc.)
│   │   ├── ui/                       # Shadcn/ui components (Button, Dialog, etc.)
│   │   ├── icons/                    # Custom icon components
│   │   ├── sections/                 # Page sections (Hero, Features, CTA, etc.)
│   │   └── ...                       # Additional components
│   ├── lib/                          # Utility functions and helpers
│   │   ├── api.ts                    # API client functions
│   │   ├── utils.ts                  # Common utilities
│   │   └── ...
│   ├── hooks/                        # Custom React hooks
│   ├── context/                      # React context providers
│   ├── services/                     # Business logic and external services
│   └── ai/                           # AI/ML integrations
├── public/                           # Static assets (images, fonts, etc.)
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Project dependencies and scripts
└── README.md                         # This file
```

---

## 🎨 Styling & Design System

Scoutflair employs a sophisticated, modern design system built on Tailwind CSS:

### Color Palette

- **Primary Navy** – `#192B4D` (brand identity, headers, CTAs)
- **Gold Accent** – `#DB8E08` & `#E5AA42` (highlights, emphasis, premium feel)
- **Off-White** – `#F8F8FF` (backgrounds, cards, readability)

### Typography

- **Merriweather** – Elegant serif font for headlines and hero text
- **Lato** – Clean sans-serif for body copy and UI elements
- **Poppins** – Modern sans-serif for accent text and buttons

### Custom Configuration

The `tailwind.config.ts` file extends the default Tailwind theme with:

- Custom color definitions aligned with brand guidelines
- Enhanced typography scale
- Responsive breakpoints for mobile-first design
- Animated floating background elements for visual depth

### Design Features

- **Fully Responsive** – Mobile, tablet, and desktop optimizations
- **Animated Backgrounds** – Subtle floating elements enhance visual hierarchy
- **Accessibility First** – WCAG compliance through Shadcn/ui component standards
- **Performance Optimized** – Lazy loading images with Next.js Image component

---

## 🌍 Deployment

Scoutflair is optimized for deployment on **Vercel**, the platform built by the creators of Next.js.

### Deploy on Vercel (Recommended)

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account
   - Click "New Project" and select your repository

3. **Configure environment variables**
   - Add your environment variables in the Vercel dashboard
   - Click "Deploy"

4. **Access your live site**
   - Vercel provides a unique URL (e.g., `scoutflair.vercel.app`)
   - Connect your custom domain in project settings

### Alternative Deployment Options

- **Netlify** – Static export or serverless functions
- **AWS Amplify** – Scalable cloud deployment
- **Docker** – Containerized deployment for enterprise environments

---

## 🤝 Contributing

Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the repository**

   ```bash
   git clone https://github.com/yourusername/scoutflair-web-revamp.git
   cd scoutflair-web-revamp
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clear, descriptive commit messages
   - Follow the existing code style and conventions
   - Test thoroughly before submitting

4. **Submit a Pull Request**
   - Push to your forked repository
   - Open a PR with a clear description of your changes
   - Link any related issues

### Guidelines

- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
- Ensure all code is properly typed (TypeScript)
- Add tests for new features where applicable
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

For questions, feedback, or partnership opportunities:

- **Website:** [scoutflair.com](https://scoutflair.com)
- **Email:** info@scoutflair.com
- **Twitter:** [@Scoutflair](https://twitter.com/scoutflair)
- **LinkedIn:** [Scoutflair](https://linkedin.com/company/scoutflair)

---

## 🙏 Acknowledgments

- The Next.js and React communities for exceptional tools and documentation
- Shadcn/ui for providing beautiful, accessible components
- The open-source community for continuous inspiration and support

---

**Made with ⚽ and ❤️ by the Scoutflair Team**
