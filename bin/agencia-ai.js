#!/usr/bin/env node

/**
 * Agencia AI Adaptavel — CLI Global
 *
 * RESPONSABILIDADE: Gerenciar a instalacao GLOBAL do sistema.
 * NAO cria projetos. Projetos sao criados pela skill agencia-init dentro do IDE.
 *
 * Comandos:
 *   agencia-ai install-global   Instala/atualiza recursos em ~/.agencia-ai/ + IDEs
 *     --only=<a,b,c>            Instalar so em IDEs especificas (claude,cursor,codex,opencode,antigravity,gemini-cli)
 *     --exclude=<a,b,c>         Pular IDEs especificas
 *     --dry-run                 Mostrar o que faria sem mudar nada
 *   agencia-ai update           Atualiza skills globais (com backup)
 *   agencia-ai doctor           Diagnostica instalacao
 *   agencia-ai version          Mostra versao
 *   agencia-ai help             Mostra ajuda
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const {
  GLOBAL_DIR,
  CORE_SKILLS,
  IDE_TARGETS,
  installAll,
  resolveTargets,
} = require('../build/installer');

const pkg = require('../package.json');
const VERSION = pkg.version;
const PACKAGE_DIR = path.resolve(__dirname, '..');

const SKILLS_DIR  = path.join(GLOBAL_DIR, 'skills');
const AGENTS_DIR  = path.join(GLOBAL_DIR, 'agents');
const PRESETS_DIR = path.join(GLOBAL_DIR, 'presets');
const SCRIPTS_DIR = path.join(GLOBAL_DIR, 'scripts');

const colors = {
  reset: '\x1b[0m', green: '\x1b[32m', yellow: '\x1b[33m',
  red: '\x1b[31m', blue: '\x1b[34m', cyan: '\x1b[36m', bold: '\x1b[1m',
};
const log     = (m, c = 'reset') => console.log(`${colors[c]}${m}${colors.reset}`);
const success = m => log(`✓ ${m}`, 'green');
const info    = m => log(`ℹ ${m}`, 'blue');
const warn    = m => log(`⚠ ${m}`, 'yellow');
const fail    = m => { console.error(`${colors.red}✗ ${m}${colors.reset}`); process.exit(1); };

// ─── parse de flags simples (sem dependencias) ──────────────────────
function parseFlags(argv) {
  const flags = {};
  for (const a of argv) {
    if (a === '--dry-run') flags.dryRun = true;
    else if (a.startsWith('--only='))    flags.only    = a.slice('--only='.length).split(',').map(s => s.trim()).filter(Boolean);
    else if (a.startsWith('--exclude=')) flags.exclude = a.slice('--exclude='.length).split(',').map(s => s.trim()).filter(Boolean);
  }
  return flags;
}

// ─── install-global ────────────────────────────────────────────────
function cmdInstallGlobal(argv) {
  const { only, exclude, dryRun } = parseFlags(argv);

  log(`\n🚀 ${dryRun ? '[DRY-RUN] ' : ''}Instalando Agencia AI Adaptavel v${VERSION}...`, 'bold');

  if (only) info(`Filtro --only: ${only.join(', ')}`);
  if (exclude) info(`Filtro --exclude: ${exclude.join(', ')}`);

  // Backup se ja existe instalacao
  if (!dryRun && fs.existsSync(path.join(GLOBAL_DIR, 'version'))) {
    info('Instalacao existente detectada. Fazendo backup...');
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    for (const d of [SKILLS_DIR, AGENTS_DIR, PRESETS_DIR, SCRIPTS_DIR]) {
      if (fs.existsSync(d)) {
        const backupPath = `${d}.backup-${ts}`;
        // copia simples (evita mv cross-device)
        const { copyDir } = loadCopyHelper();
        copyDir(d, backupPath);
      }
    }
  }

  const result = installAll({ packageDir: PACKAGE_DIR, only, exclude, dryRun });

  log(`\n${dryRun ? 'Nada foi alterado (dry-run).' : `Agencia AI Adaptavel v${result.version} instalada.`}`, 'bold');

  if (!dryRun) {
    info(`Diretorio global: ${GLOBAL_DIR}`);
    info('Nenhum arquivo do seu sistema foi alterado fora de ~/.agencia-ai e ~/.{ide}/skills/');
  }
}

function loadCopyHelper() {
  // copyDir pequeno para backup local (evita dependencia)
  function copyDir(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const s = path.join(src, entry.name);
      const d = path.join(dest, entry.name);
      entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
    }
  }
  return { copyDir };
}

// ─── init ──────────────────────────────────────────────────────────
function cmdInit(targetDir) {
  const dir = targetDir || '.';
  log('\n🏗️  Project Initialization Guide', 'bold');
  log('');
  log('The CLI does not create projects directly. Use your IDE:', 'cyan');
  log('');
  log('  1. mkdir my-project && cd my-project');
  log('  2. Open the folder in your IDE (Claude, OpenCode, Cursor, etc.)');
  log('  3. Run: skill(name="agencia-init")');
  log('');
  log('This will:');
  log('  • Copy core skills from ~/.agencia-ai/');
  log('  • Download updated external skills (Marketing, UI/UX, Anthropic, Antigravity)');
  log('  • Set up Context Engineering (AGENTS.md, PROJECT.md, STATE.md)');
  log('  • Create cross-IDE skill structure');
  log('');
  info(`Target directory: ${path.resolve(dir)}`);
}

// ─── update ────────────────────────────────────────────────────────
function cmdUpdate() {
  log('\n🔄 Atualizando Agencia AI Adaptavel...', 'bold');

  if (!fs.existsSync(GLOBAL_DIR)) {
    fail('Instalacao global nao encontrada. Execute: agencia-ai install-global');
  }

  // install-global ja faz backup automatico; basta reexecutar
  cmdInstallGlobal([]);
  success('\nAtualizacao concluida!');
}

// ─── doctor ────────────────────────────────────────────────────────
function cmdDoctor() {
  log(`\n🏥 Diagnostico Agencia AI Adaptavel v${VERSION}\n`, 'bold');

  let issues = 0;

  // Node
  const nodeMajor = parseInt(process.version.slice(1).split('.')[0], 10);
  if (nodeMajor >= 18) success(`Node.js ${process.version}`);
  else { warn(`Node.js ${process.version} (>= 18 recomendado)`); issues++; }

  // Git
  try { execSync('git --version', { stdio: 'pipe' }); success('Git: OK'); }
  catch { warn('Git: NAO ENCONTRADO'); issues++; }

  // SSoT global
  if (fs.existsSync(GLOBAL_DIR)) {
    success(`SSoT global: ${GLOBAL_DIR}`);
    const skills  = fs.existsSync(SKILLS_DIR)  ? fs.readdirSync(SKILLS_DIR)  : [];
    const agents  = fs.existsSync(AGENTS_DIR)  ? fs.readdirSync(AGENTS_DIR)  : [];
    const presets = fs.existsSync(PRESETS_DIR) ? fs.readdirSync(PRESETS_DIR) : [];
    success(`Skills:  ${skills.length}`);
    success(`Agentes: ${agents.length}`);
    success(`Presets: ${presets.length}`);
  } else {
    warn('SSoT global: NAO ENCONTRADA');
    info('Execute: agencia-ai install-global');
    issues++;
  }

  // IDEs
  log('\nPropagacao para IDEs:', 'bold');
  const targets = resolveTargets();
  if (targets.length === 0) {
    warn('Nenhuma IDE detectada nos diretorios esperados');
    for (const t of IDE_TARGETS) log(`  • ${t.name.padEnd(14)} (procurava: ${t.parent})`);
    issues++;
  } else {
    for (const t of targets) {
      const installed = CORE_SKILLS.filter(s => fs.existsSync(path.join(t.skillsPath, s)));
      const missing = CORE_SKILLS.filter(s => !fs.existsSync(path.join(t.skillsPath, s)));
      if (missing.length === 0) {
        success(`${t.name.padEnd(14)} ${installed.length}/${CORE_SKILLS.length} skills core`);
      } else {
        warn(`${t.name.padEnd(14)} ${installed.length}/${CORE_SKILLS.length} (faltam: ${missing.join(', ')})`);
        issues++;
      }
    }
  }

  log('\n' + (issues === 0
    ? `${colors.green}✓ Sistema OK!${colors.reset}`
    : `${colors.yellow}⚠ ${issues} problema(s) encontrado(s)${colors.reset}`
  ));
}

// ─── help / version ────────────────────────────────────────────────
function cmdHelp() {
  log(`\n🚀 Agencia AI Adaptavel v${VERSION} — CLI\n`, 'bold');
  log('RESPONSABILIDADE:', 'bold');
  log('  Gerenciar a instalacao GLOBAL do sistema em ~/.agencia-ai/');
  log('  NAO cria projetos. Projetos sao criados pela skill agencia-init no IDE.\n');

  log('COMANDOS:', 'bold');
  log('  install-global [flags]   Popula ~/.agencia-ai + propaga para IDEs detectadas');
  log('    --only=k1,k2           so estas IDEs (claude,cursor,codex,opencode,antigravity,gemini-cli)');
  log('    --exclude=k1,k2        pular estas IDEs');
  log('    --dry-run              mostrar sem alterar');
  log('  init [dir]               Mostra como inicializar um projeto novo');
  log('  update                   Re-instala com backup automatico');
  log('  doctor                   Diagnostica instalacao');
  log('  version                  Mostra versao\n');

  log('FLUXO:', 'bold');
  log('  1. npm install -g @pauloarthurrocha/agencia-ai-adaptavel --registry=https://npm.pkg.github.com');
  log('  2. (opcional) agencia-ai doctor');
  log('  3. cd meu-projeto');
  log('  4. IDE > skill(name="agencia-init")');
  log('  5. IDE > skill(name="client-onboarding")\n');
}

// ─── dispatch ──────────────────────────────────────────────────────
const [, , command, ...rest] = process.argv;

switch (command) {
  case 'install-global': cmdInstallGlobal(rest); break;
  case 'init':           cmdInit(rest[0]); break;
  case 'update':         cmdUpdate(); break;
  case 'doctor':         cmdDoctor(); break;
  case 'version':
  case '-v':
  case '--version':
    console.log(`Agencia AI Adaptavel v${VERSION}`);
    break;
  case 'help':
  case '-h':
  case '--help':
  case undefined:
    cmdHelp();
    break;
  default:
    warn(`Comando desconhecido: ${command}`);
    cmdHelp();
    process.exit(1);
}
