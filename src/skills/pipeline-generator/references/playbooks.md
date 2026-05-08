# Playbooks de Pipeline (A-E)

Estes são os templates de pipeline para diferentes tipos de projeto.

## Playbook A — Landing Page Estática (HTML/CSS puro, CF Pages / GitHub Pages)

```markdown
- [ ] Fase 1: Setup de hosting e domínio
      Skills: deployment-procedures
      Output: wrangler.toml (CF) ou .github/workflows/pages.yml (GH), DNS configurado
      Shift-Left: sim
      Critérios de aceite:
        - Deploy dummy (index.html "hello") funcionando na URL final
        - HTTPS ativo
        - DNS propagado

- [ ] Fase 2: Research rápido (concorrentes, tom de voz, referências visuais)
      Skills: niche-research, competitor-intel
      Output: .planning/RESEARCH.md
      Shift-Left: não
      Critérios de aceite:
        - 3+ concorrentes analisados
        - Tom de voz identificado
        - 5+ referências visuais coletadas

- [ ] Fase 3: Copy deck completo (headlines, seções, CTAs)
      Skills: copywriting, marketing-psychology, page-cro
      Output: .planning/COPY_DECK.md
      Shift-Left: não
      Critérios de aceite:
        - Hero com headline + subheadline + CTA principal
        - Mínimo 5 seções (problema, solução, benefícios, prova, CTA)
        - Objeções tratadas em FAQ ou seção dedicada

- [ ] Fase 4: Design system (baseado em .planning/DESIGN.md + adaptações)
      Skills: psychology-color-picker, frontend-design
      Output: .planning/DESIGN_SYSTEM.md + landing/tokens.css
      Shift-Left: não
      Âncora: .planning/DESIGN.md (template awesome-design-md escolhido na Etapa 2.5)
      Critérios de aceite:
        - Paleta coerente com psicologia do público-alvo
        - Tipografia par definida (display + body)
        - Tokens exportados em CSS custom properties

- [ ] Fase 5: UI spec (estrutura e wireframe em ASCII/markdown)
      Skills: gsd-ui-phase, web-design-guidelines
      Output: .planning/UI-SPEC.md
      Shift-Left: não
      Critérios de aceite:
        - Ordem das seções definida
        - Hierarquia visual clara
        - Considerações mobile explicitadas

- [ ] Fase 6: Implementação HTML/CSS/JS responsiva
      Skills: frontend-design, tailwind-patterns, web-design-guidelines
      Output: landing/index.html, landing/style.css, landing/app.js
      Shift-Left: não
      Critérios de aceite:
        - Lighthouse Mobile ≥ 85 em Performance
        - 0 erros console
        - Responsivo 320px-1920px sem quebra

- [ ] Fase 7: SEO + analytics + schema
      Skills: seo-audit, schema-markup, ai-seo, analytics-tracking
      Output: meta tags, JSON-LD, Open Graph, Pixel/GA4 instalados
      Shift-Left: não
      Critérios de aceite:
        - title/description < 60/160 chars
        - JSON-LD validado em validator.schema.org
        - Pixel/GA4 disparando em sandbox

- [ ] Fase 8: QA final + deploy
      Skills: gsd-ui-review, oma-verify-work
      Output: docs/entrega/checklist.md
      Shift-Left: não
      Critérios de aceite:
        - Checklist de QA preenchido (20+ itens)
        - Deploy em produção funcional
        - Monitoramento de erros ativo (Sentry ou equivalente opcional)
```

## Playbook B — Landing Page React/Next.js (Vercel)

