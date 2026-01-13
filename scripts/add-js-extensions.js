import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { existsSync, statSync } from 'node:fs';

/**
 * Check if a path is a directory (synchronously for use in replace callback)
 */
function isDirectory(fullPath) {
  try {
    return existsSync(fullPath) && statSync(fullPath).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Plugin to add .js extensions to relative imports in compiled TypeScript files
 * This is required for ESM modules to work correctly
 */
async function addJsExtensions(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      await addJsExtensions(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.d.ts'))) {
      // Process JavaScript and TypeScript declaration files
      let content = await readFile(fullPath, 'utf-8');
      let modified = false;

      // Regex to match import/export statements with relative paths without .js extension
      const importFromRegex = /((?:import|export)\s+[^'"]*from\s+['"])(\.[^'"]+)(['"])/g;
      const dynamicImportRegex = /import\s*\(\s*['"](\.[^'"]+)['"]\s*\)/g;

      const currentDir = dirname(fullPath);

      // Replace import/export from statements
      // Note: Using replace instead of replaceAll because we need the callback
      content = content.replaceAll(importFromRegex, (match, prefix, path, quote) => {
        // Check if path already has .js extension
        if (path.endsWith('.js')) {
          return match;
        }

        // Resolve the full path relative to the current file
        const resolvedPath = join(currentDir, path);

        // Check if it's a directory
        if (isDirectory(resolvedPath)) {
          // It's a directory, add /index.js
          modified = true;
          return `${prefix}${path}/index.js${quote}`;
        }

        // Add .js extension for file imports
        modified = true;
        return `${prefix}${path}.js${quote}`;
      });

      // Replace dynamic imports
      content = content.replaceAll(dynamicImportRegex, (match, path) => {
        if (path.endsWith('.js')) {
          return match;
        }

        const resolvedPath = join(currentDir, path);

        if (isDirectory(resolvedPath)) {
          modified = true;
          return `import('${path}/index.js')`;
        }

        modified = true;
        return `import('${path}.js')`;
      });

      if (modified) {
        await writeFile(fullPath, content, 'utf-8');
        console.log(`✅ Updated: ${fullPath}`);
      }
    }
  }
}

const distDir = './dist';
console.log('🔧 Adding .js extensions to imports...');
await addJsExtensions(distDir);
console.log('✅ All imports updated successfully');
