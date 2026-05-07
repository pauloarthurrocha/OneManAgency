const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// ─── Constants ─────────────────────────────────────────────────────
const GLOBAL_DIR = path.join(os.homedir(), '.agencia-ai');
const SKILLS_DIR = path.join(GLOBAL_DIR, 'skills');
const AGENTS_DIR = path.join(GLOBAL_DIR, 'agents');
const PRESETS_DIR = path.join(GLOBAL_DIR, 'presets');
const TEMPLATES_DIR = path.join(GLOBAL_DIR, 'templates');
const SCRIPTS_DIR = path.join(GLOBAL_DIR, 'scripts');

const CORE_SKILLS = [
  'agencia-init',
  'agencia-executor',
  'client-onboarding',
  'pipeline-generator',
  'agencia-verify-work',
  'skill-creator',
  'agencia-ceo-review',
  'agencia-eng-review',
  'agencia-design-review',
  'agencia-release-manager',
];

const IDE_TARGETS = [
  { name: 'claude', parent: '.claude', skills: '.claude/skills' },
  { name: 'opencode', parent: '.opencode', skills: '.opencode/skills' },
  { name: 'codex', parent: '.codex', skills: '.codex/skills' },
  { name: 'cursor', parent: '.cursor', skills: '.cursor/skills' },
  { name: 'antigravity', parent: '.gemini/antigravity', skills: '.gemini/antigravity/skills' },
  { name: 'roo', parent: '.roo', skills: '.roo/skills' },
  { name: 'gemini-cli', parent: '.gemini', skills: '.gemini/skills' },
];

// ─── Helpers ───────────────────────────────────────────────────────

function copyDir(src, dest, { dryRun = false, overwrite = true } = {}) {
  if (!fs.existsSync(src)) return;
  if (dryRun) {
    console.log(`[dry-run] would copy ${src} -> ${dest}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(s, d, { dryRun, overwrite });
    } else {
      if (!overwrite && fs.existsSync(d)) continue;
      fs.copyFileSync(s, d);
    }
  }
}

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.rmSync(dir, { recursive: true, force: true });
}

function readVersion(packageDir) {
  try {
    const pkgPath = path.join(packageDir, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    return pkg.version || 'unknown';
  } catch {
    return 'unknown';
  }
}

// ─── Detect installed IDEs ─────────────────────────────────────────

function resolveTargets() {
  const home = os.homedir();
  return IDE_TARGETS
    .map(t => ({
      ...t,
      parentPath: path.join(home, t.parent),
      skillsPath: path.join(home, t.skills),
    }))
    .filter(t => fs.existsSync(t.parentPath));
}

// ─── Core install logic ────────────────────────────────────────────

function installAll({ packageDir, only, exclude, dryRun } = {}) {
  const version = readVersion(packageDir);

  if (dryRun) {
    console.log(`[dry-run] Installing Agencia AI Adaptavel v${version}`);
    console.log(`[dry-run] Global dir: ${GLOBAL_DIR}`);
  }

  // ── 1. Create global dirs ──
  for (const d of [SKILLS_DIR, AGENTS_DIR, PRESETS_DIR, TEMPLATES_DIR, SCRIPTS_DIR]) {
    if (!dryRun) {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    }
  }

  // ── 2. Copy core skills from src/skills/ ──
  const srcSkills = path.join(packageDir, 'src', 'skills');
  if (fs.existsSync(srcSkills)) {
    for (const skill of CORE_SKILLS) {
      const src = path.join(srcSkills, skill);
      const dest = path.join(SKILLS_DIR, skill);
      if (fs.existsSync(src)) {
        if (!dryRun) {
          rmDir(dest);
          copyDir(src, dest);
        }
      }
    }
  }

  // ── 3. Copy agents from src/agents/ ──
  const srcAgents = path.join(packageDir, 'src', 'agents');
  if (fs.existsSync(srcAgents)) {
    if (!dryRun) {
      rmDir(AGENTS_DIR);
      copyDir(srcAgents, AGENTS_DIR);
    }
  }

  // ── 4. Copy presets from src/presets/ ──
  const srcPresets = path.join(packageDir, 'src', 'presets');
  if (fs.existsSync(srcPresets)) {
    if (!dryRun) {
      rmDir(PRESETS_DIR);
      copyDir(srcPresets, PRESETS_DIR);
    }
  }

  // ── 5. Copy templates from src/templates/ ──
  const srcTemplates = path.join(packageDir, 'src', 'templates');
  if (fs.existsSync(srcTemplates)) {
    if (!dryRun) {
      rmDir(TEMPLATES_DIR);
      copyDir(srcTemplates, TEMPLATES_DIR);
    }
  }

  // ── 6. Copy scripts from src/scripts/ ──
  const srcScripts = path.join(packageDir, 'src', 'scripts');
  if (fs.existsSync(srcScripts)) {
    if (!dryRun) {
      rmDir(SCRIPTS_DIR);
      copyDir(srcScripts, SCRIPTS_DIR);
    }
  }

  // ── 7. Write version file ──
  if (!dryRun) {
    fs.writeFileSync(path.join(GLOBAL_DIR, 'version'), version, 'utf-8');
  }

  // ── 8. Propagate to IDEs ──
  let targets = resolveTargets();

  if (only && only.length > 0) {
    targets = targets.filter(t => only.includes(t.name));
  }
  if (exclude && exclude.length > 0) {
    targets = targets.filter(t => !exclude.includes(t.name));
  }

  for (const t of targets) {
    if (!dryRun) {
      if (!fs.existsSync(t.skillsPath)) {
        fs.mkdirSync(t.skillsPath, { recursive: true });
      }

      for (const skill of CORE_SKILLS) {
        const src = path.join(SKILLS_DIR, skill);
        const dest = path.join(t.skillsPath, skill);
        if (fs.existsSync(src)) {
          // Non-destructive: remove only our skill, don't touch others
          rmDir(dest);
          copyDir(src, dest);
        }
      }
    }
  }

  return { version, targets: targets.map(t => t.name) };
}

// ─── Module exports ────────────────────────────────────────────────

module.exports = {
  GLOBAL_DIR,
  CORE_SKILLS,
  IDE_TARGETS,
  installAll,
  resolveTargets,
  copyDir,
};
