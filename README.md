# Agencia AI Adaptável — Skills v3.3

> **Repo:** github.com/pauloarthurrocha/agencia-ai-adaptavel-skills
> **Versão:** 3.3.0 (Design System Intelligence + Awesome Design MD + Âncora Visual)
> **Formato:** Agent Skills (SKILL.md)
> **NPM (GitHub Packages):** `npm install -g @pauloarthurrocha/agencia-ai-adaptavel --registry=https://npm.pkg.github.com`

---

## 🎯 Propósito

Sistema de **agent skills** para execução de projetos de software via IA. Funciona em qualquer IDE (Claude Code, OpenCode, Antigravity, Codex, Cursor, Roo Code) e suporta qualquer tipo de projeto (Landing Page, SaaS, Automação Python, Low-Ticket, etc.).

**Filosofia:** Não prescreve fases rígidas. O `client-onboarding` entrevista o cliente e gera um `PIPELINE.md` customizado. O `agencia-executor` executa fase a fase, carregando as skills corretas para cada contexto.

---

## 📦 Skills Core (neste repo)

| Skill | Versão | Descrição |
|---|---|---|
| `agencia-init` | v3.0 | Inicialização de projetos. Detecta IDE, configura MCPs, cria estrutura Context Engineering. **Próximo passo sempre: `client-onboarding`** |
| `client-onboarding` | v3.3 | Arquiteto Socrático. Entrevista adaptativa com **questionários por playbook** + **Etapa 2.5: Consultoria de Design System** (71+ templates awesome-design-md). Gera `.planning/DESIGN.md` como âncora visual |
| `pipeline-generator` | v1.0 | Gera PIPELINE.md a partir do briefing. Contém 9 playbooks. **Novo:** Fase "Arquitetura Técnica" com PRDs para SaaS/Full-stack |
| `agencia-executor` | v3.2 | Orquestrador dinâmico. **Novo:** Suporte a **agentes especializados por fase** e **orquestração multi-agent** (execução paralela) |
| `agencia-verify-work` | v2.0 | Quality Gate pós-fase. **Novo:** Integração automática com **scripts Python** (`checklist.py`, `verify_all.py`) |
| `skill-creator` | v1.0 | Criação e otimização de skills. Wizard interativo, A/B testing, evals, description optimizer. Baseado no Anthropic skill-creator |

---

## 🚀 Instalação

> **⚠️ Este pacote é privado.** É publicado no **GitHub Packages** (não no npm público).

### Opção 1 — GitHub Packages (Privado, Recomendado)

1. **Autenticar no GitHub Packages** (uma vez por máquina):
```bash
# Crie um token em: Settings > Developer settings > Personal access tokens > Tokens (classic)
# Permissões necessárias: read:packages, write:packages (se for publicar)
npm login --registry=https://npm.pkg.github.com
# Username: seu-usuario-github
# Password: o token gerado
```

2. **Instalar globalmente:**
```bash
npm install -g @pauloarthurrocha/agencia-ai-adaptavel --registry=https://npm.pkg.github.com
```

3. **Ou use npx (sem instalar global):**
```bash
npx @pauloarthurrocha/agencia-ai-adaptavel init --registry=https://npm.pkg.github.com
```

### Opção 2 — One-liner (Sem NPM Registry)

**Linux/macOS:**
```bash
curl -fsSL https://raw.githubusercontent.com/pauloarthurrocha/agencia-ai-adaptavel-skills/main/install/install.sh | bash
```

**Windows (PowerShell admin):**
```powershell
irm https://raw.githubusercontent.com/pauloarthurrocha/agencia-ai-adaptavel-skills/main/install/install.ps1 | iex
```

### Opção 3 — Git Clone + npm link

```bash
git clone https://github.com/pauloarthurrocha/agencia-ai-adaptavel-skills.git ~/.agencia-ai
cd ~/.agencia-ai && npm link
```

---

## 🏁 Uso Rápido

```bash
# === TERMINAL (fora do IDE) ===
# 1. Autenticar no GitHub Packages (uma vez por maquina)
#    Gerar token em: github.com > Settings > Developer settings > Tokens (classic)
#    Permissoes: read:packages
npm login --registry=https://npm.pkg.github.com

# 2. Instalar CLI globalmente (pacote privado no GitHub Packages)
npm install -g @pauloarthurrocha/agencia-ai-adaptavel --registry=https://npm.pkg.github.com

# 3. (Opcional) Re-propagar skills para IDEs instaladas depois
#    O postinstall ja faz isso automaticamente. Rode manualmente se
#    instalar uma IDE nova (Cursor, Codex...) DEPOIS do npm install.
agencia-ai install-global

# === IDE (dentro do projeto) ===
# 3. Criar pasta do projeto
mkdir meu-projeto && cd meu-projeto

# 4. Abrir pasta no IDE (Claude, Cursor, OpenCode, etc.)
# 5. A skill cria a estrutura completa do projeto:
skill(name="agencia-init")

# 6. Iniciar onboarding (entrevista com o cliente)
skill(name="client-onboarding")

# 7. Executar fases
skill(name="agencia-executor")
```

