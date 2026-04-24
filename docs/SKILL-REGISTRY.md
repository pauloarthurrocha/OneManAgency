# SKILL-REGISTRY.md — Índice de Skills Agência AI Adaptável

> **Atualizado em:** 2026-04-24
> **Versão do Sistema:** 3.2.0
> **Total de Skills:** 160+
> **Novidades v3.2:** Agentes especializados, orquestração multi-agent, scripts de validação Python, presets estéticos, templates de componentes LP

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
| `agencia-executor` | v3.2 | Orquestrador dinâmico. Lê PIPELINE.md, executa fases. **Novo:** Suporte a agentes especializados por fase, orquestração multi-agent paralela | `executor`, `executar fase`, `próximo passo` |
| `client-onboarding` | v3.2 | Arquiteto Socrático. Entrevista, valida stack, gera BRIEFING/PROJECT/PIPELINE. **Novo:** Questionários socráticos por playbook (SaaS, LP, Python, Low-ticket) | `onboarding`, `briefing`, `entrevista cliente` |
| `pipeline-generator` | v1.0 | Gera PIPELINE.md com 9 playbooks por tipo de projeto. **Novo:** Fase "Arquitetura Técnica" com PRDs para SaaS/Full-stack | `pipeline`, `playbook`, `fases do projeto` |
| `agencia-verify-work` | v2.0 | Quality Gate pós-fase. Valida outputs, gera VERIFICATION_REPORT. **Novo:** Integração automática com scripts Python (checklist.py, verify_all.py) | `verify`, `verificar`, `quality gate` |
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

**Fonte:** `~/.agencia-ai/skills/` (instaladas globalmente)

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

**Fonte:** `~/.agencia-ai/skills/` (instaladas globalmente)

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

**Fonte:** `~/.agencia-ai/skills/` (instaladas globalmente)

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

**Fonte:** `~/.agencia-ai/skills/` (instaladas globalmente)

---

## 🤖 Agentes Especializados (Agência AI Adaptável v3.2)

> Local: `src/agents/` (no repo da agência, commitado)
> Uso: O `agencia-executor` v3.2 invoca agentes por fase via metadata `Agent:`
> File Type Ownership: Cada agente tem prioridade de edição sobre seus tipos de arquivo

