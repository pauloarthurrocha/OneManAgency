# Playbooks de Pipeline (A-J)

Estes são os templates de pipeline para diferentes tipos de projeto.

## Playbook A — Landing Page Estática (HTML/CSS puro, CF Pages / GitHub Pages)

```markdown
- [ ] Fase 1: Setup de hosting e domínio
      Agent: devops-engineer
      Skills: deployment-procedures
      Output: wrangler.toml (CF) ou .github/workflows/pages.yml (GH), DNS configurado
      Shift-Left: sim
      Validation: quick
      Critérios de aceite:
        - Deploy dummy (index.html "hello") funcionando na URL final
        - HTTPS ativo
        - DNS propagado

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
      Output: .planning/DESIGN_SYSTEM.md + landing/tokens.css
      Shift-Left: não
      Âncora: .planning/DESIGN.md (template awesome-design-md escolhido na Etapa 2.5)
      Validation: none
      Critérios de aceite:
        - Paleta coerente com psicologia do público-alvo
        - Tipografia par definida (display + body)
        - Tokens exportados em CSS custom properties

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

- [ ] Fase 6: Implementação HTML/CSS/JS responsiva
      Agent: frontend-specialist
      Skills: frontend-design, tailwind-patterns, web-design-guidelines
      Output: landing/index.html, landing/style.css, landing/app.js
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Lighthouse Mobile ≥ 85 em Performance
        - 0 erros console
        - Responsivo 320px-1920px sem quebra

- [ ] Fase 7: SEO + analytics + schema
      Agent: seo-specialist
      Skills: seo-audit, schema-markup, ai-seo, analytics-tracking
      Output: meta tags, JSON-LD, Open Graph, Pixel/GA4 instalados
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

## Playbook F — Script de Dados / ETL / Automação Python (Produção)

> Para projetos que vão além de um script local — pipelines que precisam rodar em produção,
> com scheduling, monitoramento e tratamento de falhas.
> Para scripts simples que rodam localmente, use Playbook D.

```markdown
- [ ] Fase 1: Setup ambiente + estrutura de projeto
      Agent: devops-engineer
      Skills: python-patterns, deployment-procedures
      Output: pyproject.toml (ou requirements.txt), .env.example, src/ (extractors/, transformers/, loaders/), tests/, main.py
      Shift-Left: sim
      Validation: quick
      Critérios de aceite:
        - Ambiente virtual configurado (venv/uv/poetry)
        - `python main.py` executa sem erros
        - Estrutura de pastas src/ com módulos separados
        - .env.example documenta todas as variáveis necessárias

- [ ] Fase 2: Conectores de fontes de dados
      Agent: backend-specialist
      Skills: python-patterns, api-patterns
      Output: src/extractors/ com módulos para cada fonte (API, DB, arquivo, web)
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Cada conector recebe input mock e retorna output esperado
        - Retries implementados para chamadas externas (httpx com backoff)
        - Rate limiting respeitado (se API externa)
        - Conexão com banco de dados funcional (SQLAlchemy/psycopg2)

- [ ] Fase 3: Lógica Extract + Transform
      Agent: backend-specialist
      Skills: python-patterns
      Output: src/transformers/ com funções puras de transformação
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Funções puras (input → output, sem efeitos colaterais)
        - Validação de dados (pandera/pydantic schemas)
        - TDD: testes escritos antes da implementação
        - Dead letter queue para registros que falham validação

- [ ] Fase 4: Load + Destino
      Agent: backend-specialist
      Skills: database-design, python-patterns
      Output: src/loaders/ com módulos para cada destino (DB, CSV, S3, cloud storage)
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Batch inserts / upserts funcionando
        - Export em múltiplos formatos (CSV, JSON, Parquet)
        - Transações atômicas (rollback em caso de erro)

- [ ] Fase 5: Scheduling + Orchestration
      Agent: devops-engineer
      Skills: deployment-procedures, server-management
      Output: configuração de scheduler (cron, APScheduler, ou Airflow DAG)
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Pipeline roda em schedule definido
        - Logs de execução persistidos
        - Tratamento de falhas com retry automático

- [ ] Fase 6: Monitoramento + Alertas
      Agent: backend-specialist
      Skills: python-patterns
      Output: módulo de monitoramento com checagens de qualidade e notificações
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Data quality checks (contagem de linhas, nulos, duplicatas)
        - Notificações de falha (email/Slack/WhatsApp)
        - Histórico de execuções registrado

