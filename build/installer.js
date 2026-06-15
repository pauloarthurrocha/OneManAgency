const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// ─── Constants ─────────────────────────────────────────────────────
const GLOBAL_DIR = path.join(os.homedir(), '.oma');
const SKILLS_DIR = path.join(GLOBAL_DIR, 'skills');
const AGENTS_DIR = path.join(GLOBAL_DIR, 'agents');
const TEMPLATES_DIR = path.join(GLOBAL_DIR, 'templates');
const EXTERNAL_DIR = path.join(GLOBAL_DIR, 'external');

// External skill repos cloned during `oma install`.
// Each entry: { name (folder under ~/.oma/external/), url (https), required (false = skip on failure) }
// All are non-required: any failure is logged but doesn't break the install.
const EXTERNAL_REPOS = [
  {
    name: 'awesome-design-md',
    url: 'https://github.com/voltagent/awesome-design-md.git',
    description: '73+ design system DESIGN.md templates (Vercel, Stripe, Linear, ...)',
  },
  {
    name: 'marketing-skills',
    url: 'https://github.com/coreyhaines31/marketingskills.git',
    description: '38 marketing skills (copywriting, SEO, ads, email, CRO)',
  },
  {
    name: 'anthropic-skills',
    url: 'https://github.com/anthropics/skills.git',
    description: 'Official Anthropic skills (PDF, DOCX, XLSX, PPTX, frontend-design)',
  }
];

// External CLI tools installed via npm globally
const EXTERNAL_CLIS = [
  {
    name: 'uipro-cli',
    package: 'uipro-cli',
    description: 'UI/UX Pro Max skill generator',
  },
  {
    name: 'ag-kit',
    package: '@vudovn/ag-kit',
    description: 'Antigravity Kit agents and workflows',
  }
];

const CORE_SKILLS = [
  'oma-init',
  'oma-executor',
  'client-onboarding',
  'pipeline-generator',
  'oma-verify-work',
  'oma-ceo-review',
  'oma-eng-review',
  'oma-design-review',
  'oma-release-manager',
];

