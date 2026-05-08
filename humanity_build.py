import os

readme_content = """<div align="center">

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
</div>"""

with open("README.md", "w", encoding="utf-8") as f:
    f.write(readme_content)

print("Updated README.md with more human voice")

user_guide_content = """# 📘 OMA Framework — User Guide

Bem-vindo. Se você está aqui, é porque você quer focar no que importa (o produto) e deixar a IA lidar com o peso do desenvolvimento. Mas você também não quer abrir mão do controle arquitetural.

Este guia é como um manual de sobrevivência de como usar o **OneManAgency (OMA)** na sua IDE.

---

## ⚡ 1. Instalação & Setup

O OMA é um pacote global do Node.js. O script de instalação faz o trabalho sujo de detectar quais ferramentas você já tem (Claude Code, Cursor, OpenCode, Codex, Windsurf, Aider, Roo, Goose, Hermes Agent, OpenClaw) e injeta o cérebro lá.

### Pré-requisitos
- Node.js >= 18
- Git (usado como fallback para baixar alguns recursos offline)

### Instalando na sua máquina
```bash
npm login --registry=https://npm.pkg.github.com
npm install -g @pauloarthurrocha/onemanagency --registry=https://npm.pkg.github.com
```

Para confirmar se deu tudo certo:
```bash
oma doctor
```

---

## 🚀 2. Como usar o OMA no dia a dia (Ciclo E2E)

Nós não começamos abrindo um arquivo `.tsx` ou `.py`. O OMA te força a ser um Product Manager primeiro. 

### Passo 1: O Terreno
Crie uma pasta vazia. Abra ela no seu terminal com a sua IA ligada e rode:
```bash
skill(name="oma-init")
```
*O que acontece:* Ele vai montar os arquivos ocultos que o OMA usa para ter "memória de longo prazo" (`STATE.md`, diretórios escondidos). 

### Passo 2: A Entrevista
A própria IA vai emendar para o próximo passo.
*O que acontece:* Ela vira seu "co-founder" chato. Ela vai perguntar o que você quer construir e vai ativamente tentar cortar as features malucas que você propor. Responda as perguntas dela no chat até chegarem a um consenso.
- **Entregável:** Ela vai gerar um `.planning/BRIEFING.md` lindão.

### Passo 3: Os Advogados do Diabo
O Briefing não vai direto pra fábrica. Ele passa por 3 auditorias automatizadas:
1. **CEO Review:** Valida se a ideia dá dinheiro/valor. Gera o `PRD.md` (Product Requirements Document).
2. **Eng Review:** Pensa em como a infra cai e como o banco conecta. Gera o `ARCHITECTURE.md`.
3. **Design Review:** Garante que o frontend não vai parecer feito num bootcamp em 2018. Define motion e cores em `UI-SPEC.md`.

### Passo 4: O Sprint
O `pipeline-generator` quebra esse monolito em tarefas de no máximo 2 horas. Ele cria o seu roteiro no `PIPELINE.md`.

### Passo 5: Mãos na Massa (O PIV Loop)
Chegou a hora de codar. Você aciona o `oma-executor`. 
A IA vai ler o Pipeline, bolar o plano de ataque e gerar um `HANDOFF.md`.
**Aí ela para.** Ela vai te pedir para dar um `/clear` no chat. 

**Faça isso. Confie no método.**
Quando você limpa o chat e diz "resume", a IA nasce de novo. Mas como ela é configurada pelo OMA, ela olha para os arquivos invisíveis, lembra de tudo, e começa a programar com a mente 100% livre.
O Especialista Backend vai rodar TDD e não vai aceitar commitar sem teste.

### Passo 6: QA e Lançamento
O `oma-verify-work` age como seu testador e te enche o saco se algo quebrar.
Quando acabar, o `oma-release-manager` limpa a casa, escreve um README pro usuário e diz: *Pode lançar.*

---

## 🛠️ Dica de Ouro: Cross-IDE

Sabe quando você começa um app no terminal do Claude Code de manhã, mas à tarde prefere abrir a interface gráfica do Cursor ou do Windsurf porque precisa ver o código?

**Com o OMA, você não perde o contexto.**
Como o `oma-init` jogou toda a inteligência e memória do projeto em pastas físicas dentro do seu repositório (ex: `.agents/skills`), o Cursor vai abrir o projeto e já vai enxergar o `STATE.md` e o `HANDOFF.md`.

É só falar pro Cursor: *"Continue de onde eu parei"* e ele vai pegar o bonde exatamente do ponto que o Claude Code deixou de manhã.

Aproveite a autonomia. E não pule os testes!
"""

with open("docs/USER-GUIDE.md", "w", encoding="utf-8") as f:
    f.write(user_guide_content)

print("Updated docs/USER-GUIDE.md")