```markdown
- [ ] Fase 1: Scaffold Next.js + Vercel config
      Agent: devops-engineer
      Skills: landing-page-scaffold, deployment-procedures
      Output: package.json, next.config.js, vercel.json, .nvmrc
      Shift-Left: sim
      Validation: quick
      Critérios de aceite:
        - npm run build passa
        - Deploy preview Vercel funcionando
        - Node version travada no .nvmrc e package.json

- [ ] Fase 2: Research rápido (concorrentes, tom de voz, referências visuais)
      Agent: copywriter-specialist
      Skills: niche-research, competitor-intel
      Output: .planning/RESEARCH.md
      Shift-Left: não
      Validation: none
      Critérios de aceite:
        - 3+ concorrentes analisados
        - Tom de voz identificado
        - 5+ referências visuais coletadas

- [ ] Fase 3: Copy deck completo (headlines, seções, CTAs)
      Agent: copywriter-specialist
      Skills: copywriting, marketing-psychology, page-cro
      Output: .planning/COPY_DECK.md
      Shift-Left: não
      Validation: none
      Critérios de aceite:
        - Hero com headline + subheadline + CTA principal
        - Mínimo 5 seções (problema, solução, benefícios, prova, CTA)
        - Objeções tratadas em FAQ ou seção dedicada

- [ ] Fase 4: Design system (baseado em .planning/DESIGN.md + adaptações)
      Agent: design-specialist
      Skills: psychology-color-picker, frontend-design
      Output: .planning/DESIGN_SYSTEM.md + app/tokens.css ou tailwind.config.js
      Shift-Left: não
      Âncora: .planning/DESIGN.md (template awesome-design-md escolhido na Etapa 2.5)
      Validation: none
      Critérios de aceite:
        - Paleta coerente com psicologia do público-alvo
        - Tipografia par definida (display + body)
        - Tokens exportados em CSS custom properties ou Tailwind theme extend

- [ ] Fase 5: UI spec (estrutura e wireframe em ASCII/markdown)
      Agent: design-specialist
      Skills: gsd-ui-phase, web-design-guidelines
      Output: .planning/UI-SPEC.md
      Shift-Left: não
      Validation: none
      Critérios de aceite:
        - Ordem das seções definida
        - Hierarquia visual clara
        - Considerações mobile explicitadas

- [ ] Fase 6: Implementação Next.js responsiva
      Agent: frontend-specialist
      Skills: nextjs-react-expert, tailwind-patterns, web-design-guidelines
      Output: app/page.tsx, app/layout.tsx, componentes em app/sections/
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Lighthouse Mobile ≥ 85 em Performance
        - 0 erros console
        - Responsivo 320px-1920px sem quebra
        - Componentes reutilizáveis (Button, Section, Hero, etc.)

- [ ] Fase 7: SEO + analytics + schema
      Agent: seo-specialist
      Skills: seo-audit, schema-markup, ai-seo, analytics-tracking
      Output: metadata em layout.tsx, JSON-LD component, Open Graph, Pixel/GA4
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - title/description < 60/160 chars
        - JSON-LD validado em validator.schema.org
        - Pixel/GA4 disparando em sandbox

- [ ] Fase 8: QA final + deploy
      Agent: test-engineer
      Skills: gsd-ui-review, oma-verify-work
      Output: docs/entrega/checklist.md
      Shift-Left: não
      Validation: full
      Critérios de aceite:
        - Checklist de QA preenchido (20+ itens)
        - Deploy em produção funcional
        - Monitoramento de erros ativo (Sentry ou equivalente opcional)
```

## Playbook C — SaaS Completo (Monorepo, Next.js, Supabase/Firebase, Stripe)

```markdown
- [ ] Fase 1: Setup de infra + banco + CI/CD
      Agent: devops-engineer
      Skills: saas-scaffold, deployment-procedures, database-design
      Output: infra as code, package.json, GitHub actions, schema do banco inicial
      Shift-Left: sim
      Validation: quick
      Critérios de aceite:
        - Repositório rodando localmente (npm run dev)
        - Conexão com banco de dados de dev/staging estabelecida
        - Deploy automático no Vercel/similar configurado e verde

- [ ] Fase 2: Design system + UI spec
      Agent: design-specialist
      Skills: frontend-design, ui-ux-pro-max
      Output: .planning/DESIGN_SYSTEM.md, .planning/UI-SPEC.md, theme.ts
      Shift-Left: não
      Âncora: .planning/DESIGN.md (template awesome-design-md escolhido na Etapa 2.5)
      Validation: none
      Critérios de aceite:
        - UI components base criados (Button, Input, Modal, Layout)
        - Tokens de design implementados

- [ ] Fase 3: Autenticação + Auth Guards
      Agent: backend-specialist
      Skills: auth-patterns, nextjs-react-expert
      Output: rotas de login/signup, auth middleware, contextos
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Fluxo de login/signup/logout funcional
        - Proteção de rotas privadas (redireciona para /login)
        - Tratamento de erros de auth (credenciais inválidas)

- [ ] Fase 4: Core Feature 1 (Backend + DB)
      Agent: backend-specialist
      Skills: database-design, tdd-workflow, clean-code
      Output: API routes, Server Actions, controllers, models, testes
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - TDD: testes unitários/integração escritos e passando
        - Validação de payload (Zod/Joi)
        - Operações CRUD no banco de dados funcionando

- [ ] Fase 5: Core Feature 1 (Frontend + Integração)
      Agent: frontend-specialist
      Skills: nextjs-react-expert, tailwind-patterns
      Output: telas e componentes da feature 1, integração com API
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Tela exibe dados reais (ou mock enquanto não integra)
        - Formulários enviam dados corretamente com feedback visual
        - Loading states e error states implementados

- [ ] Fase 6: Pagamentos (Stripe/Kiwify)
      Agent: backend-specialist
      Skills: stripe-integration, billing-patterns
      Output: checkout session, webhooks de pagamento, lógica de plano (free/pro)
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Checkout session criada com sucesso
        - Webhook recebe evento de pagamento e atualiza status do usuário
        - Usuário pro tem acesso a features premium

- [ ] Fase 7: QA + E2E + Refinamentos
      Agent: test-engineer
      Skills: webapp-testing, performance-profiling, oma-verify-work
      Output: testes E2E (Playwright/Cypress), relatórios de performance
      Shift-Left: não
      Validation: full
      Critérios de aceite:
        - Testes E2E core passando
        - Nenhuma vulnerabilidade crítica (npm audit / OWASP checks)
        - Performance aceitável (Lighthouse > 80)
```

