# HANDOFF — Continuação em Novo PC

**Data:** 2026-04-24
**Repo:** `github.com/pauloarthurrocha/agencia-ai-adaptavel-skills`
**Branch:** `main`
**Último commit:** `1d81580 refactor(v3.0): reorganize repo structure into src/, build/, install/, docs/`
**Status:** Push feito para origin/main ✅

---

## ✅ O que já foi feito (100% completo)

### Reorganização do repo (v2.3 → v3.0)
- **Skills** de raiz → `src/skills/` (6 core)
- **Agentes** de `.agents/agents/` → `src/agents/` (10)
- **Presets** de `presets/` → `src/presets/` (4)
- **Scripts** de `scripts/` → `src/scripts/` (2)
- **Templates** de `templates/` → `src/templates/` (3 categorias)
- **Installers** de raiz → `install/install.sh` + `install/install.ps1`
- **Build scripts** novos: `build/installer.js` + `build/postinstall.js`
- **Docs** novos: `docs/ARCHITECTURE.md` + `docs/SKILL-REGISTRY.md`
- **Removidos**: `sync-skills.ps1`, `scripts/postinstall.js` (órfãos)

### Atualizações de código
- `package.json`: `postinstall` → `build/postinstall.js`; `files[]` inclui `src/`, `build/`, `install/`, `docs/`
- `bin/agencia-ai.js`: usa `build/installer.js`; suporta `--only`, `--exclude`, `--dry-run`
- `build/installer.js`: lógica compartilhada SSoT + IDEs; inclui Gemini CLI como target separado
- `install/install.sh` e `install.ps1`: paths corrigidos para `src/skills/`, `src/templates/`, etc.
- `README.md`: seção "Estrutura do Repo" atualizada; URLs one-liner apontam para `install/`
- `docs/SKILL-REGISTRY.md`: referências `.agents/agents/` → `src/agents/`

### Validações executadas
- `npm pack --dry-run`: 61 arquivos, 552.5 kB ✅
- `node --check` (3 arquivos JS): todos passam ✅
- Simulação `postinstall.js`: cria `~/.agencia-ai/` com 6 skills + 10 agentes + 4 presets + scripts + templates ✅
- Simulação `agencia-ai doctor`: detecta tudo corretamente ✅
- Git history: zero commits do Missão 30 Dias ✅

---

## ⚠️ O que ainda precisa de atenção

### 1. Oracle não emitiu `<promise>VERIFIED</promise>`
O sistema exige que o Oracle verifique e emita `<promise>VERIFIED</promise>` para considerar o trabalho 100% validado.

**Ação:** Rode o Oracle novamente com:
```
task(subagent_type="oracle", load_skills=[], run_in_background=false, prompt="...verificação final do repo reorganizado...")
```

### 2. Skill `agencia-init/SKILL.md` — lógica de fallback online
A skill tem um **Step 2C (Fallback Online)** que faz `git clone` de:
- `coreyhaines31/marketingskills`
- `nextlevelbuilder/ui-ux-pro-max-skill`
- `anthropics/skills/frontend-design`

Isso acontece **SÓ se** `~/.agencia-ai/skills/` não existir. Se o usuário rodou `agencia-ai install-global`, o fallback NUNCA é acionado.

**Dúvida do usuário:** "Todo novo projeto vai instalar novamente?"
**Resposta:** NÃO. Se o global existe, copia de lá (offline, instantâneo). Só faz git clone na primeira vez ou se o global foi deletado.

**Mas atenção:** O `install/install.sh` e `install.ps1` também fazem `git clone` de marketing skills e antigravity kit durante a instalação global. Isso pode demorar. O usuário pode querer remover esse fallback dos install scripts e deixar só na skill.

### 3. Possível drift entre install.sh/ps1 e installer.js
Os install scripts ainda têm lógica manual de cópia. O Oracle sugeriu que eles deveriam ser "bootstraps" que apenas clonam o repo e delegam para o Node installer. Isso eliminaria drift futuro.

**Decisão pendente:** Manter a lógica manual (funciona sem npm) ou simplificar para delegar ao `installer.js`?

### 4. `.sisyphus/ralph-loop.local.md` no working tree
Arquivo não-tracked no working tree. Pode ser adicionado ao `.gitignore` ou deletado.

---

## 🚀 Para continuar no novo PC

```bash
# 1. Clonar o repo
git clone https://github.com/pauloarthurrocha/agencia-ai-adaptavel-skills.git
cd agencia-ai-adaptavel-skills

# 2. Verificar estado
git log --oneline -5
git status

# 3. Rodar validações
npm pack --dry-run
node --check bin/agencia-ai.js
node --check build/installer.js
node --check build/postinstall.js

# 4. (Opcional) Simular postinstall
node build/postinstall.js

# 5. Decidir sobre os itens pendentes acima
```

---

*Agencia AI Adaptável — Handoff v3.0*
