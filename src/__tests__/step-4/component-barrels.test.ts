import { describe, it, expect } from 'vitest'
import { ast, includes } from "@phenomnomnominal/tsquery"
import { readFile } from '../helpers'

const appFile = readFile("src/App.tsx")
const appAst = ast(appFile, "tsx")

/**
 * Step 4: Scale with Component Barrel Files
 * 
 * These tests validate that students complete the tasks described in STEP4.md:
 * 1. Explore components directory structure
 * 2. Create individual component barrel files
 * 3. Create main components barrel file
 * 4. Update App.tsx to use component barrel imports
 */

describe('Step 4: Component Barrel Files', () => {
  describe('Task 1: Directory Structure', () => {
    it('should have all component files in their folders @4.1', () => {
      // Verify component files exist
      const badgeFile = readFile("src/components/Badge/Badge.tsx")
      const buttonFile = readFile("src/components/Button/Button.tsx")
      const cardFile = readFile("src/components/Card/Card.tsx")
      const inputFile = readFile("src/components/Input/Input.tsx")
      const modalFile = readFile("src/components/Modal/Modal.tsx")
      
      const hasBadge = badgeFile.includes('export const Badge')
      const hasButton = buttonFile.includes('export const Button')
      const hasCard = cardFile.includes('export const Card')
      const hasInput = inputFile.includes('export const Input')
      const hasModal = modalFile.includes('export const Modal')
      
      const result = hasBadge && hasButton && hasCard && hasInput && hasModal
      expect(
        result,
        'Verify all component files exist in their respective folders. ' +
          'Each component should be in src/components/[ComponentName]/[ComponentName].tsx.'
      ).toBe(true)
    })
  })

  describe('Task 2: Individual Component Barrel Files', () => {
    it('should create Badge barrel file @4.2', () => {
      let fileExists = true
      try {
        readFile("src/components/Badge/index.ts")
      } catch (error) {
        fileExists = false
      }
      
      if (!fileExists) {
        expect(
          false,
          'Create src/components/Badge/index.ts file. ' +
            'Add: export * from ./Badge;'
        ).toBe(true)
        return
      }
      
      const barrelFile = readFile("src/components/Badge/index.ts")
      const hasExport = barrelFile.includes("export * from './Badge'") || 
                       barrelFile.includes('export * from "./Badge"')
      expect(
        hasExport,
        'Add export statement: export * from ./Badge;'
      ).toBe(true)
    })

    it('should create Button barrel file @4.2', () => {
      let fileExists = true
      try {
        readFile("src/components/Button/index.ts")
      } catch (error) {
        fileExists = false
      }
      
      if (!fileExists) {
        expect(
          false,
          'Create src/components/Button/index.ts file. ' +
            'Add: export * from ./Button;'
        ).toBe(true)
        return
      }
      
      const barrelFile = readFile("src/components/Button/index.ts")
      const hasExport = barrelFile.includes("export * from './Button'") || 
                       barrelFile.includes('export * from "./Button"')
      expect(
        hasExport,
        'Add export statement: export * from ./Button;'
      ).toBe(true)
    })

    it('should create Card barrel file @4.2', () => {
      let fileExists = true
      try {
        readFile("src/components/Card/index.ts")
      } catch (error) {
        fileExists = false
      }
      
      if (!fileExists) {
        expect(
          false,
          'Create src/components/Card/index.ts file. ' +
            'Add: export * from ./Card;'
        ).toBe(true)
        return
      }
      
      const barrelFile = readFile("src/components/Card/index.ts")
      const hasExport = barrelFile.includes("export * from './Card'") || 
                       barrelFile.includes('export * from "./Card"')
      expect(
        hasExport,
        'Add export statement: export * from ./Card;'
      ).toBe(true)
    })

    it('should create Input barrel file @4.2', () => {
      let fileExists = true
      try {
        readFile("src/components/Input/index.ts")
      } catch (error) {
        fileExists = false
      }
      
      if (!fileExists) {
        expect(
          false,
          'Create src/components/Input/index.ts file. ' +
            'Add: export * from ./Input;'
        ).toBe(true)
        return
      }
      
      const barrelFile = readFile("src/components/Input/index.ts")
      const hasExport = barrelFile.includes("export * from './Input'") || 
                       barrelFile.includes('export * from "./Input"')
      expect(
        hasExport,
        'Add export statement: export * from ./Input;'
      ).toBe(true)
    })

    it('should create Modal barrel file @4.2', () => {
      let fileExists = true
      try {
        readFile("src/components/Modal/index.ts")
      } catch (error) {
        fileExists = false
      }
      
      if (!fileExists) {
        expect(
          false,
          'Create src/components/Modal/index.ts file. ' +
            'Add: export * from ./Modal;'
        ).toBe(true)
        return
      }
      
      const barrelFile = readFile("src/components/Modal/index.ts")
      const hasExport = barrelFile.includes("export * from './Modal'") || 
                       barrelFile.includes('export * from "./Modal"')
      expect(
        hasExport,
        'Add export statement: export * from ./Modal;'
      ).toBe(true)
    })
  })

  describe('Task 3: Main Components Barrel', () => {
    it('should create main components barrel file @4.3', () => {
      let fileExists = true
      try {
        readFile("src/components/index.ts")
      } catch (error) {
        fileExists = false
      }
      
      if (!fileExists) {
        expect(
          false,
          'Create src/components/index.ts file. ' +
            'This main barrel file should export all components.'
        ).toBe(true)
        return
      }
      
      const barrelFile = readFile("src/components/index.ts")
      const hasContent = barrelFile.trim().length > 0
      expect(
        hasContent,
        'Add content to src/components/index.ts file. ' +
          'This main barrel file should export all components.'
      ).toBe(true)
    })

    it('should export all components from main barrel @4.3', () => {
      const barrelFile = readFile("src/components/index.ts")
      
      const hasBadgeExport = barrelFile.includes("'./Badge'") || barrelFile.includes('"./Badge"')
      const hasButtonExport = barrelFile.includes("'./Button'") || barrelFile.includes('"./Button"')
      const hasCardExport = barrelFile.includes("'./Card'") || barrelFile.includes('"./Card"')
      const hasInputExport = barrelFile.includes("'./Input'") || barrelFile.includes('"./Input"')
      const hasModalExport = barrelFile.includes("'./Modal'") || barrelFile.includes('"./Modal"')
      
      const result = hasBadgeExport && hasButtonExport && hasCardExport && 
                    hasInputExport && hasModalExport
      expect(
        result,
        'Add all component exports to src/components/index.ts. ' +
          'Include export statements for Badge, Button, Card, Input, and Modal.'
      ).toBe(true)
    })

    it('should use correct export syntax in main barrel @4.3', () => {
      const barrelFile = readFile("src/components/index.ts")
      const barrelAst = ast(barrelFile, "ts")
      
      const hasBadgeExport = includes(
        barrelAst,
        'ExportDeclaration StringLiteral[value="./Badge"]'
      )
      const hasButtonExport = includes(
        barrelAst,
        'ExportDeclaration StringLiteral[value="./Button"]'
      )
      const hasCardExport = includes(
        barrelAst,
        'ExportDeclaration StringLiteral[value="./Card"]'
      )
      const hasInputExport = includes(
        barrelAst,
        'ExportDeclaration StringLiteral[value="./Input"]'
      )
      const hasModalExport = includes(
        barrelAst,
        'ExportDeclaration StringLiteral[value="./Modal"]'
      )
      
      const result = hasBadgeExport && hasButtonExport && hasCardExport && 
                    hasInputExport && hasModalExport
      expect(
        result,
        'Use export * from pattern for all components. ' +
          'Check that each component is properly exported with correct syntax.'
      ).toBe(true)
    })
  })

  describe('Task 4: Update App.tsx Imports', () => {
    it('should import components from barrel file @4.4', () => {
      // Check if App.tsx uses barrel import
      const hasBarrelImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./components"]'
      )
      
      // Verify it imports all required components
      const importsBadge = includes(appAst, 'ImportSpecifier Identifier[name="Badge"]')
      const importsButton = includes(appAst, 'ImportSpecifier Identifier[name="Button"]')
      const importsCard = includes(appAst, 'ImportSpecifier Identifier[name="Card"]')
      const importsInput = includes(appAst, 'ImportSpecifier Identifier[name="Input"]')
      const importsModal = includes(appAst, 'ImportSpecifier Identifier[name="Modal"]')
      
      const hasAllImports = importsBadge && importsButton && importsCard && 
                           importsInput && importsModal
      
      const result = hasBarrelImport && hasAllImports
      expect(
        result,
        'Replace separate component imports with single barrel import. ' +
          'Use: import { Badge, Button, Card, Input, Modal } from ./components;'
      ).toBe(true)
    })

    it('should not have old direct component imports @4.4', () => {
      // Verify old imports are removed
      const oldImports = [
        'ImportDeclaration StringLiteral[value="./components/Badge/Badge"]',
        'ImportDeclaration StringLiteral[value="./components/Button/Button"]',
        'ImportDeclaration StringLiteral[value="./components/Card/Card"]',
        'ImportDeclaration StringLiteral[value="./components/Input/Input"]',
        'ImportDeclaration StringLiteral[value="./components/Modal/Modal"]'
      ]
      
      const hasOldImports = oldImports.some(importPath => includes(appAst, importPath))
      
      expect(
        hasOldImports,
        'Remove all old component imports. ' +
          'Delete the individual component import statements and replace with barrel import.'
      ).toBe(false)
    })

    it('should maintain component functionality @4.4', () => {
      // Verify all components are still used correctly by checking the source
      const usageChecks = [
        { name: 'Badge', found: appFile.includes('<Badge') },
        { name: 'Button', found: appFile.includes('<Button') },
        { name: 'Card', found: appFile.includes('<Card') },
        { name: 'Input', found: appFile.includes('<Input') },
        { name: 'Modal', found: appFile.includes('<Modal') }
      ]
      
      const missingComponents = usageChecks.filter(check => !check.found).map(check => check.name)
      
      expect(
        missingComponents.length === 0,
        missingComponents.length > 0 
          ? `Components not used in JSX: ${missingComponents.join(', ')}. ` +
            'Barrel imports should not break component usage.'
          : 'All components should be used in the JSX.'
      ).toBe(true)
    })
  })

  describe('Import Reduction Analysis', () => {
    it('should achieve significant import reduction @4.5', () => {
      // Count component and utility imports
      const componentBarrelImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./components"]'
      )
      const utilsBarrelImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./utils"]'
      )
      
      // Should have exactly 2 barrel imports (components and utils)
      const result = componentBarrelImport && utilsBarrelImport
      expect(
        result,
        'Should have barrel imports for both components and utilities. ' +
          'This demonstrates maximum import reduction.'
      ).toBe(true)
    })

    it('should have clean import structure @4.5', () => {
      // Check total import count (should be minimal)
      const importStatements = [
        'ImportDeclaration StringLiteral[value="react"]',
        'ImportDeclaration StringLiteral[value="./components"]',
        'ImportDeclaration StringLiteral[value="./utils"]',
        'ImportDeclaration StringLiteral[value="./App.module.css"]'
      ]
      
      const actualImportCount = importStatements.filter(importPath =>
        includes(appAst, importPath)
      ).length
      
      // Should have exactly 4 imports: React, components, utils, styles
      expect(
        actualImportCount === 4,
        `Should have exactly 4 import lines total. ` +
          `Found ${actualImportCount} imports. Expected: React, components barrel, utils barrel, and styles.`
      ).toBe(true)
    })
  })

  describe('Two-Level Barrel Pattern', () => {
    it('should implement two-level barrel pattern @4.6', () => {
      // Verify both levels of barrel files exist
      let componentBarrels = 0
      const components = ['Badge', 'Button', 'Card', 'Input', 'Modal']
      
      components.forEach(component => {
        try {
          const barrelFile = readFile(`src/components/${component}/index.ts`)
          if (barrelFile.includes(`./${component}`)) {
            componentBarrels++
          }
        } catch (error) {
          // File doesn't exist
        }
      })
      
      let mainBarrelExists = false
      try {
        const mainBarrel = readFile("src/components/index.ts")
        mainBarrelExists = mainBarrel.length > 0
      } catch (error) {
        // File doesn't exist
      }
      
      const result = componentBarrels === 5 && mainBarrelExists
      expect(
        result,
        'Implement complete two-level barrel pattern. ' +
          'Create individual barrel files in each component folder and main barrel file at src/components/index.ts.'
      ).toBe(true)
    })

    it('should validate complete barrel file structure @4.6', () => {
      // Final validation of entire barrel structure
      const hasUtilsBarrel = (() => {
        try {
          readFile("src/utils/index.ts")
          return true
        } catch { return false }
      })()
      
      const hasComponentsBarrel = (() => {
        try {
          readFile("src/components/index.ts")
          return true
        } catch { return false }
      })()
      
      const result = hasUtilsBarrel && hasComponentsBarrel
      expect(
        result,
        'Complete barrel file structure should include src/utils/index.ts for utilities and src/components/index.ts for components.'
      ).toBe(true)
    })
  })

  describe('Edge Cases and Error Scenarios', () => {
    it('should detect empty component barrel files @4.7', () => {
      // Check that barrel files are not empty
      const components = ['Badge', 'Button', 'Card', 'Input', 'Modal']
      let allBarrelsValid = true
      
      components.forEach(component => {
        try {
          const barrelFile = readFile(`src/components/${component}/index.ts`)
          if (barrelFile.trim().length === 0) {
            allBarrelsValid = false
          }
        } catch {
          // File doesn't exist - will be caught by other tests
        }
      })
      
      expect(
        allBarrelsValid,
        'Component barrel files should not be empty. ' +
          'Each should contain export statement for the respective component.'
      ).toBe(true)
    })

    it('should detect incorrect export syntax in component barrels @4.7', () => {
      // Verify correct export syntax
      const components = ['Badge', 'Button', 'Card', 'Input', 'Modal']
      let allExportsCorrect = true
      
      components.forEach(component => {
        try {
          const barrelFile = readFile(`src/components/${component}/index.ts`)
          // Check for common mistakes
          if (barrelFile.includes(`export { * }`) || 
              barrelFile.includes(`export *`) && !barrelFile.includes('from')) {
            allExportsCorrect = false
          }
        } catch {
          // File doesn't exist - will be caught by other tests
        }
      })
      
      expect(
        allExportsCorrect,
        'Use correct export syntax in barrel files. ' +
          'Use export * from pattern, not export destructuring or incomplete export statements.'
      ).toBe(true)
    })

    it('should detect if main barrel missing component exports @4.7', () => {
      try {
        const mainBarrel = readFile("src/components/index.ts")
        const components = ['Badge', 'Button', 'Card', 'Input', 'Modal']
        const missingComponents: string[] = []
        
        components.forEach(component => {
          if (!mainBarrel.includes(`./${component}'`) && 
              !mainBarrel.includes(`./${component}"`)) {
            missingComponents.push(component)
          }
        })
        
        expect(
          missingComponents.length === 0,
          `Main barrel missing exports for: ${missingComponents.join(', ')}. ` +
            'Add all component exports to src/components/index.ts.'
        ).toBe(true)
      } catch {
        // File doesn't exist - will be caught by other tests
      }
    })

    it('should verify no duplicate imports in App.tsx @4.7', () => {
      // Check for duplicate component imports (old + new)
      const hasOldImports = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./components/Badge/Badge"]'
      ) || includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./components/Button/Button"]'
      )
      
      const hasNewImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./components"]'
      )
      
      const hasBothImports = hasOldImports && hasNewImport
      
      expect(
        hasBothImports,
        'Remove old component imports when using barrel import. ' +
          'Keep only the single barrel import statement.'
      ).toBe(false)
    })

    it('should verify components are actually used in JSX @4.7', () => {
      // Additional check to ensure components are rendered using string matching
      const usageChecks = [
        { name: 'Badge', found: appFile.includes('<Badge') },
        { name: 'Button', found: appFile.includes('<Button') },
        { name: 'Card', found: appFile.includes('<Card') },
        { name: 'Input', found: appFile.includes('<Input') },
        { name: 'Modal', found: appFile.includes('<Modal') }
      ]
      
      const unusedComponents = usageChecks.filter(check => !check.found).map(check => check.name)
      
      expect(
        unusedComponents.length === 0,
        unusedComponents.length > 0 
          ? `Components not used in JSX: ${unusedComponents.join(', ')}. ` +
            'Barrel imports should maintain all component usage.'
          : 'All components should be used in JSX.'
      ).toBe(true)
    })
  })
})

// Run tests using npm script:
// npm run -s task -- src/__tests__/step-4/component-barrels.test.ts
// npm run -s task -- src/__tests__/step-4/component-barrels.test.ts @4.1
// npm run -s task -- src/__tests__/step-4/component-barrels.test.ts @4.2
//
// Or directly:
// ./task-runner.sh src/__tests__/step-4/component-barrels.test.ts
// ./task-runner.sh src/__tests__/step-4/component-barrels.test.ts @4.1