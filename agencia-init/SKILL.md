---
name: agencia-init
description: Inicializa um projeto de cliente da Agência AI Adaptável do zero. Detecta IDE ativa, instala skills externas e da agência, configura MCPs, cria estrutura Context Engineering e PIPELINE.md vazio. Neutro quanto ao tipo de projeto (não pressupõe LP/Next.js). Próximo passo após o init é sempre o `client-onboarding` para definir o PIPELINE. Funciona cross-IDE (Claude Code, OpenCode, Antigravity, Cursor, Codex).
metadata:
  version: 3.0.0
  changelog:
    - v3.0: Neutro quanto ao tipo de projeto (remove criação hardcoded de DESIGN_SYSTEM/COPY_DECK/UI-SPEC). Cria PIPELINE.md vazio. Conserta .gitignore (não ignora mais .agents/.claude/.codex/.gemini). Adiciona context7 ao .mcp.json. Inclui client-onboarding e pipeline-generator nas skills copiadas.
    - v2.3: Auto-install external skills (Antigravity Kit, Marketing Skills, Design Skills)
    - v2.3: Detect IDE (Claude, OpenCode, Antigravity, Cursor, Codex)
    - v2.3: Copy agency skills to .agents/skills/ inside repo
    - v2.3: Create CLAUDE.md as copy of AGENTS.md
    - v2.3: Smart fallback (skills CLI -> gh -> npx -> git clone)
    - v2.3: MCP config (Brave Search, Playwright, Firecrawl, GitHub)
    - v2.2: Repo-scoped skills for cross-IDE continuity
    - v2.1: Context Engineering (AGENTS.md, PROJECT.md, STATE.md, discovery-notes.md)
    - v2.0: Separate universal protocols (AGENTS.md) from project rules (PROJECT.md)
---

# Agencia Init v3.0 — Deep Project Initialization (Neutral)

You are the project initializer for the Agencia AI Adaptavel. Your job is to prepare a pristine workspace that supports the full 7-phase workflow, installs skills from external repositories, configures MCPs, and works across ANY IDE.

## O Que Este Init Faz (Automatico)

```
1. Detect which IDE the user is using (Claude, OpenCode, Antigravity, Cursor, Codex)
2. Check if folder is empty or has content
3. Install external skills:
   a. Antigravity Kit (npx @vudovn/ag-kit init)
   b. Marketing Skills (skills add coreyhaines31/marketingskills)
   c. Design Skills (UI-UX Pro Max, Anthropic Frontend, Taste, Vercel Guidelines)
4. Copy AGENCY skills to .agents/skills/ (inside repo)
5. Create directory structure
6. Init Git (if not exists)
7. Configure .gitignore
8. Create Context files (AGENTS.md, PROJECT.md, STATE.md, discovery-notes.md)
9. Create CLAUDE.md as copy of AGENTS.md (for Claude Code)
10. Configure MCPs in project (.mcp.json)
11. Create .env.local template
12. Initial commit with EVERYTHING (code + skills + context)
```

---

## Estrutura Criada (v2.3 — Cross-IDE + Skills)

