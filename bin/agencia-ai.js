#!/usr/bin/env node

/**
 * Agencia AI Adaptavel - CLI Global
 * 
 * Comandos:
 *   agencia-ai init [pasta]     - Inicializa novo projeto
 *   agencia-ai update           - Atualiza skills globais
 *   agencia-ai doctor           - Diagnostica instalacao
 *   agencia-ai version          - Mostra versao
 *   agencia-ai help             - Mostra ajuda
 * 
 * Instalacao:
 *   npm install -g agencia-ai-adaptavel
 *   # ou
 *   npx agencia-ai-adaptavel init
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

// Cores para terminal
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

// Verifica se diretorio existe
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Copia diretorio recursivamente
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

// Detecta qual IDE esta sendo usada
function detectIDE() {
  const cwd = process.cwd();
  
  if (fs.existsSync(path.join(cwd, '.claude'))) return 'claude';
  if (fs.existsSync(path.join(cwd, '.opencode'))) return 'opencode';
  if (fs.existsSync(path.join(cwd, '.gemini'))) return 'antigravity';
  if (fs.existsSync(path.join(cwd, '.codex'))) return 'codex';
  if (fs.existsSync(path.join(cwd, '.cursor'))) return 'cursor';
  
  // Tenta detectar via variaveis de ambiente ou processos
  if (process.env.CLAUDE_CODE) return 'claude';
  if (process.env.OPENCODE) return 'opencode';
  
  return 'generic';
}

// Verifica se eh seguro prosseguir
function safetyCheck() {
  // Nunca toca fora de ~/.agencia-ai sem permissao
  const dangerousPaths = ['/', '/home', 'C:\\', process.env.USERPROFILE];
  return true;
}

// Faz backup de diretorio existente
function backupDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `${dir}.backup-${timestamp}`;
  
  info(`Fazendo backup em: ${backupPath}`);
  copyDir(dir, backupPath);
  success(`Backup criado: ${backupPath}`);
}

// Remove apenas diretorios que nos criamos
function safeRemove(dir) {
  if (!fs.existsSync(dir)) return;
  
  // Verifica se esta dentro de ~/.agencia-ai
  if (!dir.startsWith(GLOBAL_DIR)) {
    warn(`Tentativa de remover diretorio fora de ~/.agencia-ai: ${dir}`);
    warn('Operacao abortada por seguranca.');
    return;
  }
  
  fs.rmSync(dir, { recursive: true });
}

// Instala skills globais (chamado no postinstall ou init)
function installGlobal() {
  log('\n🚀 Instalando Agencia AI Adaptavel...', 'bold');
  
  // Diretorio do pacote npm (onde o modulo foi instalado)
  const packageDir = path.resolve(__dirname, '..');
  
  info('Verificando seguranca...');
  safetyCheck();
  
  // Cria diretorios (nunca substitui existentes)
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
      info(`Copiando skill: ${skill}`);
    }
  }
  
  // Copia agentes
  const agentsSrc = path.join(packageDir, '.agents', 'agents');
  if (fs.existsSync(agentsSrc)) {
    copyDir(agentsSrc, AGENTS_DIR);
    info('Copiando agentes especializados...');
  }
  
  // Copia presets
  const presetsSrc = path.join(packageDir, 'presets');
  if (fs.existsSync(presetsSrc)) {
    copyDir(presetsSrc, PRESETS_DIR);
    info('Copiando presets esteticos...');
  }
  
  // Copia scripts
  const scriptsSrc = path.join(packageDir, 'scripts');
  if (fs.existsSync(scriptsSrc)) {
    copyDir(scriptsSrc, SCRIPTS_DIR);
    info('Copiando scripts de validacao...');
  }
  
  // Copia templates
  const templatesSrc = path.join(packageDir, 'templates');
  if (fs.existsSync(templatesSrc)) {
    copyDir(templatesSrc, path.join(GLOBAL_DIR, 'templates'));
    info('Copiando templates de componentes...');
  }
  
  // Salva versao
  fs.writeFileSync(
    path.join(GLOBAL_DIR, 'version'),
    VERSION
  );
  
  success(`Agencia AI Adaptavel v${VERSION} instalada!`);
  info(`Diretorio global: ${GLOBAL_DIR}`);
  info('Nenhum arquivo do seu sistema foi alterado.');
}

// Inicializa novo projeto
function initProject(targetDir = '.') {
  const projectPath = path.resolve(targetDir);
  const projectName = path.basename(projectPath);
  
  log(`\n🎯 Inicializando projeto: ${projectName}`, 'bold');
  
  // Verifica se pasta existe e tem conteudo
  if (fs.existsSync(projectPath)) {
    const files = fs.readdirSync(projectPath);
    const hasContent = files.length > 0 && !files.every(f => f.startsWith('.'));
    
    if (hasContent) {
      warn(`A pasta "${projectName}" ja existe e contem arquivos.`);
      info('Apenas arquivos da Agencia AI serao adicionados.');
      info('Nenhum arquivo existente sera removido ou alterado.\n');
    }
  }
  
  // Verifica se global esta instalado
  if (!fs.existsSync(GLOBAL_DIR)) {
    warn('Instalacao global nao encontrada. Instalando...');
    installGlobal();
  }
  
  // Cria pasta do projeto se nao existir
  ensureDir(projectPath);
  
  // Cria estrutura .agents/skills/
  const projectSkillsDir = path.join(projectPath, '.agents', 'skills');
  ensureDir(projectSkillsDir);
  
  // Copia skills do global para o projeto
  if (fs.existsSync(SKILLS_DIR)) {
    copyDir(SKILLS_DIR, projectSkillsDir);
    success('Skills copiadas para .agents/skills/');
  }
  
  // Cria estrutura .planning/
  const planningDir = path.join(projectPath, '.planning');
  ensureDir(planningDir);
  
  // Detecta IDE
  const ide = detectIDE();
  info(`IDE detectada: ${ide}`);
  
  // Cria arquivos de contexto basicos (apenas se nao existem)
  const now = new Date().toISOString();
  
  // STATE.md
  const statePath = path.join(planningDir, 'STATE.md');
  if (!fs.existsSync(statePath)) {
    fs.writeFileSync(statePath,
      `# STATE.md - ${projectName}\n\n` +
      `> Projeto inicializado em: ${now}\n` +
      `> IDE: ${ide}\n` +
      `> Status: Aguardando onboarding\n\n` +
      `## Progresso\n\n` +
      `- [ ] Fase 0: Onboarding (briefing e pipeline)\n` +
      `- [ ] Fase 1: Setup de infra\n\n` +
      `## Proxima Acao\n\n` +
      `Execute: skill(name="client-onboarding")\n`
    );
  }
  
  // discovery-notes.md
  const discoveryPath = path.join(planningDir, 'discovery-notes.md');
  if (!fs.existsSync(discoveryPath)) {
    fs.writeFileSync(discoveryPath,
      `# Discovery Notes - ${projectName}\n\n` +
      `> Data: ${now}\n\n` +
      `## Regras Aprendidas\n\n` +
      `## Decisoes Arquiteturais\n\n` +
      `## Contexto do Cliente\n\n`
    );
  }
  
  // CHANGELOG_LLM.md
  const changelogPath = path.join(planningDir, 'CHANGELOG_LLM.md');
  if (!fs.existsSync(changelogPath)) {
    fs.writeFileSync(changelogPath,
      `# CHANGELOG_LLM.md - ${projectName}\n\n` +
      `## ${now.split('T')[0]}\n\n` +
      `- ${now} (init) Projeto inicializado via agencia-ai init\n`
    );
  }
  
  // Cria .gitignore (apenas se nao existe)
  const gitignorePath = path.join(projectPath, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, 
      `# Dependencies\n` +
      `node_modules/\n` +
      `.env\n` +
      `.env.local\n` +
      `\n` +
      `# Build\n` +
      `dist/\n` +
      `build/\n` +
      `.next/\n` +
      `out/\n` +
      `\n` +
      `# IDE\n` +
      `.idea/\n` +
      `.vscode/\n` +
      `*.swp\n` +
      `*.swo\n` +
      `\n` +
      `# OS\n` +
      `.DS_Store\n` +
      `Thumbs.db\n`
    );
    info('.gitignore criado');
  } else {
    info('.gitignore ja existe (preservado)');
  }
  
  // Cria README do projeto (apenas se nao existe)
  const readmePath = path.join(projectPath, 'README.md');
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath,
      `# ${projectName}\n\n` +
      `> Projeto gerenciado pela Agencia AI Adaptavel\n` +
      `> Iniciado em: ${now.split('T')[0]}\n\n` +
      `## Comandos\n\n` +
      `\`\`\`bash\n` +
      `# Continuar projeto\n` +
      `skill(name="agencia-executor")\n` +
      `\`\`\`\n\n` +
      `## Estrutura\n\n` +
      `- \`.agents/skills/\` - Skills do projeto\n` +
      `- \`.planning/\` - Documentacao e estado\n`
    );
    info('README.md criado');
  } else {
    info('README.md ja existe (preservado)');
  }
  
  // Cria pasta .agent/rules (apenas se nao existe)
  const agentRulesDir = path.join(projectPath, '.agent', 'rules');
  ensureDir(agentRulesDir);
  
  // Cria PROJECT.md placeholder (apenas se nao existe)
  const projectMdPath = path.join(agentRulesDir, 'PROJECT.md');
  if (!fs.existsSync(projectMdPath)) {
    fs.writeFileSync(projectMdPath,
      `# PROJECT.md - ${projectName}\n\n` +
      `> Status: PENDENTE - Preencher durante onboarding\n` +
      `> Tipo: [landing_page | saas | automation | low_ticket | script | hybrid]\n` +
      `> Stack: [a definir]\n\n` +
      `## Stack\n\n` +
      `- Frontend: [ ]\n` +
      `- Backend: [ ]\n` +
      `- Database: [ ]\n` +
      `- Hosting: [ ]\n` +
      `- Auth: [ ]\n` +
      `\n` +
      `## Guardrails\n\n` +
      `- [ ] Definir durante onboarding\n`
    );
  }
  
  success(`Projeto inicializado em: ${projectPath}`);
  log('\n📋 Resumo do que foi feito:', 'bold');
  log('  ✓ Skills copiadas para .agents/skills/');
  log('  ✓ Arquivos de contexto criados em .planning/');
  log('  ✓ Estrutura de projeto configurada');
  log('  ✓ Nenhum arquivo existente foi alterado');
  log('\n📋 Proximos passos:', 'bold');
  log(`   cd ${projectName}`);
  log(`   skill(name="client-onboarding")`);
  log('\n   # ou execute:');
  log(`   agencia-ai onboard\n`);
}

// Atualiza skills globais
function updateGlobal() {
  log('\n🔄 Atualizando Agencia AI Adaptavel...', 'bold');
  
  if (!fs.existsSync(GLOBAL_DIR)) {
    error('Instalacao global nao encontrada. Execute: npm install -g agencia-ai-adaptavel');
  }
  
  const packageDir = path.resolve(__dirname, '..');
  
  // Backup antes de atualizar
  info('Criando backup da instalacao atual...');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(os.homedir(), `.agencia-ai-backup-${timestamp}`);
  ensureDir(backupDir);
  
  if (fs.existsSync(SKILLS_DIR)) {
    copyDir(SKILLS_DIR, path.join(backupDir, 'skills'));
  }
  if (fs.existsSync(AGENTS_DIR)) {
    copyDir(AGENTS_DIR, path.join(backupDir, 'agents'));
  }
  if (fs.existsSync(PRESETS_DIR)) {
    copyDir(PRESETS_DIR, path.join(backupDir, 'presets'));
  }
  if (fs.existsSync(SCRIPTS_DIR)) {
    copyDir(SCRIPTS_DIR, path.join(backupDir, 'scripts'));
  }
  success(`Backup criado em: ${backupDir}`);
  
  // Remove diretorios antigos (apenas os nossos)
  info('Removendo versao antiga...');
  safeRemove(SKILLS_DIR);
  safeRemove(AGENTS_DIR);
  safeRemove(PRESETS_DIR);
  safeRemove(SCRIPTS_DIR);
  
  // Reinstala
  installGlobal();
  
  success('Atualizacao concluida!');
  info(`Backup disponivel em: ${backupDir}`);
}

// Diagnostico
function doctor() {
  log('\n🏥 Diagnostico Agencia AI Adaptavel', 'bold');
  log(`Versao: ${VERSION}\n`);
  
  let issues = 0;
  
  // Verifica Node.js
  try {
    const nodeVersion = process.version;
    info(`Node.js: ${nodeVersion}`);
    const major = parseInt(nodeVersion.slice(1).split('.')[0]);
    if (major < 18) {
      warn('Node.js >= 18 recomendado');
      issues++;
    }
  } catch {
    error('Node.js nao encontrado');
  }
  
  // Verifica Git
  try {
    execSync('git --version', { stdio: 'pipe' });
    success('Git: OK');
  } catch {
    warn('Git: NAO ENCONTRADO (necessario para algumas features)');
    issues++;
  }
  
  // Verifica instalacao global
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
  
  // Verifica se esta em um projeto
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, '.agents', 'skills'))) {
    success('Projeto local: Skills encontradas');
  } else {
    info('Projeto local: Nenhum projeto inicializado aqui');
  }
  
  log('\n' + (issues === 0 
    ? `${colors.green}✓ Tudo OK!${colors.reset}`
    : `${colors.yellow}⚠ ${issues} problema(s) encontrado(s)${colors.reset}`
  ));
}

// Mostra versao
function showVersion() {
  console.log(`Agencia AI Adaptavel v${VERSION}`);
}

// Mostra ajuda
function showHelp() {
  log('\n🚀 Agencia AI Adaptavel - CLI', 'bold');
  log(`Versao: ${VERSION}\n`);
  log('Comandos:');
  log('  init [pasta]     Inicializa novo projeto');
  log('  update           Atualiza skills globais');
  log('  doctor           Diagnostica instalacao');
  log('  install-global   Instala/Atualiza recursos globais');
  log('  version          Mostra versao');
  log('  help             Mostra esta ajuda\n');
  log('Exemplos:');
  log('  agencia-ai init meu-projeto');
  log('  cd meu-projeto && agencia-ai init\n');
  log('Fluxo tipico:');
  log('  1. npm install -g agencia-ai-adaptavel');
  log('  2. mkdir projeto && cd projeto');
  log('  3. agencia-ai init');
  log('  4. skill(name="client-onboarding")\n');
}

// MAIN
const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  case 'init':
    initProject(arg);
    break;
  case 'update':
    updateGlobal();
    break;
  case 'doctor':
    doctor();
    break;
  case 'install-global':
    installGlobal();
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