- [ ] Fase 7: Testes + Documentação + Deploy
      Agent: test-engineer
      Skills: testing-patterns, oma-verify-work
      Output: testes pytest, README com instruções de uso, deploy documentado
      Shift-Left: não
      Validation: full
      Critérios de aceite:
        - Cobertura de testes razoável para funções críticas
        - README documenta: setup, configuração, como rodar, como monitorar
        - Deploy testado em ambiente de staging/produção
```

## Playbook G — Mobile App (React Native / Expo)

> Baseado nos templates obytes/react-native-template-obytes e roninoss/create-expo-stack.
> Para Flutter, adaptar as fases trocando Expo por Flutter CLI e NativeWind por ThemeData.

```markdown
- [ ] Fase 1: Scaffold + CI/CD
      Agent: devops-engineer
      Skills: deployment-procedures, nodejs-best-practices
      Output: projeto Expo criado, EAS Build configurado, GitHub Actions para build + test
      Shift-Left: sim
      Validation: quick
      Critérios de aceite:
        - App roda no simulador (iOS e Android)
        - EAS Build configurado (eas.json)
        - GitHub Actions com build + lint + test verde
        - TypeScript habilitado strict mode

- [ ] Fase 2: Navigation + Auth
      Agent: backend-specialist
      Skills: nodejs-best-practices
      Output: expo-router configurado, fluxo de login/signup/logout, secure token storage
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Tab navigation funcional (expo-router)
        - Fluxo de login/signup/logout com Supabase Auth ou Firebase Auth
        - Secure token storage (expo-secure-store)
        - Auth guard em rotas protegidas

- [ ] Fase 3: Design System Mobile
      Agent: design-specialist
      Skills: frontend-design
      Output: tokens de design, componentes base (Button, Input, Card, Layout)
      Shift-Left: não
      Âncora: .planning/DESIGN.md (template awesome-design-md escolhido no onboarding)
      Validation: none
      Critérios de aceite:
        - Tokens de cores, tipografia e espaçamento definidos
        - Componentes base criados com NativeWind ou Tamagui
        - Dark mode / light mode suportado
        - Touch targets mínimo 44x44pt (iOS) / 48x48dp (Android)

- [ ] Fase 4: Core Features com TDD
      Agent: backend-specialist
      Skills: nodejs-best-practices
      Output: 2-3 features core com testes unitários e de integração
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - TDD: testes escritos antes da implementação
        - State management configurado (Zustand/Jotai ou Riverpod/BLoC)
        - API integration com React Query (ou dio para Flutter)
        - Loading states e error states implementados em cada feature

- [ ] Fase 5: Push Notifications + Deep Linking
      Agent: backend-specialist
      Skills: nodejs-best-practices, api-integration
      Output: expo-notifications configurado, deep link handling
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Push notifications recebidas no device
        - Deep links resolvem para a tela correta
        - Background notification handling

- [ ] Fase 6: QA + Performance + Deploy Stores
      Agent: test-engineer
      Skills: testing-patterns, oma-verify-work
      Output: app otimizado, screenshots, listing preparado, build de produção
      Shift-Left: não
      Validation: full
      Critérios de aceite:
        - Performance: 60fps scroll, <100ms tap response
        - App icons e splash screen configurados
        - Screenshots para App Store e Play Store
        - EAS Submit executado (build de produção gerado)
        - Store listing copy preparada (ASO)
```

## Playbook H — Chatbot WhatsApp (whatsapp-web.js / Baileys)

> Baseado em whatsapp-web.js (15k stars) e WhiskeySockets/Baileys (4k stars).
> Para Meta Cloud API oficial (pago), substituir Fase 1 pela configuração da API.
> Para Evolution API / Waha (self-hosted), adaptar Fase 1 para setup do container Docker.

```markdown
- [ ] Fase 1: Setup + Escolha de lib + Auth
      Agent: devops-engineer
      Skills: nodejs-best-practices, deployment-procedures
      Output: projeto Node.js com whatsapp-web.js ou Baileys, QR code auth funcionando, session persistence
      Shift-Left: sim
      Validation: quick
      Critérios de aceite:
        - Bot recebe e responde "hello world" via WhatsApp
        - QR code scan autentica com sucesso
        - Session persistence configurada (LocalAuth ou Redis)
        - .env.example documenta todas as variáveis

- [ ] Fase 2: Message Handler + Command Router
      Agent: chatbot-specialist
      Skills: nodejs-best-practices
      Output: handler de mensagens com parsing de comandos, menu numérico, suporte a mídia
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Bot responde a 5+ comandos diferentes
        - Menu numérico funcional (1, 2, 3...)
        - Suporte a mensagens de texto, imagem, documento
        - Regex ou prefix matching para comandos

