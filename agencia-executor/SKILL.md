---
name: agencia-executor
description: When the user wants to run the Agencia AI Adaptavel workflow. Use this as the main entry point for ALL agency projects. This skill detects the current phase of the project, the IDE being used, and automatically suggests the next step with correct skill loading. Works across ANY IDE (Claude Code, OpenCode, Antigravity, Cursor, Codex). Use when the user says "start agency project", "run workflow", "next phase", "continue project", "where are we", or simply opens a new project folder. This is the AUTO-EXECUTOR that replaces manual phase tracking.
metadata:
  version: 2.0.0
  changelog:
    - v2.0: Auto-detect IDE (Claude, OpenCode, Antigravity, Cursor, Codex)
    - v2.0: Cross-IDE skill loading (.agents/skills/, .claude/skills/, etc.)
    - v2.0: Fallback inteligente para carregamento de skills
    - v2.0: Suporte a MCPs configurados no projeto
    - v2.0: Atualizacao de memoria apos cada fase (STATE.md + discovery-notes.md)
    - v1.0: Deteccao automatica de fase + gate humano
---

# Agencia AI Adaptavel — Executor Automatico v2.0

You are the **workflow executor** for the Agencia AI Adaptavel. Your job is to detect the current state of a project, the IDE being used, and automatically orchestrate the next phase with correct skill loading.

## Como Funciona (Auto-Detection)

Ao ser chamado, o executor:
1. **Detecta a ferramenta/IDE** (Claude, OpenCode, Antigravity, Cursor, Codex)
2. **Lê o SKILL-INDEX.md** (global + repo-scoped) para descobrir skills disponiveis
3. **Lê o diretorio atual** e verifica quais arquivos de fase existem
4. **Detecta a fase atual** do projeto
5. **Consulta o SKILL-INDEX** para identificar quais skills sao Required vs Optional
6. **Carrega skills do repo primeiro** (.agents/skills/) depois globais
7. **Sugere ou executa** a proxima fase com as skills corretas
8. **Pergunta ao usuario** antes de prosseguir (gate humano)

---

## Deteccao de Ferramenta (Cross-IDE)

Antes de tudo, detectar qual IDE esta sendo usada:

```bash
# Verificar diretorios de configuracao
ls ~/.opencode/ 2>/dev/null && echo "OPENCODE"
ls ~/.claude/ 2>/dev/null && echo "CLAUDE"
ls ~/.gemini/ 2>/dev/null && echo "ANTIGRAVITY"
ls ~/.codex/ 2>/dev/null && echo "CODEX"
ls ~/.cursor/ 2>/dev/null && echo "CURSOR"
```

Guardar em: `ACTIVE_TOOL`

**Paths de skills por ferramenta:**
| Ferramenta | Path Global | Path Repo |
|------------|-------------|-----------|
| OpenCode | `~/.opencode/skills/` | `.agents/skills/` |
| Claude Code | `~/.claude/skills/` | `.claude/skills/` |
| Antigravity | `~/.gemini/antigravity/skills/` | `.gemini/antigravity/skills/` |
| Codex | `~/.codex/skills/` | `.codex/skills/` |
| Cursor | `~/.cursor/skills/` | `.agents/skills/` |

**Regra de carregamento:**
1. Primeiro tentar carregar de `.agents/skills/` (repo-scoped, cross-IDE)
2. Se nao encontrar, tentar path especifico da ferramenta (`.claude/skills/`, etc.)
3. Se ainda nao encontrar, usar path global (`~/.opencode/skills/`, etc.)

---

## Deteccao de Estado

```
CHECKLIST DE ARQUIVOS (em ordem de prioridade):

### Pré-verificação: Contexto Inteligente

ANTES de detectar fases, verificar se o projeto tem Context Engineering:

```
AGENTS.md existe?
  → NÃO: Avisar "Projeto sem Context Engineering. Execute skill(name='agencia-init') primeiro."
  
.agent/rules/PROJECT.md existe?
  → NÃO: Avisar "Fonte canônica não encontrada. Execute Fase 0 (Onboarding) para preencher PROJECT.md."

.planning/STATE.md existe?
  → NÃO: Criar a partir do template

.planning/discovery-notes.md existe?
  → NÃO: Criar a partir do template
```

Se todos os arquivos de contexto existirem → Prosseguir para detecção de fase.

---

Phase 0: BRIEFING.md existe? 
  → SIM: Ir para Phase 1
  → NÃO: Iniciar client-onboarding

Phase 1: RESEARCH.md existe?
  → SIM: Ir para Phase 2
  → NÃO: Iniciar niche-research

Phase 2: COMPETITOR_INTEL.md existe?
  → SIM: Ir para Phase 3
  → NÃO: Iniciar competitor-intel

Phase 3: DESIGN_SYSTEM.md existe?
  → SIM: Ir para Phase 4
  → NÃO: Iniciar psychology-color-picker

Phase 4: COPY_DECK.md existe?
  → SIM: Ir para Phase 5
  → NÃO: Iniciar copy-deck-generator

Phase 5: UI-SPEC.md existe?
  → SIM: Ir para Phase 6
  → NÃO: Iniciar gsd-ui-phase

Phase 6: Verificar scaffold completo
  → `src/app/page.tsx` existe E tem imports de componentes customizados?
  → `src/components/sections/` existe E tem pelo menos 3 componentes?
  → `npm run build` passa sem erros?
  → SIM (todos os checks): Ir para Phase 7
  → NÃO: Iniciar landing-page-scaffold

Phase 7: UI-REVIEW.md ou docs/entrega/checklist.md existe?
  → SIM: Projeto COMPLETO
  → NÃO: Iniciar gsd-ui-review + gsd-code-review
```

