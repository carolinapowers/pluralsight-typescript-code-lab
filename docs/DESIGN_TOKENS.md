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
# Type checking (multiple options)
npm run typecheck              # Quick TypeScript checking
npm run typecheck:with-tokens   # Full validation with fresh token generation
npm run typecheck:full         # Alias for complete type checking

# Generate CSS variables from tokens
npm run generate:css

# Format all code including CSS
npm run format

# Build and test (includes automatic type checking)
npm run build    # Runs typecheck:full before building
npm run test     # Runs typecheck:full before testing
```

### Type Checking Strategy

The project uses a layered type checking approach:

1. **`typecheck`** - Fast standard TypeScript checking for quick feedback
2. **`typecheck:with-tokens`** - Complete validation including:
   - Fresh CSS variable generation from tokens
   - TypeScript compilation with CSS Modules plugin
   - Validation of both token consistency and CSS class usage
3. **`typecheck:full`** - Comprehensive validation (same as above, cleaner name)

**Automatic Integration:**
- `npm run build` → Always runs full type checking first
- `npm run test` → Always runs full type checking first  
- `npm run dev` → Only generates CSS (for faster startup)

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

## CSS Modules TypeScript Plugin

The project includes `typescript-plugin-css-modules` which provides type safety for CSS class names:

### What It Does
- ✅ **Type Safety**: Validates CSS class names exist at compile time
- ✅ **IntelliSense**: Auto-completion for CSS module classes
- ✅ **Refactoring**: Safe renaming across CSS and TypeScript files
- ✅ **Error Prevention**: Catches typos in class names during development

### Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "plugins": [
      { "name": "typescript-plugin-css-modules" }
    ]
  }
}
```

### How It Works
```typescript
// Component usage - fully type-safe!
import styles from './Button.module.css';

export const Button = ({ variant }: ButtonProps) => {
  return (
    <button 
      className={styles[variant]}  // ✅ Plugin validates this class exists
      // styles.wrongClass would show TypeScript error
    >
  )
}
```

### IDE Setup
- **VS Code**: Plugin works automatically with TypeScript language service
- **Restart TS Server**: Use "TypeScript: Restart TS Server" after plugin installation
- **IntelliSense**: Get auto-completion when typing `styles.`

## Complete Type Safety Stack

This project provides end-to-end type safety:

1. **Design Tokens** (TypeScript) → Ensures consistent design values
2. **CSS Variables** (Generated) → Runtime styling with token values  
3. **CSS Modules** (Scoped) → Prevents style conflicts
4. **TypeScript Plugin** → Validates class name usage
5. **Component Props** → Type-safe variant/size props

```typescript
// Full type safety example:
type ButtonProps = {
  variant: 'primary' | 'secondary'  // ← Your token types
  size: 'sm' | 'md' | 'lg'         // ← Your token types
}

const Button = ({ variant, size }: ButtonProps) => {
  // Both variant/size AND CSS classes are validated!
  return <button className={`${styles.button} ${styles[variant]} ${styles[size]}`} />
}
```

## Future Enhancements

- Consider Style Dictionary for more complex transformations
- Add dark mode support with CSS variable swapping
- Explore CSS-in-TS solutions (Vanilla Extract, Stitches) for advanced use cases