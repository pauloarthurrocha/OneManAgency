# ANALISE_COMPARATIVA.md — Insights dos Workflows Externos

> **Data:** 2026-04-24
> **Analisado por:** Sisyphus (Agencia AI Adaptável)
> **Fontes:** Workflow_buildsaas.md + Construtor de Landing Pages Cinematográficas + Antigravity Kit

---

## 🎯 Objetivo da Análise

Comparar nosso sistema atual (Agencia AI Adaptável v3.0) com workflows externos de alta qualidade para identificar:
- **Gaps** (o que falta)
- **Insights** (o que podemos aprender)
- **Oportunidades de integração** (onde e como aplicar)

---

## 📊 Matriz Comparativa

| Dimensão | Antigravity Kit | Workflow_buildsaas | Construtor LP Cinematográfica | **Nosso Sistema (v3.0)** | **Gap?** |
|---|---|---|---|---|---|
| **Agentes** | 20 especializados (orchestrator, frontend-specialist, etc.) | Não tem — é um workflow único | Não tem — é um prompt único | 6 skills core (neutras) | 🔴 **GRANDE** |
| **Workflows** | 11 slash commands (/brainstorm, /create, /orchestrate...) | 7 etapas sequenciais | 1 fluxo linear (4 perguntas → build) | 3 fases (init → onboarding → executor) | 🟡 **Médio** |
| **Validação** | Scripts Python automatizados (checklist.py, verify_all.py + 18 scripts de skill) | Não tem — manual | Não tem — manual | Quality Gate manual (agencia-verify-work) | 🔴 **GRANDE** |
| **Persistência** | Arquivos .md por agente | docs/discovery-notes.md (fonte de verdade) | Não tem — gera código direto | Context Engineering v2.1 (AGENTS.md, PROJECT.md, STATE.md...) | 🟢 **Bom** |
| **Perguntas Socráticas** | Socratic Gate Protocol (3 perguntas antes de implementar) | 16 perguntas em 4 blocos (uma por vez) | 4 perguntas iniciais | Entrevista adaptativa (client-onboarding) | 🟡 **Médio** |
| **Presets/Playbooks** | Templates por tipo de projeto (app-builder/templates/) | Stack padrão sugerida | 4 presets estéticos completos (paleta, tipografia, mood) | 9 playbooks (LP, SaaS, Python...) | 🟢 **Bom** |
| **Documentação Técnica** | Não gera — foca em execução | 3 PRDs (backend, frontend, implementation plan) | Não gera — foca em código | PIPELINE.md com fases e critérios | 🟡 **Médio** |
| **Componentização** | Skills com referências e scripts | Não aplica | 7 componentes fixos com comportamentos detalhados | Playbooks por fase | 🟡 **Médio** |
| **Orquestração** | Multi-agent paralelo (/orchestrate) | Sequencial | Sequencial | Sequencial (fase a fase) | 🔴 **GRANDE** |
| **Cross-IDE** | Cursor, Windsurf | Não especificado | Não especificado | Claude, OpenCode, Antigravity, Codex, Cursor | 🟢 **Bom** |

---

## 🔴 GAPS CRÍTICOS (Prioridade Alta)

### 1. **Sistema de Agentes Especializados**

**O que o Antigravity Kit tem:**
- 20 agentes com personas definidas (orchestrator, frontend-specialist, backend-specialist, database-architect, security-auditor, test-engineer...)
- Cada agente tem: nome, descrição, tools, model, skills, e um arquivo .md completo com regras de comportamento
- Sistema de "Agent Boundary Enforcement" — cada agente só pode tocar em arquivos do seu domínio
- File Type Ownership — test files pertencem ao test-engineer, components ao frontend-specialist

**O que nós temos:**
- 6 skills neutras (agencia-init, agencia-executor, client-onboarding...)
- Sem personas especializadas
- Sem boundary enforcement
- O executor carrega skills por fase, mas não tem "personalidade" de especialista

