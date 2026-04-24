# SKILL-REGISTRY.md — Índice de Skills Agência AI Adaptável

> **Atualizado em:** 2026-04-24
> **Versão do Sistema:** 3.0.1
> **Total de Skills:** 160+

---

## 🎯 Como Usar Este Registro

Este arquivo é o **índice centralizado** de todas as skills disponíveis no sistema. Use-o para:
- Descobrir qual skill usar para uma tarefa
- Verificar se uma skill está instalada globalmente
- Identificar gaps no seu toolkit

**Para usar uma skill:**
```bash
# No Claude Code, OpenCode, Antigravity, Codex ou Cursor:
skill(name="nome-da-skill")
```

---

## 🏛️ Skills Core (Núcleo da Agência)

| Skill | Versão | Descrição | Trigger |
|---|---|---|---|
| `agencia-init` | v3.0 | Inicializa projetos. Detecta IDE, configura MCPs, cria estrutura Context Engineering | `init`, `novo projeto`, `criar projeto` |
| `agencia-executor` | v3.1 | Orquestrador dinâmico. Lê PIPELINE.md, executa fases | `executor`, `executar fase`, `próximo passo` |
| `client-onboarding` | v3.1 | Arquiteto Socrático. Entrevista, valida stack, gera BRIEFING/PROJECT/PIPELINE | `onboarding`, `briefing`, `entrevista cliente` |
| `pipeline-generator` | v1.0 | Gera PIPELINE.md com 9 playbooks por tipo de projeto | `pipeline`, `playbook`, `fases do projeto` |
| `agencia-verify-work` | v1.0 | Quality Gate pós-fase. Valida outputs, gera VERIFICATION_REPORT | `verify`, `verificar`, `quality gate` |
| `skill-creator` | v1.0 | Criação/otimização de skills. Wizard + A/B testing + evals | `criar skill`, `nova skill`, `otimizar skill` |

**Fonte:** `~/.agencia-ai/skills/` (repo principal)

---

## 📄 Skills de Documentação (Anthropic)

| Skill | Versão | Descrição | Trigger |
|---|---|---|---|
| `docx` | v1.0 | Geração de documentos Word (.docx) | `criar docx`, `documento word`, `.docx` |
| `pdf` | v1.0 | Geração/manipulação de PDFs | `criar pdf`, `pdf`, `documento pdf` |
| `pptx` | v1.0 | Geração de apresentações PowerPoint | `criar ppt`, `apresentação`, `slides` |
| `xlsx` | v1.0 | Geração/manipulação de planilhas Excel | `criar excel`, `planilha`, `.xlsx` |
| `doc-coauthoring` | v1.0 | Documentação colaborativa | `coauthoring`, `documentação colaborativa` |
| `web-artifacts-builder` | v1.0 | Componentes web interativos | `web artifact`, `componente interativo` |
| `brand-guidelines` | v1.0 | Criação de guias de marca | `brand guidelines`, `guia de marca`, `brand book` |

**Fonte:** `~/.agencia-ai/skills/` (Anthropic skills)

---

## 🎨 Skills de Design

| Skill | Versão | Descrição | Trigger |
|---|---|---|---|
| `frontend-design` | v2.0 | Design thinking e decisões para web UI | `design`, `ui`, `frontend`, `componente` |
| `ui-ux-pro-max` | v2.0 | UI/UX Pro Max — 50 estilos, 21 paletas, 50 font pairings | `ui-ux`, `design system`, `pro max` |
| `psychology-color-picker` | v1.0 | Paletas de cores baseadas em psicologia | `cores`, `paleta`, `color picker` |
| `design-system-generator` | v1.0 | Gera design systems completos | `design system`, `tokens`, `componentes` |
| `landing-page-scaffold` | v1.0 | Scaffold de landing pages Next.js | `landing page`, `scaffold`, `next.js lp` |
| `tailwind-patterns` | v1.0 | Padrões Tailwind CSS | `tailwind`, `css`, `estilos` |

**Fonte:** `~/.claude/skills/` (instaladas globalmente)

---