const IDE_TARGETS = [
  { name: 'claude', parent: '.claude', skills: '.claude/skills' },
  { name: 'opencode', parent: '.opencode', skills: '.opencode/skills' },
  { name: 'codex', parent: '.codex', skills: '.codex/skills' },
  { name: 'cursor', parent: '.cursor', skills: '.cursor/skills' },
  { name: 'antigravity', parent: '.gemini/antigravity', skills: '.gemini/antigravity/skills', detectParents: ['.gemini/antigravity', '.gemini'] },
  { name: 'roo', parent: '.roo', skills: '.roo/skills' },
  { name: 'gemini-cli', parent: '.gemini', skills: '.gemini/skills' },
  { name: 'windsurf', parent: '.windsurf', skills: '.windsurf/skills' },
  { name: 'cline', parent: '.cline', skills: '.cline/skills' },
  { name: 'aider', parent: '.aider', skills: '.aider/skills' },
  { name: 'goose', parent: '.goose', skills: '.goose/skills' },
  { name: 'hermes', parent: '.hermes', skills: '.hermes/skills' },
  { name: 'openclaw', parent: '.openclaw', skills: '.openclaw/skills' },
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

function isGitAvailable() {
  try {
    execSync('git --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function cloneExternalRepos({ dryRun = false, skipExternal = false } = {}) {
  const results = { cloned: [], updated: [], skipped: [], failed: [] };

  if (skipExternal) {
    console.log('[external] skipped via --no-external');
    return results;
  }

  // Handle npm CLI packages
  for (const cli of EXTERNAL_CLIS) {
    try {
      if (dryRun) {
        console.log(`[dry-run] would install global npm package: ${cli.package}`);
        continue;
      }
      // Check if installed
      try {
        execSync(`npm list -g ${cli.package} --depth=0`, { stdio: 'ignore' });
        console.log(`[external] ✓ global CLI ${cli.package} already installed`);
        results.updated.push(cli.name);
      } catch {
        console.log(`[external] installing global CLI ${cli.package}...`);
        execSync(`npm install -g ${cli.package}`, { stdio: 'pipe', timeout: 120_000 });
        console.log(`[external] ✓ installed global CLI ${cli.package}`);
        results.cloned.push(cli.name);
      }
    } catch (err) {
      const msg = (err && err.message) ? err.message.split('\n')[0] : 'unknown error';
      console.log(`[external] ⚠ failed to install ${cli.package}: ${msg.slice(0, 120)}`);
      results.failed.push({ name: cli.name, error: msg });
    }
  }

  if (!isGitAvailable()) {
    console.log('[external] git not found in PATH — skipping external git repos');
    EXTERNAL_REPOS.forEach(r => results.skipped.push(r.name));
    return results;
  }

  if (dryRun) {
    console.log('[dry-run] would clone external repos:');
    EXTERNAL_REPOS.forEach(r => console.log(`  - ${r.name} (${r.url})`));
    return results;
  }

  if (!fs.existsSync(EXTERNAL_DIR)) {
    fs.mkdirSync(EXTERNAL_DIR, { recursive: true });
  }

  for (const repo of EXTERNAL_REPOS) {
    const dest = path.join(EXTERNAL_DIR, repo.name);
    const gitDir = path.join(dest, '.git');

    try {
      if (fs.existsSync(gitDir)) {
        // Update with shallow fetch + reset to keep depth=1
        execSync('git fetch --depth=1 origin HEAD', {
          cwd: dest,
          stdio: 'pipe',
          timeout: 60_000,
        });
        execSync('git reset --hard FETCH_HEAD', {
          cwd: dest,
          stdio: 'pipe',
          timeout: 30_000,
        });
        console.log(`[external] ✓ updated ${repo.name}`);
        results.updated.push(repo.name);
      } else {
        if (fs.existsSync(dest)) {
          // Stale dir without .git — remove and re-clone
          rmDir(dest);
        }
        execSync(`git clone --depth 1 --quiet ${repo.url} "${dest}"`, {
          stdio: 'pipe',
          timeout: 120_000,
        });
        console.log(`[external] ✓ cloned ${repo.name} (${repo.description})`);
        results.cloned.push(repo.name);
      }
    } catch (err) {
      const msg = (err && err.message) ? err.message.split('\n')[0] : 'unknown error';
      console.log(`[external] ⚠ failed ${repo.name}: ${msg.slice(0, 120)}`);
      results.failed.push({ name: repo.name, error: msg });
    }
  }

  return results;
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
    .map(t => {
      const detectParents = t.detectParents || [t.parent];
      const detectedParentPath = detectParents
        .map(p => path.join(home, p))
        .find(p => fs.existsSync(p));

      return {
        ...t,
        detectParents,
        detectedParentPath,
        parentPath: path.join(home, t.parent),
        skillsPath: path.join(home, t.skills),
      };
    })
    .filter(t => Boolean(t.detectedParentPath));
}

// ─── Core install logic ────────────────────────────────────────────

function installAll({ packageDir, only, exclude, dryRun, skipExternal } = {}) {
  const version = readVersion(packageDir);

  if (dryRun) {
    console.log(`[dry-run] Installing OneManAgency v${version}`);
    console.log(`[dry-run] Global dir: ${GLOBAL_DIR}`);
  }

  // ── 1. Create global dirs ──
  for (const d of [SKILLS_DIR, AGENTS_DIR, TEMPLATES_DIR, EXTERNAL_DIR]) {
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

  // ── 4. Copy templates from src/templates/ ──
  const srcTemplates = path.join(packageDir, 'src', 'templates');
  if (fs.existsSync(srcTemplates)) {
    if (!dryRun) {
      rmDir(TEMPLATES_DIR);
      copyDir(srcTemplates, TEMPLATES_DIR);
    }
  }

  // ── 5. (Removed: Scripts are now bundled inside skills) ──

  // ── 6. Clone/update external repos (non-blocking) ──
  const external = cloneExternalRepos({ dryRun, skipExternal });

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

  return { version, targets: targets.map(t => t.name), external };
}

// ─── Module exports ────────────────────────────────────────────────

module.exports = {
  GLOBAL_DIR,
  EXTERNAL_DIR,
  CORE_SKILLS,
  IDE_TARGETS,
  EXTERNAL_REPOS,
  EXTERNAL_CLIS,
  installAll,
  resolveTargets,
  cloneExternalRepos,
  copyDir,
};
