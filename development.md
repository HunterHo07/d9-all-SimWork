# SimulEx Development Guide

## Architecture Overview

SimulEx follows a modern web application architecture with a clear separation between frontend and backend components:

```
SimulEx/
├── fe/                 # Next.js frontend application
├── be/                 # PocketBase backend
├── db/                 # Database scripts and schema (optional)
├── research.md         # Research documentation
├── readme.md           # Project overview
└── development.md      # This file
```

## Frontend Architecture

The frontend follows Next.js 15.3.1 App Router architecture with a focus on component reusability and performance optimization.

### Directory Structure

```
fe/
├── app/                # App router pages and layouts
│   ├── (auth)/         # Authentication routes (login, register)
│   ├── dashboard/      # User dashboard
│   ├── simulations/    # Simulation environments
│   └── analytics/      # Analytics and reporting
├── components/         # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── animations/     # Animation components
│   ├── 3d/             # Three.js components
│   └── simulations/    # Simulation-specific components
├── lib/                # Utility functions and hooks
├── styles/             # Global styles and Tailwind config
└── public/             # Static assets
```

### Component Design Principles

1. **Atomic Design Methodology**
   - Atoms: Basic UI elements (buttons, inputs)
   - Molecules: Combinations of atoms (form fields, cards)
   - Organisms: Complex UI sections (navigation, hero sections)
   - Templates: Page layouts
   - Pages: Complete views

2. **Performance Optimization**
   - Server Components for static content
   - Client Components for interactive elements
   - Image optimization with Next.js Image
   - Code splitting and lazy loading

3. **Animation Philosophy**
   - Purpose-driven animations (not decorative)
   - Performance-conscious implementation
   - Accessibility considerations (reduced motion)
   - Consistent motion language

## Backend Architecture

The backend uses PocketBase for authentication, database, and API functionality.

### Directory Structure

```
be/
├── pb_migrations/      # Database migrations
├── pb_hooks/           # Custom hooks and business logic
├── pb_data/            # Data directory (auto-generated)
└── start.sh            # Startup script
```

### API Design Principles

1. **RESTful Endpoints**
   - Resource-based URLs
   - Appropriate HTTP methods
   - Consistent response formats

2. **Authentication Flow**
   - JWT-based authentication
   - Role-based access control
   - Secure token handling

3. **Data Models**
   - Normalized schema design
   - Appropriate relationships
   - Validation rules

## Development Workflow

### Local Development

1. **Backend Development**
   ```bash
   cd be
   ./start.sh
   ```

2. **Frontend Development**
   ```bash
   cd fe
   npm run dev
   ```

3. **Full Stack Development**
   Run both backend and frontend concurrently.

### Code Style and Standards

1. **TypeScript**
   - Strict type checking
   - Interface-first design
   - Minimal use of `any` type

2. **Component Structure**
   - One component per file
   - Clear prop interfaces
   - Functional components with hooks

3. **CSS Approach**
   - Tailwind utility classes
   - Component-specific styles when needed
   - Global variables for theme consistency

### Testing Strategy

1. **Unit Testing**
   - Component testing with React Testing Library
   - Utility function testing with Jest

2. **Integration Testing**
   - API integration tests
   - Component interaction tests

3. **End-to-End Testing**
   - Critical user flows with Cypress
   - Simulation environment testing

## Performance Optimization

### Frontend Performance

1. **Bundle Size Optimization**
   - Code splitting
   - Tree shaking
   - Dynamic imports

2. **Rendering Optimization**
   - Memoization
   - Virtualization for long lists
   - Optimistic UI updates

3. **Animation Performance**
   - GPU-accelerated properties
   - RequestAnimationFrame for custom animations
   - Debouncing and throttling

### Backend Performance

1. **Query Optimization**
   - Efficient database queries
   - Appropriate indexing
   - Pagination for large datasets

2. **Caching Strategy**
   - Response caching
   - Data caching
   - Static generation where appropriate

## Deployment Pipeline

1. **Build Process**
   - Frontend build with Next.js
   - Backend preparation

2. **Deployment Targets**
   - Frontend: Vercel/Netlify
   - Backend: VPS/Container service

3. **Environment Configuration**
   - Environment variables
   - Configuration files
   - Secrets management

## Contribution Guidelines

1. **Branch Strategy**
   - Feature branches
   - Pull request workflow
   - Code review process

2. **Commit Standards**
   - Semantic commit messages
   - Atomic commits
   - Linked issues

3. **Documentation Requirements**
   - Code comments
   - README updates
   - API documentation