```
cliente-projeto/
├── .git/                           # (se nao existir)
├── .gitignore                      # Padrao para projetos
├── .env.local                      # Template com placeholders
├── .env.example                    # Variaveis de ambiente de exemplo
├── AGENTS.md                       # Protocolos universais (Context Engineering)
├── CLAUDE.md                       # Copia de AGENTS.md (para Claude Code)
├── .mcp.json                       # MCPs configurados para o projeto
├── .planning/                      # (workflow GSD compativel)
│   ├── STATE.md                    # Estado atual do projeto
│   ├── PROJECT.md                  # Definicao do projeto
│   ├── discovery-notes.md          # Memoria dinamica
│   ├── CHANGELOG_LLM.md           # Changelog para IAs
│   ├── CONTEXT_SNIPPET.md         # Snippet curto para IAs externas
│   ├── PIPELINE.md                 # Mapa dinâmico de fases (criado pelo client-onboarding)
│   └── [outros artefatos]          # BRIEFING.md, RESEARCH.md, COPY_DECK.md, etc. — criados conforme o PIPELINE pedir
├── .agent/
│   ├── rules/
│   │   └── PROJECT.md              # Fonte canonica (stack, proibicoes, guardrails)
│   └── workflows/                  # Workflows da agencia (copiados)
│       ├── post-commit-audit.md
│       ├── update-discovery-notes.md
│       ├── memory-sync.md
│       └── entity-extraction.md
├── .agents/                        # Skills CROSS-IDE (Codex, Cursor, Antigravity)
│   └── skills/
│       ├── agencia-init/           # Skills da agencia
│       ├── agencia-executor/
│       ├── client-onboarding/
│       ├── niche-research/
│       ├── competitor-intel/
│       ├── copywriting/            # Do Marketing Skills
│       ├── page-cro/
│       ├── seo-audit/
│       ├── marketing-ideas/
│       ├── ui-ux-pro-max/          # Do Design Skills
│       ├── frontend-design/
│       ├── taste-skill/
│       └── web-design-guidelines/
├── .claude/                        # Skills para Claude Code
│   └── skills/
│       └── (copia de .agents/skills/)
├── .codex/                         # Skills para Codex
│   └── skills/
│       └── (copia de .agents/skills/)
├── .gemini/                        # Skills para Antigravity
│   └── antigravity/
│       └── skills/
│           └── (copia de .agents/skills/)
├── .graphify/
│   └── graph.json                  # Knowledge graph
├── src/                            # (sera criado na Fase 6)
├── docs/
│   └── entrega/
│       └── checklist.md            # (sera criado na Fase 7)
└── README.md                       # Descricao do projeto
```

### Skills Commitados no Repo (Cross-IDE)

```
.agents/skills/       → Codex, Cursor, Antigravity leem
.claude/skills/       → Claude Code le
.codex/skills/        → Codex le
.gemini/antigravity/skills/ → Antigravity le
```

**Resultado:** Qualquer IDE que abrir este projeto encontra as skills automaticamente.

### Arquivos de Contexto (Inteligencia do Projeto)

| Arquivo | Escopo | Quando Atualizar |
|---------|--------|------------------|
| `AGENTS.md` | **Universal** — herdado do template, NAO editar | Nunca (generico) |
| `CLAUDE.md` | **Claude Code** — copia de AGENTS.md | Quando AGENTS.md mudar |
| `.agent/rules/PROJECT.md` | **Especifico** — stack, proibicoes, guardrails | Onboarding + quando decisoes sao travadas |
| `.planning/STATE.md` | **Estado** — progresso, bloqueios, proximos passos | Toda sessao |
| `.planning/discovery-notes.md` | **Memoria** — regras aprendidas, bugs, decisoes | Sempre que aprender algo novo |
| `.planning/CHANGELOG_LLM.md` | **Changelog** — historico para IAs | Apos cada commit |
| `.planning/CONTEXT_SNIPPET.md` | **Snippet** — resumo curto para IAs externas | A cada 5 commits |

**Hierarquia:** `PROJECT.md` > `AGENTS.md` > `STATE.md` > `discovery-notes.md` > skills

---

## Ferramentas Suportadas (Auto-Detect)

| Ferramenta | Diretorio de Skills | Comando de Deteccao |
|------------|---------------------|---------------------|
| OpenCode | `~/.opencode/skills/` | `ls ~/.opencode/` |
| Claude Code | `~/.claude/skills/` | `ls ~/.claude/` |
| Antigravity | `~/.gemini/antigravity/skills/` | `ls ~/.gemini/` |
| Codex | `~/.codex/skills/` | `ls ~/.codex/` |
| Cursor | `~/.cursor/skills/` | `ls ~/.cursor/` |

**Fallback:** Se nenhuma detectada, perguntar ao usuario.

---

## Processo Detalhado

### Step 0: Detectar Ferramenta

```bash
# Verificar qual ferramenta esta sendo usada
ls ~/.opencode/ 2>/dev/null && echo "OPENCODE"
ls ~/.claude/ 2>/dev/null && echo "CLAUDE"
ls ~/.gemini/ 2>/dev/null && echo "ANTIGRAVITY"
ls ~/.codex/ 2>/dev/null && echo "CODEX"
ls ~/.cursor/ 2>/dev/null && echo "CURSOR"
```

