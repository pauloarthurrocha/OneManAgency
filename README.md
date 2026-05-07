<div align="center">

# 🤖 OneManAgency (v4.0.0)

**O Framework de Engenharia Agêntica para Solo Builders & Tech Leads.**<br>
*Orquestração Multi-LLM, Context Engineering, PIV Loop (Plan, Implement, Validate) e TDD Nativo para Claude Code, OpenCode, Cursor, Windsurf, Aider, Hermes Agent, Roo Code e Gemini CLI.*

[![npm version](https://img.shields.io/badge/npm-v4.0.0-CB3837?style=for-the-badge&logo=npm)](https://github.com/pauloarthurrocha/OneManAgency)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Cross-IDE](https://img.shields.io/badge/Cross--IDE-Supported-blue?style=for-the-badge)]()

*“Não escreva prompts. Arquiteture sistemas.”*

</div>

---

## 🌪️ O Problema que Resolvemos (LiTM & Scope Creep)

A maioria dos workflows de IA falha quando o projeto cresce. A IA sofre de **Lost in the Middle (LiTM)** ao tentar planejar e codar na mesma janela, alucina designs genéricos ("AI Slop") e escreve código sem testes.

A **OneManAgency** traz o rigor do Vale do Silício (inspirada em GStack, Superpowers e Spec-Driven Development) para o seu terminal local. 

### A Nossa Solução:
1. **Context Engineering:** O contexto não morre no chat. Tudo é persistido em disco (`HANDOFF.md`, `STATE.md`, `discovery-notes.md`).
2. **O PIV Loop (Plan, Implement, Validate):** O nosso Executor planeja a tarefa, escreve o Handoff e **força a limpeza do contexto (chat)** antes de implementar o código. Zero alucinação.
3. **Tríade de Revisão (Gatekeepers):** Antes de codar, o seu Briefing é bombardeado por 3 agentes de revisão (CEO, Tech Lead, Design Lead) que cortam features inúteis e cravam a arquitetura.
4. **TDD Iron Law:** O agente de Backend é proibido de escrever código de produção sem antes escrever um teste que falhe.

---

## ⚡ Instalação (One-Liner)

Nosso script detecta automaticamente suas IDEs (`.claude`, `.opencode`, `.cursor`, `.roo`, `.gemini`) e injeta o ecossistema globalmente.

```bash
# Autenticar no GitHub Packages (apenas uma vez)
npm login --registry=https://npm.pkg.github.com

# Instalar globalmente
npm install -g @pauloarthurrocha/onemanagency --registry=https://npm.pkg.github.com
```

---

## 🚀 Como Usar (O "Happy Path" Autônomo)

Graças ao nosso **Autonomous Skill Chaining**, você só precisa dar o pontapé inicial. A IA orquestra o resto.

### 1. Inicialize a Agência
Crie uma pasta vazia e chame o Engenheiro de Infraestrutura. Ele configura tudo e passa a bola.
```bash
mkdir meu-projeto-foda && cd meu-projeto-foda
# No terminal do seu IDE de IA:
skill(name="oma-init")
```

### 2. O Embate Socrático
A IA inicia o `client-onboarding`. Em vez de fazer formulários passivos, ela age como um **YC Partner**: vai desafiar sua ideia, buscar a dor real do mercado e forçar um MVP de 10 estrelas.

### 3. A Tríade de Revisão
O Briefing passa por:
- 👔 **`/plan-ceo-review`**: Corta o escopo e foca na monetização (Gera `PRD.md`).
- ⚙️ **`/plan-eng-review`**: Trava fluxos de dados e schemas de banco (Gera `ARCHITECTURE.md`).
- 🎨 **`/plan-design-review`**: Filtro anti-"AI Slop", definindo tokens, OKLCH, typography scale e motion (Gera `UI-SPEC.md`).

### 4. Execução Isolada (PIV Loop)
A IA roda o `oma-executor`.
1. Ela planeja os arquivos que vai tocar.
2. Ela gera o arquivo `.planning/HANDOFF.md`.
3. Ela para e avisa: *"Limpe o chat (`/clear`) e digite 'resume' para eu codar sem alucinar"*.
4. Ao retomar, ela lê o Handoff, assume a Persona Especialista (`frontend-specialist`, `backend-specialist`), escreve testes, programa e valida.

---

## 🧠 Arquitetura de Agentes (Personas Reais)

Nós não usamos "roleplay raso". O repositório contém `Agent Definition Files` estritos em `src/agents/`:

| Agente | Diretriz Máxima |
|---|---|
| **Design Specialist** | Baseado na filosofia de Emil Kowalski. Masteriza motion (springs > linear), tipografia sofisticada e rejeita gradientes clichês de IA. |
| **Frontend Specialist** | Acessibilidade (a11y) nativa. Tailwind v4. Skeletons/Error states mandatórios. A âncora de design (`DESIGN.md`) é lei. |
| **Backend Specialist** | Guardião dos dados. Segue a "TDD Iron Law" (Red-Green-Refactor). Código espaguete é barrado. |
| **Lead Orchestrator** | Gerente de Waves. Em grandes refatorações, isola subagentes em Git Worktrees paralelos para evitar conflitos de merge. |

---

## 🤝 Integração Contínua (24/7 Coworking)

O OMA Framework é 100% compatível com orquestradores de terminais autônomos. Como ele é fundamentado em *Agent Definition Files* puros e leitura de disco (Context Engineering), você pode rodá-lo em plataformas de "Coworking" de agentes:

*   **[AionUi](https://github.com/iOfficeAI/AionUi):** Uma vez que o OMA é instalado na sua máquina, você pode abrir o AionUi, instanciar múltiplos terminais do Claude Code ou OpenCode lado a lado, e delegar as fases do `PIPELINE.md`. AionUi fará o papel de terminal interativo enquanto o OMA atua como o cérebro/framework.
*   **[Hermes Agent](https://github.com/NousResearch/hermes-agent) / OpenClaw:** O instalador do OMA detecta as pastas `~/.hermes/skills` e `~/.openclaw/skills` automaticamente. Você pode rodar a agência via Telegram ou Discord, chamando `/oma-init` e orquestrando o código diretamente de um VPS na nuvem 24/7.

---

## 📦 O Que Tem Sob o Capô?

```text
oma-adaptavel/
├── 📂 src/skills/              # Skills Injetáveis (Init, Executor, Tríade)
├── 📂 src/agents/              # Agent Definition Files (Personas)
├── 📂 src/templates/           # Context Engineering (AGENTS.md, HANDOFF.md)
└── 📂 build/                   # Postinstall Inteligente (Auto-detecção de IDEs)
```

---

## 🌟 Prior Art & Acknowledgements (Inspirações)

O **OneManAgency (OMA)** não tenta reinventar a roda. Ele é a **síntese e orquestração** dos melhores conceitos de Engenharia Agêntica e Design Engineering do mercado open-source. Nosso objetivo foi unir a inteligência desses projetos incríveis em um único framework *Plug-and-Play* que roda invisível dentro da sua IDE:

### 🏛️ Arquitetura & Product Management
*   **[GStack](https://github.com/garrytan/gstack) (by Garry Tan / Y Combinator):** Inspirou nossa *Tríade de Revisão* (CEO, Eng, Design). A OMA adotou a mentalidade de que código não deve ser escrito sem antes focar no MVP de negócios ("The Wedge") e cortar escopo impiedosamente.
*   **[Get-Shit-Done (GSD)](https://github.com/gsd-build/get-shit-done):** Inspirou nossa leveza e o *Context Engineering* focado em persistência de arquivos. Onde o GSD usa CLI commands pesados, a OMA injeta a mesma persistência passivamente na IDE (com nosso `.planning/STATE.md`).
*   **[Spec-Kit](https://github.com/github/spec-kit) (by GitHub):** Validou a nossa tese do *Spec-Driven Development*. A OMA exige `PRD.md` e `ARCHITECTURE.md` antes do `oma-executor` ter permissão para escrever código de produção.

### ⚙️ Engenharia & Execução
*   **[Superpowers](https://github.com/obra/superpowers) (by Obra):** A base do nosso *Backend Specialist*. Nós importamos a "TDD Iron Law" (Red-Green-Refactor) e o conceito de usar Git Worktrees para grandes refatorações paralelas sem poluir a branch principal.
*   **[Agency-Agents](https://github.com/msitarzewski/agency-agents):** Ensinou-nos que "Roleplay Raso" não funciona. A OMA usa *Agent Definition Files* rígidos em `src/agents/` contendo filosofias operacionais claras (SOPs e Mindsets) em vez de prompts genéricos soltos.

### 🎨 Design Engineering & "Anti-AI Slop"
Interfaces geradas por IA costumam ter um visual "genérico" e cansativo. A OMA destrói isso importando as filosofias dos maiores repositórios de Frontend Design:
*   **[Impeccable](https://github.com/pbakaus/impeccable) & [Taste-Skill](https://github.com/leonxlnx/taste-skill):** A base de nossa defesa contra o "AI Slop" genérico. Aplicamos suas regras de espaçamento intencional, contraste luxuoso e tipografia sofisticada, rejeitando layouts previsíveis de bootcamps.
*   **[Emil Kowalski's Philosophy](https://emilkowal.ski/):** A espinha dorsal do nosso *Design Specialist*. O bom gosto ("Taste is trained") foca em curvas de animação fluídas (*springs* no lugar de *linear*) e interações microscópicas que compõem uma experiência de luxo.
*   **[Huashu Design](https://github.com/alchaincyf/huashu-design):** Utilizamos seus insights de prototipagem rápida com foco em componentes HTML-nativos sólidos e de alta fidelidade visual.

Se você gosta da OMA, por favor considere dar um Star nos repositórios acima. Nós estamos nos ombros de gigantes.

---

<div align="center">
<i>"Você não sobe o nível do seu código pedindo por favor. Você sobe o nível construindo sistemas que proíbem código ruim."</i><br><br>
<b>Licença MIT | Feito para builders.</b>
</div>