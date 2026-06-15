const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const repoRoot = path.resolve(__dirname, '..');
const node = process.execPath;

function makeHome(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

function runOma(args, home) {
  return spawnSync(node, [path.join(repoRoot, 'bin', 'oma.js'), ...args], {
    cwd: repoRoot,
    env: { ...process.env, HOME: home, USERPROFILE: home },
    encoding: 'utf8',
  });
}

function runNode(script, home) {
  return spawnSync(node, ['-e', script], {
    cwd: repoRoot,
    env: { ...process.env, HOME: home, USERPROFILE: home },
    encoding: 'utf8',
  });
}

test('oma install can run repeatedly against an existing global install', () => {
  const home = makeHome('oma-repeat-');

  const first = runOma(['install', '--no-external'], home);
  assert.equal(first.status, 0, first.stderr || first.stdout);

  const second = runOma(['install', '--no-external'], home);
  assert.equal(second.status, 0, second.stderr || second.stdout);
  assert.match(second.stdout, /Instalacao existente detectada|Instala[cç][aã]o existente detectada/);
});

test('oma install accepts space-separated only and exclude flags', () => {
  const home = makeHome('oma-flags-');
  fs.mkdirSync(path.join(home, '.codex'), { recursive: true });

  const result = runOma(['install', '--dry-run', '--no-external', '--only', 'codex'], home);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Filtro --only: codex/);
});

test('resolveTargets treats a Gemini home as both Gemini CLI and Antigravity compatible', () => {
  const home = makeHome('oma-targets-');
  fs.mkdirSync(path.join(home, '.gemini'), { recursive: true });

  const script = `
    const installer = require(${JSON.stringify(path.join(repoRoot, 'build', 'installer.js'))});
    console.log(JSON.stringify(installer.resolveTargets().map(t => t.name).sort()));
  `;
  const result = runNode(script, home);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.deepEqual(JSON.parse(result.stdout), ['antigravity', 'gemini-cli']);
});