## 📝 Skills de Copywriting & Marketing

| Skill | Versão | Descrição | Trigger |
|---|---|---|---|
| `copywriting` | v2.0 | Copywriting persuasivo | `copy`, `copywriting`, `texto persuasivo` |
| `copy-editing` | v1.0 | Edição e revisão de copy | `editar copy`, `revisar texto` |
| `marketing-psychology` | v1.0 | Psicologia aplicada ao marketing | `psicologia`, `marketing`, `behavioral` |
| `page-cro` | v1.0 | Otimização de conversão de páginas | `cro`, `conversão`, `otimizar página` |
| `seo-audit` | v1.5 | Auditoria SEO | `seo`, `audit`, `ranking` |
| `ai-seo` | v1.0 | SEO para IA search engines | `ai seo`, `chatgpt`, `perplexity` |
| `schema-markup` | v1.0 | Structured data / JSON-LD | `schema`, `rich snippets`, `json-ld` |
| `email-sequence` | v1.0 | Sequências de email automatizadas | `email sequence`, `drip campaign` |
| `cold-email` | v1.0 | Cold emails B2B | `cold email`, `prospecting`, `outreach` |
| `social-content` | v1.0 | Conteúdo para redes sociais | `social media`, `linkedin`, `twitter` |
| `content-strategy` | v1.0 | Estratégia de conteúdo | `content strategy`, `editorial` |
| `ad-creative` | v1.0 | Criação de anúncios | `ad creative`, `anúncio`, `copy de ads` |
| `paid-ads` | v1.0 | Gestão de campanhas pagas | `google ads`, `meta ads`, `ppc` |
| `meta-ads-intelligence` | v1.0 | Análise estratégica de Meta Ads | `meta ads`, `facebook ads`, `instagram` |
| `analytics-tracking` | v1.0 | Configuração de analytics | `analytics`, `ga4`, `tracking` |
| `lead-magnets` | v1.0 | Criação de lead magnets | `lead magnet`, `ebook`, `checklist` |
| `launch-strategy` | v1.0 | Estratégia de lançamento | `launch`, `product hunt`, `go-to-market` |
| `referral-program` | v1.0 | Programas de indicação | `referral`, `afiliado`, `viral loop` |
| `pricing-strategy` | v1.0 | Estratégia de preços | `pricing`, `preço`, `freemium` |
| `product-marketing-context` | v1.0 | Contexto de marketing do produto | `product context`, `posicionamento` |
| `competitor-intel` | v1.0 | Inteligência competitiva | `concorrente`, `competitor analysis` |
| `niche-research` | v1.0 | Pesquisa de nicho | `niche research`, `pesquisa de mercado` |
| `customer-research` | v1.0 | Pesquisa com clientes | `customer research`, `icp`, `jtbd` |
| `free-tool-strategy` | v1.0 | Estratégia de ferramentas gratuitas | `free tool`, `lead gen`, `engineering marketing` |
| `community-marketing` | v1.0 | Marketing via comunidades | `comunidade`, `discord`, `brand advocates` |
| `sales-enablement` | v1.0 | Material de vendas | `sales deck`, `pitch deck`, `one-pager` |
| `revops` | v1.0 | Revenue Operations | `revops`, `lead scoring`, `crm automation` |

**Fonte:** `~/.claude/skills/` (instaladas globalmente)

---

## 💻 Skills de Desenvolvimento

