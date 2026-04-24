#!/usr/bin/env node

/**
 * Post-install script
 * Executado automaticamente apos npm install -g agencia-ai-adaptavel
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const GLOBAL_DIR = path.join(os.homedir(), '.agencia-ai');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('\n🚀 Agencia AI Adaptavel - Instalacao Global\n');

// Diretorio do pacote
const packageDir = path.resolve(__dirname, '..');

// Cria diretorios globais
ensureDir(GLOBAL_DIR);
ensureDir(path.join(GLOBAL_DIR, 'skills'));
ensureDir(path.join(GLOBAL_DIR, 'agents'));
ensureDir(path.join(GLOBAL_DIR, 'presets'));
ensureDir(path.join(GLOBAL_DIR, 'scripts'));
ensureDir(path.join(GLOBAL_DIR, 'templates'));

// Copia recursos
const skillsDir = path.join(GLOBAL_DIR, 'skills');
const skills = [
  'agencia-init',
  'agencia-executor',
  'client-onboarding',
  'pipeline-generator',
  'agencia-verify-work',
  'skill-creator'
];

for (const skill of skills) {
  const src = path.join(packageDir, skill);
  const dest = path.join(skillsDir, skill);
  if (fs.existsSync(src)) {
    copyDir(src, dest);
  }
}

// Copia agentes
const agentsSrc = path.join(packageDir, '.agents', 'agents');
if (fs.existsSync(agentsSrc)) {
  copyDir(agentsSrc, path.join(GLOBAL_DIR, 'agents'));
}

// Copia presets
const presetsSrc = path.join(packageDir, 'presets');
if (fs.existsSync(presetsSrc)) {
  copyDir(presetsSrc, path.join(GLOBAL_DIR, 'presets'));
}

// Copia scripts
const scriptsSrc = path.join(packageDir, 'scripts');
if (fs.existsSync(scriptsSrc)) {
  copyDir(scriptsSrc, path.join(GLOBAL_DIR, 'scripts'));
}

// Copia templates
const templatesSrc = path.join(packageDir, 'templates');
if (fs.existsSync(templatesSrc)) {
  copyDir(templatesSrc, path.join(GLOBAL_DIR, 'templates'));
}

// Salva versao
const version = require('../package.json').version;
fs.writeFileSync(path.join(GLOBAL_DIR, 'version'), version);

console.log('✓ Instalacao concluida!');
console.log(`✓ Diretorio global: ${GLOBAL_DIR}`);
console.log(`✓ Versao: ${version}`);
console.log('\nPara comecar:');
console.log('  mkdir meu-projeto && cd meu-projeto');
console.log('  agencia-ai init\n');