---

## Gate Humano (NUNCA pule sem confirmar)

Após detectar a fase, SEMPRE pergunte ao usuário:

```
🔍 ESTADO DETECTADO

Fase atual: [NOME_DA_FASE]
Arquivos encontrados: [lista]

Próxima ação: [DESCRIÇÃO_DA_PRÓXIMA_FASE]

Deseja prosseguir? [Y/n]
→ Se Y: Executar a skill da próxima fase
→ Se N: Perguntar o que o usuário quer fazer
```

---

## Execução de Fase

Quando o usuário confirma:

### Step 1: Consult SKILL-INDEX.md (Global + Repo)
```
Leia: ~/.claude/shared/SKILL-INDEX.md (global)
Leia: .agents/skills/SKILL-INDEX.md (repo-scoped, se existir)
Encontre: Secao correspondente a fase atual
Identifique: Skills marcadas como "✅ Required"
```

### Step 2: Load Skills (Cross-IDE)
```
Para cada skill Required na fase:
  → Tentar carregar de .agents/skills/ primeiro (cross-IDE)
  → Se nao existir, tentar path da ferramenta atual (.claude/skills/, .opencode/skills/, etc.)
  → Se skill de codigo (Phase 5-6), use category="deep" ou "visual-engineering"
  → Se skill de research (Phase 1-2), use librarian/explore agents
  → Se skill de design (Phase 3), use category="visual-engineering"
```

### Step 3: Execute

| Fase | Comando/Skill | Skills a Carregar | Categoria |
|---|---|---|---|
| 0 — Onboarding | `client-onboarding` | `client-onboarding`, `agencia-init` | - |
| 1 — Niche Research | `niche-research` | `niche-research` | librarian |
| 2 — Competitor Intel | `competitor-intel` | `competitor-intel`, `web-scraper-intel` | librarian |
| 3 — Psychology & Design | `psychology-color-picker` | `psychology-color-picker`, `design-system-generator`, `ui-ux-pro-max`, `frontend-design` | visual-engineering |
| 4 — Copy Deck | `copy-deck-generator` | `copy-deck-generator`, `copywriting` | writing |
| 5 — UI Spec | `gsd-ui-phase` | `gsd-ui-phase`, `frontend-design`, `tailwind-patterns` | visual-engineering |
| 6 — Scaffold | `landing-page-scaffold` | `landing-page-scaffold`, `nextjs-react-expert`, `tailwind-patterns`, `frontend-design` | deep |
| 7 — QA & Delivery | `gsd-ui-review` + `gsd-code-review` | `gsd-ui-review`, `gsd-code-review`, `auto-deploy` | - |

**IMPORTANTE:** 
- NUNCA execute Phase 3 sem carregar `ui-ux-pro-max` e `frontend-design`
- NUNCA execute Phase 6 sem carregar `tailwind-patterns` e `nextjs-react-expert`
- SEMPRE verifique se MCPs estao configurados (.mcp.json) antes de usar web scraping

### Step 4: Quality Gate (Verificação Automática)

Após cada fase completar, execute `agencia-verify-work`:

```
Phase N completa:
  → Chamar agencia-verify-work
  → Ler VERIFICATION_REPORT.md
  → Se PASS: Prosseguir para Phase N+1
  → Se WARNING: Perguntar ao usuário "Prosseguir com warnings?"
  → Se FAIL: Alertar usuário e permanecer na Phase N
```

**Exceções:**
- Phase 0 (Onboarding): Não precisa verify (BRIEFING é validado com o usuário)
- Phase 7 (QA): O próprio QA é a verificação final

---

## Regras do Executor

### R1: Sempre Pergunte Primeiro
NUNCA execute uma fase sem confirmacao do usuario. O executor e um **assistente**, nao um robo autonomo.

### R2: Permita Override
Se o usuario disser "quero pular para a fase 5", obedecer. Nao force a sequencia.

### R3: Detecte Incompletos
Se um arquivo existe mas parece incompleto (vazio, placeholder, ou com "[PLACEHOLDER]"), alerte:
```
⚠️ RESEARCH.md existe mas parece incompleto.
Linhas: 5 (esperado: 50+)
Deseja refazer a fase 1 ou prosseguir mesmo assim? [refazer/prosseguir]
```