## Playbook D — Automação / Script Python (Web Scraping, Dados, IA)

```markdown
- [ ] Fase 1: Setup ambiente + dependências + estrutura
      Agent: devops-engineer
      Skills: python-patterns, environment-setup
      Output: requirements.txt/Pipfile, .env.example, src/, main.py
      Shift-Left: sim
      Validation: quick
      Critérios de aceite:
        - Ambiente virtual (venv/pipenv) configurado
        - Dependências core instaladas (requests, bs4, openai, etc.)
        - `python main.py` executa (mesmo que vazio) sem erros

- [ ] Fase 2: Configuração de logs + tratamento de erros global
      Agent: backend-specialist
      Skills: clean-code, error-handling
      Output: logger configurado, blocos try-except padrão
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Logs salvos em arquivo rotativo e console
        - Exceções globais capturadas graciosamente

- [ ] Fase 3: Lógica Core 1 (Extração/Processamento)
      Agent: backend-specialist
      Skills: python-patterns, data-processing
      Output: modulos/classes de extração, funções puras
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Funções recebem input mock e retornam output esperado
        - Limites de taxa/rate-limit respeitados (se API externa)

- [ ] Fase 4: Lógica Core 2 (Integração IA / Persistência)
      Agent: backend-specialist
      Skills: api-integration, database-design
      Output: módulo de chamadas LLM ou salvamento em DB/CSV
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Dados processados são salvos corretamente
        - Retries implementados para chamadas externas

- [ ] Fase 5: Refatoração, CLI arguments, testes
      Agent: backend-specialist
      Skills: clean-code, tdd-workflow
      Output: argparse configurado, testes pytest
      Shift-Left: não
      Validation: full
      Critérios de aceite:
        - Passagem de argumentos por linha de comando funciona
        - Cobertura de testes razoável para funções complexas
        - Docstrings atualizadas
```

## Playbook E — Low-ticket App / Híbrido (HTML/JS + Checkout Externo + Webhook)

```markdown
- [ ] Fase 1: Setup + Deploy Vercel/Netlify
      Agent: devops-engineer
      Skills: deployment-procedures
      Output: repo configurado, deploy automatizado
      Shift-Left: sim
      Validation: quick
      Critérios de aceite:
        - Deploy preview rodando

- [ ] Fase 2: Copy + Design + UI
      Agent: design-specialist
      Skills: copywriting, page-cro, frontend-design
      Output: landing page desenhada, copy finalizada, CSS
      Shift-Left: não
      Âncora: .planning/DESIGN.md (template awesome-design-md escolhido na Etapa 2.5)
      Validation: quick
      Critérios de aceite:
        - Design limpo e focado em conversão
        - Responsivo
        - Botão de "Comprar" linkado para checkout externo (ex: Kiwify/Hotmart)

- [ ] Fase 3: Serverless function (Webhook receiver)
      Agent: backend-specialist
      Skills: serverless-patterns, webhook-handling
      Output: api/webhook.js
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Endpoint recebe requisição POST
        - Assinatura do webhook validada
        - Dados salvos em banco leve (Supabase, Firebase, ou KV)

- [ ] Fase 4: Lógica de Entrega (App Core)
      Agent: frontend-specialist
      Skills: app-logic, frontend-design
      Output: tela protegida/entrega de valor do app
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Verifica se usuário tem acesso (token/email validado)
        - Executa a função principal do app

- [ ] Fase 5: QA final
      Agent: test-engineer
      Skills: oma-verify-work
      Output: revisão de fluxos
      Shift-Left: não
      Validation: full
      Critérios de aceite:
        - Teste completo de compra fictícia -> webhook -> acesso liberado
```