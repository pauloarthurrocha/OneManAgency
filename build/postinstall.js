#!/usr/bin/env node
/**
 * OneManAgency — Postinstall Hook
 *
 * Runs automatically after `npm install -g` to populate ~/.oma/
 * and propagate skills to detected IDEs.
 */

const path = require('path');
const { installAll } = require('./installer');

// packageDir is the directory where this package was installed
const packageDir = path.resolve(__dirname, '..');

try {
  const result = installAll({ packageDir });
  console.log(`\n✅ OneManAgency v${result.version} installed globally.`);
  console.log(`   Directory: ${require('os').homedir()}${require('path').sep}.oma`);
  if (result.targets.length > 0) {
    console.log(`   IDEs configured: ${result.targets.join(', ')}`);
  } else {
    console.log(`   No IDEs detected yet. Install one and run: oma install`);
  }
  console.log('');
} catch (err) {
  console.error('\n❌ Postinstall failed:', err.message);
  console.error('   You can manually run: oma install\n');
  process.exit(0); // Don't break npm install
}
