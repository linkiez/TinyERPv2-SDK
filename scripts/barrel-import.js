#!/usr/bin/env node

/**
 * Barrel Import Generator
 *
 * Generates index.ts files (barrel exports) recursively throughout the src/ directory.
 * Each index.ts exports all TypeScript files in the current directory and re-exports
 * from subdirectory index.ts files.
 *
 * Usage: node scripts/barrel-import.js
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, '../src');
const EXCLUDE_DIRS = new Set(['node_modules', 'dist', 'coverage', '.git']);
const EXCLUDE_FILES = new Set(['index.ts', 'sheriff.config.ts']);
const EXCLUDE_PATTERNS = ['.test.ts', '.spec.ts', '.d.ts'];

/**
 * Check if a file should be excluded from barrel export
 */
function shouldExcludeFile(filename) {
  if (EXCLUDE_FILES.has(filename)) return true;
  return EXCLUDE_PATTERNS.some((pattern) => filename.includes(pattern));
}

/**
 * Check if a directory should be excluded from processing
 */
function shouldExcludeDir(dirname) {
  return EXCLUDE_DIRS.has(dirname);
}

/**
 * Get all items in a directory with their types
 */
async function getDirectoryItems(dirPath) {
  const items = await fs.readdir(dirPath, { withFileTypes: true });

  const files = items
    .filter((item) => item.isFile() && item.name.endsWith('.ts'))
    .filter((item) => !shouldExcludeFile(item.name))
    .map((item) => item.name);

  const subdirs = items
    .filter((item) => item.isDirectory())
    .filter((item) => !shouldExcludeDir(item.name))
    .map((item) => item.name);

  return { files, subdirs };
}

/**
 * Generate export statement for a file
 */
function generateFileExport(filename) {
  const basename = path.basename(filename, '.ts');
  return `export * from './${basename}';`;
}

/**
 * Generate export statement for a subdirectory index
 */
function generateDirExport(dirname) {
  return `export * from './${dirname}';`;
}

/**
 * Generate the content for an index.ts file
 */
async function generateIndexContent(dirPath, existingContent = '') {
  const { files, subdirs } = await getDirectoryItems(dirPath);

  const exports = [];

  // Add file exports
  for (const file of files) {
    exports.push(generateFileExport(file));
  }

  // Add subdirectory exports (these will have their own index.ts)
  for (const dir of subdirs) {
    exports.push(generateDirExport(dir));
  }

  if (exports.length === 0) {
    return null; // Don't create index if there's nothing to export
  }

  const generatedExports = exports.join('\n') + '\n';

  // If there's existing content, prepend generated exports
  if (existingContent.trim()) {
    return generatedExports + '\n' + existingContent;
  }

  return generatedExports;
}

/**
 * Read existing index.ts file if it exists
 */
async function readExistingIndex(indexPath) {
  try {
    const content = await fs.readFile(indexPath, 'utf-8');
    return { content, exists: true };
  } catch {
    return { content: '', exists: false };
  }
}

/**
 * Write index.ts file and log the action
 */
async function writeIndex(indexPath, content, fileExists) {
  const relativePath = path.relative(SRC_DIR, indexPath);
  await fs.writeFile(indexPath, content, 'utf-8');
  const action = fileExists ? 'updated (exports added to head)' : 'created';
  console.log(`✓ ${relativePath} (${action})`);
}

/**
 * Generate index.ts for a directory
 */
async function generateIndex(dirPath, files, subdirs) {
  if (files.length === 0 && subdirs.length === 0) return;

  const indexPath = path.join(dirPath, 'index.ts');
  const { content: existingContent, exists: fileExists } = await readExistingIndex(indexPath);
  const indexContent = await generateIndexContent(dirPath, existingContent);

  if (!indexContent) return;

  // Check if content changed
  if (fileExists && existingContent === indexContent) {
    const relativePath = path.relative(SRC_DIR, indexPath);
    console.log(`✓ ${relativePath} (unchanged)`);
    return;
  }

  await writeIndex(indexPath, indexContent, fileExists);
}

/**
 * Process a directory recursively
 */
async function processDirectory(dirPath) {
  const { files, subdirs } = await getDirectoryItems(dirPath);

  // Process subdirectories first (bottom-up approach)
  for (const subdir of subdirs) {
    const subdirPath = path.join(dirPath, subdir);
    await processDirectory(subdirPath);
  }

  // Generate index.ts for current directory
  await generateIndex(dirPath, files, subdirs);
}

console.log('🚀 Generating barrel imports...\n');
console.log(`Source directory: ${SRC_DIR}\n`);

try {
  // Check if src directory exists
  await fs.access(SRC_DIR);

  // Process the entire src directory recursively
  await processDirectory(SRC_DIR);

  console.log('\n✅ Barrel imports generated successfully!');
} catch (error) {
  console.error('\n❌ Error generating barrel imports:', error.message);
  process.exit(1);
}