Guardar em variavel: `ACTIVE_TOOL` (ex: `opencode`, `claude`, `antigravity`, `codex`, `cursor`)

Se nenhuma detectada:
```
Qual ferramenta voce esta usando?
[1] OpenCode (OMO)
[2] Claude Code (OMC)
[3] Antigravity IDE
[4] Codex (VS Code)
[5] Cursor
```

### Step 1: Detectar Estado


```bash
# Verificar se diretório está vazio
ls -la
```

- **Vazio:** Prosseguir com init completo
- **Tem arquivos:** Perguntar se quer fazer init parcial ou apenas configurar o que falta
- **Já tem .planning/:** Pular para Step 11 (apenas verificar integridade)

### Step 2: Instalar Skills Externos (Auto-Install)

Instalar skills de repositórios externos. Priorizar cópia do SSoT local para maior velocidade, com fallback para git clone.

#### 2A: Antigravity Kit
```bash
# Prioridade 1: Buscar versão mais recente online via NPX
if npx -y @vudovn/ag-kit init 2>/dev/null; then
  echo "Antigravity Kit instalado via NPX."
elif [ -d "$HOME/.agencia-ai/skills" ]; then
  # Fallback: Copiar do SSoT global (Modo Offline)
  cp -r "$HOME/.agencia-ai/skills/"* .agents/skills/ 2>/dev/null
fi
```

#### 2B: Marketing Skills
```bash
# Prioridade 1: Online First (Buscar sempre a última versão do GitHub)
rm -rf /tmp/marketingskills 2>/dev/null
if git clone https://github.com/coreyhaines31/marketingskills.git /tmp/marketingskills 2>/dev/null; then
  cp -r /tmp/marketingskills/* .agents/skills/ 2>/dev/null
elif [ -d "$HOME/.agencia-ai/marketing-skills" ]; then
  # Fallback: Usar cache local SSoT (Modo Offline)
  cp -r "$HOME/.agencia-ai/marketing-skills/"* .agents/skills/ 2>/dev/null
fi
```

#### 2C: Design Skills (5 essenciais)
```bash
# Para cada repo, prioriza buscar a última versão online. Se falhar, usa SSoT.
for REPO in "nextlevelbuilder/ui-ux-pro-max-skill" "anthropics/skills/frontend-design" "Leonxlnx/taste-skill" "vercel-labs/agent-skills" "Dammyjay93/interface-design"; do
  SKILL_NAME=$(basename $REPO)
  rm -rf "/tmp/$SKILL_NAME" 2>/dev/null
  
  if git clone "https://github.com/$REPO.git" "/tmp/$SKILL_NAME" 2>/dev/null; then
    cp -r "/tmp/$SKILL_NAME" .agents/skills/ 2>/dev/null
  elif [ -d "$HOME/.agencia-ai/$SKILL_NAME" ]; then
    cp -r "$HOME/.agencia-ai/$SKILL_NAME" .agents/skills/ 2>/dev/null
  fi
done
```

> ⚠️ **Importante:** Não importar TODAS as skills dos repos (token bloat). Apenas as listadas acima.

### Step 3: Copiar Skills da Agência para o Repo

Copiar skills proprietárias da agência para `.agents/skills/` (cross-IDE):

```bash
# Criar estrutura cross-IDE
mkdir -p .agents/skills
mkdir -p .claude/skills
mkdir -p .codex/skills
mkdir -p .gemini/antigravity/skills

# Copiar skills da agência do SSoT local
AGENCIA_SKILLS="$HOME/.agencia-ai/skills"

if [ -d "$AGENCIA_SKILLS" ]; then
  cp -r "$AGENCIA_SKILLS/"* .agents/skills/ 2>/dev/null
fi

# Criar symlinks/cópias para cada IDE
# Claude Code
ln -sf ../../.agents/skills/* .claude/skills/ 2>/dev/null || cp -r .agents/skills/* .claude/skills/

# Codex
ln -sf ../../.agents/skills/* .codex/skills/ 2>/dev/null || cp -r .agents/skills/* .codex/skills/

# Antigravity
ln -sf ../../../.agents/skills/* .gemini/antigravity/skills/ 2>/dev/null || cp -r .agents/skills/* .gemini/antigravity/skills/
```

