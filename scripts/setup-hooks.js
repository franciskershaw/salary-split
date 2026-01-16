#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const HOOK_CONTENT = `#!/bin/sh
# Auto-sync shared files before commit

echo "🔄 Syncing shared files..."
npm run sync:shared

# Stage the generated files
git add apps/frontend/src/shared apps/api/src/shared

echo "✅ Shared files synced and staged"
`;

function setupHooks() {
  const gitDir = path.join(__dirname, '..', '.git');
  
  // Check if .git directory exists
  if (!fs.existsSync(gitDir)) {
    console.log('⚠️  Not a git repository, skipping hook setup');
    return;
  }

  const hooksDir = path.join(gitDir, 'hooks');
  const preCommitPath = path.join(hooksDir, 'pre-commit');

  // Ensure hooks directory exists
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
  }

  // Write pre-commit hook
  fs.writeFileSync(preCommitPath, HOOK_CONTENT, { mode: 0o755 });
  console.log('✅ Pre-commit hook installed successfully');
  console.log('📝 Shared files will auto-sync before each commit');
}

try {
  setupHooks();
} catch (error) {
  console.error('❌ Error setting up hooks:', error.message);
  // Don't fail the install if hooks can't be set up
  process.exit(0);
}
