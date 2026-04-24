# Agencia AI Adaptável — Skills v3.2

> **Repo:** github.com/pauloarthurrocha/agencia-ai-adaptavel-skills
> **Versão:** 3.2.0 (Agentes Especializados + Orquestração Multi-Agent + Validação Automatizada)
> **Formato:** Agent Skills (SKILL.md)
> **NPM:** `npm install -g agencia-ai-adaptavel`

---

## 🎯 Propósito

Sistema de **agent skills** para execução de projetos de software via IA. Funciona em qualquer IDE (Claude Code, OpenCode, Antigravity, Codex, Cursor) e suporta qualquer tipo de projeto (Landing Page, SaaS, Automação Python, Low-Ticket, etc.).

**Filosofia:** Não prescreve fases rígidas. O `client-onboarding` entrevista o cliente e gera um `PIPELINE.md` customizado. O `agencia-executor` executa fase a fase, carregando as skills corretas para cada contexto.

---

## 📦 Skills Core (neste repo)

| Skill | Versão | Descrição |
|---|---|---|
| `agencia-init` | v3.0 | Inicialização de projetos. Detecta IDE, configura MCPs, cria estrutura Context Engineering. **Próximo passo sempre: `client-onboarding`** |
| `client-onboarding` | v3.2 | Arquiteto Socrático. Entrevista adaptativa com **questionários por playbook** (SaaS, LP, Python, Low-ticket). Valida stack/deploy via MCPs |
| `pipeline-generator` | v1.0 | Gera PIPELINE.md a partir do briefing. Contém 9 playbooks. **Novo:** Fase "Arquitetura Técnica" com PRDs para SaaS/Full-stack |
| `agencia-executor` | v3.2 | Orquestrador dinâmico. **Novo:** Suporte a **agentes especializados por fase** e **orquestração multi-agent** (execução paralela) |
| `agencia-verify-work` | v2.0 | Quality Gate pós-fase. **Novo:** Integração automática com **scripts Python** (`checklist.py`, `verify_all.py`) |
| `skill-creator` | v1.0 | Criação e otimização de skills. Wizard interativo, A/B testing, evals, description optimizer. Baseado no Anthropic skill-creator |

---

## 🚀 Instalação

### Opção 1 — NPM (Recomendado)

Instala globalmente via npm (Node.js >= 18):

```bash
npm install -g agencia-ai-adaptavel
```

**Ou use npx (sem instalar global):**
```bash
npx agencia-ai-adaptavel init
```

**Windows (PowerShell admin):**
```powershell
npm install -g agencia-ai-adaptavel
```

### Opção 2 — One-liner (Sem NPM)

**Linux/macOS:**
```bash
curl -fsSL https://raw.githubusercontent.com/pauloarthurrocha/agencia-ai-adaptavel-skills/main/install.sh | bash
```

**Windows (PowerShell admin):**
```powershell
irm https://raw.githubusercontent.com/pauloarthurrocha/agencia-ai-adaptavel-skills/main/install.ps1 | iex
```

### Opção 3 — Git Clone

```bash
git clone https://github.com/pauloarthurrocha/agencia-ai-adaptavel-skills.git ~/.agencia-ai
cd ~/.agencia-ai && npm link
```

---

## 🏁 Uso Rápido

Após instalar globalmente:

```bash
# 1. Criar novo projeto
mkdir meu-projeto && cd meu-projeto

# 2. Inicializar com a Agencia AI
agencia-ai init

# 3. Iniciar onboarding (entrevista com o cliente)
skill(name="client-onboarding")

# 4. Executar fases
skill(name="agencia-executor")
```

---

## 📋 Dependências do Sistema

| Dependência | Obrigatória? | Uso | Verificação |
|---|---|---|---|
| **Git** | ✅ Sim | Clonar repos de skills | `install.sh` aborta se não tiver |
| **Node.js + npm** | ⚠️ Recomendado | `npx skills`, MCP servers | `install.sh` avisa, continua com fallback git |
| **gh CLI** | ❌ Opcional | Fallback para git clone de skills | Instalável via `npm install -g gh` |
| **Python 3** | ❌ Opcional | Algumas automações internas | Não obrigatório para iniciar |

> 💡 **Nota:** O `agencia-init` tem fallback inteligente. Se `npx skills` não estiver disponível, ele usa `git clone`. Se `git clone` falhar, usa cache local de `~/.agencia-ai/`.

---

## 🔄 Fluxo Completo