> **🧠 Separacao de responsabilidades:**
> - **CLI (`agencia-ai`)** = Instala o **sistema** globalmente (`~/.agencia-ai/`)
> - **Skill (`agencia-init`)** = Cria a **estrutura do projeto** (STATE.md, .planning/, skills cross-IDE)
> - O CLI **nunca** cria arquivos de projeto. A skill **nunca** instala coisas fora do repo.

---

## 📋 Dependências do Sistema

| Dependência | Obrigatória? | Uso | Verificação |
|---|---|---|---|
| **Node.js + npm** | ✅ Sim | Instalar CLI global, MCP servers | `doctor` verifica versão |
| **Git** | ✅ Sim | Fallback para skills externas | `doctor` verifica |
| **gh CLI** | ❌ Opcional | Fallback para git clone de skills | Instalável via `npm install -g gh` |
| **Python 3** | ❌ Opcional | Scripts de validação automatizada | Não obrigatório para iniciar |

> 💡 **Nota:** A skill `agencia-init` prioriza `~/.agencia-ai/skills/` (instalado pelo CLI). Só usa `git clone` como fallback se o global não existir. Isso torna o init **10x mais rápido** e funciona offline.

---

## 🔄 Fluxo Completo

```
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 0: Terminal — Instalar sistema globalmente               │
│                                                                  │
│  npm login --registry=https://npm.pkg.github.com                │
│  npm install -g @pauloarthurrocha/agencia-ai-adaptavel \        │
│       --registry=https://npm.pkg.github.com                     │
│                                                                  │
│  O postinstall popula automaticamente:                          │
│   • ~/.agencia-ai/        (SSoT global)                         │
│   • ~/.claude/skills/     (se Claude Code detectado)            │
│   • ~/.cursor/skills/     (se Cursor detectado)                 │
│   • ~/.codex/skills/      (se Codex detectado)                  │
│   • ~/.opencode/skills/   (se OpenCode detectado)               │
│   • ~/.roo/skills/        (se Roo Code detectado)               │
│   • ~/.gemini/antigravity/skills/ (se Antigravity detectado)    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 1: Criar pasta do projeto e abrir no IDE                 │
│                                                                  │
│  mkdir meu-projeto && cd meu-projeto                            │
│  # Abrir no IDE (Claude, Cursor, OpenCode, Codex...)            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 2: skill(name="agencia-init") ← Cria estrutura do projeto│
│                                                                  │
│  • Detecta IDE automaticamente                                  │
│  • Copia skills de ~/.agencia-ai/skills/ (SSoT global)         │
│  • Cria estrutura cross-IDE (.agents/skills/, .claude/, etc.)   │
│  • Configura MCPs (.mcp.json)                                   │
│  • Cria arquivos de contexto (AGENTS.md, PROJECT.md, STATE.md) │
│  • Clona design-library (71+ templates awesome-design-md)      │
│  • Cria PIPELINE.md vazio (placeholder)                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 3: skill(name="client-onboarding") ← OBRIGATÓRIO        │
│                                                                  │
│  • Entrevista socrática adaptativa                              │
│  • Valida stack e hospedagem via MCPs (brave-search, context7) │
│  • Etapa 2.5: Consultoria de Design (awesome-design-md)        │
│  • Gera BRIEFING.md + .planning/DESIGN.md + PROJECT.md          │
│  • Invoca pipeline-generator para criar PIPELINE.md             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 4: skill(name="agencia-executor")                        │
│                                                                  │
│  • Lê PIPELINE.md                                               │
│  • Identifica próxima fase pendente                             │
│  • Carrega skills específicas da fase + agentes especializados  │
│  • Pergunta antes de executar (gate humano)                     │
│  • Executa → Quality Gate → Atualiza memória                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 5: Troca de IDE (ex: OpenCode → Roo Code)               │
│                                                                  │
│  • Abre mesmo projeto no Roo Code                                │
│  • Lê .roo/skills/ (copiados do repo)                            │
│  • Lê .planning/STATE.md → continua de onde parou               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Comandos CLI (Gerenciamento Global)

> O CLI **não cria projetos**. Ele instala o sistema em `~/.agencia-ai/` para que as skills funcionem.

```bash
# Instalar/atualizar recursos globais (skills, agentes, presets, scripts)
agencia-ai install-global

# Verificar instalação
agencia-ai doctor

# Atualizar skills da agência (com backup automático)
agencia-ai update