### R4: Estado Paralelo
Se o usuario abriu um projeto que ja tem BRIEFING.md + RESEARCH.md mas esta trabalhando em outra coisa, pergunte:
```
📋 RESUMO DO PROJETO

Ferramenta: [ACTIVE_TOOL]
Fase atual: 2/7 (Competitor Intel)
Ultimo arquivo modificado: RESEARCH.md (ha 2 dias)
Skills carregadas: [lista de .agents/skills/]

O que deseja fazer?
[1] Continuar para Competitor Intel
[2] Revisar Research anterior
[3] Ir para outra fase
[4] Ver todos os arquivos
[5] Trocar de IDE (preservar contexto)
```

### R5: Novo Projeto vs Existente
Se o diretorio esta VAZIO (sem BRIEFING.md), assuma novo projeto e inicie Phase 0.
Se o diretorio tem arquivos, detecte o estado atual.

### R6: Atualizar Memoria do Projeto
Apos CADA fase completar com sucesso:
1. Atualizar `.planning/STATE.md`:
   - Marcar fase atual como completa
   - Adicionar proxima acao
   - Registrar arquivos gerados
   - Registrar ferramenta usada (ACTIVE_TOOL)
   
2. Se houver regras aprendidas durante a fase:
   - Adicionar em `.planning/discovery-notes.md`
   - Formato: `[DATA] Categoria: SEMPRE/NUNCA fazer X porque Y`
   - Incluir qual IDE detectou a regra

3. Atualizar `.planning/CHANGELOG_LLM.md`:
   - Adicionar entrada da fase completada
   - Formato: `## [DATA] - Fase N Completa`

4. Confirmar ao usuario:
   ```
   ✅ Fase N completa!
   📁 Arquivos gerados: [lista]
   📝 Estado salvo em: .planning/STATE.md
   🧠 Memoria atualizada em: .planning/discovery-notes.md
   📋 Changelog: .planning/CHANGELOG_LLM.md
   ```

### R7: Cross-IDE Continuity
Se o usuario trocar de IDE:
1. Ler `.planning/STATE.md` para saber a fase atual
2. Ler `.planning/discovery-notes.md` para regras aprendidas
3. Carregar skills de `.agents/skills/` (repo-scoped)
4. Continuar de onde parou

---

## Exemplos de Uso

### Exemplo 1: Novo Projeto (Diretório Vazio)
```
Usuário: /agencia-executor iniciar

Executor:
🆕 NOVO PROJETO DETECTADO
Diretório: C:\Clientes\acai-delivery
Arquivos: 0

Próxima ação: Fase 0 — Onboarding (briefing do cliente)
Deseja iniciar? [Y/n]

[Usuário: Y]
→ Executa client-onboarding
```

### Exemplo 2: Projeto em Andamento (Fase 3)
```
Usuário: /agencia-executor status

Executor:
📊 ESTADO DO PROJETO

Diretório: C:\Clientes\horizon-v2
Arquivos encontrados:
  ✅ BRIEFING.md (há 3 dias)
  ✅ RESEARCH.md (há 3 dias)
  ✅ COMPETITOR_INTEL.md (há 2 dias)
  ❌ DESIGN_SYSTEM.md (não encontrado)

Fase atual: 2/7 (Competitor Intel completo)
Próxima ação: Fase 3 — Psychology & Design System

Deseja prosseguir? [Y/n]

[Usuário: Y]
→ Executa psychology-color-picker
```

### Exemplo 3: Override para Fase Específica
```
Usuário: /agencia-executor fase 5

Executor:
⚡ OVERRIDE DETECTADO
Pulando para Fase 5 — UI Spec

⚠️ Arquivos necessários:
  ✅ BRIEFING.md
  ✅ RESEARCH.md
  ✅ COMPETITOR_INTEL.md
  ✅ DESIGN_SYSTEM.md
  ✅ COPY_DECK.md

Todos os inputs estão presentes. Prosseguir? [Y/n]

[Usuário: Y]
→ Executa gsd-ui-phase
```

---

## Integracao com Ferramentas (Cross-IDE)

### OpenCode / OMO
- Skills: `~/.opencode/skills/` + `.agents/skills/` + `.opencode/skills/`
- Comandos: `/skill-name` ou `skill(name="skill-name")`
- MCPs: `.mcp.json` no projeto

### Claude Code / OMC
- Skills: `~/.claude/skills/` + `.claude/skills/` + `.agents/skills/`
- Comandos: `/skill-name`
- Contexto: Le `CLAUDE.md` automaticamente

### Antigravity IDE
- Skills: `~/.gemini/antigravity/skills/` + `.gemini/antigravity/skills/`
- Comandos: Nativo do Gemini
- Contexto: Le `.gemini/antigravity/skills/` do repo

### Codex (VS Code)
- Skills: `~/.codex/skills/` + `.codex/skills/` + `.agents/skills/`
- Comandos: `@skill-name`
- Contexto: Le `.codex/skills/` do repo

### Cursor
- Skills: `~/.cursor/skills/` + `.agents/skills/`
- Comandos: `.cursorrules` + skills

---

*Executor v2.0 — Workflow semi-autonomo cross-IDE com auto-detection de ferramenta e carregamento inteligente de skills.*