```
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 0: Usuário abre pasta vazia em qualquer IDE              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 1: skill(name="agencia-init")                            │
│                                                                  │
│  • Detecta IDE automaticamente                                  │
│  • Copia skills da agência de ~/.agencia-ai/skills/            │
│  • Cria estrutura cross-IDE (.agents/skills/, .claude/, etc.)   │
│  • Configura MCPs (.mcp.json)                                   │
│  • Cria arquivos de contexto (AGENTS.md, PROJECT.md, STATE.md) │
│  • Cria PIPELINE.md vazio (placeholder)                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 2: skill(name="client-onboarding") ← OBRIGATÓRIO        │
│                                                                  │
│  • Entrevista socrática adaptativa                              │
│  • Valida stack e hospedagem via MCPs (brave-search, context7) │
│  • Gera BRIEFING.md + preenche PROJECT.md                       │
│  • Invoca pipeline-generator para criar PIPELINE.md             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 3: skill(name="agencia-executor")                        │
│                                                                  │
│  • Lê PIPELINE.md                                               │
│  • Identifica próxima fase pendente                             │
│  • Carrega skills específicas da fase                           │
│  • Pergunta antes de executar (gate humano)                     │
│  • Executa → Quality Gate → Atualiza memória                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 4: Troca de IDE (ex: OpenCode → Codex)                   │
│                                                                  │
│  • Abre mesmo projeto no Codex                                  │
│  • Lê .codex/skills/ (copiados do repo)                         │
│  • Lê .planning/STATE.md → continua de onde parou               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Comandos CLI (após instalação)

```bash
# Inicializar projeto novo
agencia-ai init [pasta]

# Verificar instalação
agencia-ai doctor

# Atualizar skills da agência
agencia-ai update

# Ver versão
agencia-ai version
```

---

## 📁 Estrutura do Repo

```
agencia-ai-adaptavel-skills/
├── agencia-init/              # Skill de inicialização
├── agencia-executor/          # Orquestrador dinâmico
├── client-onboarding/         # Arquiteto socrático
├── pipeline-generator/        # Gerador de PIPELINE.md
├── agencia-verify-work/       # Quality Gate
├── skill-creator/             # Criação/otimização de skills (Anthropic-based)
├── templates/                 # Templates de Context Engineering
│   └── context-engineering/
│       ├── AGENTS.md.template
│       ├── PROJECT.md.template
│       ├── STATE.md.template
│       ├── discovery-notes.md.template
│       ├── CHANGELOG_LLM.md.template
│       └── CONTEXT_SNIPPET.md.template
├── install.sh                 # Instalador Linux/macOS
├── install.ps1                # Instalador Windows
├── sync-skills.ps1            # Script de sincronização
└── README.md                  # Este arquivo
```

---

## 🧠 Conceitos-Chave

### Context Engineering v2.1
Sistema de memória distribuído entre arquivos:
- **AGENTS.md** — Protocolos universais (não editar no projeto)
- **PROJECT.md** — Fonte canônica do projeto (stack, guardrails)
- **STATE.md** — Estado atual (progresso, bloqueios)
- **discovery-notes.md** — Memória dinâmica (regras aprendidas)
- **CHANGELOG_LLM.md** — Histórico para IAs

### Shift-Left Deploy
A primeira fase técnica do PIPELINE **sempre** configura deploy (wrangler.toml, vercel.json, Dockerfile). Isso evita descobrir incompatibilidades no final.

### Cross-IDE Continuity
As pastas `.agents/skills/`, `.claude/skills/`, `.codex/skills/`, `.gemini/antigravity/skills/` são **commitadas no repo do projeto**. Qualquer IDE que abrir o projeto encontra as skills automaticamente.

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

### v3.2.0 — Agentes Especializados + Validação Automatizada
- **10 Agentes Especializados** em `.agents/agents/` (frontend, backend, security, etc.)
- **Orquestração Multi-Agent** — execução paralela de fases complexas
- **Scripts Python de Validação** — `checklist.py` (30s) e `verify_all.py` (3-5min)
- **4 Presets Estéticos** — tech-organico, luxo-noturno, sinal-brutalista, clinica-vapor
- **7 Templates de Componentes LP** — navbar, hero, features, filosofia, protocolo, planos, footer
- **Questionários Socráticos por Playbook** — entrevistas específicas por tipo de projeto
- **Instalação via NPM** — `npm install -g agencia-ai-adaptavel`

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
