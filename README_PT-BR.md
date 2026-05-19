<div align="center">

# ðŸ¤– OneManAgency (v4.1)

**O framework open-source para vocÃª construir software como se tivesse uma agÃªncia inteira trabalhando para vocÃª.**<br>
*OrquestraÃ§Ã£o Multi-LLM, Context Engineering nativo, PIV Loop e TDD para Claude Code, OpenCode, Cursor, Windsurf, Aider, Hermes Agent, Roo Code e Gemini CLI.*

[![npm version](https://img.shields.io/badge/npm-v4.1.0-CB3837?style=for-the-badge&logo=npm)](https://github.com/pauloarthurrocha/OneManAgency)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

*â€œNÃ£o escreva prompts. Arquiteture sistemas.â€*

</div>

---

## ðŸŒªï¸ Por que eu construÃ­ isso?

Eu sou um solo builder. Eu construo SaaS e produtos de ponta a ponta. 

Eu estava cansado de ver a inteligÃªncia artificial se perder no meio de projetos grandes. A janela de contexto enchia (o famoso **Lost in the Middle**), a IA esquecia a arquitetura, comeÃ§ava a escrever aquele design genÃ©rico com gradientes roxos (o "AI Slop") e gerava cÃ³digo sem testes que quebrava na produÃ§Ã£o. 

Ferramentas empresariais eram pesadas demais para o meu fluxo de trabalho. EntÃ£o eu peguei as melhores metodologias do Vale do SilÃ­cio (Y Combinator, Spec-Driven Development, TDD) e criei a **OneManAgency (OMA)**. 

A complexidade inteira estÃ¡ no sistema, nÃ£o no seu fluxo de trabalho. VocÃª continua usando a IDE que ama, mas agora a sua IA segue regras corporativas invisÃ­veis por baixo dos panos.

### Como o OMA conserta a IA:
1. **Context Engineering no lugar de memÃ³ria RAM:** O contexto do seu projeto nÃ£o morre mais no chat. Tudo Ã© persistido em arquivos invisÃ­veis no seu disco (`HANDOFF.md`, `STATE.md`). Quando vocÃª abre a IDE no dia seguinte, a IA lÃª isso e jÃ¡ sabe onde parou.
2. **O PIV Loop (Plan, Implement, Validate):** O OMA proÃ­be a IA de planejar e codar no mesmo fÃ´lego. O agente faz o plano, gera o Handoff e avisa: *"Limpe o chat para nÃ£o alucinar"*. VocÃª limpa, dÃ¡ o play, e a IA coda com contexto vazio e foco a laser.
3. **TrÃ­ade de RevisÃ£o:** Antes de codar, o seu briefing nÃ£o vira cÃ³digo imediatamente. Ele Ã© barrado por 3 "agentes" (CEO, Tech Lead, Design Lead) que cortam features inÃºteis, cravam o banco de dados e proÃ­bem o "AI Slop".
4. **TDD Ã© Lei:** O agente de Backend Ã© proibido de escrever cÃ³digo de produÃ§Ã£o sem antes escrever um teste que falhe. SÃ©rio.
5. **Batteries Included (MCPs Embutidos):** Ferramentas de IA sÃ£o burras sem ferramentas externas. O `/oma-init` injeta na raiz do seu projeto um arquivo `.mcp.json` hiper-otimizado. Sem vocÃª configurar NENHUMA chave de API, a sua IA ganha o poder de **Puppeteer** (para navegar e raspar sites de graÃ§a), **Context7** (para ler docs oficiais e nÃ£o usar cÃ³digo depreciado), **Sequential Thinking** (forÃ§a a IA a raciocinar antes de gerar cÃ³digo bugado) e **Memory**.
6. **HÃ­brido e Otimizado (Offline-First & Cross-OS):** A instalaÃ§Ã£o do framework acontece uma Ãºnica vez via NPM. RepositÃ³rios base de skills sÃ£o clonados silenciosamente, e CLIs avanÃ§ados (como de UI/UX) sÃ£o instalados no sistema global. Depois disso, rodar o `/oma-init` num projeto novo leva 0.5 segundos e propaga a inteligÃªncia para a sua IDE instantaneamente. E como os agentes usam ferramentas nativas do FileSystem em vez de *Shell Scripts*, a agÃªncia roda perfeitamente em Mac, Linux e Windows (PowerShell).


---

## âš¡ InstalaÃ§Ã£o 

Nosso script detecta automaticamente a IDE ou CLI que vocÃª usa (`.claude`, `.opencode`, `.cursor`, `.roo`, `.gemini`, `.windsurf`, `.aider`, `.cline`) e injeta as skills lÃ¡ dentro.

```bash

# Instalar globalmente na sua mÃ¡quina
npm install -g onemanagency@latest
```

---

## ðŸš€ Como Funciona na PrÃ¡tica

VocÃª nÃ£o precisa ficar digitando dezenas de comandos. O OMA tem "Autonomous Skill Chaining". A IA guia o processo.

### 1. O Setup
Crie uma pasta vazia para o seu novo produto e chame o Engenheiro de Infraestrutura (oma-init).
```bash
mkdir meu-novo-saas && cd meu-novo-saas
/oma-init
```

### 2. O Embate SocrÃ¡tico
O OMA nÃ£o vai te dar um formulÃ¡rio passivo. O agente assume a persona de um **Partner da Y Combinator**. Se vocÃª falar "quero um app com 50 features", a IA vai te perguntar: *"Qual a dor real? Vamos focar sÃ³ na funcionalidade que gera receita no dia 1"*.

### 3. A Barreira (TrÃ­ade)
O briefing passa por trÃªs filtros automÃ¡ticos:
- ðŸ‘” **CEO Review**: Gera o `PRD.md` (Product Requirements Document).
- âš™ï¸ **Eng Review**: Define o schema e fluxo de dados (`ARCHITECTURE.md`).
- ðŸŽ¨ **Design Review**: Define os tokens, tipografia e regras de motion anti-genÃ©rico (`UI-SPEC.md`).

### 4. ExecuÃ§Ã£o (O PIV Loop)
O Gerador de Pipeline fatia tudo em tarefas atÃ´micas. VocÃª aciona o `oma-executor`. 
A IA planeja a tarefa, escreve no disco e pede para vocÃª limpar a tela. VocÃª limpa. Ao retornar, o agente de Frontend (focado em acessibilidade e Tailwind) ou de Backend (focado em TDD) entra em aÃ§Ã£o. Sem alucinaÃ§Ãµes.

---

## ðŸ§  NÃ³s usamos Personas Reais, nÃ£o "Roleplay Raso"

Dizer *"aja como um sÃªnior"* no comeÃ§o de um prompt nÃ£o funciona. O OMA usa `Agent Definition Files` estritos em `src/agents/`. SÃ£o arquivos que dizem exatamente o que o agente odeia e como ele opera. **17 personas** disparadas pelo PIPELINE.md via metadata `Agent: <nome>`:

**ImplementaÃ§Ã£o (5):**
- **Frontend Specialist** â€” Acessibilidade nativa, skeletons/error states obrigatÃ³rios, Ã¢ncora de design intransigente.
- **Backend Specialist** â€” Segue a "TDD Iron Law". Se tentar gambiarra, a persona barra.
- **Database Architect** â€” Schema, Ã­ndices, RLS policies (Supabase), migrations idempotentes.
- **DevOps Engineer** â€” CI/CD, Docker, observability, deploy seguro.
- **Mobile Specialist** â€” React Native/Expo, touch-first UX, performance em devicesä½Žç«¯, app store guidelines.

**Design & ConteÃºdo (2):**
- **Design Specialist** â€” Filosofia Emil Kowalski. Spring animations, espaÃ§o negativo, anti-AI-slop.
- **Copywriter Specialist** â€” Headlines, CTAs, tom de voz. Marketing-psychology-aware.

**Qualidade (5):**
- **Code Reviewer** â€” Audita correctness, seguranÃ§a, manutenibilidade, performance. Prioriza blocker/sugestÃ£o/nit.
- **Accessibility Auditor** â€” WCAG 2.2 AA. Screen reader-first. Lighthouse 100/100 nÃ£o Ã© prova.
- **Performance Engineer** â€” Mede com p95/p99 antes de otimizar. Core Web Vitals, k6, profiling.
- **Reality Checker** â€” Default NEEDS WORK. Exige evidÃªncia visual antes de "production ready".
- **Test Engineer** â€” Unit, integration, E2E. Coverage como sinal, nÃ£o como meta.

**Especialistas (5):**
- **Security Auditor** â€” OWASP, JWT, middleware, secrets hygiene.
- **SEO Specialist** â€” Meta tags, schema, Core Web Vitals, AI citation (GEO/AEO).
- **MCP Builder** â€” ConstrÃ³i servidores Model Context Protocol customizados.
- **Chatbot Specialist** â€” WhatsApp bots (BuilderBot/Baileys/Botpress), fluxos conversacionais, integraÃ§Ã£o com APIs de messaging.
- **Lead Orchestrator** â€” Em refatoraÃ§Ãµes multi-domÃ­nio, abre Git Worktrees e coordena waves paralelas.

---

## ðŸ”Œ Bring Your Own Agents

O OMA dispara agentes via metadata `Agent: <nome>` no `PIPELINE.md`. Qualquer arquivo `.md` com frontmatter `name:` em `.agents/agents/` Ã© elegÃ­vel. VocÃª nÃ£o estÃ¡ limitado Ã s 15 personas core â€” recomendamos colar essas bibliotecas para ampliar:

| Biblioteca | Stars | Quando ajuda | Como integrar |
|---|---|---|---|
| [agency-agents](https://github.com/msitarzewski/agency-agents) (msitarzewski) | 73-94k | 144 agentes em 12 divisÃµes: Marketing (29), Sales (9), Finance (5), Game Dev (20), Spatial Computing (6) | Copie o `.md` desejado para `.agents/agents/` e referencie no PIPELINE |
| [GStack](https://github.com/garrytan/gstack) (Garry Tan, YC) | â€” | 23 personas com foco em product validation e office-hours framework | Copie o agent para `.agents/agents/` |
| [Superpowers](https://github.com/obra/superpowers) (obra) | â€” | 15 skills compostas (TDD, brainstorming, systematic-debugging) | Use como **skill** em `.agents/skills/`, nÃ£o como agent |

**ConvenÃ§Ã£o de nomes:** OMA usa kebab-case curto (ex: `code-reviewer.md`). Agency-agents usa `<division>-<name>.md`. Renomeie ao copiar ou referencie pelo nome exato no PIPELINE.

---

## ðŸ“‹ Playbooks Testados (9 tipos de projeto)

O `pipeline-generator` jÃ¡ tem playbooks prontos para cada tipo de projeto. Cada playbook define fases, agentes, skills e critÃ©rios de aceite especÃ­ficos:

| Playbook | Tipo | Stack |
|---|---|---|
| A | SaaS Full-Stack | Next.js + Supabase + Vercel |
| B | Landing Page EstÃ¡tica | HTML/CSS + Vercel/Netlify |
| C | Landing Page Next.js | Next.js + Vercel |
| D | AutomaÃ§Ã£o Python | Python + FastAPI + Cloud Run |
| E | Low-Ticket / Infoproduto | HTML + Kiwify Checkout |
| F | Data Pipeline / ETL | Python + Airflow/Prefect + BigQuery |
| G | Mobile React Native | React Native + Expo + EAS |
| H | Chatbot WhatsApp | Node.js + Baileys/Botpress |
| I | Hybrid / Monorepo | Turborepo + shared packages |

Cada playbook Ã© testado em produÃ§Ã£o. Novos playbooks podem ser criados pela comunidade â€” basta seguir o schema em `src/skills/pipeline-generator/references/playbooks.md`.

---

## ðŸ§¬ Progressive Disclosure (Performance de Contexto)

Desde a v4.1, todas as skills core (`client-onboarding`, `pipeline-generator`, `oma-executor`, `oma-init`) foram modularizadas. O `SKILL.md` principal carrega apenas o essencial (~200 linhas) e referÃªncia playbooks e exemplos em `references/`. Isso garante:

- **Menos tokens injetados** por prompt â†’ mais espaÃ§o para o cÃ³digo real
- **Carregamento sob demanda** â†’ a IA sÃ³ puxa o playbook relevante ao tipo de projeto
- **ManutenÃ§Ã£o mais fÃ¡cil** â†’ atualizar um playbook nÃ£o exige reescrever a skill

---

## ðŸ”¬ Eval Harness (QA AutÃ´nomo com LLM-as-a-Judge)

O `oma-verify-work` agora inclui um sistema de avaliaÃ§Ã£o autÃ´nomo que usa LLM como juiz para validar qualidade estÃ©tica e arquitetÃ´nica. ApÃ³s cada fase, alÃ©m dos checks de arquivo e build, o agente:

- Avalia se o cÃ³digo segue o `DESIGN.md` (anti-AI Slop)
- Verifica se a arquitetura bate com o `ARCHITECTURE.md`
- Gera um relatÃ³rio `.planning/VERIFICATION_REPORT.md` com status PASS/WARNING/FAIL

---

## ðŸ¤ IntegraÃ§Ã£o ContÃ­nua (24/7 Coworking)

Como o OMA usa arquivos no disco (Context Engineering) em vez de memÃ³ria de chat, ele Ã© o motor perfeito para orquestradores de terminais autÃ´nomos:

*   **[AionUi](https://github.com/iOfficeAI/AionUi):** VocÃª pode instanciar mÃºltiplos terminais lado a lado na UI deles e delegar as fases do `PIPELINE.md`. O AionUi Ã© o "escritÃ³rio", o OMA Ã© o "mÃ©todo".
*   **[Hermes Agent](https://github.com/NousResearch/hermes-agent) / OpenClaw:** O instalador detecta as pastas `~/.hermes/skills` automaticamente. VocÃª pode rodar a agÃªncia num VPS e comandar os agentes via Telegram ou Discord.

---

## ðŸŒŸ Onde fomos buscar inspiraÃ§Ã£o (Prior Art)

Eu nÃ£o inventei a roda. O OMA Ã© a sÃ­ntese das mentes mais brilhantes do mercado de Engenharia AgÃªntica e Design. Se esse repo existe, Ã© por causa deles:

### ðŸ›ï¸ Arquitetura & Product Management
*   **[GStack](https://github.com/garrytan/gstack) (por Garry Tan):** Inspirou nossa TrÃ­ade de RevisÃ£o. A OMA adotou a visÃ£o de que cÃ³digo nÃ£o deve ser escrito sem focar no MVP e cortar escopo.
*   **[Get-Shit-Done (GSD)](https://github.com/gsd-build/get-shit-done):** Inspirou nossa leveza e persistÃªncia em arquivos (`STATE.md`).
*   **[Spec-Kit](https://github.com/github/spec-kit):** Validou o *Spec-Driven Development*. Exigimos `PRD.md` antes de qualquer cÃ³digo.

### âš™ï¸ Engenharia
*   **[Superpowers](https://github.com/obra/superpowers):** A base do nosso Backend Specialist. Importamos a "TDD Iron Law" e os Git Worktrees para execuÃ§Ã£o paralela.
*   **[Agency-Agents](https://github.com/msitarzewski/agency-agents):** Nos ensinou que "Roleplay Raso" nÃ£o funciona. Usamos *Agent Definition Files* rÃ­gidos em vez de prompts genÃ©ricos.

### ðŸŽ¨ Anti-"AI Slop"
Interfaces de IA costumam ser Ã³bvias e cansativas. NÃ³s blindamos o OMA importando filosofias dos maiores nomes do Frontend Design:
*   **[Impeccable](https://github.com/pbakaus/impeccable) & [Taste-Skill](https://github.com/leonxlnx/taste-skill):** A base da nossa defesa contra o "AI Slop". EspaÃ§amento intencional, contraste luxuoso e tipografia refinada.
*   **[A Filosofia de Emil Kowalski](https://emilkowal.ski/):** A espinha dorsal do nosso *Design Specialist*. Micro-interaÃ§Ãµes e animaÃ§Ãµes fluidas.
*   **[Huashu Design](https://github.com/alchaincyf/huashu-design):** Insights de prototipagem rÃ¡pida e componentes HTML nativos de altÃ­ssima fidelidade.

Se vocÃª gosta do OMA, por favor, considere dar um Star nos repositÃ³rios desses caras. NÃ³s estamos nos ombros de gigantes.

---

<div align="center">
<i>"VocÃª nÃ£o sobe o nÃ­vel do seu cÃ³digo pedindo por favor. VocÃª sobe o nÃ­vel construindo sistemas que proÃ­bem cÃ³digo ruim."</i><br><br>
<b>LicenÃ§a MIT | Feito por um builder, para builders.</b>
</div>
