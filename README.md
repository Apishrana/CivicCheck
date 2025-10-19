# CivicCheck - AI News Credibility Checker

## Overview

CivicCheck is an AI-powered news credibility verification tool that helps users evaluate the trustworthiness of news articles, headlines, and social media posts. The application analyzes submitted text using OpenAI's GPT-5 model to provide credibility assessments with reasoning, confidence scores, and recommended fact-checking sources.

The system follows a Material Design 3 approach with trust-focused customization, emphasizing clarity, credibility, and professional appearance across devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript and Vite
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Custom theme provider supporting light/dark modes with localStorage persistence

**Key Design Decisions**:
- Component-based architecture with reusable UI primitives
- Path aliases (@, @shared, @assets) for clean imports
- Responsive-first design with mobile breakpoint at 768px
- Custom color system based on HSL values for easy theme customization
- Form validation using React Hook Form with Zod resolvers

### Backend Architecture

**Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **API Design**: RESTful endpoints with JSON responses
- **Development Server**: Vite middleware integration for HMR
- **Build Process**: esbuild for production bundling

**API Endpoints**:
- `POST /api/credibility-check`: Submit text for credibility analysis
- `GET /api/credibility-checks/recent`: Retrieve recent credibility checks

**Key Design Decisions**:
- Middleware-based request/response logging
- Centralized error handling with status code propagation
- Development/production environment separation
- Static file serving in production mode

### Data Storage

**Primary Storage**: In-memory storage (MemStorage class)
- Implements IStorage interface for future database migration
- Uses Map data structure with UUID keys
- Maintains chronological ordering for recent checks query

**Database Schema** (Prepared for PostgreSQL via Drizzle ORM):
```typescript
credibility_checks table:
- id (varchar, UUID primary key)
- text (text, not null)
- verdict (text, not null) 
- reasoning (text, not null)
- sources (text array, default empty)
- confidence (integer, nullable)
- createdAt (timestamp, auto-set)
```

**Migration Strategy**:
- Drizzle ORM configured for PostgreSQL with Neon serverless driver
- Schema defined in shared/ directory for type safety
- Zod validation schemas generated from Drizzle schema
- Storage interface allows swapping MemStorage for database implementation

### AI Integration

**Provider**: OpenAI API
- **Model**: GPT-5 (latest as of August 2025)
- **Response Format**: Structured JSON output
- **Analysis Criteria**: Language patterns, claim specificity, emotional manipulation, source attribution

**Credibility Assessment**:
- Three verdict categories: "Likely True", "Possibly False", "Unverified"
- Confidence scores ranging 60-95%
- 2-3 sentence reasoning explanations
- 1-2 fact-checking source recommendations (Snopes, PolitiFact, FactCheck.org, Reuters)

**Design Rationale**: 
- Structured JSON responses ensure consistent parsing
- Confidence ranges prevent false certainty
- System prompt emphasizes uncertainty acknowledgment over definitive claims

### Authentication & Authorization

**Current State**: No authentication implemented
- Public API endpoints
- No user accounts or session management
- All credibility checks are anonymous

**Prepared Infrastructure**:
- connect-pg-simple package included for future PostgreSQL session store
- Express session middleware ready for integration

## External Dependencies

### Third-Party Services

**OpenAI API**:
- Required environment variable: `OPENAI_API_KEY`
- Used for GPT-5 text analysis
- Fallback handling for API errors

**Neon Database** (Configured but not active):
- Serverless PostgreSQL hosting
- Required environment variable: `DATABASE_URL`
- Connection via @neondatabase/serverless driver
- Drizzle ORM for migrations and queries

### UI Component Libraries

**Radix UI**: Headless component primitives
- Comprehensive set: accordion, dialog, dropdown, popover, select, tabs, toast, tooltip, etc.
- Accessibility-first with WAI-ARIA compliance
- Unstyled primitives allowing custom design system

**shadcn/ui**: Pre-styled component layer
- Built on Radix UI primitives
- Tailwind CSS styling with CSS variables
- "New York" style variant
- Component customization via components.json

### Utility Libraries

**Validation & Schemas**:
- Zod for runtime type validation
- drizzle-zod for schema generation from database models

**Date Handling**:
- date-fns for relative time formatting ("2 hours ago")

**Styling**:
- clsx + tailwind-merge for conditional className composition
- class-variance-authority (cva) for component variants

**UI Utilities**:
- cmdk for command palette functionality
- embla-carousel-react for carousel components
- lucide-react for icon system

### Development Tools

**Vite Plugins** (Replit-specific):
- @replit/vite-plugin-runtime-error-modal
- @replit/vite-plugin-cartographer (dev only)
- @replit/vite-plugin-dev-banner (dev only)

**Build Tools**:
- TypeScript compiler for type checking
- esbuild for production server bundling
- PostCSS with Tailwind and Autoprefixer
- Drizzle Kit for database migrations

### Design System Configuration

**Typography**: Inter font family from Google Fonts
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- System-ui fallback

**Color System**:
- Custom HSL-based palette with CSS variables
- Separate light/dark mode definitions
- Semantic naming (primary, destructive, muted, accent)
- Chart colors for verdict visualization (chart-2, chart-3, chart-4)

**Spacing & Layout**:
- Tailwind default spacing scale
- Custom border radius values (sm: 3px, md: 6px, lg: 9px)
- Max-width constraints for content readability