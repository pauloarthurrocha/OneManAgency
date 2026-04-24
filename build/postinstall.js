#!/usr/bin/env node
/**
 * Agencia AI Adaptavel — Postinstall Hook
 *
 * Runs automatically after `npm install -g` to populate ~/.agencia-ai/
 * and propagate skills to detected IDEs.
 */

const path = require('path');
const { installAll } = require('./installer');

// packageDir is the directory where this package was installed
const packageDir = path.resolve(__dirname, '..');

try {
  const result = installAll({ packageDir });
  console.log(`\n✅ Agencia AI Adaptavel v${result.version} installed globally.`);
  console.log(`   Directory: ${require('os').homedir()}${require('path').sep}.agencia-ai`);
  if (result.targets.length > 0) {
    console.log(`   IDEs configured: ${result.targets.join(', ')}`);
  } else {
    console.log(`   No IDEs detected yet. Install one and run: agencia-ai install-global`);
  }
  console.log('');
} catch (err) {
  console.error('\n❌ Postinstall failed:', err.message);
  console.error('   You can manually run: agencia-ai install-global\n');
  process.exit(0); // Don't break npm install
}