- [ ] Fase 3: AI Integration (opcional)
      Agent: chatbot-specialist
      Skills: nodejs-best-practices, api-patterns
      Output: integração com OpenAI/Gemini, memória de conversa por usuário, system prompt customizável
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Bot responde contextualmente (lembra mensagens anteriores)
        - System prompt configurável por arquivo ou banco
        - Tratamento de erros de API (rate limit, timeout, fallback)
        - Memória por usuário persistida (Redis/SQLite)

- [ ] Fase 4: Persistência + Session Management
      Agent: chatbot-specialist
      Skills: nodejs-best-practices
      Output: session store (Redis/SQLite), multi-session support, reconnect logic
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Bot sobrevive a restart sem perder sessão
        - Multi-session suportado (vários números/instâncias)
        - Reconnect automático em caso de desconexão
        - Logs de mensagens recebidas/enviadas persistidos

- [ ] Fase 5: Deploy + Monitoramento
      Agent: devops-engineer
      Skills: deployment-procedures, server-management
      Output: Docker container, VPS configurado, health checks, logging
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Container Docker rodando na VPS (OCI/Contabo/Railway)
        - PM2 ou systemd gerenciando o processo
        - Health check endpoint respondendo
        - Logs rotativos configurados
        - Alertas de desconexão ou falha

- [ ] Fase 6: Testes + Documentação + Hardening
      Agent: test-engineer
      Skills: testing-patterns, oma-verify-work
      Output: testes de fluxo, README operacional, documentação de comandos
      Shift-Left: não
      Validation: full
      Critérios de aceite:
        - Teste de fluxo completo: mensagem → handler → resposta
        - README documenta: setup, comandos disponíveis, como monitorar
        - Rate limiting implementado para evitar ban
        - Tratamento de mensagens duplicadas
```

## Playbook I — Híbrido / Monorepo (Web + Mobile + API)

> Para projetos que combinam web app, mobile app e API compartilhada em monorepo.
> Baseado em Turborepo com apps/web (Next.js), apps/mobile (Expo), apps/api (NestJS/Express).
> Para projetos menores, usar Playbook C (SaaS) ou G (Mobile) separadamente.

```markdown
- [ ] Fase 1: Monorepo scaffold + CI/CD
      Agent: devops-engineer
      Skills: deployment-procedures, nodejs-best-practices
      Output: Turborepo configurado, apps/web, apps/mobile, apps/api, packages/shared, GitHub Actions
      Shift-Left: sim
      Validation: quick
      Critérios de aceite:
        - `turbo dev` roda todos os apps simultaneamente
        - packages/shared com tipos e utilitários compartilhados
        - GitHub Actions com lint + test para cada app
        - TypeScript strict mode em todos os pacotes

- [ ] Fase 2: Shared packages + Type safety
      Agent: backend-specialist
      Skills: nodejs-best-practices
      Output: Zod schemas compartilhados, tRPC ou REST types, UI components web+mobile
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Zod schemas em packages/shared validam dados em web e mobile
        - Tipos de API compartilhados entre web, mobile e api
        - Componentes UI com variantes web (Tailwind) e mobile (NativeWind)

- [ ] Fase 3: Backend API + Database + Auth
      Agent: backend-specialist
      Skills: nodejs-best-practices, database-design
      Output: API routes/tRPC router, schema do banco, auth compartilhada
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - API funcional com endpoints documentados
        - Auth compartilhada (web + mobile usam o mesmo provider)
        - Schema do banco migrado e seed data funcionando

- [ ] Fase 4: Web app core features
      Agent: frontend-specialist
      Skills: nextjs-react-expert, tailwind-patterns
      Output: Next.js pages, componentes, integração com API
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - 2-3 features core funcionando no web app
        - Responsivo 320px-1920px
        - Loading states e error states implementados

- [ ] Fase 5: Mobile app core features
      Agent: frontend-specialist
      Skills: nodejs-best-practices
      Output: Expo screens, navigation, mesma integração com API
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Mesmas 2-3 features core funcionando no mobile
        - Tab navigation funcional
        - Touch targets adequados (44x44pt iOS / 48x48dp Android)

- [ ] Fase 6: Design System + Tokens compartilhados
      Agent: design-specialist
      Skills: frontend-design
      Output: tokens de design compartilhados, componentes base em packages/ui
      Shift-Left: não
      Âncora: .planning/DESIGN.md (template awesome-design-md escolhido no onboarding)
      Validation: none
      Critérios de aceite:
        - Tokens de cores, tipografia e espaçamento definidos uma vez
        - Componentes UI funcionam em web (Tailwind) e mobile (NativeWind)
        - Dark mode suportado em ambas as plataformas

