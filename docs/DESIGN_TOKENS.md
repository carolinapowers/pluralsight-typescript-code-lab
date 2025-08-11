# Design Token System

A TypeScript-first design token system that provides type safety, performance, and maintainability through automated CSS variable generation and CSS Modules integration.

## Architecture Overview

```
TypeScript Tokens (Source of Truth)
        ↓
    Generated CSS Variables
        ↓
    CSS Modules + TypeScript Plugin
        ↓
    Type-Safe Components
```

**Key Principle**: Design decisions are defined once in TypeScript and automatically flow through the entire styling system with full type validation.

## How It Works

### 1. TypeScript Design Tokens
All design decisions are defined in TypeScript for maximum type safety:

```typescript
// src/tokens/colors.ts
export const Colors = {
  primary: {
    500: '#3b82f6',
    600: '#2563eb'
  }
}
```

### 2. Automatic CSS Generation
The system generates CSS custom properties from TypeScript tokens:

```bash
npm run generate:css
```

Creates:
```css
/* src/styles/tokens.css */
:root {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
}
```

### 3. CSS Modules Integration
CSS modules reference the generated variables:

```css
/* Button.module.css */
.primary {
  background-color: var(--color-primary-500);
}
.primary:hover {
  background-color: var(--color-primary-600);
}
```

### 4. Type-Safe Components
Components use TypeScript props that map to CSS classes:

```typescript
// Button.tsx
import { ButtonProps } from '../../types/component';
import styles from './Button.module.css';

export const Button: React.FC<ButtonProps> = ({ variant }) => {
  return <button className={styles[variant]}>Click</button>
  // ↑ TypeScript validates variant prop
  // ↑ CSS Modules plugin validates styles.variant exists
}
```

## Two-Layer Type Safety

### Layer 1: Custom Token System
- **Purpose**: Validates design consistency and component prop types
- **What it checks**: Ensures variant/size props match design token definitions
- **Files**: `src/tokens/*.ts`, `src/types/component.ts`

```typescript
// Type safety for design values
type ButtonProps = {
  variant: 'primary' | 'secondary'  // ← Validated by our token types
}
```

### Layer 2: CSS Modules Plugin
- **Purpose**: Validates CSS class names actually exist
- **What it checks**: Ensures CSS module imports reference valid classes
- **Plugin**: `typescript-plugin-css-modules`

```typescript
// Type safety for CSS classes
styles.primary  // ✅ Plugin ensures this class exists in CSS
styles.wrong    // ❌ Plugin shows TypeScript error
```

### How They Complement Each Other

```typescript
const Button = ({ variant }: ButtonProps) => {
  // Layer 1: TypeScript ensures variant is 'primary' | 'secondary' 
  // Layer 2: Plugin ensures styles[variant] class exists in CSS
  return <button className={styles[variant]} />
}

// Both layers working together:
<Button variant="primary" />   // ✅ Valid design token + CSS class exists
<Button variant="purple" />    // ❌ Layer 1: Invalid design token
<Button variant="primary" />   // ❌ Layer 2: If .primary missing from CSS
```

## Project Structure

### Token Files
- `src/tokens/colors.ts` - Color palette
- `src/tokens/spacing.ts` - Spacing scale  
- `src/tokens/typography.ts` - Typography system
- `src/tokens/shadows.ts` - Shadow definitions

### Generated Files
- `src/styles/tokens.css` - CSS variables (auto-generated, committed to git)

### System Files
- `src/utils/generateCSSVariables.ts` - Token to CSS converter
- `scripts/generate-css-vars.ts` - CLI generation script
- `src/vite-env.d.ts` - CSS module type declarations
- `tsconfig.json` - TypeScript plugin configuration

### Component Files
- `src/components/**/*.module.css` - Scoped component styles
- `src/components/**/*.tsx` - Type-safe component implementations

## Available Scripts

### Type Checking
```bash
npm run typecheck              # Quick TypeScript validation
npm run typecheck:with-tokens  # Full validation with fresh CSS generation  
npm run typecheck:full         # Comprehensive validation (alias)
```

### Development
```bash
npm run generate:css  # Generate CSS variables from tokens
npm run dev          # Start development (auto-generates CSS)
npm run build        # Build project (includes full type checking)
npm run test         # Run tests (includes full type checking)
```

### Code Quality
```bash
npm run format       # Format code with Prettier
npm run lint         # Lint TypeScript and React code
```

## Automatic Validation

The system includes automatic type checking to prevent broken builds:

- **`npm run build`** → Runs `typecheck:full` before compilation
- **`npm run test`** → Runs `typecheck:full` before test execution
- **`npm run dev`** → Generates fresh CSS on startup

This ensures:
1. Design tokens are always fresh
2. CSS variables match TypeScript definitions
3. CSS classes exist for all component usage
4. No broken styles reach production

## Key Benefits

- **🔒 Type Safety**: End-to-end validation from design tokens to components
- **⚡ Performance**: Zero runtime overhead - all styling handled by CSS
- **🎯 Single Source of Truth**: All design decisions originate from TypeScript
- **🔄 Automatic Sync**: CSS variables stay synchronized with token changes
- **🛠️ Developer Experience**: Full IntelliSense, auto-completion, and refactoring
- **📦 Build Safety**: Comprehensive validation prevents deployment of broken styles

## Best Practices

1. **Update tokens, not CSS**: Modify `src/tokens/*.ts` files rather than CSS directly
2. **Run generation**: Use `npm run generate:css` after token changes
3. **Semantic naming**: Use design-focused names (`primary-500` not `blue`)
4. **Commit generated CSS**: `tokens.css` is required for builds and should be committed

## Configuration

### TypeScript Plugin Setup
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

### VS Code Integration
- Plugin works automatically with TypeScript language service
- Restart TS server after plugin installation: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
- Auto-completion available when typing `styles.`