| Skill | Versão | Descrição | Trigger |
|---|---|---|---|
| `nextjs-react-expert` | v2.0 | Next.js e React — otimização de performance | `next.js`, `react`, `performance` |
| `nodejs-best-practices` | v1.0 | Node.js — padrões e arquitetura | `node.js`, `backend`, `api` |
| `python-patterns` | v1.0 | Python — padrões e estrutura | `python`, `django`, `fastapi` |
| `rust-pro` | v1.0 | Rust avançado | `rust`, `tokio`, `systems programming` |
| `tdd-workflow` | v1.0 | Test-Driven Development | `tdd`, `testes`, `red green refactor` |
| `testing-patterns` | v1.0 | Padrões de testes | `testes`, `unit test`, `integration` |
| `webapp-testing` | v1.0 | Testes de aplicações web | `e2e`, `playwright`, `automação de testes` |
| `database-design` | v1.0 | Design de banco de dados | `database`, `schema`, `postgresql` |
| `deployment-procedures` | v1.0 | Procedimentos de deploy | `deploy`, `ci/cd`, `rollback` |
| `server-management` | v1.0 | Gerenciamento de servidores | `server`, `vps`, `monitoring` |
| `mcp-builder` | v1.0 | Construção de servidores MCP | `mcp`, `model context protocol` |
| `gemini-api-dev` | v1.0 | Integração com Google Gemini API | `gemini`, `google ai`, `multimodal` |
| `app-builder` | v1.0 | Construção de aplicações full-stack | `app`, `full-stack`, `scaffold` |
| `architecture` | v1.0 | Decisões arquiteturais | `arquitetura`, `adr`, `system design` |
| `i18n-localization` | v1.0 | Internacionalização | `i18n`, `tradução`, `locale` |
| `lint-and-validate` | v1.0 | Linting e análise estática | `lint`, `format`, `validate` |
| `clean-code` | v1.0 | Padrões de código limpo | `clean code`, `refactoring` |
| `code-review-checklist` | v1.0 | Checklist de code review | `code review`, `pr review` |
| `documentation-templates` | v1.0 | Templates de documentação | `docs`, `readme`, `api docs` |
| `bash-linux` | v1.0 | Bash/Linux — comandos e scripts | `bash`, `linux`, `shell` |
| `powershell-windows` | v1.0 | PowerShell Windows | `powershell`, `windows`, `ps1` |
| `git-master` | v1.0 | Git avançado | `git`, `rebase`, `blame` |
| `performance-profiling` | v1.0 | Profiling de performance | `profiling`, `benchmark`, `optimization` |
| `systematic-debugging` | v1.0 | Debugging sistemático | `debug`, `troubleshoot`, `bug` |
| `red-team-tactics` | v1.0 | Táticas de red team | `red team`, `pentest`, `mitre` |
| `vulnerability-scanner` | v1.0 | Scanner de vulnerabilidades | `security`, `owasp`, `vuln scan` |
| `website-cloner` | v1.0 | Clonagem de websites | `clone site`, `replicate`, `reverse engineer` |
| `web-scraper-intel` | v1.0 | Web scraping para inteligência | `scrape`, `extract`, `crawl` |

**Fonte:** `~/.claude/skills/` (instaladas globalmente)

---

## 🎮 Skills de Game Development

| Skill | Versão | Descrição | Trigger |
|---|---|---|---|
| `game-development` | v1.0 | Orquestrador de game dev | `game dev`, `jogo`, `unity` |
| `2d-games` | v1.0 | Jogos 2D | `2d game`, `sprites`, `tilemap` |
| `3d-games` | v1.0 | Jogos 3D | `3d game`, `shaders`, `physics` |
| `pc-games` | v1.0 | Jogos PC/Console | `pc game`, `steam`, `console` |
| `mobile-games` | v1.0 | Jogos mobile | `mobile game`, `ios`, `android` |
| `web-games` | v1.0 | Jogos browser | `web game`, `html5 game` |
| `multiplayer` | v1.0 | Multiplayer | `multiplayer`, `networking`, `sync` |
| `vr-ar` | v1.0 | VR/AR | `vr`, `ar`, `xr` |
| `game-design` | v1.0 | Design de jogos | `game design`, `gdd`, `balance` |
| `game-art` | v1.0 | Arte de jogos | `game art`, `assets`, `sprites` |
| `game-audio` | v1.0 | Áudio de jogos | `game audio`, `sound design`, `music` |

**Fonte:** `~/.claude/skills/` (instaladas globalmente)

---

## 🤖 Agentes Especializados (Antigravity Kit)

> Instalado em: `~/.agencia-ai/antigravity-kit/agents/`
> Uso: O executor pode invocar agentes por fase (futuro v3.2+)

