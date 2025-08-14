# Welcome

This lab teaches you how to organize a React design system using TypeScript barrel files. In 30-45 minutes, you'll learn the module organization patterns used by companies like Netflix, Airbnb, and Microsoft.

## What You'll Build

A complete React design system with:
- **5 Components**: Button, Input, Card, Modal, Badge
- **Design Tokens**: Colors, spacing, typography, shadows
- **Utilities**: Formatters, validators, theme helpers
- **Interactive Demo**: Live showcase of all components

**Note**: Production systems have 50-100+ components. This simplified example focuses on learning the pattern, which scales to any size codebase.

## Your Learning Path

- **Introduction** (here): Setup and understand the problem
- **Step 2**: Experience the import chaos
- **Step 3**: Create your first barrel file
- **Step 4**: Scale to all modules
- **Step 5**: Build the main barrel
- **Step 6**: Optimize for production

## The Problem

Your `App.tsx` has 8 imports that reveal common issues:

```typescript
import { Badge } from './components/Badge/Badge';  // Repetitive paths
import { Button } from './components/Button/Button';  // Deep nesting
import { formatCurrency, formatDate } from './utils/formatters';  // Multiple per file
import { isValidEmail } from './utils/validators';  // Must know exact location
```

This gets worse at scale. Production apps can have 60-80 imports per file.

## Getting Started

### Setup Commands

```bash
npm run dev          # Start dev server
npm run typecheck    # Verify TypeScript
npm run build        # Production build
```

The application will be running on {{localhost:3000}} for you to check out the application and follow along.

### Project Structure

- `src/components/` - React components
- `src/tokens/` - Design tokens
- `src/utils/` - Helper functions
- `src/types/` - TypeScript types
- `src/App.tsx` - Demo showcase

### Verify Setup

1. Run `npm run dev` and confirm the app loads
2. Run `npm run typecheck` with no errors
3. Keep the dev server running while you work

## Why This Matters

Import management is a daily friction that grows over time:
- Developers waste time finding imports
- New team members struggle with file structure
- Refactoring breaks imports across files
- Code reviews mix import changes with business logic

## Success Metrics

You'll transform this:
```typescript
// 8+ messy imports
import { Button } from './components/Button/Button';
import { Card } from './components/Card/Card';
import { formatCurrency } from './utils/formatters';
```

Into this:
```typescript
// 1 clean import
import { Button, Card, formatCurrency } from './design-system';
```

Continue to **Step 2** to explore the current import structure.