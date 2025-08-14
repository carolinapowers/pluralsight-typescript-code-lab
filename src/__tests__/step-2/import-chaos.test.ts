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
      );
      const hasFormatNumberIdentifier = includes(
        astTs,
        'ImportSpecifier Identifier[name="formatNumber"]'
      );

      const result = hasFormatNumberImport && hasFormatNumberIdentifier;
      expect(
        result,
        "Add formatNumber to the import from './utils/formatters'.\n" +
          'Use: { formatCurrency, formatDate, formatNumber }'
      ).toBe(true);
    });

    it('should display formatted purchase count in Product Card small element @2.1', () => {
      // Check that the Product Card specifically contains the formatNumber pattern
      // This regex ensures the formatNumber is in the Product Card context, not just anywhere
      const productCardWithFormatNumber =
        /title="Product Card"[\s\S]*?footer=\{[\s\S]*?<small[^>]*>[^<]*Purchased by[^<]*\{[^}]*formatNumber\(\s*15789\s*\)[^}]*\}[^<]*developers[^<]*<\/small>[\s\S]*?\}/s.test(
          file
        );

      // Basic validation
      const hasProductCard = includes(
        astTs,
        'JsxAttribute[name.name="title"] StringLiteral[value="Product Card"]'
      );
      const hasFormatNumberCall = includes(
        astTs,
        'CallExpression Identifier[name="formatNumber"]'
      );

      const result =
        hasProductCard && hasFormatNumberCall && productCardWithFormatNumber;
      expect(
        result,
        'Add {formatNumber(15789)} to the Product Card footer.\n' +
          'Place it in the <small> element that says "Purchased by ... developers"'
      ).toBe(true);
    });

    it('should use formatNumber function with correct parameter @2.1', () => {
      // Verify formatNumber is called with 15789
      const formatNumberWith15789 = includes(
        astTs,
        'CallExpression[expression.name="formatNumber"] NumericLiteral[value="15789"]'
      );

      expect(
        formatNumberWith15789,
        'Call formatNumber with the number 15789.\n' +
          'Use: formatNumber(15789)'
      ).toBe(true);
    });
  });

  describe('Task 2: Discover Hidden Utilities', () => {
    it('should have namespace imports for discovery @2.2', () => {
      // Students should add namespace imports to discover utilities
      const hasNamespaceFormatters = includes(
        astTs,
        'ImportDeclaration NamespaceImport Identifier[name="AllFormatters"]'
      );
      const hasNamespaceValidators = includes(
        astTs,
        'ImportDeclaration NamespaceImport Identifier[name="AllValidators"]'
      );

      const result = hasNamespaceFormatters && hasNamespaceValidators;
      expect(
        result,
        'Add these namespace imports to discover utilities:\n' +
          "import * as AllFormatters from './utils/formatters';\n" +
          "import * as AllValidators from './utils/validators';"
      ).toBe(true);
    });

    it('should have console.log statements for utility discovery @2.2', () => {
      // Students should add console.log to see what utilities are available
      const hasConsoleLog = includes(
        astTs,
        'CallExpression PropertyAccessExpression[expression.name="console"][name.name="log"]'
      );

      expect(
        hasConsoleLog,
        'Add console.log statements to discover what utilities are available.'
      ).toBe(true);
    });

    it('should console.log AllFormatters and AllValidators @2.2', () => {
      // Check that students are specifically logging the namespace imports
      // The selector needs to find CallExpression where:
      // 1. The expression is console.log
      // 2. The argument is the identifier we're looking for
      const hasConsoleLogFormatters = includes(
        astTs,
        'CallExpression:has(PropertyAccessExpression[expression.name="console"][name.name="log"]):has(Identifier[name="AllFormatters"])'
      );
      const hasConsoleLogValidators = includes(
        astTs,
        'CallExpression:has(PropertyAccessExpression[expression.name="console"][name.name="log"]):has(Identifier[name="AllValidators"])'
      );

      const result = hasConsoleLogFormatters && hasConsoleLogValidators;
      expect(
        result,
        'Console.log both namespace imports to see available utilities:\n' +
          'console.log(AllFormatters);\n' +
          'console.log(AllValidators);'
      ).toBe(true);
    });
  });

  describe('Task 3: Clean Up Discovery Code', () => {
    it('should not have namespace imports left in the code @2.3', () => {
      // After discovery, students should remove the temporary namespace imports
      const hasNamespaceFormatters = includes(
        astTs,
        'ImportDeclaration NamespaceImport Identifier[name="AllFormatters"]'
      );
      const hasNamespaceValidators = includes(
        astTs,
        'ImportDeclaration NamespaceImport Identifier[name="AllValidators"]'
      );

      const hasAnyNamespaceImports =
        hasNamespaceFormatters || hasNamespaceValidators;
      expect(
        hasAnyNamespaceImports,
        'Remove the temporary namespace imports\n' +
          '(import * as AllFormatters) after discovery.'
      ).toBe(false);
    });

    it('should not have console.log statements for utility discovery @2.3', () => {
      // Students should clean up the console.log statements after discovery
      const hasConsoleLogFormatters = includes(
        astTs,
        'CallExpression:has(PropertyAccessExpression[expression.name="console"][name.name="log"]):has(Identifier[name="AllFormatters"])'
      );
      const hasConsoleLogValidators = includes(
        astTs,
        'CallExpression:has(PropertyAccessExpression[expression.name="console"][name.name="log"]):has(Identifier[name="AllValidators"])'
      );

      const hasDiscoveryConsoleLog =
        hasConsoleLogFormatters || hasConsoleLogValidators;
      expect(
        hasDiscoveryConsoleLog,
        'Remove the console.log statements\n' + 'used for utility discovery.'
      ).toBe(false);
    });

    it('should have completed the utility discovery process @2.3', () => {
      // Verify the original imports are still there and new formatNumber is added
      const hasOriginalFormattersImport = includes(
        astTs,
        'ImportDeclaration StringLiteral[value="./utils/formatters"]'
      );
      const hasOriginalValidatorsImport = includes(
        astTs,
        'ImportDeclaration StringLiteral[value="./utils/validators"]'
      );
      const hasFormatNumberImport = includes(
        astTs,
        'ImportSpecifier Identifier[name="formatNumber"]'
      );

      const result =
        hasOriginalFormattersImport &&
        hasOriginalValidatorsImport &&
        hasFormatNumberImport;
      expect(
        result,
        'Complete these steps:\n' +
          '1) Keep original imports from formatters and validators\n' +
          '2) Add formatNumber to formatters import\n' +
          '3) Remove temporary namespace imports and console.log statements'
      ).toBe(true);
    });
  });

  describe('Import Pattern Analysis', () => {
    it('should demonstrate the import chaos problem @2.4', () => {
      // Count the number of import lines to show the growing complexity
      const componentImports = [
        'ImportDeclaration StringLiteral[value="./components/Badge/Badge"]',
        'ImportDeclaration StringLiteral[value="./components/Button/Button"]',
        'ImportDeclaration StringLiteral[value="./components/Card/Card"]',
        'ImportDeclaration StringLiteral[value="./components/Input/Input"]',
        'ImportDeclaration StringLiteral[value="./components/Modal/Modal"]',
      ];

      const importCount = componentImports.filter((importPath) =>
        includes(astTs, importPath)
      ).length;

      expect(
        importCount >= 4,
        'This file should contain need at least 4 component imports.\n' +
          'This shows the repetitive pattern that barrel files solve.'
      ).toBe(true);
    });

    it('should show the path complexity that barrels will solve @2.4', () => {
      // Check for utility imports that will be simplified by barrels
      const utilityImports = [
        'ImportDeclaration StringLiteral[value="./utils/formatters"]',
        'ImportDeclaration StringLiteral[value="./utils/validators"]',
      ];

      const hasUtilityImports = utilityImports.every((importPath) =>
        includes(astTs, importPath)
      );

      expect(
        hasUtilityImports,
        'Keep both utility imports.\n' +
          'These will be simplified with barrel files in Step 3.'
      ).toBe(true);
    });
  });

  describe('Development Environment', () => {
    it('should be ready for the next step @2.5', () => {
      // Verify the basic structure is in place for barrel file creation
      const hasReactImport = includes(
        astTs,
        'ImportDeclaration StringLiteral[value="react"]'
      );
      const hasFormattersImport = includes(
        astTs,
        'ImportDeclaration StringLiteral[value="./utils/formatters"]'
      );
      const hasValidatorsImport = includes(
        astTs,
        'ImportDeclaration StringLiteral[value="./utils/validators"]'
      );
      const hasStylesImport = includes(
        astTs,
        'ImportDeclaration StringLiteral[value="./App.module.css"]'
      );

      // Check for at least some component imports
      const componentImports = [
        'ImportDeclaration StringLiteral[value="./components/Badge/Badge"]',
        'ImportDeclaration StringLiteral[value="./components/Button/Button"]',
        'ImportDeclaration StringLiteral[value="./components/Card/Card"]',
        'ImportDeclaration StringLiteral[value="./components/Input/Input"]',
        'ImportDeclaration StringLiteral[value="./components/Modal/Modal"]',
      ];

      const componentImportCount = componentImports.filter((importPath) =>
        includes(astTs, importPath)
      ).length;

      const result =
        hasReactImport &&
        hasFormattersImport &&
        hasValidatorsImport &&
        hasStylesImport &&
        componentImportCount >= 3;
      expect(
        result,
        'App.tsx needs these imports to work properly:\n' +
          '- React from "react"\n' +
          '- At least 3 component imports (Badge, Button, Card, Input, Modal)\n' +
          '- Formatters from "./utils/formatters"\n' +
          '- Validators from "./utils/validators"\n' +
          '- Styles from "./App.module.css"'
      ).toBe(true);
    });
  });

  describe('Utility Functions Available', () => {
    it('should have access to all formatter utilities @2.6', async () => {
      // Test the utilities are accessible and working
      const formatters = await import('../../utils/formatters');

      const hasFormatNumber = typeof formatters.formatNumber === 'function';
      const hasFormatCurrency = typeof formatters.formatCurrency === 'function';
      const hasFormatDate = typeof formatters.formatDate === 'function';

      const result = hasFormatNumber && hasFormatCurrency && hasFormatDate;
      expect(
        result,
        'Verify utils/formatters exports:\n' +
          'formatNumber, formatCurrency, and formatDate.'
      ).toBe(true);

      // Test formatNumber specifically
      if (hasFormatNumber) {
        const formatted = formatters.formatNumber(15789);
        expect(
          formatted === '15,789',
          'formatNumber(15789) should return "15,789"'
        ).toBe(true);
      }
    });

    it('should have access to all validator utilities @2.6', async () => {
      // Test the validators are accessible and working
      const validators = await import('../../utils/validators');

      const hasIsValidEmail = typeof validators.isValidEmail === 'function';
      const hasIsValidPassword =
        typeof validators.isValidPassword === 'function';
      const hasIsRequired = typeof validators.isRequired === 'function';

      const result = hasIsValidEmail && hasIsValidPassword && hasIsRequired;
      expect(
        result,
        'All validator utilities should be accessible.\n' +
          'Check utils/validators exports validation functions.'
      ).toBe(true);

      // Test isValidEmail specifically
      if (hasIsValidEmail) {
        const validEmail = validators.isValidEmail('test@example.com');
        const invalidEmail = validators.isValidEmail('invalid');
        expect(
          validEmail === true && invalidEmail === false,
          'isValidEmail should correctly validate email addresses'
        ).toBe(true);
      }
    });
  });
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