<div align="center">

# 🤖 OneManAgency (v4.0)

**O framework open-source para você construir software como se tivesse uma agência inteira trabalhando para você.**<br>
*Orquestração Multi-LLM, Context Engineering nativo, PIV Loop e TDD para Claude Code, OpenCode, Cursor, Windsurf, Aider, Hermes Agent, Roo Code e Gemini CLI.*

[![npm version](https://img.shields.io/badge/npm-v4.0.0-CB3837?style=for-the-badge&logo=npm)](https://github.com/pauloarthurrocha/OneManAgency)
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

---

## ⚡ Instalação 

Nosso script detecta automaticamente a IDE ou CLI que você usa (`.claude`, `.opencode`, `.cursor`, `.roo`, `.gemini`, `.windsurf`, `.aider`, `.cline`) e injeta as skills lá dentro.

```bash
# Autenticar no GitHub Packages (apenas uma vez)
npm login --registry=https://npm.pkg.github.com

# Instalar globalmente na sua máquina
npm install -g @pauloarthurrocha/onemanagency --registry=https://npm.pkg.github.com
```

---

## 🚀 Como Funciona na Prática

Você não precisa ficar digitando dezenas de comandos. O OMA tem "Autonomous Skill Chaining". A IA guia o processo.

### 1. O Setup
Crie uma pasta vazia para o seu novo produto e chame o Engenheiro de Infraestrutura (oma-init).
```bash
mkdir meu-novo-saas && cd meu-novo-saas
skill(name="oma-init")
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

Dizer *"aja como um sênior"* no começo de um prompt não funciona. O OMA usa `Agent Definition Files` estritos em `src/agents/`. São arquivos que dizem exatamente o que o agente odeia e como ele opera:

- **Design Specialist:** Baseado na filosofia do Emil Kowalski. Ele sabe que "bom gosto se treina". Ele usa *spring animations* em vez de transições lineares duras.
- **Frontend Specialist:** Acessibilidade nativa. Skeletons e Error states são obrigatórios. A âncora de design não pode ser quebrada.
- **Backend Specialist:** Segue a "TDD Iron Law". Se tentar fazer gambiarra, o arquivo de persona barra.
- **Lead Orchestrator:** Em refatorações gigantes, ele abre repositórios paralelos (Git Worktrees) e bota os agentes pra codar lá sem quebrar a sua branch principal.

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