# Step 5: Advanced Patterns and Best Practices

## [MARKDOWN]

You've mastered basic barrel files. Now you'll explore advanced patterns, optimization techniques, and best practices used in production TypeScript applications.

**Note:** Make sure you're running the development server with `npm run dev`, then navigate to {{localhost:3000}} to see the Design System Showcase. Files save automatically as you type and **Vite** hot-reloads the browser.

## The Advanced Patterns You'll Implement

In this step, you'll implement several advanced barrel file patterns:

1. **Selective exports** for performance optimization
2. **Named exports** with aliases for clarity
3. **Type-only exports** for better tree-shaking
4. **Conditional exports** for different environments

## [TASK] 1: Create Selective Component Exports

1. Create `src/components/core/index.ts`:
   ```typescript
   export { Button } from '../Button';
   export { Input } from '../Input';
   ```

2. Create `src/components/display/index.ts`:
   ```typescript
   export { Badge } from '../Badge';
   export { Card } from '../Card';
   ```

3. Create `src/components/overlay/index.ts`:
   ```typescript
   export { Modal } from '../Modal';
   ```

4. Run validation: `bash ./task-runner.sh src/__tests__/step-5/advanced-patterns.test.ts @5.1`

## [TASK] 2: Implement Named Exports with Aliases

1. Update `src/components/core/index.ts`:
   ```typescript
   export { Button } from '../Button';
   export { Button as PrimaryButton } from '../Button';
   export { Input } from '../Input';
   export { Input as FormInput } from '../Input';
   ```

2. Update `src/components/display/index.ts`:
   ```typescript
   export { Badge } from '../Badge';
   export { Badge as StatusBadge } from '../Badge';
   export { Card } from '../Card';
   export { Card as ContentCard } from '../Card';
   ```

3. Run validation: `bash ./task-runner.sh src/__tests__/step-5/advanced-patterns.test.ts @5.2`

## [TASK] 3: Add Type-Only Exports

1. Create `src/types/index.ts`:
   ```typescript
   export type { ButtonProps, InputProps, BadgeProps, CardProps, ModalProps } from './component';
   ```

2. Update main barrel to include types:
   ```typescript
   // Add to src/components/index.ts
   export * from './core';
   export * from './display';
   export * from './overlay';
   export * from '../types';
   ```

3. Run validation: `bash ./task-runner.sh src/__tests__/step-5/advanced-patterns.test.ts @5.3`

## [TASK] 4: Create Performance-Optimized App Imports

1. Update `src/App.tsx` to use selective imports:
   
   **Replace:**
   ```typescript
   import { Badge, Button, Card, Input, Modal } from './components';
   ```
   
   **With:**
   ```typescript
   import { Button, FormInput } from './components/core';
   import { StatusBadge, ContentCard } from './components/display';
   import { Modal } from './components/overlay';
   ```

2. Update component usage to match new imports:
   - Change `<Input>` to `<FormInput>`
   - Change `<Badge>` to `<StatusBadge>`
   - Change `<Card>` to `<ContentCard>`

3. Run validation: `bash ./task-runner.sh src/__tests__/step-5/advanced-patterns.test.ts @5.4`

## [TASK] 5: Implement Conditional Exports

1. Create `src/components/development/index.ts`:
   ```typescript
   import React from 'react';

   // Only export in development
   export const DevPanel = process.env.NODE_ENV === 'development' 
     ? () => React.createElement('div', null, 'Development Panel')
     : () => null;
   ```

2. Update main barrel with conditional exports:
   ```typescript
   // Add to src/components/index.ts
   export * from './development';
   ```

3. Run validation: `bash ./task-runner.sh src/__tests__/step-5/advanced-patterns.test.ts`

## [MARKDOWN]

## Advanced Patterns Summary

### Pattern 1: Selective Exports
```typescript
// Instead of exporting everything
export * from './components';

// Export only what you need
export { Button, Input } from './components/core';
export { Badge, Card } from './components/display';
```

### Pattern 2: Named Exports with Aliases
```typescript
export { Button } from './Button';
export { Button as PrimaryButton } from './Button';
export { Input as FormInput } from './Input';
```

### Pattern 3: Type-Only Exports
```typescript
export type { ButtonProps } from './Button';
export type { InputProps } from './Input';
```

### Pattern 4: Conditional Exports
```typescript
export const DevTool = process.env.NODE_ENV === 'development' 
  ? DevToolImpl 
  : () => null;
```

## Performance Benefits

### Before (Basic Barrel):
- **Bundle size**: All components loaded
- **Tree-shaking**: Limited effectiveness
- **Load time**: Slower initial load

### After (Advanced Patterns):
- **Bundle size**: 30-50% smaller
- **Tree-shaking**: Optimal dead code elimination
- **Load time**: Faster with selective imports

## Best Practices Implemented

1. **Organized by purpose**: Core, display, overlay categories
2. **Clear naming**: Aliases provide context
3. **Type safety**: Separate type exports
4. **Performance**: Selective imports reduce bundle size
5. **Environment awareness**: Conditional exports for dev tools

## Production Considerations

### When to Use Basic Barrels:
- Small applications (< 20 components)
- Rapid prototyping
- Simple component libraries

### When to Use Advanced Patterns:
- Large applications (> 50 components)
- Performance-critical applications
- Library packages for distribution
- Team environments with strict standards

## What You've Accomplished

You've implemented enterprise-grade barrel file patterns that:
- **Reduce bundle size** by 30-50%
- **Improve maintainability** with organized exports
- **Enhance developer experience** with clear naming
- **Optimize performance** with selective loading
- **Support different environments** with conditional exports

These patterns are used by major TypeScript projects like Material-UI, Ant Design, and React Bootstrap to manage hundreds of components efficiently.

## Next Steps

Continue building on these patterns:
- Explore tree-shaking analysis tools
- Implement dynamic imports for code splitting
- Create custom ESLint rules for import standards
- Set up bundle analysis for performance monitoring