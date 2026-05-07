<div align="center">

# 🤖 Agência AI Adaptável (v4.0.0)

**O Framework de Engenharia Agêntica para Solo Builders & Tech Leads.**<br>
*Orquestração Multi-LLM, Context Engineering, PIV Loop (Plan, Implement, Validate) e TDD Nativo para Claude Code, OpenCode, Cursor, Roo Code e Gemini CLI.*

[![npm version](https://img.shields.io/badge/npm-v4.0.0-CB3837?style=for-the-badge&logo=npm)](https://github.com/pauloarthurrocha/agencia-ai-adaptavel-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Cross-IDE](https://img.shields.io/badge/Cross--IDE-Supported-blue?style=for-the-badge)]()

*“Não escreva prompts. Arquiteture sistemas.”*

</div>

---

## 🌪️ O Problema que Resolvemos (LiTM & Scope Creep)

A maioria dos workflows de IA falha quando o projeto cresce. A IA sofre de **Lost in the Middle (LiTM)** ao tentar planejar e codar na mesma janela, alucina designs genéricos ("AI Slop") e escreve código sem testes.

A **Agência AI Adaptável** traz o rigor do Vale do Silício (inspirada em GStack, Superpowers e Spec-Driven Development) para o seu terminal local. 

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
npm install -g @pauloarthurrocha/agencia-ai-adaptavel --registry=https://npm.pkg.github.com
```

---

## 🚀 Como Usar (O "Happy Path" Autônomo)

Graças ao nosso **Autonomous Skill Chaining**, você só precisa dar o pontapé inicial. A IA orquestra o resto.

### 1. Inicialize a Agência
Crie uma pasta vazia e chame o Engenheiro de Infraestrutura. Ele configura tudo e passa a bola.
```bash
mkdir meu-projeto-foda && cd meu-projeto-foda
# No terminal do seu IDE de IA:
skill(name="agencia-init")
```

### 2. O Embate Socrático
A IA inicia o `client-onboarding`. Em vez de fazer formulários passivos, ela age como um **YC Partner**: vai desafiar sua ideia, buscar a dor real do mercado e forçar um MVP de 10 estrelas.

### 3. A Tríade de Revisão
O Briefing passa por:
- 👔 **`/plan-ceo-review`**: Corta o escopo e foca na monetização (Gera `PRD.md`).
- ⚙️ **`/plan-eng-review`**: Trava fluxos de dados e schemas de banco (Gera `ARCHITECTURE.md`).
- 🎨 **`/plan-design-review`**: Filtro anti-"AI Slop", definindo tokens, OKLCH, typography scale e motion (Gera `UI-SPEC.md`).

### 4. Execução Isolada (PIV Loop)
A IA roda o `agencia-executor`.
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

## 📦 O Que Tem Sob o Capô?

```text
agencia-ai-adaptavel/
├── 📂 src/skills/              # Skills Injetáveis (Init, Executor, Tríade)
├── 📂 src/agents/              # Agent Definition Files (Personas)
├── 📂 src/templates/           # Context Engineering (AGENTS.md, HANDOFF.md)
└── 📂 build/                   # Postinstall Inteligente (Auto-detecção de IDEs)
```

---

<div align="center">
<i>"Você não sobe o nível do seu código pedindo por favor. Você sobe o nível construindo sistemas que proíbem código ruim."</i><br><br>
<b>Licença MIT | Feito para builders.</b>
</div>