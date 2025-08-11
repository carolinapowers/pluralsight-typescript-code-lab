import { Colors } from '../tokens/colors';
import { Spacing } from '../tokens/spacing';
import { Typography } from '../tokens/typography';
import { Shadows } from '../tokens/shadows';

type TokenValue =
  | string
  | number
  | readonly string[]
  | { [key: string]: TokenValue };

/**
 * Converts a nested object to CSS custom properties
 * @example
 * Input: { primary: { 500: '#3b82f6' } }, 'color'
 * Output: '  --color-primary-500: #3b82f6;\n'
 */

function objectToCSSVariables(
  obj: Record<string, TokenValue>,
  prefix: string = ''
): string {
  let css = '';

  for (const [key, value] of Object.entries(obj)) {
    const varName = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'object' && !Array.isArray(value)) {
      css += objectToCSSVariables(value as Record<string, TokenValue>, varName);
    } else if (Array.isArray(value)) {
      css += `  --${varName}: ${value.join(', ')};\n`;
    } else {
      css += `  --${varName}: ${value};\n`;
    }
  }

  return css;
}

/**
 * Generates CSS custom properties from design tokens
 * This ensures our CSS stays in sync with our TypeScript tokens
 */
export function generateCSSVariables(): string {
  let css = ':root {\n';
  
  // Add colors
  css += objectToCSSVariables(Colors, 'color');
  
  // Add spacing
  css += objectToCSSVariables(Spacing, 'spacing');
  
  // Add typography
  css += objectToCSSVariables(Typography, 'typography');
  
  // Add shadows
  css += objectToCSSVariables(Shadows, 'shadows');
  
  css += '}\n';
  
  return css;
}

// You can run this to generate the CSS:
// console.log(generateCSSVariables());