**Skills da agencia a copiar (núcleo — obrigatórias):**
- `agencia-init/` — Este init (auto-bootstrap)
- `agencia-executor/` — Executor dinâmico v3.1
- `client-onboarding/` — Arquiteto socrático v3.1 (gera PIPELINE.md)
- `pipeline-generator/` — Playbooks por tipo de projeto (auxiliar do onboarding)
- `agencia-verify-work/` — Quality Gate pós-fase

**Skills auxiliares (opcionais — adicionar conforme domínio do projeto):**
- `niche-research/`, `competitor-intel/`, `web-scraper-intel/` — research
- `copywriting/`, `copy-editing/`, `marketing-psychology/` — copy
- `page-cro/`, `popup-cro/`, `signup-flow-cro/` — otimização de conversão
- `psychology-color-picker/`, `design-system-generator/`, `frontend-design/`, `ui-ux-pro-max/` — design
- `nextjs-react-expert/`, `tailwind-patterns/`, `landing-page-scaffold/` — implementação web
- `python-patterns/`, `nodejs-best-practices/`, `api-patterns/` — backend/automação
- `deployment-procedures/`, `server-management/` — deploy
- `seo-audit/`, `schema-markup/`, `ai-seo/` — SEO
- `gsd-ui-phase/`, `gsd-ui-review/`, `gsd-code-review/` — QA

### Step 4: Criar CLAUDE.md

Copiar `AGENTS.md` para `CLAUDE.md` (Claude Code nao le `AGENTS.md` nativamente):

```bash
# CLAUDE.md = copia exata de AGENTS.md
# Criado no Step 6 (Arquivos de Contexto), aqui apenas garantir existencia
# Se AGENTS.md mudar no futuro, atualizar CLAUDE.md tambem
```

> 💡 **Nota:** `CLAUDE.md` e lido automaticamente pelo Claude Code como contexto do projeto.

### Step 5: Configurar MCPs

Criar `.mcp.json` no projeto com MCPs essenciais:

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@brave/brave-search-mcp-server"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      }
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    },
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

**MCPs configurados:**
- **Brave Search** (`@brave/brave-search-mcp-server`) — Pesquisa web para research e tendências
- **Context7** (`@upstash/context7-mcp`) — Docs atualizadas de bibliotecas (usado pelo client-onboarding para validar stack)
- **Playwright** (`@executeautomation/playwright-mcp-server`) — Navegacao e scraping
- **Firecrawl** (`firecrawl-mcp`) — Scraping de sites
- **GitHub** (`@modelcontextprotocol/server-github`) — Gerenciamento de repos

> ⚠️ **API Keys:** Adicionar em `.env.local` (ja no .gitignore). Nunca commitar.

### Step 6: Git Init

```bash
git init
git checkout -b main
```

### Step 7: .gitignore

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/

# Production
build/
dist/

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env.local
.env.*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Graphify
.graphify/cache/

# Planning
.planning/HANDOFF.json
.continue-here.md

# IMPORTANTE: NÃO ignorar .agents/, .claude/, .codex/, .gemini/
# Essas pastas contêm as skills que precisam ser commitadas para
# continuidade cross-IDE. Se ignorar, outra IDE/PC não acha as skills.

# MCP config (pode conter secrets — usar .mcp.json.example se precisar compartilhar)
.mcp.json
```

> ⚠️ **Regra crítica:** As pastas `.agents/`, `.claude/`, `.codex/`, `.gemini/` **devem ser commitadas**. Se você ignorá-las, ao clonar o projeto em outra máquina ou IDE, as skills da agência não chegam e o workflow quebra.

### Step 8: .env.local Template

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX

# WhatsApp
WHATSAPP_NUMBER=5511999999999
WHATSAPP_MESSAGE=Olá! Vi o site e quero mais informações.

# API (se necessário)
# API_URL=https://api.example.com
# API_KEY=sk-xxxxxxxx

# Outros
# STRIPE_PUBLIC_KEY=pk_test_xxx
# STRIPE_SECRET_KEY=sk_test_xxx
```