**O que falta:**
- [ ] Criar agentes especializados em `~/.agencia-ai/agents/` (ou `.agents/agents/` no projeto)
- [ ] Cada agente deve ter uma persona clara (frontend-dev, backend-dev, security-auditor...)
- [ ] Definir file type ownership (quem pode editar o quê)
- [ ] O executor deve ser capaz de invocar agentes especializados por fase

**Onde implementar:**
- **Fase:** Novo componente do sistema (pós-pipeline)
- **Skill:** `agencia-executor` v3.2+ — adicionar "modo orquestração"
- **Arquivo:** `.agents/agents/` no projeto (commitado)

---

### 2. **Scripts Python de Validação Automatizada**

**O que o Antigravity Kit tem:**
- `checklist.py` — validação rápida (30s): security scan, code quality, schema validation, test suite, UX audit, SEO check
- `verify_all.py` — validação completa (3-5min): Lighthouse, E2E Playwright, bundle analysis, mobile audit, i18n check
- 18 scripts de skill-level: api_validator.py, schema_validator.py, accessibility_checker.py, ux_audit.py, geo_checker.py, i18n_checker.py, lint_runner.py, type_coverage.py, mobile_audit.py, lighthouse_runner.py, bundle_analyzer.py, seo_checker.py, test_runner.py, security_scanner.py, e2e_runner.py

**O que nós temos:**
- `agencia-verify-work` — Quality Gate manual (lê outputs, verifica critérios)
- Sem automação de validação
- Sem scripts executáveis

**O que falta:**
- [ ] Criar `~/.agencia-ai/scripts/` com scripts Python de validação
- [ ] Integrar no `agencia-verify-work` para execução automática
- [ ] Adicionar ao pipeline como fase de "Validação Automática"

**Onde implementar:**
- **Fase:** Entre implementação e QA final
- **Skill:** `agencia-verify-work` v2.0
- **Arquivo:** `.agents/scripts/` no projeto

---

### 3. **Orquestração Multi-Agent (Paralela)**

**O que o Antigravity Kit tem:**
- `/orchestrate` — decompõe tarefa complexa em sub-tarefas
- Atribui cada sub-tarefa a um agente especialista
- Coordena execução paralela (simulada via context switching)
- Validação combinada no final
- Exemplo: "Build full-stack e-commerce" → frontend + backend + database + testing simultâneos

**O que nós temos:**
- `agencia-executor` executa fases **sequencialmente**
- Uma fase por vez
- Sem paralelismo

**O que falta:**
- [ ] Adicionar modo "orquestração" ao executor
- [ ] Quando uma fase toca múltiplos domínios (frontend + backend), invocar agentes em paralelo
- [ ] Sincronizar resultados antes de prosseguir

**Onde implementar:**
- **Fase:** Dentro do executor, quando detecta fase multi-domínio
- **Skill:** `agencia-executor` v3.2
- **Formato:** Nova metadata no PIPELINE.md: `Orchestration: true`

---

## 🟡 GAPS MÉDIOS (Prioridade Média)

### 4. **Perguntas Socráticas Mais Específicas por Tipo**

**O que o Workflow_buildsaas faz bem:**
- 16 perguntas em 4 blocos (Visão, Funcionalidades, Monetização, Técnico)
- Uma pergunta por vez
- Múltipla escolha sempre que possível
- Sugere melhor opção se usuário não souber

**O que nós temos:**
- Entrevista adaptativa (pergunta o necessário, sem contador fixo)
- Perguntas genéricas (projetadas para funcionar com qualquer tipo)

**O que podemos melhorar:**
- [ ] Adicionar "questionários" específicos por playbook no `client-onboarding`
- [ ] SaaS: perguntar sobre monetização, planos, auth, rate limiting
- [ ] LP: perguntar sobre CTA, propostas de valor, referências visuais
- [ ] Python: perguntar sobre frequência, volume, integrações

**Onde implementar:**
- **Fase:** `client-onboarding` Etapa 1 (Descoberta)
- **Skill:** `client-onboarding` v3.2
- **Arquivo:** Templates de perguntas por playbook

---

### 5. **Documentação Técnica como Output (PRDs)**

