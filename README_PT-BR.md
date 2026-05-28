<div align="center">

# 🤖 OneManAgency (v4.1)

**O framework open-source para você construir software como se tivesse uma agência inteira trabalhando para você.**<br>
*Orquestração Multi-LLM, Context Engineering nativo, PIV Loop e TDD para Claude Code, OpenCode, Cursor, Windsurf, Aider, Hermes Agent, Roo Code e Gemini CLI.*

[![npm version](https://img.shields.io/badge/npm-v4.1.0-CB3837?style=for-the-badge&logo=npm)](https://github.com/pauloarthurrocha/OneManAgency)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

*“Não escreva prompts. Arquiteture sistemas.”*

</div>

---

## 🌪️ Por que eu construí isso?

Eu sou um solo builder. Eu construo SaaS e produtos de ponta a ponta. 

Eu estava cansado de ver a inteligência artificial se perder no meio de projetos grandes. A janela de contexto enchia (o famoso **Lost in the Middle**), a IA esquecia a arquitetura, começava a escrever aquele design genérico com gradientes roxos (o "AI Slop") e gerava código sem testes que quebrava na produção. 

Ferramentas empresariais eram pesadas demais para o meu fluxo de trabalho. Então eu peguei as melhores metodologias do Vale do Silício (Y Combinator, Spec-Driven Development, TDD) e criei a **OneManAgency (OMA)**. 

A complexidade inteira está no sistema, não no seu fluxo de trabalho. Você continua usando a IDE que ama, mas agora a sua IA segue regras corporativas invisíveis por baixo dos panos.

### Como o OMA conserta a IA:
1. **Context Engineering no lugar de memória RAM:** O contexto do seu projeto não morre mais no chat. Tudo é persistido em arquivos invisíveis no seu disco (`HANDOFF.md`, `STATE.md`). Quando você abre a IDE no dia seguinte, a IA lê isso e já sabe onde parou.
2. **O PIV Loop (Plan, Implement, Validate):** O OMA proíbe a IA de planejar e codar no mesmo fôlego. O agente faz o plano, gera o Handoff e avisa: *"Limpe o chat para não alucinar"*. Você limpa, dá o play, e a IA coda com contexto vazio e foco a laser.
3. **Tríade de Revisão:** Antes de codar, o seu briefing não vira código imediatamente. Ele é barrado por 3 "agentes" (CEO, Tech Lead, Design Lead) que cortam features inúteis, cravam o banco de dados e proíbem o "AI Slop".
4. **TDD é Lei:** O agente de Backend é proibido de escrever código de produção sem antes escrever um teste que falhe. Sério.
5. **Batteries Included (MCPs Embutidos):** Ferramentas de IA são burras sem ferramentas externas. A skill `oma-init` rodando na sua IDE injeta na raiz do seu projeto um arquivo `.mcp.json` hiper-otimizado. Sem você configurar NENHUMA chave de API, a sua IA ganha o poder de **Puppeteer** (para navegar e raspar sites de graça), **Context7** (para ler docs oficiais e não usar código depreciado), **Sequential Thinking** (força a IA a raciocinar antes de gerar código bugado) e **Memory**.
6. **Híbrido e Otimizado (Offline-First & Cross-OS):** A instalação do framework acontece uma única vez via NPM. Repositórios base de skills são clonados silenciosamente, e CLIs avançados (como de UI/UX) são instalados no sistema global. Depois disso, inicializar o OMA em um projeto novo leva 0.5 segundos e propaga a inteligência para a sua IDE instantaneamente. E como os agentes usam ferramentas nativas do FileSystem em vez de *Shell Scripts*, a agência roda perfeitamente em Mac, Linux e Windows (PowerShell).


---

## ⚡ Instalação 

Nosso script detecta automaticamente a IDE ou CLI que você usa (`.claude`, `.opencode`, `.cursor`, `.roo`, `.gemini`, `.windsurf`, `.aider`, `.cline`) e injeta as skills lá dentro.

```bash

# Instalar globalmente na sua máquina
npm install -g onemanagency@latest
```

---

## 🚀 Como Funciona na Prática

Você não precisa ficar digitando dezenas de comandos. O OMA tem "Autonomous Skill Chaining". A IA guia o processo.

### 1. O Setup
Crie uma pasta vazia e abra ela na sua IDE com a IA ligada. Chame o Engenheiro de Infraestrutura pelo chat com a IA da IDE:
```text
/oma-init
```

### 2. O Embate Socrático
O OMA não vai te dar um formulário passivo. O agente assume a persona de um **Partner da Y Combinator**. Se você falar "quero um app com 50 features", a IA vai te perguntar: *"Qual a dor real? Vamos focar só na funcionalidade que gera receita no dia 1"*.

### 3. A Barreira (Tríade)
O briefing passa por três filtros automáticos:
- 👔 **CEO Review**: Gera o `PRD.md` (Product Requirements Document).
- ⚙️ **Eng Review**: Define o schema e fluxo de dados (`ARCHITECTURE.md`).
- 🎨 **Design Review**: Define os tokens, tipografia e regras de motion anti-genérico (`UI-SPEC.md`).

### 4. Execução (O PIV Loop)
O Gerador de Pipeline fatia tudo em tarefas atômicas. Você aciona o `oma-executor`. 
A IA planeja a tarefa, escreve no disco e pede para você limpar a tela. Você limpa. Ao retornar, o agente de Frontend (focado em acessibilidade e Tailwind) ou de Backend (focado em TDD) entra em ação. Sem alucinações.

---

## 🧠 Nós usamos Personas Reais, não "Roleplay Raso"

Dizer *"aja como um sênior"* no começo de um prompt não funciona. O OMA usa `Agent Definition Files` estritos em `src/agents/`. São arquivos que dizem exatamente o que o agente odeia e como ele opera. **17 personas** disparadas pelo PIPELINE.md via metadata `Agent: <nome>`:

**Implementação (5):**
- **Frontend Specialist** — Acessibilidade nativa, skeletons/error states obrigatórios, âncora de design intransigente.
- **Backend Specialist** — Segue a "TDD Iron Law". Se tentar gambiarra, a persona barra.
- **Database Architect** — Schema, índices, RLS policies (Supabase), migrations idempotentes.
- **DevOps Engineer** — CI/CD, Docker, observability, deploy seguro.
- **Mobile Specialist** — React Native/Expo, touch-first UX, performance em devices低端, app store guidelines.

**Design & Conteúdo (2):**
- **Design Specialist** — Filosofia Emil Kowalski. Spring animations, espaço negativo, anti-AI-slop.
- **Copywriter Specialist** — Headlines, CTAs, tom de voz. Marketing-psychology-aware.

**Qualidade (5):**
- **Code Reviewer** — Audita correctness, segurança, manutenibilidade, performance. Prioriza blocker/sugestão/nit.
- **Accessibility Auditor** — WCAG 2.2 AA. Screen reader-first. Lighthouse 100/100 não é prova.
- **Performance Engineer** — Mede com p95/p99 antes de otimizar. Core Web Vitals, k6, profiling.
- **Reality Checker** — Default NEEDS WORK. Exige evidência visual antes de "production ready".
- **Test Engineer** — Unit, integration, E2E. Coverage como sinal, não como meta.

**Especialistas (5):**
- **Security Auditor** — OWASP, JWT, middleware, secrets hygiene.
- **SEO Specialist** — Meta tags, schema, Core Web Vitals, AI citation (GEO/AEO).
- **MCP Builder** — Constrói servidores Model Context Protocol customizados.
- **Chatbot Specialist** — WhatsApp bots (BuilderBot/Baileys/Botpress), fluxos conversacionais, integração com APIs de messaging.
- **Lead Orchestrator** — Em refatorações multi-domínio, abre Git Worktrees e coordena waves paralelas.

---

## 🔌 Bring Your Own Agents

O OMA dispara agentes via metadata `Agent: <nome>` no `PIPELINE.md`. Qualquer arquivo `.md` com frontmatter `name:` em `.agents/agents/` é elegível. Você não está limitado às 15 personas core — recomendamos colar essas bibliotecas para ampliar:

| Biblioteca | Stars | Quando ajuda | Como integrar |
|---|---|---|---|
| [agency-agents](https://github.com/msitarzewski/agency-agents) (msitarzewski) | 73-94k | 144 agentes em 12 divisões: Marketing (29), Sales (9), Finance (5), Game Dev (20), Spatial Computing (6) | Copie o `.md` desejado para `.agents/agents/` e referencie no PIPELINE |
| [GStack](https://github.com/garrytan/gstack) (Garry Tan, YC) | — | 23 personas com foco em product validation e office-hours framework | Copie o agent para `.agents/agents/` |
| [Superpowers](https://github.com/obra/superpowers) (obra) | — | 15 skills compostas (TDD, brainstorming, systematic-debugging) | Use como **skill** em `.agents/skills/`, não como agent |

**Convenção de nomes:** OMA usa kebab-case curto (ex: `code-reviewer.md`). Agency-agents usa `<division>-<name>.md`. Renomeie ao copiar ou referencie pelo nome exato no PIPELINE.

---

## 📋 Playbooks Testados (9 tipos de projeto)

O `pipeline-generator` já tem playbooks prontos para cada tipo de projeto. Cada playbook define fases, agentes, skills e critérios de aceite específicos:

| Playbook | Tipo | Stack |
|---|---|---|
| A | SaaS Full-Stack | Next.js + Supabase + Vercel |
| B | Landing Page Estática | HTML/CSS + Vercel/Netlify |
| C | Landing Page Next.js | Next.js + Vercel |
| D | Automação Python | Python + FastAPI + Cloud Run |
| E | Low-Ticket / Infoproduto | HTML + Kiwify Checkout |
| F | Data Pipeline / ETL | Python + Airflow/Prefect + BigQuery |
| G | Mobile React Native | React Native + Expo + EAS |
| H | Chatbot WhatsApp | Node.js + Baileys/Botpress |
| I | Hybrid / Monorepo | Turborepo + shared packages |

Cada playbook é testado em produção. Novos playbooks podem ser criados pela comunidade — basta seguir o schema em `src/skills/pipeline-generator/references/playbooks.md`.

---

## 🧬 Progressive Disclosure (Performance de Contexto)

Desde a v4.1, todas as skills core (`client-onboarding`, `pipeline-generator`, `oma-executor`, `oma-init`) foram modularizadas. O `SKILL.md` principal carrega apenas o essencial (~200 linhas) e referência playbooks e exemplos em `references/`. Isso garante:

- **Menos tokens injetados** por prompt → mais espaço para o código real
- **Carregamento sob demanda** → a IA só puxa o playbook relevante ao tipo de projeto
- **Manutenção mais fácil** → atualizar um playbook não exige reescrever a skill

---

## 🔬 Eval Harness (QA Autônomo com LLM-as-a-Judge)

O `oma-verify-work` agora inclui um sistema de avaliação autônomo que usa LLM como juiz para validar qualidade estética e arquitetônica. Após cada fase, além dos checks de arquivo e build, o agente:

- Avalia se o código segue o `DESIGN.md` (anti-AI Slop)
- Verifica se a arquitetura bate com o `ARCHITECTURE.md`
- Gera um relatório `.planning/VERIFICATION_REPORT.md` com status PASS/WARNING/FAIL

---

## 🤝 Integração Contínua (24/7 Coworking)

Como o OMA usa arquivos no disco (Context Engineering) em vez de memória de chat, ele é o motor perfeito para orquestradores de terminais autônomos:

*   **[AionUi](https://github.com/iOfficeAI/AionUi):** Você pode instanciar múltiplos terminais lado a lado na UI deles e delegar as fases do `PIPELINE.md`. O AionUi é o "escritório", o OMA é o "método".
*   **[Hermes Agent](https://github.com/NousResearch/hermes-agent) / OpenClaw:** O instalador detecta as pastas `~/.hermes/skills` automaticamente. Você pode rodar a agência num VPS e comandar os agentes via Telegram ou Discord.

---

## 🌟 Onde fomos buscar inspiração (Prior Art)

Eu não inventei a roda. O OMA é a síntese das mentes mais brilhantes do mercado de Engenharia Agêntica e Design. Se esse repo existe, é por causa deles:

### 🏛️ Arquitetura & Product Management
*   **[GStack](https://github.com/garrytan/gstack) (por Garry Tan):** Inspirou nossa Tríade de Revisão. A OMA adotou a visão de que código não deve ser escrito sem focar no MVP e cortar escopo.
*   **[Get-Shit-Done (GSD)](https://github.com/gsd-build/get-shit-done):** Inspirou nossa leveza e persistência em arquivos (`STATE.md`).
*   **[Spec-Kit](https://github.com/github/spec-kit):** Validou o *Spec-Driven Development*. Exigimos `PRD.md` antes de qualquer código.

### ⚙️ Engenharia
*   **[Superpowers](https://github.com/obra/superpowers):** A base do nosso Backend Specialist. Importamos a "TDD Iron Law" e os Git Worktrees para execução paralela.
*   **[Agency-Agents](https://github.com/msitarzewski/agency-agents):** Nos ensinou que "Roleplay Raso" não funciona. Usamos *Agent Definition Files* rígidos em vez de prompts genéricos.

### 🎨 Anti-"AI Slop"
Interfaces de IA costumam ser óbvias e cansativas. Nós blindamos o OMA importando filosofias dos maiores nomes do Frontend Design:
*   **[Impeccable](https://github.com/pbakaus/impeccable) & [Taste-Skill](https://github.com/leonxlnx/taste-skill):** A base da nossa defesa contra o "AI Slop". Espaçamento intencional, contraste luxuoso e tipografia refinada.
*   **[A Filosofia de Emil Kowalski](https://emilkowal.ski/):** A espinha dorsal do nosso *Design Specialist*. Micro-interações e animações fluidas.
*   **[Huashu Design](https://github.com/alchaincyf/huashu-design):** Insights de prototipagem rápida e componentes HTML nativos de altíssima fidelidade.

Se você gosta do OMA, por favor, considere dar um Star nos repositórios desses caras. Nós estamos nos ombros de gigantes.

---

<div align="center">
<i>"Você não sobe o nível do seu código pedindo por favor. Você sobe o nível construindo sistemas que proíbem código ruim."</i><br><br>
<b>Licença MIT | Feito por um builder, para builders.</b>
</div>