> ⚠️ **NUNCA** commite este arquivo. Já está no .gitignore.

### Step 9: Arquivos de Contexto (Context Engineering v2.1)

Copiar templates do `.agent/templates/context-engineering/` do repositório da agência:

```bash
# Diretório de templates da agência (SSoT Global)
AGENCIA_TEMPLATES="~/.agencia-ai/templates/context-engineering"

# 1. AGENTS.md — Protocolos universais (NÃO editar no projeto)
cp "$AGENCIA_TEMPLATES/AGENTS.md.template" ./AGENTS.md

# 2. .agent/rules/PROJECT.md — Fonte canônica (EDITAR no onboarding)
mkdir -p .agent/rules
cp "$AGENCIA_TEMPLATES/PROJECT.md.template" ./.agent/rules/PROJECT.md

# 3. .planning/STATE.md — Estado do projeto
mkdir -p .planning
cp "$AGENCIA_TEMPLATES/STATE.md.template" ./.planning/STATE.md

# 4. .planning/discovery-notes.md — Memória dinâmica
cp "$AGENCIA_TEMPLATES/discovery-notes.md.template" ./.planning/discovery-notes.md
```

**Preencher placeholders:**
- `AGENTS.md` → substituir `{{PROJECT_NAME}}` pelo nome real
- `.agent/rules/PROJECT.md` → preencher TODOS os `{{...}}` durante o onboarding
- `.planning/STATE.md` → inicializar com dados do projeto
- `.planning/discovery-notes.md` → deixar vazio (será preenchido durante o projeto)

> 💡 **Dica:** Se os templates não estiverem disponíveis localmente, usar `skill(name="agencia-init")` que contém os templates embutidos.

### Step 10: Graphify Init

```bash
# Se graphifyy estiver instalado globalmente:
npx graphifyy init --dir .

# Ou usar o plugin OpenCode:
# O plugin Graphify já deve estar configurado em ~/.opencode/plugins/graphify.js
```

Cria `.graphify/graph.json` para knowledge graph do projeto.

### Step 11: Inicializar Templates de Estado

Os arquivos `.planning/STATE.md` e `.planning/discovery-notes.md` já foram copiados do template no Step 9. Agora inicializar com dados do projeto:

```bash
# Substituir placeholders básicos
sed -i "s/{{PROJECT_NAME}}/$PROJECT_NAME/g" .planning/STATE.md
sed -i "s/{{DATE}}/$(date +%Y-%m-%d)/g" .planning/STATE.md
sed -i "s/{{CURRENT_PHASE}}/Onboarding (aguardando client-onboarding)/g" .planning/STATE.md
sed -i "s/{{DATE}}/$(date +%Y-%m-%d)/g" .planning/discovery-notes.md
```

### Step 11.5: Criar PIPELINE.md vazio (placeholder)

```bash
cat > .planning/PIPELINE.md << 'EOF'
# PIPELINE.md — [preenchido pelo client-onboarding]

> Este arquivo é o **mapa dinâmico** do projeto. Cada projeto tem um pipeline customizado.
> Estrutura esperada: ver documentação do `client-onboarding` ou `pipeline-generator`.

## Status
⏸️ **Vazio** — execute `skill(name="client-onboarding")` para montar o pipeline.

## Formato Esperado
```
- [ ] Fase 1: [Nome]
      Skills: [skill1, skill2]
      Output: [arquivo/diretório]
      Shift-Left: [sim/não]
```

EOF
```

> 💡 O `client-onboarding` vai **substituir** esse conteúdo quando for executado.

### Step 12: Preparar README.md

```markdown
# {{PROJECT_NAME}}

> Projeto gerado via Agência AI Adaptável
> Iniciado em: {{DATE}}
> Status: Fase 0 — Onboarding

## Stack
[Preencher após Fase 3]

## Documentação
- `.agent/rules/PROJECT.md` — Regras e stack do projeto
- `.planning/STATE.md` — Estado atual
- `.planning/discovery-notes.md` — Memória e regras aprendidas

## Comandos
```bash
# [Preencher com comandos do projeto]
```
```

### Step 13: Verificação Final