**O que o Workflow_buildsaas gera:**
- `docs/prd-backend.md` — schema, endpoints, auth, security
- `docs/prd-frontend.md` — páginas, componentes, design system
- `docs/implementation-plan.md` — tarefas de 5-15 min organizadas por batch

**O que nós geramos:**
- `BRIEFING.md` — contexto de negócio
- `PROJECT.md` — stack e guardrails
- `PIPELINE.md` — mapa de fases

**O que podemos adicionar:**
- [ ] Nova fase no pipeline: "Arquitetura Técnica" (antes da implementação)
- [ ] Gerar `docs/prd-backend.md` e `docs/prd-frontend.md` quando aplicável (SaaS, full-stack)
- [ ] Implementation plan por fase (já temos critérios de aceite, mas não tasks de 5-15 min)

**Onde implementar:**
- **Fase:** Entre "Design" e "Implementação" no pipeline SaaS/Full-stack
- **Skill:** Nova skill `tech-architect` ou integrar no `pipeline-generator`

---

### 6. **Presets Estéticos "Plug-and-Play"**

**O que o Construtor de LP Cinematográfica faz:**
- 4 presets completos: Tech Orgânico, Luxo Noturno, Sinal Brutalista, Clínica Vapor
- Cada preset define: paleta, tipografia, identidade, mood de imagem, padrão de hero
- Design system fixo com regras premium (textura, micro-interações, animações)

**O que nós temos:**
- `psychology-color-picker` — gera paleta baseada em psicologia
- `design-system-generator` — gera tokens
- `frontend-design` — princípios gerais

**O que podemos adicionar:**
- [ ] Criar presets estéticos prontos (similar ao Construtor)
- [ ] Integrar no `design-system-generator` ou criar nova skill `design-presets`
- [ ] Cada preset deve incluir: cores, fontes, mood, component behaviors, animações

**Onde implementar:**
- **Fase:** Fase de Design System (Playbook A/B)
- **Skill:** `design-system-generator` v2.0 ou `frontend-design` v3.0

---

### 7. **Componentes Fixos com Comportamentos Detalhados**

**O que o Construtor de LP Cinematográfica faz:**
- Define 7 componentes obrigatórios: Navbar, Hero, Features, Filosofia, Protocolo, Planos, Footer
- Cada componente tem comportamento específico e animações detalhadas:
  - Navbar: transformação de transparente para blur ao scroll
  - Hero: GSAP staggered fade-up
  - Features: 3 cards interativos (embaralhador, máquina de escrever, agendador)
  - Protocolo: cards empilháveis com pin no scroll

**O que nós temos:**
- Playbooks definem fases, mas não componentes específicos
- O executor carrega skills de design/frontend, mas não impõe estrutura

**O que podemos adicionar:**
- [ ] Criar "templates de componentes" por tipo de projeto
- [ ] LP: 7 componentes padrão (baseado no Construtor)
- [ ] SaaS: dashboard components (sidebar, widgets, tables)
- [ ] Cada template deve ter: estrutura, estilos, animações, interações

**Onde implementar:**
- **Fase:** Fase de UI Spec / Implementação
- **Skill:** `landing-page-scaffold` (já existe, mas pode ser enriquecido)

---

## 🟢 ONDE ESTAMOS NA FRENTE

### 8. **Cross-IDE Continuity**
- Antigravity Kit: Cursor, Windsurf
- Nós: Claude, OpenCode, Antigravity, Codex, Cursor
- **Vantagem nossa:** Mais IDEs suportados, estrutura .agents/skills/ commitada

### 9. **Context Engineering v2.1**
- Antigravity Kit: Arquivos por agente/skill
- Workflow_buildsaas: docs/discovery-notes.md
- Nós: Hierarquia completa (AGENTS.md > PROJECT.md > STATE.md > discovery-notes.md > skills)
- **Vantagem nossa:** Sistema mais maduro de memória distribuída

