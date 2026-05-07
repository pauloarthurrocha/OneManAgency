# 📘 OMA Framework — User Guide

O **OneManAgency (OMA)** transforma a sua IDE de IA favorita em uma agência completa de software, desde a concepção (Product Management) até o Deploy.

---

## ⚡ 1. Instalação & Setup

O OMA é distribuído como um pacote global do Node.js, e o script de instalação se encarrega de detectar suas IDEs e CLIs (Claude Code, Cursor, OpenCode, Codex, Windsurf, Aider, Roo, Goose, Hermes Agent, OpenClaw) e injetar as skills automaticamente.

### Pré-requisitos
- Node.js >= 18
- Git

### Instalação (Mac/Linux/Windows)
```bash
npm login --registry=https://npm.pkg.github.com
npm install -g @pauloarthurrocha/onemanagency --registry=https://npm.pkg.github.com
```

Para verificar se a instalação deu certo, rode no terminal:
```bash
oma doctor
```

---

## 🚀 2. O Ciclo de Vida End-to-End (E2E)

Nós dividimos a criação de software no padrão do Vale do Silício. Diferente de outras ferramentas, **o OMA obriga você a pensar no negócio antes de codar.**

### Passo 1: Inicializando o Terreno (Infra Sênior)
Crie uma pasta vazia, abra-a no seu IDE de IA (ex: Claude Code) e rode:
```bash
skill(name="oma-init")
```
*O que acontece:* O agente DevOps entra em ação. Ele não cria código. Ele cria o `Context Engineering` (`STATE.md`, `AGENTS.md`) e prepara o terreno. Ao final, ele passa o bastão para o Arquiteto Socrático.

### Passo 2: O Embate (Onboarding & Discovery)
A IA invoca automaticamente o onboarding.
*O que acontece:* Ela assume a persona de um **YC Partner**. Se você disser "Quero um app igual ao Uber mas para pets", ela vai te questionar: *"Qual a dor real? Quem paga a conta no dia 1? Vamos focar só em um mapa simples primeiro."*
- **Output:** O arquivo `.planning/BRIEFING.md`.

### Passo 3: A Tríade de Revisão (Gatekeepers de Qualidade)
A IA não pula direto para código. O Briefing passa por três filtros duríssimos:
1. **CEO Review:** Corta "features legais" que não geram receita. Gera o `PRD.md`.
2. **Eng Review:** Trava arquitetura, fluxos e edge cases. Gera o `ARCHITECTURE.md`.
3. **Design Review:** Usa frameworks como *Impeccable* e *Taste-Skill* para banir designs genéricos de IA ("AI Slop"). Define motion e tokens em `UI-SPEC.md`.

### Passo 4: O Mapa de Execução
O `pipeline-generator` quebra toda a arquitetura validada em micro-tarefas de 1 a 2 horas (Sprints) e gera o `PIPELINE.md`.

### Passo 5: Execução Isolada (O PIV Loop e TDD)
Aqui entra o `oma-executor`. 
*O que acontece:* Ele não joga código sujo.
1. Ele olha a próxima fase no PIPELINE.
2. Faz o plano de execução e gera o `HANDOFF.md`.
3. **Hard Stop:** Ele obriga você a limpar o chat (dar um `/clear` ou nova janela).
4. No chat limpo, os Especialistas entram em ação. O Backend é forçado a usar **TDD Raiz** (Red-Green-Refactor) e o Frontend foca em acessibilidade e fidelidade visual.

### Passo 6: QA e Lançamento
- O `oma-verify-work` age como QA Tester.
- Se o projeto acabou, o `oma-release-manager` arruma o README, prepara o Changelog oficial e ajuda você a fazer o Deploy.

---

## 🛠️ Como Mudar de IDE no Meio do Projeto
O OMA brilha no **Cross-IDE Continuity**. 
Se você cansar do terminal (Claude Code) e quiser ir pro Cursor:
1. Abra a pasta do projeto no Cursor.
2. Como a pasta `.agents/skills` foi criada dentro do seu projeto pelo `oma-init`, o Cursor já enxergará todas as skills e personas do OMA automaticamente.
3. Peça para a IA: *"Continue a fase atual"*. Ela lerá o `STATE.md` e o `HANDOFF.md` e assumirá o trabalho exatamente de onde o Claude Code parou.