# Lost and Found - MVP

Web application for reporting and finding lost items.

## Commands

- `npm start` - dev server at localhost:4200
- `npm run build` - production build
- `npm test` - run tests (vitest)
- `npx ng generate component <name>` - generate component
- `npx ng generate service <name>` - generate service

## Stack

- Angular 21 with standalone components and signals
- SCSS for styles
- Vitest for testing
- TypeScript strict mode

## Architecture

- Feature-based folder structure: `src/app/<feature>/`
- Each feature gets its own folder with component, service, and routes
- Shared components go in `src/app/shared/`
- Models/interfaces go in `src/app/models/`
- Services that cross features go in `src/app/services/`
- Use Angular signals (not RxJS subjects) for component state
- Use standalone components everywhere (no NgModules)
- Lazy-load feature routes

## Conventions

- Component prefix: `app`
- Single quotes for TypeScript, double quotes for HTML attributes
- 2-space indentation
- Keep components small - extract when logic grows beyond ~100 lines
- Use reactive forms for any form with validation

## MVP Scope

Core features for the MVP:
- Report a lost item (title, description, category, location, date, contact info)
- Report a found item (same fields)
- Browse/search listings
- View item details
- Basic category filtering

Data is stored in-memory or localStorage for MVP (no backend yet).