### 10. **Shift-Left Deploy**
- Workflow_buildsaas: Configura deploy nas primeiras fases
- Nós: **Primeira fase técnica SEMPRE configura deploy** (wrangler.toml, vercel.json...)
- **Vantagem nossa:** Já implementado desde v2.3

### 11. **Sistema de Playbooks**
- Workflow_buildsaas: 1 workflow (SaaS)
- Construtor LP: 1 fluxo (LP)
- Nós: **9 playbooks** (LP estática, LP Next.js, SaaS, Python, Low-ticket, Script, Mobile, Chatbot, Híbrido)
- **Vantagem nossa:** Mais abrangente e flexível

---

## 📋 RECOMENDAÇÕES DE IMPLEMENTAÇÃO

### Fase 1: Agentes Especializados (v3.2)
**Quando:** Próxima versão
**O quê:**
1. Criar diretório `.agents/agents/` no repo da agência
2. Criar 10 agentes base (copiar/adaptar do Antigravity Kit):
   - `frontend-specialist.md` — UI/UX, React, Tailwind
   - `backend-specialist.md` — APIs, Node.js, Python
   - `database-architect.md` — Schema, migrations, RLS
   - `security-auditor.md` — Auth, vulnerabilities, OWASP
   - `test-engineer.md` — Tests, coverage, TDD
   - `devops-engineer.md` — Deploy, CI/CD, infra
   - `seo-specialist.md` — SEO, meta tags, analytics
   - `copywriter-specialist.md` — Copy, headlines, CTAs
   - `design-specialist.md` — Design system, UX, visual
   - `orchestrator.md` — Coordenação multi-agent
3. Atualizar `agencia-executor` para invocar agentes por fase
4. Adicionar metadata `Agent:` no PIPELINE.md

**Benefício:** Código mais especializado, menos alucinações, melhor qualidade

---

### Fase 2: Scripts de Validação (v3.2)
**Quando:** Próxima versão
**O quê:**
1. Criar `~/.agencia-ai/scripts/` com:
   - `checklist.py` — validação rápida (lint, types, security básico)
   - `verify_all.py` — validação completa (Lighthouse, E2E, bundle)
   - Scripts por skill: `seo_checker.py`, `security_scan.py`, `test_runner.py`
2. Integrar no `agencia-verify-work`
3. Adicionar fase "Validação Automática" no pipeline

**Benefício:** Quality Gate automatizado, menos bugs em produção

---

### Fase 3: Orquestração Paralela (v3.3)
**Quando:** Futuro
**O quê:**
1. Adicionar metadata `Parallel: true` no PIPELINE.md
2. Quando detectado, executor invoca múltiplos agentes simultaneamente
3. Sincroniza resultados antes de prosseguir

**Benefício:** Velocidade em projetos full-stack

---

### Fase 4: PRDs Técnicos (v3.2)
**Quando:** Próxima versão
**O quê:**
1. Adicionar fase "Arquitetura Técnica" nos playbooks SaaS/Full-stack
2. Gerar `docs/prd-backend.md` e `docs/prd-frontend.md`
3. Usar como input para fases de implementação

**Benefício:** Implementação mais precisa, menos retrabalho

---

### Fase 5: Presets Estéticos (v3.3)
**Quando:** Futuro
**O quê:**
1. Criar 4-8 presets estéticos baseados no Construtor LP
2. Cada preset: paleta, tipografia, mood, animações, component behaviors
3. Integrar no `design-system-generator`

**Benefício:** Design mais rápido e consistente

---

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

1. **Instalar agentes do Antigravity Kit** no `~/.agencia-ai/antigravity-kit/` ✅ (JÁ FEITO)
2. **Criar skill `agencia-orchestrator`** baseada no orchestrator.md do Antigravity
3. **Atualizar `agencia-executor`** para suportar invocação de agentes
4. **Criar scripts Python** de validação (começar com checklist.py)
5. **Atualizar playbooks SaaS** para gerar PRDs técnicos
6. **Criar presets estéticos** para LP (começar com 2-3)

---

*Análise completa. Prioridade: Agentes > Scripts > PRDs > Presets > Orquestração*
