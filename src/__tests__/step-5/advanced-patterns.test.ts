import { describe, it, expect } from 'vitest'
import { ast, includes } from "@phenomnomnominal/tsquery"
import { readFile } from '../helpers'

const appFile = readFile("src/App.tsx")
const appAst = ast(appFile, "tsx")

/**
 * Step 5: Advanced Patterns and Best Practices
 * 
 * These tests validate that students complete the tasks described in STEP5.md:
 * 1. Create selective component exports
 * 2. Implement named exports with aliases
 * 3. Add type-only exports
 * 4. Create performance-optimized App imports
 * 5. Implement conditional exports
 */

describe('Step 5: Advanced Patterns and Best Practices', () => {
  describe('Task 1: Selective Component Exports', () => {
    it('should create core components barrel @5.1', () => {
      try {
        const coreBarrel = readFile("src/components/core/index.ts")
        const hasButton = coreBarrel.includes('Button') && coreBarrel.includes('../Button')
        const hasInput = coreBarrel.includes('Input') && coreBarrel.includes('../Input')
        
        expect(
          hasButton && hasInput,
          'Create `src/components/core/index.ts` with:\\n' +
            '`export { Button } from \'../Button\';`\\n' +
            '`export { Input } from \'../Input\';`'
        ).toBe(true)
      } catch (error) {
        expect(
          false,
          'Create `src/components/core/index.ts` file.\\n' +
            'This barrel should export core components.'
        ).toBe(true)
      }
    })

    it('should create display components barrel @5.1', () => {
      try {
        const displayBarrel = readFile("src/components/display/index.ts")
        const hasBadge = displayBarrel.includes('Badge') && displayBarrel.includes('../Badge')
        const hasCard = displayBarrel.includes('Card') && displayBarrel.includes('../Card')
        
        expect(
          hasBadge && hasCard,
          'Create `src/components/display/index.ts` with:\\n' +
            '`export { Badge } from \'../Badge\';`\\n' +
            '`export { Card } from \'../Card\';`'
        ).toBe(true)
      } catch (error) {
        expect(
          false,
          'Create `src/components/display/index.ts` file.\\n' +
            'This barrel should export display components.'
        ).toBe(true)
      }
    })

    it('should create overlay components barrel @5.1', () => {
      try {
        const overlayBarrel = readFile("src/components/overlay/index.ts")
        const hasModal = overlayBarrel.includes('Modal') && overlayBarrel.includes('../Modal')
        
        expect(
          hasModal,
          'Create `src/components/overlay/index.ts` with:\\n' +
            '`export { Modal } from \'../Modal\';`'
        ).toBe(true)
      } catch (error) {
        expect(
          false,
          'Create `src/components/overlay/index.ts` file.\\n' +
            'This barrel should export overlay components.'
        ).toBe(true)
      }
    })
  })

  describe('Task 2: Named Exports with Aliases', () => {
    it('should add aliases to core components @5.2', () => {
      const coreBarrel = readFile("src/components/core/index.ts")
      
      const hasPrimaryButton = coreBarrel.includes('PrimaryButton')
      const hasFormInput = coreBarrel.includes('FormInput')
      
      expect(
        hasPrimaryButton && hasFormInput,
        'Add aliases to `src/components/core/index.ts`:\\n' +
          '`export { Button as PrimaryButton } from \'../Button\';`\\n' +
          '`export { Input as FormInput } from \'../Input\';`'
      ).toBe(true)
    })

    it('should add aliases to display components @5.2', () => {
      const displayBarrel = readFile("src/components/display/index.ts")
      
      const hasStatusBadge = displayBarrel.includes('StatusBadge')
      const hasContentCard = displayBarrel.includes('ContentCard')
      
      expect(
        hasStatusBadge && hasContentCard,
        'Add aliases to `src/components/display/index.ts`:\\n' +
          '`export { Badge as StatusBadge } from \'../Badge\';`\\n' +
          '`export { Card as ContentCard } from \'../Card\';`'
      ).toBe(true)
    })
  })

  describe('Task 3: Type-Only Exports', () => {
    it('should create types barrel file @5.3', () => {
      try {
        const typesBarrel = readFile("src/types/index.ts")
        const hasContent = typesBarrel.trim().length > 0
        
        expect(
          hasContent,
          'Create `src/types/index.ts` file.\\n' +
            'This file should export component types.'
        ).toBe(true)
      } catch (error) {
        expect(
          false,
          'Create `src/types/index.ts` file.\\n' +
            'This barrel should export component types.'
        ).toBe(true)
      }
    })

    it('should export component types @5.3', () => {
      const typesBarrel = readFile("src/types/index.ts")
      
      const hasButtonProps = typesBarrel.includes('ButtonProps')
      const hasInputProps = typesBarrel.includes('InputProps')
      const hasBadgeProps = typesBarrel.includes('BadgeProps')
      const hasCardProps = typesBarrel.includes('CardProps')
      const hasModalProps = typesBarrel.includes('ModalProps')
      
      const result = hasButtonProps && hasInputProps && hasBadgeProps && 
                    hasCardProps && hasModalProps
      
      expect(
        result,
        'Export all component types in `src/types/index.ts`:\\n' +
          '`export type { ButtonProps } from \'../components/Button/Button\';`\\n' +
          '`export type { InputProps } from \'../components/Input/Input\';`\\n' +
          'And similar for Badge, Card, Modal props.'
      ).toBe(true)
    })

    it('should update main barrel with type exports @5.3', () => {
      const mainBarrel = readFile("src/components/index.ts")
      
      const hasTypeExports = mainBarrel.includes('../types') || 
                            mainBarrel.includes('./types')
      
      expect(
        hasTypeExports,
        'Add type exports to main barrel:\\n' +
          '`export * from \'../types\';` in `src/components/index.ts`'
      ).toBe(true)
    })
  })

  describe('Task 4: Performance-Optimized App Imports', () => {
    it('should use selective imports in App.tsx @5.4', () => {
      const hasCoreImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./components/core"]'
      )
      const hasDisplayImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./components/display"]'
      )
      const hasOverlayImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./components/overlay"]'
      )
      
      const result = hasCoreImport && hasDisplayImport && hasOverlayImport
      
      expect(
        result,
        'Update `App.tsx` to use selective imports:\\n' +
          '`import { Button, FormInput } from \'./components/core\';`\\n' +
          '`import { StatusBadge, ContentCard } from \'./components/display\';`\\n' +
          '`import { Modal } from \'./components/overlay\';`'
      ).toBe(true)
    })

    it('should not use old barrel import @5.4', () => {
      const hasOldImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./components"]'
      )
      
      expect(
        hasOldImport,
        'Remove old barrel import:\\n' +
          'Delete: `import { ... } from \'./components\';`\\n' +
          'Replace with selective imports from core, display, overlay.'
      ).toBe(false)
    })

    it('should import aliased components @5.4', () => {
      const importsFormInput = includes(
        appAst,
        'ImportSpecifier Identifier[name="FormInput"]'
      )
      const importsStatusBadge = includes(
        appAst,
        'ImportSpecifier Identifier[name="StatusBadge"]'
      )
      const importsContentCard = includes(
        appAst,
        'ImportSpecifier Identifier[name="ContentCard"]'
      )
      
      const result = importsFormInput && importsStatusBadge && importsContentCard
      
      expect(
        result,
        'Import aliased components:\\n' +
          'Use `FormInput`, `StatusBadge`, `ContentCard` instead of original names.'
      ).toBe(true)
    })

    it('should use aliased components in JSX @5.4', () => {
      const usesFormInput = appFile.includes('<FormInput')
      const usesStatusBadge = appFile.includes('<StatusBadge')
      const usesContentCard = appFile.includes('<ContentCard')
      
      const result = usesFormInput && usesStatusBadge && usesContentCard
      
      expect(
        result,
        'Update JSX to use aliased components:\\n' +
          'Change `<Input>` to `<FormInput>`\\n' +
          'Change `<Badge>` to `<StatusBadge>`\\n' +
          'Change `<Card>` to `<ContentCard>`'
      ).toBe(true)
    })
  })

  describe('Task 5: Conditional Exports', () => {
    it('should create development barrel @5.5', () => {
      try {
        const devBarrel = readFile("src/components/development/index.ts")
        const hasDevPanel = devBarrel.includes('DevPanel')
        const hasProcessEnv = devBarrel.includes('process.env.NODE_ENV')
        
        expect(
          hasDevPanel && hasProcessEnv,
          'Create `src/components/development/index.ts` with:\\n' +
            'Conditional `DevPanel` export based on `process.env.NODE_ENV`'
        ).toBe(true)
      } catch (error) {
        expect(
          false,
          'Create `src/components/development/index.ts` file.\\n' +
            'This should contain conditional development exports.'
        ).toBe(true)
      }
    })

    it('should update main barrel with development exports @5.5', () => {
      const mainBarrel = readFile("src/components/index.ts")
      
      const hasDevExports = mainBarrel.includes('./development') ||
                           mainBarrel.includes('../development')
      
      expect(
        hasDevExports,
        'Add development exports to main barrel:\\n' +
          '`export * from \'./development\';` in `src/components/index.ts`'
      ).toBe(true)
    })
  })

  describe('Advanced Patterns Validation', () => {
    it('should implement organized barrel structure @5.6', () => {
      // Verify all advanced barrel files exist
      const barrels = [
        'src/components/core/index.ts',
        'src/components/display/index.ts', 
        'src/components/overlay/index.ts',
        'src/types/index.ts',
        'src/components/development/index.ts'
      ]
      
      let existingBarrels = 0
      barrels.forEach(barrel => {
        try {
          const content = readFile(barrel)
          if (content.length > 0) existingBarrels++
        } catch {
          // File doesn't exist
        }
      })
      
      expect(
        existingBarrels === barrels.length,
        'Create all advanced barrel files:\\n' +
          '- `src/components/core/index.ts`\\n' +
          '- `src/components/display/index.ts`\\n' +
          '- `src/components/overlay/index.ts`\\n' +
          '- `src/types/index.ts`\\n' +
          '- `src/components/development/index.ts`'
      ).toBe(true)
    })

    it('should achieve optimal import organization @5.6', () => {
      // Count import statements - should be selective, not single barrel
      const importPaths = [
        'ImportDeclaration StringLiteral[value="./components/core"]',
        'ImportDeclaration StringLiteral[value="./components/display"]',
        'ImportDeclaration StringLiteral[value="./components/overlay"]'
      ]
      
      const selectiveImportCount = importPaths.filter(importPath =>
        includes(appAst, importPath)
      ).length
      
      expect(
        selectiveImportCount === 3,
        'Should have 3 selective component imports:\\n' +
          '- from `./components/core`\\n' +
          '- from `./components/display`\\n' +
          '- from `./components/overlay`'
      ).toBe(true)
    })

    it('should maintain functionality with advanced patterns @5.6', () => {
      // Verify components are still used (with new names)
      const componentUsage = [
        { original: 'Input', alias: 'FormInput', found: appFile.includes('<FormInput') },
        { original: 'Badge', alias: 'StatusBadge', found: appFile.includes('<StatusBadge') },
        { original: 'Card', alias: 'ContentCard', found: appFile.includes('<ContentCard') },
        { original: 'Button', alias: 'Button', found: appFile.includes('<Button') },
        { original: 'Modal', alias: 'Modal', found: appFile.includes('<Modal') }
      ]
      
      const unusedComponents = componentUsage.filter(comp => !comp.found)
        .map(comp => comp.alias)
      
      expect(
        unusedComponents.length === 0,
        unusedComponents.length > 0 
          ? `Components not used: ${unusedComponents.join(', ')}.\\n` +
            'Update JSX to use aliased component names.'
          : 'All components should be used with their new names.'
      ).toBe(true)
    })
  })

  describe('Performance and Best Practices', () => {
    it('should implement tree-shaking friendly exports @5.7', () => {
      // Check that selective exports use named exports, not export *
      const coreBarrel = readFile("src/components/core/index.ts")
      const displayBarrel = readFile("src/components/display/index.ts")
      
      const usesNamedExports = coreBarrel.includes('export {') && 
                              displayBarrel.includes('export {')
      const avoidsWildcard = !coreBarrel.includes('export *') && 
                            !displayBarrel.includes('export *')
      
      expect(
        usesNamedExports && avoidsWildcard,
        'Use named exports for better tree-shaking:\\n' +
          '`export { Button } from \'../Button\';` not `export * from ...`'
      ).toBe(true)
    })

    it('should separate concerns with organized barrels @5.7', () => {
      // Verify logical separation
      const coreBarrel = readFile("src/components/core/index.ts")
      const displayBarrel = readFile("src/components/display/index.ts")
      const overlayBarrel = readFile("src/components/overlay/index.ts")
      
      const coreHasInteractive = coreBarrel.includes('Button') && coreBarrel.includes('Input')
      const displayHasVisual = displayBarrel.includes('Badge') && displayBarrel.includes('Card')
      const overlayHasModal = overlayBarrel.includes('Modal')
      
      const result = coreHasInteractive && displayHasVisual && overlayHasModal
      
      expect(
        result,
        'Organize components by purpose:\\n' +
          '- Core: Interactive components (Button, Input)\\n' +
          '- Display: Visual components (Badge, Card)\\n' +
          '- Overlay: Modal components (Modal)'
      ).toBe(true)
    })
  })
})

// Run tests using npm script:
// npm run -s task -- src/__tests__/step-5/advanced-patterns.test.ts
// npm run -s task -- src/__tests__/step-5/advanced-patterns.test.ts @5.1
// npm run -s task -- src/__tests__/step-5/advanced-patterns.test.ts @5.2
//
// Or directly:
// ./task-runner.sh src/__tests__/step-5/advanced-patterns.test.ts
// ./task-runner.sh src/__tests__/step-5/advanced-patterns.test.ts @5.1