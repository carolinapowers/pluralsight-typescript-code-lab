# Step 2: Experience Import Chaos - Feel the Pain

## Getting Started

Before exploring the code, you'll get your app running:

1. Open **Terminal** and run:
   ```bash
   npm run dev
   ```
2. Vite starts the development server at `http://localhost:5173`
3. Click the URL in **Terminal** to open your app
4. Keep this browser tab open - changes auto-refresh thanks to hot module reload

You should see the Design System Showcase with buttons, inputs, cards, and other components.

## The Current State

Open `src/App.tsx` in the editor. You'll see 8 import statements needed for just 5 components and 3 utilities:

```typescript
import React, { useState } from 'react';
import { Badge } from './components/Badge/Badge';
import { Button } from './components/Button/Button';
import { Card } from './components/Card/Card';
import { Input } from './components/Input/Input';
import { Modal } from './components/Modal/Modal';
import { formatCurrency, formatDate } from './utils/formatters';
import { isValidEmail } from './utils/validators';
import styles from './App.module.css';
```

The repetitive `./components/[Name]/[Name]` pattern becomes painful as applications grow.

## Task 1: Add Number Formatting

Your app displays prices and dates but not formatted numbers. You'll add that capability.

Import and use the `formatNumber` utility to display a purchase count.

1. Explore `src/utils/formatters.ts` to find available formatting functions
2. Add `formatNumber` to your existing formatter imports in `App.tsx`
3. In the **Product Card** section, add: "Purchased by 15,789 developers"
4. Save the file and verify the formatted number appears in your browser

You'll see "Purchased by 15,789 developers" with proper comma formatting in the **Product Card**.

## Task 2: Discover Hidden Utilities

Most utilities remain unused because developers don't know they exist. You'll discover what's hidden.

Use console logging to discover all available but unused utilities.

1. Import all formatters and validators using namespace imports:
   ```typescript
   import * as AllFormatters from './utils/formatters';
   import * as AllValidators from './utils/validators';
   ```

2. Add console logs inside your App component to list available functions

3. Open **Developer Console** (`F12`) to see the output

4. Count how many utilities you're NOT using

5. Remove these temporary imports and console logs after reviewing

You'll identify at least 7 unused utility functions in the console.

## Understanding the Problem

This simplified example has:
- 5 components
- 10+ utilities (but only using 3)
- 4 token files (not even imported)
- 8 import lines

Production design systems typically have:
- 50+ components
- 30+ utilities
- 10+ token files
- 60+ imports per file

Each new feature requires:
1. Finding the correct file location
2. Updating import statements
3. Remembering exact paths
4. Fixing broken imports when files move

## Verification Checkpoint

Before continuing, verify:
- Development server runs at `http://localhost:5173`
- "Purchased by 15,789 developers" displays with comma formatting
- You discovered 7+ unused utilities via console logging
- File changes automatically refresh in the browser

## What's Next

You've experienced the import chaos firsthand. You see how:
- Import statements multiply quickly
- Useful utilities remain undiscovered
- Path memorization becomes a burden
- Refactoring risk increases

In Step 3, you'll create your first barrel file and transform this:
```typescript
import { formatCurrency, formatDate, formatNumber } from './utils/formatters';
import { isValidEmail } from './utils/validators';
```

Into this:
```typescript
import { formatCurrency, formatDate, formatNumber, isValidEmail } from './utils';
```


Continue to Step 3: Create Your First Barrel File

