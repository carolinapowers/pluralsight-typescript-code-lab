# Step 2: Experience Import Chaos - Feel the Pain

## [MARKDOWN]

You'll explore the current import structure and experience the pain of managing multiple imports before learning how barrel files solve this problem.

**Note:** Make sure you're running the development server with `npm run dev`, then navigate to {{localhost:3000}} to see the Design System Showcase with buttons, inputs, cards, and other components. Vite watches for changes and automatically updates the browser as you edit files (no manual save needed in Pluralsight Code Labs).

## The Current State

Open `src/App.tsx` in the editor. You'll see 8 import lines for just 5 components and 3 utilities:

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

## [TASK] 1: Add Number Formatting

1. Explore `src/utils/formatters.ts` to find available formatting functions
2. Add `formatNumber` to your existing formatter imports in `App.tsx`
3. In the **Product Card** section, replace `???` with `{formatNumber(15789)}`
4. Verify the formatted number appears in your browser (files save automatically)
5. Run validation: `bash ./task-runner.sh src/__tests__/step-2/import-chaos.test.ts @2.1 @2.4 @2.5 @2.6`

## [TASK] 2: Discover Hidden Utilities

1. Import all formatters and validators using namespace imports:
   ```typescript
   import * as AllFormatters from './utils/formatters';
   import * as AllValidators from './utils/validators';
   ```
2. Add console logs inside your App component to list available functions:
   ```typescript
   console.log('Available formatters:', AllFormatters);
   console.log('Available validators:', AllValidators);
   ```
3. Open **Developer Console** (`F12`) at {{localhost:3000}} to see the output
4. Count how many utilities you're NOT using
5. Run validation: `bash ./task-runner.sh src/__tests__/step-2/import-chaos.test.ts @2.1 @2.2 @2.4 @2.5 @2.6`

**Solution:** Your App component should temporarily look like this:
```typescript
export const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  console.log('Available formatters:', AllFormatters);
  console.log('Available validators:', AllValidators);

  const handleEmailChange = (value: string) => {
    // ... rest of component
  };
```

## [TASK] 3: Clean Up Discovery Code

1. Remove the temporary namespace imports (`import * as AllFormatters...`)
2. Remove the console.log statements you added
3. Keep your original imports from Task 1 (formatNumber should stay)
4. Run validation: `bash ./task-runner.sh src/__tests__/step-2/import-chaos.test.ts @2.1 @2.3 @2.4 @2.5 @2.6`

## [MARKDOWN]

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

You've experienced the import chaos firsthand. You see how:
- Import statements multiply quickly
- Useful utilities remain undiscovered
- Path memorization becomes a burden
- Refactoring risk increases

## What's Next

In **Step 3**, you'll create your first barrel file and transform this:
```typescript
import { formatCurrency, formatDate, formatNumber } from './utils/formatters';
import { isValidEmail } from './utils/validators';
```

Into this:
```typescript
import { formatCurrency, formatDate, formatNumber, isValidEmail } from './utils';
```

Continue to **Step 3: Create Your First Barrel File**