| Agente | Domínio | Uso |
|---|---|---|
| `orchestrator` | Coordenação multi-agent | Decompõe tarefas complexas, invoca especialistas em paralelo |
| `frontend-specialist` | Frontend & UI | React, Next.js, Tailwind, componentes, animações |
| `backend-specialist` | Backend & API | Node.js, Express, FastAPI, databases |
| `database-architect` | Database & Schema | Prisma, migrations, optimization, RLS |
| `security-auditor` | Security & Auth | Authentication, vulnerabilities, OWASP |
| `penetration-tester` | Security Testing | Active vulnerability testing, red team |
| `test-engineer` | Testing & QA | Unit tests, E2E, coverage, TDD |
| `devops-engineer` | DevOps & Infra | Deployment, CI/CD, PM2, monitoring |
| `mobile-developer` | Mobile Apps | React Native, Flutter, Expo |
| `performance-optimizer` | Performance | Profiling, optimization, bottlenecks |
| `debugger` | Debugging | Root cause analysis, systematic debugging |
| `explorer-agent` | Discovery | Codebase exploration, dependencies |
| `project-planner` | Planning | Task breakdown, milestones, roadmap |
| `seo-specialist` | SEO & Marketing | SEO optimization, meta tags, analytics |
| `game-developer` | Game Development | Unity, Godot, Unreal, Phaser |
| `product-manager` | Product Management | Feature prioritization, user stories |
| `product-owner` | Product Ownership | Requirements, acceptance criteria |
| `qa-automation-engineer` | QA Automation | Automated testing pipelines |
| `code-archaeologist` | Legacy Code | Understanding old codebases |
| `documentation-writer` | Documentation | Docs, README, API documentation |

**Fonte:** `~/.agencia-ai/antigravity-kit/agents/` (v2.0.1)

---

## 🔄 Workflows (Antigravity Kit)

> Instalado em: `~/.agencia-ai/antigravity-kit/workflows/`
> Uso: Slash commands disponíveis no projeto

| Workflow | Descrição | Quando Usar |
|---|---|---|
| `/brainstorm` | Explore opções antes de implementar | Requisitos unclear |
| `/create` | Crie novas features ou apps | Novo projeto ou feature |
| `/debug` | Debugging sistemático | Bugs, erros, falhas |
| `/deploy` | Deploy da aplicação | Pronto para produção |
| `/enhance` | Melhore código existente | Refactoring, otimização |
| `/orchestrate` | Coordenação multi-agent | Tarefas complexas multi-domínio |
| `/plan` | Crie breakdown de tarefas | Projetos grandes |
| `/preview` | Preview local de mudanças | Antes de commitar |
| `/status` | Checa status do projeto | Progress check |
| `/test` | Gere e execute testes | Antes de deploy |
| `/ui-ux-pro-max` | Design com 50 estilos | Fase de design |

**Fonte:** `~/.agencia-ai/antigravity-kit/workflows/` (v2.0.1)

---

## 🧪 Scripts de Validação (Antigravity Kit)

> Instalado em: `~/.agencia-ai/antigravity-kit/scripts/`

| Script | Descrição | Tempo |
|---|---|---|
| `checklist.py` | Validação rápida: security, lint, types, tests, UX, SEO | ~30s |
| `verify_all.py` | Validação completa: Lighthouse, E2E, bundle, mobile, i18n | ~3-5min |
| `session_manager.py` | Gerenciamento de sessões | - |
| `auto_preview.py` | Preview automático | - |

**Scripts por Skill:**
- `api-patterns` → `api_validator.py`
- `database-design` → `schema_validator.py`
- `frontend-design` → `accessibility_checker.py`, `ux_audit.py`
- `lint-and-validate` → `lint_runner.py`, `type_coverage.py`
- `testing-patterns` → `test_runner.py`
- `vulnerability-scanner` → `security_scan.py`
- `webapp-testing` → `playwright_runner.py`

---

## ⚙️ GSD Commands (Get Shit Done)

