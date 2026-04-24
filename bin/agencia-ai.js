#!/usr/bin/env node

/**
 * Agencia AI Adaptavel - CLI Global
 * 
 * RESPONSABILIDADE: Gerenciar a instalacao GLOBAL do sistema
 * NAO cria projetos. Projetos sao criados pela skill agencia-init dentro do IDE.
 * 
 * Comandos:
 *   agencia-ai install-global  - Instala/atualiza recursos em ~/.agencia-ai/
 *   agencia-ai update          - Atualiza skills globais
 *   agencia-ai doctor          - Diagnostica instalacao
 *   agencia-ai version         - Mostra versao
 *   agencia-ai help            - Mostra ajuda
 * 
 * Instalacao:
 *   npm install -g agencia-ai-adaptavel
 * 
 * Fluxo de uso:
 *   1. npm install -g agencia-ai-adaptavel   (instala CLI global)
 *   2. agencia-ai install-global             (instala recursos em ~/.agencia-ai/)
 *   3. mkdir projeto && cd projeto           (cria pasta do projeto)
 *   4. Abrir no IDE (Claude, Cursor, etc.)   (IDE le skills de ~/.agencia-ai/)
 *   5. skill(name="agencia-init")            (skill cria estrutura do projeto)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const VERSION = '3.2.0';
const GLOBAL_DIR = path.join(os.homedir(), '.agencia-ai');
const SKILLS_DIR = path.join(GLOBAL_DIR, 'skills');
const AGENTS_DIR = path.join(GLOBAL_DIR, 'agents');
const PRESETS_DIR = path.join(GLOBAL_DIR, 'presets');
const SCRIPTS_DIR = path.join(GLOBAL_DIR, 'scripts');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  console.error(`${colors.red}✗ ${message}${colors.reset}`);
  process.exit(1);
}

function success(message) {
  console.log(`${colors.green}✓ ${message}${colors.reset}`);
}

function info(message) {
  console.log(`${colors.blue}ℹ ${message}${colors.reset}`);
}

function warn(message) {
  console.log(`${colors.yellow}⚠ ${message}${colors.reset}`);
}

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

function backupDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `${dir}.backup-${timestamp}`;
  
  info(`Fazendo backup em: ${backupPath}`);
  copyDir(dir, backupPath);
  success(`Backup criado: ${backupPath}`);
}

function safeRemove(dir) {
  if (!fs.existsSync(dir)) return;
  
  if (!dir.startsWith(GLOBAL_DIR)) {
    warn(`Tentativa de remover diretorio fora de ~/.agencia-ai: ${dir}`);
    warn('Operacao abortada por seguranca.');
    return;
  }
  
  fs.rmSync(dir, { recursive: true });
}

function installGlobal() {
  log('\n🚀 Instalando Agencia AI Adaptavel (Global)...', 'bold');
  
  const packageDir = path.resolve(__dirname, '..');
  
  ensureDir(GLOBAL_DIR);
  ensureDir(SKILLS_DIR);
  ensureDir(AGENTS_DIR);
  ensureDir(PRESETS_DIR);
  ensureDir(SCRIPTS_DIR);
  
  // Backup se ja existe
  if (fs.existsSync(path.join(GLOBAL_DIR, 'version'))) {
    info('Instalacao existente detectada. Fazendo backup...');
    backupDir(SKILLS_DIR);
    backupDir(AGENTS_DIR);
    backupDir(PRESETS_DIR);
    backupDir(SCRIPTS_DIR);
  }
  
  // Copia skills core
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
    const dest = path.join(SKILLS_DIR, skill);
    if (fs.existsSync(src)) {
      copyDir(src, dest);
      info(`Skill: ${skill}`);
    }
  }
  
  // Copia agentes
  const agentsSrc = path.join(packageDir, '.agents', 'agents');
  if (fs.existsSync(agentsSrc)) {
    copyDir(agentsSrc, AGENTS_DIR);
    info('Agentes especializados');
  }
  
  // Copia presets
  const presetsSrc = path.join(packageDir, 'presets');
  if (fs.existsSync(presetsSrc)) {
    copyDir(presetsSrc, PRESETS_DIR);
    info('Presets esteticos');
  }
  
  // Copia scripts
  const scriptsSrc = path.join(packageDir, 'scripts');
  if (fs.existsSync(scriptsSrc)) {
    copyDir(scriptsSrc, SCRIPTS_DIR);
    info('Scripts de validacao');
  }
  
  // Copia templates
  const templatesSrc = path.join(packageDir, 'templates');
  if (fs.existsSync(templatesSrc)) {
    copyDir(templatesSrc, path.join(GLOBAL_DIR, 'templates'));
    info('Templates de componentes');
  }
  
  // Salva versao
  fs.writeFileSync(path.join(GLOBAL_DIR, 'version'), VERSION);
  
  success(`\nAgencia AI Adaptavel v${VERSION} instalada!`);
  info(`Diretorio global: ${GLOBAL_DIR}`);
  info('Nenhum arquivo do seu sistema foi alterado.');
  
  log('\n📋 Recursos instalados:', 'bold');
  log(`  Skills:    ${SKILLS_DIR}`);
  log(`  Agentes:   ${AGENTS_DIR}`);
  log(`  Presets:   ${PRESETS_DIR}`);
  log(`  Scripts:   ${SCRIPTS_DIR}`);
  log(`  Templates: ${path.join(GLOBAL_DIR, 'templates')}`);
}

function updateGlobal() {
  log('\n🔄 Atualizando Agencia AI Adaptavel...', 'bold');
  
  if (!fs.existsSync(GLOBAL_DIR)) {
    error('Instalacao global nao encontrada. Execute: agencia-ai install-global');
  }
  
  const packageDir = path.resolve(__dirname, '..');
  
  info('Criando backup...');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(os.homedir(), `.agencia-ai-backup-${timestamp}`);
  ensureDir(backupDir);
  
  if (fs.existsSync(SKILLS_DIR)) copyDir(SKILLS_DIR, path.join(backupDir, 'skills'));
  if (fs.existsSync(AGENTS_DIR)) copyDir(AGENTS_DIR, path.join(backupDir, 'agents'));
  if (fs.existsSync(PRESETS_DIR)) copyDir(PRESETS_DIR, path.join(backupDir, 'presets'));
  if (fs.existsSync(SCRIPTS_DIR)) copyDir(SCRIPTS_DIR, path.join(backupDir, 'scripts'));
  success(`Backup criado em: ${backupDir}`);
  
  info('Removendo versao antiga...');
  safeRemove(SKILLS_DIR);
  safeRemove(AGENTS_DIR);
  safeRemove(PRESETS_DIR);
  safeRemove(SCRIPTS_DIR);
  
  installGlobal();
  
  success('\nAtualizacao concluida!');
  info(`Backup disponivel em: ${backupDir}`);
}

function doctor() {
  log('\n🏥 Diagnostico Agencia AI Adaptavel', 'bold');
  log(`Versao: ${VERSION}\n`);
  
  let issues = 0;
  
  try {
    const nodeVersion = process.version;
    info(`Node.js: ${nodeVersion}`);
    if (parseInt(nodeVersion.slice(1).split('.')[0]) < 18) {
      warn('Node.js >= 18 recomendado');
      issues++;
    }
  } catch {
    error('Node.js nao encontrado');
  }
  
  try {
    execSync('git --version', { stdio: 'pipe' });
    success('Git: OK');
  } catch {
    warn('Git: NAO ENCONTRADO');
    issues++;
  }
  
  if (fs.existsSync(GLOBAL_DIR)) {
    success(`Instalacao global: ${GLOBAL_DIR}`);
    
    const skills = fs.existsSync(SKILLS_DIR) ? fs.readdirSync(SKILLS_DIR) : [];
    success(`Skills: ${skills.length} encontradas`);
    
    const agents = fs.existsSync(AGENTS_DIR) ? fs.readdirSync(AGENTS_DIR) : [];
    success(`Agentes: ${agents.length} encontrados`);
    
    const presets = fs.existsSync(PRESETS_DIR) ? fs.readdirSync(PRESETS_DIR) : [];
    success(`Presets: ${presets.length} encontrados`);
  } else {
    warn('Instalacao global: NAO ENCONTRADA');
    info('Execute: agencia-ai install-global');
    issues++;
  }
  
  log('\n' + (issues === 0 
    ? `${colors.green}✓ Sistema OK!${colors.reset}`
    : `${colors.yellow}⚠ ${issues} problema(s) encontrado(s)${colors.reset}`
  ));
}

function showVersion() {
  console.log(`Agencia AI Adaptavel v${VERSION}`);
}

function showHelp() {
  log('\n🚀 Agencia AI Adaptavel - CLI (Gerenciamento Global)', 'bold');
  log(`Versao: ${VERSION}\n`);
  
  log('RESPONSABILIDADE:', 'bold');
  log('  Gerenciar a instalacao GLOBAL do sistema em ~/.agencia-ai/');
  log('  NAO cria projetos. Projetos sao criados pela skill agencia-init no IDE.\n');
  
  log('Comandos:');
  log('  install-global   Instala/atualiza recursos em ~/.agencia-ai/');
  log('  update           Atualiza skills globais (com backup)');
  log('  doctor           Diagnostica instalacao');
  log('  version          Mostra versao');
  log('  help             Mostra esta ajuda\n');
  
  log('Fluxo de uso:', 'bold');
  log('  1. npm install -g agencia-ai-adaptavel');
  log('  2. agencia-ai install-global');
  log('  3. mkdir meu-projeto && cd meu-projeto');
  log('  4. Abrir no IDE (Claude, Cursor, etc.)');
  log('  5. skill(name="agencia-init")    # Cria projeto');
  log('  6. skill(name="client-onboarding") # Entrevista\n');
}

const command = process.argv[2];

switch (command) {
  case 'install-global':
    installGlobal();
    break;
  case 'update':
    updateGlobal();
    break;
  case 'doctor':
    doctor();
    break;
  case 'version':
  case '-v':
  case '--version':
    showVersion();
    break;
  case 'help':
  case '-h':
  case '--help':
  default:
    showHelp();
    break;
}
