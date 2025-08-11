#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { generateCSSVariables } from '../src/utils/generateCSSVariables';

const cssContent = generateCSSVariables();
const outputPath = path.join(process.cwd(), 'src/styles/tokens.css');

fs.writeFileSync(outputPath, cssContent);
console.log(`✅ Generated CSS variables at ${outputPath}`);