| Agente | Domínio | File Types | Uso |
|---|---|---|---|
| `orchestrator` | Coordenação multi-agent | - | Decompõe tarefas complexas, invoca especialistas em paralelo, sincroniza waves |
| `frontend-specialist` | Frontend & UI | *.tsx, *.jsx, *.css, *.scss, tailwind.config.* | React, Next.js, Tailwind, componentes, animações |
| `backend-specialist` | Backend & API | *.ts (API), *.js (API), *.py, routes.* | Node.js, Express, FastAPI, APIs, webhooks |
| `database-architect` | Database & Schema | *.prisma, schema.*, migrations/* | PostgreSQL, Prisma, Drizzle, RLS, índices |
| `security-auditor` | Security & Auth | middleware.*, auth.*, security.* | OWASP, JWT, headers, rate limiting, secrets |
| `test-engineer` | Testing & QA | *.test.*, *.spec.*, __tests__/* | Unit tests, E2E, coverage, TDD, Playwright |
| `devops-engineer` | DevOps & Infra | *.yml, *.yaml, Dockerfile, docker-compose.* | Deploy, CI/CD, Docker, Vercel, Cloudflare |
| `seo-specialist` | SEO & Marketing | robots.txt, sitemap.xml, manifest.json | Meta tags, schema markup, Core Web Vitals |
| `copywriter-specialist` | Copy & Persuasão | COPY_DECK.md, copy-*.md | Headlines, CTAs, copy deck, email sequences |
| `design-specialist` | Design System & UX | DESIGN_SYSTEM.md, design-*.md | Tokens, tipografia, componentes, layout |

**Como usar no PIPELINE.md:**
```markdown
- [ ] Fase 4: UI Spec
      Agent: frontend-specialist
      Skills: gsd-ui-phase, frontend-design
      Output: .planning/UI-SPEC.md
```

**Orquestração Multi-Agent:**
```markdown
- [ ] Fase 5: Implementação Full-Stack
      Orchestration: true
      Agents: frontend-specialist, backend-specialist, database-architect
```

**Fonte:** `src/agents/` (v3.2.0)

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

## 🧪 Scripts de Validação (v3.2)

> Local: `scripts/` (no repo da agência)
> Uso: Integrados no `agencia-verify-work` v2.0

| Script | Descrição | Tempo | Saída |
|---|---|---|---|
| `scripts/checklist.py` | Validação rápida: TypeScript, ESLint, security (npm audit), tests, build, SEO básico, code quality | ~30s | `.planning/CHECKLIST_REPORT.json` |
| `scripts/verify_all.py` | Validação completa: Lighthouse, E2E (Playwright), bundle size, acessibilidade, mobile, i18n, links | ~3-5min | `.planning/VERIFICATION_REPORT.json` |

**Categorias verificadas:**
- `checklist.py`: typescript, eslint, security, tests, build, seo, code_quality
- `verify_all.py`: lighthouse, e2e, bundle_size, accessibility, mobile, i18n, links

**Ativação no PIPELINE.md:**
```markdown
Validation: quick    → roda checklist.py
Validation: full     → roda verify_all.py
Validation: none     → pula validação automática
```

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

**Fonte:** `~/.agencia-ai/skills/` (instaladas globalmente)

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
- [x] Claude Code (`~/.agencia-ai/skills/`)
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

## 🎨 Presets Estéticos (v3.2)

> Local: `presets/` (no repo da agência)
> Uso: O `design-system-generator` pode carregar presets como ponto de partida

| Preset | Identidade | Uso Ideal | Mood |
|---|---|---|---|
| `tech-organico` | Tecnologia que respira. Natureza digital. | SaaS, climate tech, wellness tech, produtividade | Calmo, confiável, inovador |
| `luxo-noturno` | Elegância noturna. Sofisticação digital. | Fintech, luxury brands, consultoria executiva | Exclusivo, sofisticado, poderoso |
| `sinal-brutalista` | Direto, sem filtros. Força bruta digital. | Agências criativas, portfolios, streetwear, disruptivas | Bold, cru, impactante |
| `clinica-vapor` | Precisão médica. Clareza científica. | Health tech, telemedicina, biotech, insurance tech | Profissional, limpo, confiável |

**Cada preset inclui:**
- Paleta completa (primária, destaque, neutros, gradientes)
- Tipografia (display, body, escala)
- Component behaviors (cards, botões, inputs)
- Animações (hero, scroll, hover, background)
- Padrão de hero (wireframe ASCII)
- Regras premium (diretrizes de design)

---

## 🧩 Templates de Componentes LP (v3.2)

> Local: `templates/lp-components/` (no repo da agência)
> Uso: O `landing-page-scaffold` pode usar templates como ponto de partida

| Componente | Arquivo | Uso |
|---|---|---|
| Navbar | `navbar.md` | Navegação fixa com scroll behavior e mobile menu |
| Hero | `hero.md` | Seção principal com headline, CTAs, social proof, mockup |
| Features | `features.md` | Grid de funcionalidades/benefícios com ícones |
| Filosofia/Sobre | `filosofia.md` | Propósito, valores, stats, imagem |
| Protocolo/Como Funciona | `protocolo.md` | Steps numerados, timeline, cards sequenciais |
| Planos/Pricing | `planos.md` | Cards de preço, tabela comparativa, toggle |
| Footer | `footer.md` | Rodapé multi-coluna, links, newsletter, social |

**Cada template inclui:**
- Estrutura de código (TSX/React)
- Comportamentos (interactions, estados)
- Animações (CSS keyframes)
- Props/Interface
- Checklist de implementação
- Layout variations

---

## 📝 Notas

- **Total estimado de skills:** 200+ (incluindo GSD commands + agentes)
- **Skills core:** 6 (repo principal)
- **Skills Anthropic:** 7 (instaladas globalmente)
- **Skills marketing:** 38 (coreyhaines31)
- **Skills dev/design:** 37+ (claude/shared)
- **Skills GSD:** 60+
- **Agentes:** 10 (Agência AI Adaptável v3.2)
- **Workflows:** 11 (Antigravity Kit)
- **Scripts de validação:** 2 (checklist.py, verify_all.py)
- **Presets estéticos:** 4
- **Templates LP:** 7 componentes

**Novidades v3.2:**
1. **Agentes especializados:** 10 agentes com personas e file type ownership
2. **Orquestração multi-agent:** Execução paralela de fases complexas
3. **Scripts Python de validação:** Quality Gate automatizado
4. **Presets estéticos:** 4 presets plug-and-play para design system
5. **Templates de componentes LP:** 7 componentes fixos com behaviors detalhados
6. **Questionários socráticos por playbook:** Entrevistas específicas por tipo de projeto
7. **Metadata estendida no PIPELINE.md:** Agent, Orchestration, Validation

**Para adicionar novas skills:**
1. Criar diretório `nome-da-skill/SKILL.md`
2. Seguir formato SKILL.md (YAML frontmatter + markdown)
3. Rodar `sync-skills.ps1` ou reinstalar

---

*Agencia AI Adaptável — SKILL-REGISTRY v3.2*
