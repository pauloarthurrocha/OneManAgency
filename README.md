# Agencia AI Adaptável — Skills v3.0

> **Repo:** github.com/pauloarthurrocha/agencia-ai-adaptavel-skills
> **Versão:** 3.0.0 (Neutro + Cross-IDE + Universal Installer)
> **Formato:** Agent Skills (SKILL.md)

---

## 🎯 Propósito

Sistema de **agent skills** para execução de projetos de software via IA. Funciona em qualquer IDE (Claude Code, OpenCode, Antigravity, Codex, Cursor) e suporta qualquer tipo de projeto (Landing Page, SaaS, Automação Python, Low-Ticket, etc.).

**Filosofia:** Não prescreve fases rígidas. O `client-onboarding` entrevista o cliente e gera um `PIPELINE.md` customizado. O `agencia-executor` executa fase a fase, carregando as skills corretas para cada contexto.

---

## 📦 Skills Core (neste repo)

| Skill | Versão | Descrição |
|---|---|---|
| `agencia-init` | v3.0 | Inicialização de projetos. Detecta IDE, configura MCPs, cria estrutura Context Engineering. **Próximo passo sempre: `client-onboarding`** |
| `client-onboarding` | v3.1 | Arquiteto Socrático. Entrevista adaptativa, valida stack/deploy via MCPs, gera `BRIEFING.md` + `PROJECT.md` + `PIPELINE.md` |
| `pipeline-generator` | v1.0 | Gera PIPELINE.md a partir do briefing. Contém 9 playbooks (LP estática, LP Next.js, SaaS, Python, Low-Ticket, etc.) |
| `agencia-executor` | v3.1 | Orquestrador dinâmico. Lê PIPELINE.md, executa próxima fase pendente, carrega skills corretas, aplica Quality Gate |
| `agencia-verify-work` | v1.0 | Quality Gate pós-fase. Valida outputs contra critérios de aceite. Gera `VERIFICATION_REPORT.md` (PASS/WARNING/FAIL) |
| `skill-creator` | v1.0 | Criação e otimização de skills. Wizard interativo, A/B testing, evals, description optimizer. Baseado no Anthropic skill-creator |

---

## 🚀 Instalação

### Opção 1 — One-liner (Recomendado)

**Linux/macOS:**
```bash
curl -fsSL https://raw.githubusercontent.com/pauloarthurrocha/agencia-ai-adaptavel-skills/main/install.sh | bash
```

**Windows (PowerShell admin):**
```powershell
irm https://raw.githubusercontent.com/pauloarthurrocha/agencia-ai-adaptavel-skills/main/install.ps1 | iex
```

### Opção 2 — Git Clone

```bash
git clone https://github.com/pauloarthurrocha/agencia-ai-adaptavel-skills.git ~/.agencia-ai
cd ~/.agencia-ai && ./install.sh
```

### Opção 3 — NPM (futuro)

```bash
npm install -g agencia-ai-adaptavel
agencia-ai init
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

## 📝 Changelog

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