# Ver versão
agencia-ai version
```

**Para criar um projeto novo, use a skill dentro do IDE:**
```bash
skill(name="agencia-init")        # Cria estrutura do projeto
skill(name="client-onboarding")   # Entrevista e gera PIPELINE.md
```

---

## 📁 Estrutura do Repo

```
agencia-ai-adaptavel-skills/
├── README.md
├── LICENSE
├── package.json
├── .npmrc
├── bin/
│   └── agencia-ai.js                   # CLI
├── src/                                # TUDO que é distribuído
│   ├── skills/
│   │   ├── agencia-init/SKILL.md
│   │   ├── agencia-executor/SKILL.md
│   │   ├── client-onboarding/SKILL.md
│   │   ├── pipeline-generator/SKILL.md
│   │   ├── agencia-verify-work/SKILL.md
│   │   └── skill-creator/SKILL.md
│   ├── agents/
│   │   ├── orchestrator.md
│   │   └── ... (10 agentes)
│   ├── presets/
│   │   └── ... (4 presets)
│   ├── scripts/                        # SÓ scripts distribuídos
│   │   ├── checklist.py
│   │   └── verify_all.py
│   └── templates/
│       ├── context-engineering/
│       ├── lp-components/
│       └── skill/
├── install/                            # Instaladores alternativos
│   ├── install.sh
│   └── install.ps1
├── build/                              # Scripts de build/release
│   ├── installer.js
│   └── postinstall.js
├── docs/
│   ├── SKILL-REGISTRY.md
│   └── ARCHITECTURE.md
└── examples/                           # (opcional)
```

---

## 🧠 Conceitos-Chave

### Context Engineering v2.1
Sistema de memória distribuído entre arquivos:
- **AGENTS.md** — Protocolos universais (não editar no projeto)
- **PROJECT.md** — Fonte canônica do projeto (stack, guardrails)
- **STATE.md** — Estado atual (progresso, bloqueios)
- **DESIGN.md** — Âncora visual do projeto (template awesome-design-md escolhido)
- **discovery-notes.md** — Memória dinâmica (regras aprendidas)
- **CHANGELOG_LLM.md** — Histórico para IAs

### Shift-Left Deploy
A primeira fase técnica do PIPELINE **sempre** configura deploy (wrangler.toml, vercel.json, Dockerfile). Isso evita descobrir incompatibilidades no final.

### Cross-IDE Continuity
As pastas `.agents/skills/`, `.claude/skills/`, `.codex/skills/`, `.roo/skills/`, `.gemini/antigravity/skills/` são **commitadas no repo do projeto**. Qualquer IDE que abrir o projeto encontra as skills automaticamente.

---

## 🔒 Privacidade

Este repositório é **privado**. Skills externas são instaladas sob demanda pelo `agencia-init` e **não são commitadas** (ficam em `.gitignore` via `.env.local`, `.mcp.json`).

---

## 🔒 Segurança da Instalação

O instalador da Agência AI Adaptável foi projetado para ser **não-destrutivo**:

- ✅ **Nunca sobrescreve arquivos existentes** — pergunta antes ou faz backup
- ✅ **Nunca deleta arquivos do seu sistema** — apenas remove arquivos da própria ferramenta
- ✅ **Instala apenas em `~/.agencia-ai/`** — nunca toca em outras pastas do sistema
- ✅ **Backups automáticos** — ao atualizar, cria backup com timestamp
- ✅ **Sem permissões de admin** — não requer sudo (exceto para `npm install -g`)

---

## 📝 Changelog

### v3.3.0 — Design System Intelligence (Awesome Design MD)
- **Etapa 2.5: Consultoria de Design** no `client-onboarding` — IA analisa perfil do projeto e recomenda templates de design
- **71+ Design Templates** (Vercel, Stripe, Notion, Linear, Supabase, etc.) clonados automaticamente pelo `agencia-init`
- **Âncora Visual** (`.planning/DESIGN.md`) — fonte da verdade para eliminar alucinações de design
- **Playbooks atualizados** — todas as fases de Design System agora referenciam `.planning/DESIGN.md` como base

### v3.2.0 — Agentes Especializados + Validação Automatizada
- **10 Agentes Especializados** em `src/agents/` (frontend, backend, security, etc.)
- **Orquestração Multi-Agent** — execução paralela de fases complexas
- **Scripts Python de Validação** — `checklist.py` (30s) e `verify_all.py` (3-5min)
- **4 Presets Estéticos** — tech-organico, luxo-noturno, sinal-brutalista, clinica-vapor
- **7 Templates de Componentes LP** — navbar, hero, features, filosofia, protocolo, planos, footer
- **Questionários Socráticos por Playbook** — entrevistas específicas por tipo de projeto
- **Instalação via NPM** — `npm install -g @pauloarthurrocha/agencia-ai-adaptavel --registry=https://npm.pkg.github.com`

### v3.0.0 — Agência Neutra + Universal
- `agencia-init` agora é neutro (não pressupõe LP/Next.js)
- `client-onboarding` com entrevista socrática e validação via MCPs
- `pipeline-generator` com 9 playbooks por tipo de projeto
- `agencia-verify-work` como Quality Gate pós-fase
- Instaladores universais (`install.sh` + `install.ps1`)
- Suporte a deploy global via `~/.agencia-ai/`

### v2.3 — Cross-IDE + Skills
- Auto-detect IDE (Claude, OpenCode, Antigravity, Codex, Cursor)
- Auto-install skills externos (Antigravity Kit, Marketing, Design)
- Context Engineering v2.0 (AGENTS.md, PROJECT.md, STATE.md)
- MCPs configurados (Brave Search, Playwright, Firecrawl, GitHub)

---

*Agencia AI Adaptável — Sistema de execução de projetos via IA. Funciona em qualquer IDE. Adapta-se a qualquer projeto.*
