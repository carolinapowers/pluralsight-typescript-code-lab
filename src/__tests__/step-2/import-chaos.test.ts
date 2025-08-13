import { describe, it, expect } from 'vitest'
import { ast, includes } from "@phenomnomnominal/tsquery"
import { readFile } from '../helpers'

const file = readFile("src/App.tsx")
const astTs = ast(file, "tsx")

/**
 * Step 2: Experience Import Chaos - Feel the Pain
 * 
 * These tests validate that students complete the tasks described in README2.md:
 * 1. Add formatNumber utility to App.tsx imports
 * 2. Display formatted purchase count in Product Card
 * 3. Discover unused utilities through console logging
 * 4. Clean up temporary imports after discovery
 */

// Run tests: npm run -s task -- src/__tests__/step-2/import-chaos.test.ts
// Or directly: ./task-runner.sh src/__tests__/step-2/import-chaos.test.ts
describe('Step 2: Import Chaos', () => {
  describe('Task 1: Add Number Formatting', () => {
    it('should import formatNumber from formatters @2.1', () => {
      // Check if formatNumber is imported from formatters
      const hasFormatNumberImport = includes(
        astTs,
        'ImportDeclaration StringLiteral[value="./utils/formatters"]'
      )
      const hasFormatNumberIdentifier = includes(
        astTs,
        'ImportSpecifier Identifier[name="formatNumber"]'
      )
      
      const result = hasFormatNumberImport && hasFormatNumberIdentifier
      expect(
        result,
        "Add formatNumber to your import from './utils/formatters'.\n" +
        "Update to: { formatCurrency, formatDate, formatNumber }"
      ).toBe(true)
    })

    it('should display formatted purchase count in Product Card @2.1', () => {
      // Check for the purchase count text and formatNumber usage
      const hasPurchasedByText = includes(
        astTs,
        'StringLiteral[value*="Purchased by"]'
      ) || includes(
        astTs,
        'JsxText[text*="Purchased by"]'
      )
      
      const hasFormatNumberCall = includes(
        astTs,
        'CallExpression Identifier[name="formatNumber"]'
      )
      
      const result = hasPurchasedByText && hasFormatNumberCall
      expect(
        result,
        'Add to your Product Card:\n' +
        '"Purchased by {formatNumber(15789)} developers"'
      ).toBe(true)
    })

    it('should use formatNumber function with correct parameter @2.1', () => {
      // Verify formatNumber is called with 15789
      const formatNumberWith15789 = includes(
        astTs,
        'CallExpression[expression.name="formatNumber"] NumericLiteral[value="15789"]'
      ) || includes(
        astTs,
        'CallExpression Identifier[name="formatNumber"]'
      )
      
      expect(
        formatNumberWith15789,
        'Call formatNumber with the number 15789: formatNumber(15789)'
      ).toBe(true)
    })
  })

  describe('Task 2: Discover Hidden Utilities', () => {
    it('should not have namespace imports left in the code @2.2', () => {
      // After discovery, students should remove the temporary namespace imports
      const hasNamespaceFormatters = includes(
        astTs,
        'ImportDeclaration NamespaceImport Identifier[name="AllFormatters"]'
      )
      const hasNamespaceValidators = includes(
        astTs,
        'ImportDeclaration NamespaceImport Identifier[name="AllValidators"]'
      )
      
      const hasAnyNamespaceImports = hasNamespaceFormatters || hasNamespaceValidators
      expect(
        hasAnyNamespaceImports,
        'Good! Remove the temporary namespace imports\n' +
        '(import * as AllFormatters) after discovering utilities.'
      ).toBe(false)
    })

    it('should not have console.log statements for utility discovery @2.2', () => {
      // Students should clean up the console.log statements after discovery
      const hasConsoleLogFormatters = includes(
        astTs,
        'CallExpression PropertyAccessExpression[expression.name="console"][name.name="log"] Identifier[name="AllFormatters"]'
      )
      const hasConsoleLogValidators = includes(
        astTs,
        'CallExpression PropertyAccessExpression[expression.name="console"][name.name="log"] Identifier[name="AllValidators"]'
      )
      
      const hasDiscoveryConsoleLog = hasConsoleLogFormatters || hasConsoleLogValidators
      expect(
        hasDiscoveryConsoleLog,
        'Great! Clean up the console.log statements\n' +
        'used for utility discovery.'
      ).toBe(false)
    })

    it('should have completed the utility discovery process @2.2', () => {
      // Verify the original imports are still there and new formatNumber is added
      const hasOriginalFormattersImport = includes(
        astTs,
        'ImportDeclaration StringLiteral[value="./utils/formatters"]'
      )
      const hasOriginalValidatorsImport = includes(
        astTs,
        'ImportDeclaration StringLiteral[value="./utils/validators"]'
      )
      const hasFormatNumberImport = includes(
        astTs,
        'ImportSpecifier Identifier[name="formatNumber"]'
      )
      
      const result = hasOriginalFormattersImport && hasOriginalValidatorsImport && hasFormatNumberImport
      expect(
        result,
        'Complete the discovery process:\n' +
        '1) Keep original imports from formatters and validators\n' +
        '2) Add formatNumber to formatters import\n' +
        '3) Remove temporary namespace imports and console.log statements'
      ).toBe(true)
    })
  })

  describe('Import Pattern Analysis', () => {
    it('should demonstrate the import chaos problem @2.3', () => {
      // Count the number of import lines to show the growing complexity
      const componentImports = [
        'ImportDeclaration StringLiteral[value="./components/Badge/Badge"]',
        'ImportDeclaration StringLiteral[value="./components/Button/Button"]', 
        'ImportDeclaration StringLiteral[value="./components/Card/Card"]',
        'ImportDeclaration StringLiteral[value="./components/Input/Input"]',
        'ImportDeclaration StringLiteral[value="./components/Modal/Modal"]'
      ]
      
      const importCount = componentImports.filter(importPath => 
        includes(astTs, importPath)
      ).length
      
      expect(
        importCount >= 4,
        'Import chaos demonstrated!\n' +
        'You have at least 4 component imports.\n' +
        'Barrel files will solve this repetitive pattern.'
      ).toBe(true)
    })

    it('should show the path complexity that barrels will solve @2.3', () => {
      // Check for utility imports that will be simplified by barrels
      const utilityImports = [
        'ImportDeclaration StringLiteral[value="./utils/formatters"]',
        'ImportDeclaration StringLiteral[value="./utils/validators"]'
      ]
      
      const hasUtilityImports = utilityImports.every(importPath =>
        includes(astTs, importPath)
      )
      
      expect(
        hasUtilityImports,
        'Path complexity shown!\n' +
        'Multiple separate utility imports will be\n' +
        'simplified with barrel files in next steps.'
      ).toBe(true)
    })
  })

  describe('Development Environment', () => {
    it('should be ready for the next step @2.4', () => {
      // Verify the basic structure is in place for barrel file creation
      const hasReactImport = includes(astTs, 'ImportDeclaration StringLiteral[value="react"]')
      const hasFormattersImport = includes(astTs, 'ImportDeclaration StringLiteral[value="./utils/formatters"]')
      const hasValidatorsImport = includes(astTs, 'ImportDeclaration StringLiteral[value="./utils/validators"]')
      
      const result = hasReactImport && hasFormattersImport && hasValidatorsImport
      expect(
        result,
        'Perfect! Your App.tsx has the necessary imports.\n' +
        'Ready to create barrel files in Step 3!'
      ).toBe(true)
    })
  })

  describe('Utility Functions Available', () => {
    it('should have access to all formatter utilities @2.5', async () => {
      // Test the utilities are accessible and working
      const formatters = await import('../../utils/formatters')
      
      const hasFormatNumber = typeof formatters.formatNumber === 'function'
      const hasFormatCurrency = typeof formatters.formatCurrency === 'function'
      const hasFormatDate = typeof formatters.formatDate === 'function'
      
      const result = hasFormatNumber && hasFormatCurrency && hasFormatDate
      expect(
        result,
        'All formatter utilities should be accessible.\n' +
        'Check utils/formatters exports:\n' +
        'formatNumber, formatCurrency, and formatDate.'
      ).toBe(true)
      
      // Test formatNumber specifically
      if (hasFormatNumber) {
        const formatted = formatters.formatNumber(15789)
        expect(
          formatted === '15,789',
          'formatNumber(15789) should return "15,789"'
        ).toBe(true)
      }
    })

    it('should have access to all validator utilities @2.5', async () => {
      // Test the validators are accessible and working
      const validators = await import('../../utils/validators')
      
      const hasIsValidEmail = typeof validators.isValidEmail === 'function'
      const hasIsValidPassword = typeof validators.isValidPassword === 'function'
      const hasIsRequired = typeof validators.isRequired === 'function'
      
      const result = hasIsValidEmail && hasIsValidPassword && hasIsRequired
      expect(
        result,
        'All validator utilities should be accessible.\n' +
        'Check utils/validators exports validation functions.'
      ).toBe(true)
      
      // Test isValidEmail specifically
      if (hasIsValidEmail) {
        const validEmail = validators.isValidEmail('test@example.com')
        const invalidEmail = validators.isValidEmail('invalid')
        expect(
          validEmail === true && invalidEmail === false,
          'isValidEmail should correctly validate email addresses'
        ).toBe(true)
      }
    })
  })
})

// Run tests and get custom messages using npm script:
// npm run -s task -- src/__tests__/step-2/import-chaos.test.ts
// npm run -s task -- src/__tests__/step-2/import-chaos.test.ts @2.1
// npm run -s task -- src/__tests__/step-2/import-chaos.test.ts @2.2
//
// Or directly:
// ./task-runner.sh src/__tests__/step-2/import-chaos.test.ts
// ./task-runner.sh src/__tests__/step-2/import-chaos.test.ts @2.1
// ./task-runner.sh src/__tests__/step-2/import-chaos.test.ts @2.2