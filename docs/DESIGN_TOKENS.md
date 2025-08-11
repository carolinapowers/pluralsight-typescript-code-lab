# Design Token System

## Overview

This project uses a TypeScript-first approach to design tokens, ensuring type safety while maintaining the performance benefits of CSS Modules.

## Architecture

```
TypeScript Tokens (Source of Truth)
        ↓
    Generate CSS Variables
        ↓
    CSS Modules Reference Variables
        ↓
    Components Use Type-Safe Classes
```

## Key Files

### Token Definitions (TypeScript)
- `src/tokens/colors.ts` - Color palette definitions
- `src/tokens/spacing.ts` - Spacing scale
- `src/tokens/typography.ts` - Font families, sizes, weights
- `src/tokens/shadows.ts` - Box shadow definitions

### Token Generation
- `src/utils/generateCSSVariables.ts` - Converts TS tokens to CSS variables
- `scripts/generate-css-vars.ts` - CLI script to run generation
- `src/styles/tokens.css` - Generated CSS variables (committed to git)

### Usage in Components
- `src/components/**/*.module.css` - CSS Modules using CSS variables
- `src/components/**/*.tsx` - Type-safe component implementations

## How It Works

### 1. Define Tokens in TypeScript
```typescript
// src/tokens/colors.ts
export const Colors = {
  primary: {
    500: '#3b82f6',
    600: '#2563eb'
  }
}
```

### 2. Generate CSS Variables
```bash
npm run generate:css
```

This creates:
```css
/* src/styles/tokens.css */
:root {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
}
```

### 3. Use in CSS Modules
```css
/* Button.module.css */
.primary {
  background-color: var(--color-primary-500);
}
.primary:hover {
  background-color: var(--color-primary-600);
}
```

### 4. Type-Safe Component Usage
```typescript
// Button.tsx
import { ButtonProps } from '../../types/component';
import styles from './Button.module.css';

export const Button: React.FC<ButtonProps> = ({ variant }) => {
  // TypeScript ensures variant is valid
  // CSS Module ensures class exists
  return <button className={styles[variant]}>Click</button>
}
```

## Benefits

1. **Single Source of Truth**: All design decisions in TypeScript
2. **Type Safety**: Props validated at compile time
3. **Performance**: CSS Modules = zero runtime overhead
4. **Maintainability**: Change tokens once, regenerate CSS
5. **Developer Experience**: Full IntelliSense support
6. **No Inline Styles**: Clean separation of concerns

## Commands

```bash
# Generate CSS variables from tokens
npm run generate:css

# Format all code including CSS
npm run format

# Build the project
npm run build
```

## Best Practices

1. **Always regenerate** CSS after modifying token files
2. **Commit tokens.css** to version control (it's needed for builds)
3. **Use semantic names** for tokens (e.g., `primary-500` not `blue`)
4. **Keep tokens flat** when possible for easier CSS variable names

## Migration Guide

To migrate a component from inline styles to CSS Modules:

1. Create a `.module.css` file next to the component
2. Move styles to CSS classes using token variables
3. Import the CSS module in the component
4. Replace `style` props with `className`
5. Ensure type safety by using TypeScript props

## Future Enhancements

- Add CSS Modules TypeScript plugin for class name validation
- Consider Style Dictionary for more complex transformations
- Add dark mode support with CSS variable swapping