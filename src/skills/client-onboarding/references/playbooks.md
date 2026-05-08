# Referência de Playbooks (A-E) para Onboarding

Estes playbooks servem como referência de geração para o `PIPELINE.md` inicial durante a fase de onboarding.

### Playbook A — Landing Page Estática (HTML/CSS)
```
- [ ] Fase 1: Setup hosting (CF Pages, GitHub Pages)
      Shift-Left: sim
- [ ] Fase 2: Research e benchmark (concorrentes)
- [ ] Fase 3: Copywriting completo (headlines, pain, solution)
- [ ] Fase 4: Design System (cores, tipografia, tokens) 
      Âncora: .planning/DESIGN.md
- [ ] Fase 5: UI Spec e wireframe
- [ ] Fase 6: Implementação HTML/CSS responsiva
- [ ] Fase 7: SEO e Schema Markup
- [ ] Fase 8: QA e Deploy final
```

### Playbook B — Landing Page Next.js (Vercel)
```
- [ ] Fase 1: Scaffold Next.js + Vercel config
      Shift-Left: sim
- [ ] Fase 2: Research de concorrentes e niche
- [ ] Fase 3: Copy deck completo
- [ ] Fase 4: Design System (baseado em .planning/DESIGN.md + adaptações)
      Âncora: .planning/DESIGN.md
- [ ] Fase 5: UI Spec detalhado
- [ ] Fase 6: Implementação React + Tailwind
- [ ] Fase 7: QA + Lighthouse + Deploy
```

### Playbook C — SaaS Completo (Next.js + Supabase/Postgres)
```
- [ ] Fase 1: Infra (DB, Auth, Hosting)
      Shift-Left: sim
- [ ] Fase 2: Arquitetura e schema
- [ ] Fase 3: UX/UI Spec e fluxos (referência visual: .planning/DESIGN.md)
      Âncora: .planning/DESIGN.md
- [ ] Fase 4: Scaffold Next.js + Auth + tRPC/Route Handlers
- [ ] Fase 5: Core features (por ordem de valor)
- [ ] Fase 6: Billing + Observability
- [ ] Fase 7: QA + Security audit + Deploy
```

### Playbook D — Automação Python (Scraping, ETL, Bot WhatsApp)
```
- [ ] Fase 1: Setup runtime + secrets (venv, .env, Docker se necessário)
      Shift-Left: sim
- [ ] Fase 2: Mapeamento de APIs e credenciais
- [ ] Fase 3: Lógica principal (extração, processamento, output)
- [ ] Fase 4: Testes + tratamento de falhas + logs
- [ ] Fase 5: Deploy e agendamento (cron, systemd, Railway, GitHub Actions)
- [ ] Fase 6: Observabilidade + alertas
```

### Playbook E — Low Ticket (Produto Digital + LP + Checkout)
```
- [ ] Fase 1: Setup CF Pages + domínio + checkout
      Shift-Left: sim
- [ ] Fase 2: Copy + CRO + Design System
      Âncora: .planning/DESIGN.md
- [ ] Fase 3: Serverless function (Webhook do checkout)
- [ ] Fase 4: Área restrita / Entrega do produto
- [ ] Fase 5: Integração final e QA
```