```bash
# Verificar estrutura
ls -la
cat AGENTS.md | head -20
cat .agent/rules/PROJECT.md | head -20
cat .planning/STATE.md | head -20

# Verificar git status
git status
```

Confirmar que todos os arquivos de contexto foram criados:
- ✅ `AGENTS.md` — Protocolos universais
- ✅ `CLAUDE.md` — Copia para Claude Code
- ✅ `.mcp.json` — MCPs configurados (brave-search, context7, playwright, firecrawl, github)
- ✅ `.agent/rules/PROJECT.md` — Fonte canônica (aguardando preenchimento no onboarding)
- ✅ `.planning/STATE.md` — Estado inicial
- ✅ `.planning/discovery-notes.md` — Memória vazia
- ✅ `.planning/PIPELINE.md` — Placeholder (será preenchido pelo client-onboarding)
- ✅ `.agents/skills/` — Skills da agencia (cross-IDE)
- ✅ `.claude/skills/`, `.codex/skills/`, `.gemini/antigravity/skills/` — Cópias por IDE
- ✅ External skills instalados (Antigravity Kit + Marketing + Design)

> 🎯 **Próximo passo OBRIGATÓRIO:** Executar `skill(name="client-onboarding")` para:
> - Entrevistar o cliente socraticamente
> - Validar stack e hospedagem via MCPs
> - Gerar `BRIEFING.md`, preencher `PROJECT.md`, e montar `PIPELINE.md` customizado
>
> Sem esse passo, o `agencia-executor` não tem como saber o que executar.

---

## Integração com Executor

Após o init, o executor deve ser chamado automaticamente:

```
✅ Projeto inicializado! (v3.0 — Neutro + Cross-IDE)

Ferramenta detectada: [ACTIVE_TOOL]

Estrutura criada:
  📄 AGENTS.md — Protocolos universais (Context Engineering)
  📄 CLAUDE.md — Copia para Claude Code
  📄 .mcp.json — MCPs configurados (brave-search, context7, playwright, firecrawl, github)
  📁 .agent/rules/PROJECT.md — Fonte canônica (vazia, preencher no onboarding)
  📁 .planning/STATE.md — Estado inicial
  📁 .planning/discovery-notes.md — Memória dinâmica (vazia)
  📁 .planning/PIPELINE.md — Placeholder (será montado pelo client-onboarding)
  📁 .agents/skills/ — Skills da agencia (cross-IDE, COMMITADAS)
  📁 .claude/skills/, .codex/skills/, .gemini/antigravity/skills/ — Cópias por IDE
  📁 .graphify/graph.json — Knowledge graph
  🔒 .env.local (template)
  🔒 .env.example — Variáveis de ambiente
  🔒 .gitignore (NÃO ignora .agents/ e afins — essencial para cross-IDE)

Skills instalados:
  📦 Skills da agência (core): agencia-init, agencia-executor, client-onboarding, pipeline-generator, agencia-verify-work
  📦 Antigravity Kit (opcional)
  📦 Marketing Skills (opcional, sob demanda)
  📦 Design Skills (opcional, sob demanda)

⚠️ PROJETO AINDA NÃO TEM PIPELINE DEFINIDO.

Próximo passo: Iniciar onboarding socrático?

[Y] → Executa skill(name="client-onboarding") — arquiteto entrevista e gera PIPELINE.md
[n] → Aguarda comando manual
```

---

## Regras

- **NUNCA sobrescreva** arquivos existentes sem confirmar
- **SEMPRE** pergunte antes de `git init` se já houver um repo
- **NUNCA** commite `.env.local` — verifique se está no .gitignore
- **NUNCA** commite `.mcp.json` se contiver secrets reais — use placeholders
- **SEMPRE** verifique se Graphify está disponível antes de tentar init
- **SEMPRE** copie skills da agencia para `.agents/skills/` (cross-IDE)
- **SEMPRE** crie `CLAUDE.md` quando criar `AGENTS.md`
- **NUNCA** use `--no-verify` em commits
- **NUNCA** faça `git push --force` em main/develop/master

---

*Agencia Init v2.3 — Deep initialization cross-IDE com auto-install de skills e MCPs.*
