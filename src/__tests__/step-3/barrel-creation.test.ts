import { describe, it, expect } from 'vitest'
import { ast, includes } from "@phenomnomnominal/tsquery"
import { readFile } from '../helpers'

const appFile = readFile("src/App.tsx")
const appAst = ast(appFile, "tsx")

/**
 * Step 3: Create Your First Barrel File
 * 
 * These tests validate that students complete the tasks described in STEP3.md:
 * 1. Explore utils directory structure
 * 2. Create src/utils/index.ts barrel file
 * 3. Update App.tsx to use barrel imports
 */

// Run tests: npm run -s task -- src/__tests__/step-3/barrel-creation.test.ts
// Or directly: ./task-runner.sh src/__tests__/step-3/barrel-creation.test.ts
describe('Step 3: Barrel File Creation', () => {
  describe('Task 1: Directory Structure', () => {
    it('should have formatters and validators files in utils @3.1', () => {
      // Verify the required utility files exist
      const formattersFile = readFile("src/utils/formatters.ts")
      const validatorsFile = readFile("src/utils/validators.ts")
      
      const hasFormattersContent = formattersFile.includes('formatNumber') && formattersFile.includes('formatCurrency')
      const hasValidatorsContent = validatorsFile.includes('isValidEmail')
      
      const result = hasFormattersContent && hasValidatorsContent
      expect(
        result,
        'Verify `src/utils/` contains `formatters.ts` and `validators.ts` files.\\n' +
          'These files should export their respective utility functions.'
      ).toBe(true)
    })
  })

  describe('Task 2: Create Barrel File', () => {
    it('should create utils/index.ts file @3.2a', () => {
      // First verify the barrel file exists
      try {
        const barrelFile = readFile("src/utils/index.ts")
        const hasContent = barrelFile.trim().length > 0
        expect(
          hasContent,
          'Create `src/utils/index.ts` file.\\n' +
            'This file should export utilities from `formatters.ts` and `validators.ts`.'
        ).toBe(true)
      } catch (error) {
        expect(
          false,
          'Create `src/utils/index.ts` file.\\n' +
            'This barrel file is missing and needs to be created.'
        ).toBe(true)
      }
    })

    it('should create utils/index.ts barrel file @3.2', () => {
      // Check if barrel file exists and has correct exports
      const barrelFile = readFile("src/utils/index.ts")
      const barrelAst = ast(barrelFile, "ts")
      
      const hasFormattersExport = includes(
        barrelAst,
        'ExportAllDeclaration StringLiteral[value="./formatters"]'
      )
      const hasValidatorsExport = includes(
        barrelAst,
        'ExportAllDeclaration StringLiteral[value="./validators"]'
      )
      
      const result = hasFormattersExport && hasValidatorsExport
      expect(
        result,
        'Create `src/utils/index.ts` with these exports:\\n' +
          '`export * from \'./formatters\';`\\n' +
          '`export * from \'./validators\';`'
      ).toBe(true)
    })

    it('should export all formatters through barrel @3.2', async () => {
      // Test that formatters are accessible through barrel
      try {
        const barrelExports = await import('../../utils/index')
        
        const hasFormatNumber = typeof barrelExports.formatNumber === 'function'
        const hasFormatCurrency = typeof barrelExports.formatCurrency === 'function'
        const hasFormatDate = typeof barrelExports.formatDate === 'function'
        
        const result = hasFormatNumber && hasFormatCurrency && hasFormatDate
        expect(
          result,
          'Barrel file should export `formatNumber`, `formatCurrency`, and `formatDate`.\\n' +
            'Check `export * from \'./formatters\'` in `utils/index.ts`.'
        ).toBe(true)
      } catch (error) {
        expect(
          false,
          'Cannot import from utils barrel file.\\n' +
            'Create `src/utils/index.ts` with proper exports.'
        ).toBe(true)
      }
    })

    it('should export all validators through barrel @3.2', async () => {
      // Test that validators are accessible through barrel
      try {
        const barrelExports = await import('../../utils/index')
        
        const hasIsValidEmail = typeof barrelExports.isValidEmail === 'function'
        const hasIsValidPassword = typeof barrelExports.isValidPassword === 'function'
        const hasIsRequired = typeof barrelExports.isRequired === 'function'
        
        const result = hasIsValidEmail && hasIsValidPassword && hasIsRequired
        expect(
          result,
          'Barrel file should export `isValidEmail`, `isValidPassword`, and `isRequired`.\\n' +
            'Check `export * from \'./validators\'` in `utils/index.ts`.'
        ).toBe(true)
      } catch (error) {
        expect(
          false,
          'Cannot import validators from utils barrel file.\\n' +
            'Create `src/utils/index.ts` with proper exports.'
        ).toBe(true)
      }
    })
  })

  describe('Task 3: Update App.tsx Imports', () => {
    it('should import utilities from barrel file @3.3', () => {
      // Check if App.tsx uses barrel import
      const hasBarrelImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./utils"]'
      )
      
      // Verify it imports the required utilities
      const importsFormatNumber = includes(
        appAst,
        'ImportSpecifier Identifier[name="formatNumber"]'
      )
      const importsFormatCurrency = includes(
        appAst,
        'ImportSpecifier Identifier[name="formatCurrency"]'
      )
      const importsFormatDate = includes(
        appAst,
        'ImportSpecifier Identifier[name="formatDate"]'
      )
      const importsIsValidEmail = includes(
        appAst,
        'ImportSpecifier Identifier[name="isValidEmail"]'
      )
      
      const hasAllImports = importsFormatNumber && importsFormatCurrency && 
                           importsFormatDate && importsIsValidEmail
      
      const result = hasBarrelImport && hasAllImports
      expect(
        result,
        'Replace separate imports with single barrel import:\\n' +
          '`import { formatCurrency, formatDate, formatNumber, isValidEmail } from \'./utils\';`'
      ).toBe(true)
    })

    it('should not have old direct utility imports @3.3', () => {
      // Verify old imports are removed
      const hasOldFormattersImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./utils/formatters"]'
      )
      const hasOldValidatorsImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./utils/validators"]'
      )
      
      const hasOldImports = hasOldFormattersImport || hasOldValidatorsImport
      expect(
        hasOldImports,
        'Remove the old direct imports:\\n' +
          'Delete: `import { ... } from \'./utils/formatters\';`\\n' +
          'Delete: `import { ... } from \'./utils/validators\';`'
      ).toBe(false)
    })

    it('should maintain functionality with barrel imports @3.3', () => {
      // Verify all utilities are still used correctly
      const usesFormatNumber = includes(
        appAst,
        'CallExpression Identifier[name="formatNumber"]'
      )
      const usesFormatCurrency = includes(
        appAst,
        'CallExpression Identifier[name="formatCurrency"]'
      )
      const usesFormatDate = includes(
        appAst,
        'CallExpression Identifier[name="formatDate"]'
      )
      const usesIsValidEmail = includes(
        appAst,
        'CallExpression Identifier[name="isValidEmail"]'
      )
      
      const result = usesFormatNumber && usesFormatCurrency && 
                    usesFormatDate && usesIsValidEmail
      expect(
        result,
        'All utility functions should still be used in the component.\\n' +
          'Barrel imports should not break existing functionality.'
      ).toBe(true)
    })
  })

  describe('Import Simplification Analysis', () => {
    it('should demonstrate import reduction @3.4', () => {
      // Count total utility imports to show improvement
      const utilityImportPaths = [
        'ImportDeclaration StringLiteral[value="./utils"]',
        'ImportDeclaration StringLiteral[value="./utils/formatters"]',
        'ImportDeclaration StringLiteral[value="./utils/validators"]'
      ]
      
      const importCount = utilityImportPaths.filter(importPath =>
        includes(appAst, importPath)
      ).length
      
      // Should have exactly 1 import (the barrel import)
      expect(
        importCount === 1,
        'Should have exactly 1 utility import line using the barrel file.\\n' +
          'This demonstrates the import reduction benefit.'
      ).toBe(true)
    })

    it('should maintain component imports for next step @3.4', () => {
      // Verify component imports are still separate (will be fixed in Step 4)
      const componentImports = [
        'ImportDeclaration StringLiteral[value="./components/Badge/Badge"]',
        'ImportDeclaration StringLiteral[value="./components/Button/Button"]',
        'ImportDeclaration StringLiteral[value="./components/Card/Card"]',
        'ImportDeclaration StringLiteral[value="./components/Input/Input"]',
        'ImportDeclaration StringLiteral[value="./components/Modal/Modal"]'
      ]
      
      const componentImportCount = componentImports.filter(importPath =>
        includes(appAst, importPath)
      ).length
      
      expect(
        componentImportCount >= 4,
        'Keep component imports separate for now.\\n' +
          'These will be addressed in Step 4 with component barrel files.'
      ).toBe(true)
    })
  })

  describe('Development Environment', () => {
    it('should be ready for component barrel files @3.5', () => {
      // Verify the basic structure is in place for component barrels
      const hasReactImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="react"]'
      )
      const hasUtilsBarrelImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./utils"]'
      )
      const hasStylesImport = includes(
        appAst,
        'ImportDeclaration StringLiteral[value="./App.module.css"]'
      )
      
      const result = hasReactImport && hasUtilsBarrelImport && hasStylesImport
      expect(
        result,
        '`App.tsx` should have:\\n' +
          '- React import\\n' +
          '- Utils barrel import from `\'./utils\'`\\n' +
          '- Styles import from `\'./App.module.css\'`'
      ).toBe(true)
    })
  })

  describe('Barrel File Pattern Understanding', () => {
    it('should understand export patterns @3.6', async () => {
      // Test understanding of barrel file patterns
      const barrelFile = readFile("src/utils/index.ts")
      
      const hasExportAllPattern = barrelFile.includes('export * from')
      const exportsFromFormatters = barrelFile.includes('./formatters')
      const exportsFromValidators = barrelFile.includes('./validators')
      
      const result = hasExportAllPattern && exportsFromFormatters && exportsFromValidators
      expect(
        result,
        'Barrel file should use `export * from` pattern:\\n' +
          '`export * from \'./formatters\';`\\n' +
          '`export * from \'./validators\';`'
      ).toBe(true)
    })

    it('should verify barrel functionality works correctly @3.6', async () => {
      // Test that barrel actually works
      try {
        const utils = await import('../../utils/index')
        
        // Test a formatter function
        const formattedNumber = utils.formatNumber(1234)
        const formattedCurrency = utils.formatCurrency(99.99)
        
        // Test a validator function  
        const validEmail = utils.isValidEmail('test@example.com')
        const invalidEmail = utils.isValidEmail('invalid')
        
        const formattersWork = formattedNumber === '1,234' && 
                             typeof formattedCurrency === 'string'
        const validatorsWork = validEmail === true && invalidEmail === false
        
        const result = formattersWork && validatorsWork
        expect(
          result,
          'Barrel file exports should work correctly.\\n' +
            'Functions should be accessible and functional through the barrel.'
        ).toBe(true)
      } catch (error) {
        expect(
          false,
          'Barrel file imports are not working.\\n' +
            'Check that `src/utils/index.ts` exports all utilities correctly.'
        ).toBe(true)
      }
    })
  })
})

// Run tests and get custom messages using npm script:
// npm run -s task -- src/__tests__/step-3/barrel-creation.test.ts
// npm run -s task -- src/__tests__/step-3/barrel-creation.test.ts @3.1
// npm run -s task -- src/__tests__/step-3/barrel-creation.test.ts @3.2
//
// Or directly:
// ./task-runner.sh src/__tests__/step-3/barrel-creation.test.ts
// ./task-runner.sh src/__tests__/step-3/barrel-creation.test.ts @3.1
// ./task-runner.sh src/__tests__/step-3/barrel-creation.test.ts @3.2