- [ ] Fase 7: QA + Deploy matrix
      Agent: test-engineer
      Skills: testing-patterns, oma-verify-work
      Output: testes E2E, deploy web (Vercel), mobile (EAS), API (Railway/Fly)
      Shift-Left: não
      Validation: full
      Critérios de aceite:
        - Testes E2E passando no web e mobile
        - Deploy automático: web no Vercel, API no Railway/Fly
        - EAS Build gerando builds de produção
        - Nenhuma vulnerabilidade crítica (npm audit)
```

## Playbook J — Laravel Enterprise (Laravel 13 + Filament 5 + Docker)

> Para projetos monorepo robustos que utilizam o ecossistema PHP moderno.
> Baseado em Docker Compose com PHP 8.4+, PostgreSQL 16+ e interface administrativa via Filament 5.
> Para projetos menores, usar Playbook C (SaaS) ou G (Mobile) separadamente.

```markdown
- [ ] Fase 1: Docker Infrastructure + Laravel 13 Scaffold
      Agent: devops-engineer
      Skills: deployment-procedures, server-management
      Output: docker-compose.yml, Dockerfile, .env.example, artisan-wrapper.sh
      Shift-Left: sim
      Validation: quick
      Critérios de aceite:
        - `docker-compose up` sobe App (PHP 8.4+), Postgres 16+, Redis e Mailpit
        - Laravel 13 instalado e respondendo localmente
        - Script wrapper para comandos artisan funcional via container
        - .env.example documenta todas as variáveis necessárias

- [ ] Fase 2: Database Modeling (Postgres Optimized)
      Agent: database-architect
      Skills: database-design, tdd-workflow
      Output: Migrations, Models (Strict Typed), Eloquent Factories
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Migrations com tipos Postgres nativos (UUID, JSONB, Timestamptz)
        - Models usando PHP 8.4 Property Promotion e Type Hinting rigoroso
        - Relacionamentos Eloquent definidos e documentados
        - Conexão com banco de dados funcional e migrada

- [ ] Fase 3: Filament 5 Admin Scaffold
      Agent: backend-specialist
      Skills: clean-code, deployment-procedures
      Output: Filament Panel Provider, Admin Themes, Custom Login
      Shift-Left: não
      Âncora: .planning/DESIGN.md (template escolhido no onboarding)
      Validation: none
      Critérios de aceite:
        - Painel administrativo acessível com Vite configurado
        - Navegação lateral estruturada por grupos de domínio
        - Identidade visual e tokens de cores aplicados ao tema

- [ ] Fase 4: Core Domain Logic (Services & Actions)
      Agent: backend-specialist
      Skills: clean-code, tdd-workflow
      Output: app/Services/, app/Actions/, app/Contracts/, Pest Tests
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - Lógica de negócio isolada em Service Classes ou Actions
        - TDD: Testes de unidade e integração escritos antes da implementação
        - Validação de entrada de dados (FormRequests/DTOs) implementada
        - Fluxo de autenticação e proteção de rotas funcional

- [ ] Fase 5: Filament Resource Implementation
      Agent: backend-specialist
      Skills: clean-code, tdd-workflow
      Output: Filament Resources (Forms, Tables, Pages, Widgets)
      Shift-Left: não
      Validation: quick
      Critérios de aceite:
        - CRUD completo funcional com componentes nativos do Filament
        - Tables com filtros, busca e Bulk Actions configurados
        - Loading states e feedback visual de sucesso/erro
        - Responsividade garantida para uso em dispositivos mobile

- [ ] Fase 6: Security & Policy Hardening
      Agent: backend-specialist
      Skills: testing-patterns, oma-verify-work
      Output: Laravel Policies, Gates, Spatie Permissions config
      Shift-Left: não
      Validation: full
      Critérios de aceite:
        - Permissões de acesso validadas para cada Resource (ACL)
        - Nenhuma vulnerabilidade crítica detectada em auditoria simples
        - Rate limiting e proteção contra CSRF implementados

- [ ] Fase 7: QA Final + Deploy Pipeline
      Agent: devops-engineer
      Skills: deployment-procedures, performance-profiling
      Output: GitHub Actions (CI/CD), relatório de performance
      Shift-Left: não
      Validation: full
      Critérios de aceite:
        - Pipeline de CI/CD verde com lint + testes automatizados
        - Performance: Consultas SQL otimizadas (sem N+1 queries)
        - Deploy automatizado em ambiente de staging/produção
        - README documenta setup, comandos e monitoramento
```