| Skill | Versão | Descrição | Trigger |
|---|---|---|---|
| `gsd-new-project` | v1.0 | Inicializa projeto GSD | `gsd new project`, `new milestone` |
| `gsd-plan-phase` | v1.0 | Plano detalhado de fase | `gsd plan`, `plan phase` |
| `gsd-execute-phase` | v1.0 | Executa fase | `gsd execute`, `run phase` |
| `gsd-verify-work` | v1.0 | Verificação pós-fase | `gsd verify`, `validate phase` |
| `gsd-discuss-phase` | v1.0 | Discussão antes de planejar | `gsd discuss`, `discuss phase` |
| `gsd-ui-phase` | v1.0 | Fase de UI design | `gsd ui`, `ui phase` |
| `gsd-ui-review` | v1.0 | Review de UI | `gsd ui review`, `review ui` |
| `gsd-code-review` | v1.0 | Code review | `gsd code review`, `review code` |
| `gsd-autonomous` | v1.0 | Execução autônoma | `gsd autonomous`, `run all` |
| `gsd-debug` | v1.0 | Debug sistemático GSD | `gsd debug`, `troubleshoot` |
| `gsd-progress` | v1.0 | Checa progresso | `gsd progress`, `where are we` |
| `gsd-next` | v1.0 | Próximo passo automático | `gsd next`, `what next` |
| `gsd-do` | v1.0 | Roteia comando para skill GSD | `gsd do`, `route command` |
| ... (60+ comandos) | | | |

**Fonte:** `~/.claude/skills/` (instaladas globalmente)

---

## 📋 Status de Instalação

### ✅ Instalado Globalmente (`~/.agencia-ai/skills/`)
- [x] agencia-init
- [x] agencia-executor
- [x] client-onboarding
- [x] pipeline-generator
- [x] agencia-verify-work
- [x] skill-creator
- [x] brand-guidelines
- [x] doc-coauthoring
- [x] docx
- [x] pdf
- [x] pptx
- [x] web-artifacts-builder
- [x] xlsx
- [x] templates (Context Engineering)
- [x] 38 skills de marketing (coreyhaines31/marketingskills)
- [x] 37 skills de dev/design (claude/shared)

### ✅ Antigravity Kit Instalado (`~/.agencia-ai/antigravity-kit/`)
- [x] 20 agentes especializados
- [x] 11 workflows (slash commands)
- [x] UI/UX Pro Max completo (dados CSV + scripts Python)
- [x] 4 scripts Python de validação

### ✅ Instalado em IDEs (82+ skills cada)
- [x] Claude Code (`~/.claude/skills/`)
- [x] OpenCode (`~/.opencode/skills/`)
- [x] Antigravity (`~/.gemini/antigravity/skills/`)
- [ ] Codex (`~/.codex/skills/`) — não detectado
- [ ] Cursor (`~/.cursor/skills/`) — não detectado

### ✅ Configurado no PATH
- [x] `agencia-ai` comando global
- [x] PowerShell profile
- [x] `%LOCALAPPDATA%\AgenciaAI\bin`

---

## 🔧 Comandos CLI

```powershell
# Diagnóstico completo
agencia-ai doctor

# Inicializar novo projeto
agencia-ai init [pasta]

# Atualizar skills
agencia-ai update

# Versão
agencia-ai version
```

---

## 📝 Notas

- **Total estimado de skills:** 200+ (incluindo GSD commands + agentes)
- **Skills core:** 6 (repo principal)
- **Skills Anthropic:** 7 (instaladas globalmente)
- **Skills marketing:** 38 (coreyhaines31)
- **Skills dev/design:** 37+ (claude/shared)
- **Skills GSD:** 60+
- **Agentes:** 20 (Antigravity Kit)
- **Workflows:** 11 (Antigravity Kit)

**Para adicionar novas skills:**
1. Criar diretório `nome-da-skill/SKILL.md`
2. Seguir formato SKILL.md (YAML frontmatter + markdown)
3. Rodar `sync-skills.ps1` ou reinstalar

---

*Agencia AI Adaptável — SKILL-REGISTRY v2.0*
