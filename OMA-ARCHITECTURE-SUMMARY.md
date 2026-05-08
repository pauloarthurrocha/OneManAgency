# 🧠 Meta-Context: OneManAgency (OMA Framework)

> **Aviso para a IA leitora:** Este documento é um resumo arquitetural completo do OMA Framework. Seu objetivo é transferir 100% do contexto de desenvolvimento, inspirações, arquitetura e ferramentas acopladas para que você compreenda a magnitude e a sofisticação deste sistema.

## 🎯 1. O Objetivo do Projeto

O **OneManAgency (OMA)** não é apenas um repositório de prompts. É um framework open-source de **Engenharia Agêntica** focado no Solo Builder (Empreendedor Individual / Vibe Coder). 
O objetivo é transformar qualquer IDE de IA (Claude Code, Cursor, OpenCode, Windsurf, Aider, Roo Code, Hermes Agent) em uma fábrica de software completa, incorporando nativamente os processos das Big Techs do Vale do Silício.

O OMA resolve as maiores dores do desenvolvimento assistido por IA:
1. **Lost in the Middle (LiTM):** A IA esquece o escopo em chats muito longos.
2. **AI Slop:** Geração de interfaces genéricas e óbvias.
3. **Código sem testes (Spaghetti Code):** IAs programando sem rigor metodológico.
4. **Scope Creep:** O usuário pedindo milhares de features inúteis para o MVP.

## 🏗️ 2. Como Está Construído (Arquitetura)

O sistema é dividido em um fluxo ponta-a-ponta (End-to-End):

### A. Core Engine & CLI (TypeScript/Node)
- Instalado globalmente via NPM (`npm install -g onemanagency`).
- O instalador (`build/installer.js`) faz um **Deep Scan** nas pastas do usuário, detecta todas as 11 maiores IDEs de IA do mercado e injeta o framework nelas.
- Ele baixa os repositórios externos gigantes **uma única vez** e os armazena no cofre global (`~/.oma/`).
- O processo de inicialização (`/oma-init`) roda localmente em 0.5 segundos, sendo 100% **Offline-First** e imune a quebras de SO (Windows/Mac/Linux), pois usa ferramentas nativas de filesystem em vez de shell scripts.

### B. Context Engineering (Persistência em Disco)
Em vez de depender da memória da janela de chat, a agência escreve seu estado no disco:
- `STATE.md`: Progresso do projeto.
- `HANDOFF.md`: Usado no **PIV Loop**. A IA planeja, escreve o Handoff, pede para o usuário limpar o chat (`/clear`) e, ao retornar, a IA lê o Handoff e começa a programar com a RAM (contexto) vazia.
- `AGENTS.md`: Arquivo mestre que contém a *Wake-up Routine*, instruindo a IA sobre como se recuperar após um reinício de sessão.

### C. A Tríade de Revisão (Spec-Driven Development)
O código não é gerado a partir de um rascunho. Ele passa por 3 Skills de Revisão ("Porteiros"):
1. **CEO Review:** Corta o escopo, foca no MVP (The Wedge) e gera o `PRD.md`.
2. **Eng Review:** Trava fluxos de dados e banco de dados gerando `ARCHITECTURE.md`.
3. **Design Review:** Barra o "AI Slop" e gera o `UI-SPEC.md`.

### D. Baterias Inclusas (Zero-Config MCPs)
O `/oma-init` injeta um `.mcp.json` na raiz do projeto com ferramentas gratuitas que a IA pode usar a qualquer momento:
- `Puppeteer` (Scraping gratuito de concorrentes).
- `Context7` (Leitura de documentação atualizada de bibliotecas).
- `Sequential Thinking` (Para forçar a IA a raciocinar passo a passo ao debugar).
- `Memory` e `Fetch`.

---

## 🌟 3. Repositórios de Inspiração (A Fundação Arquitetural)
Este framework unificou a filosofia dos maiores repositórios open-source do mundo:

| Repositório | Autor / Origem | O que absorvemos para o OMA |
|---|---|---|
| **GStack** | Garry Tan (YC) | A lógica da **Tríade de Revisão** e o foco implacável em cortar escopo para chegar ao MVP (The Wedge). |
| **Superpowers** | Obra | A regra de ouro do nosso Agente Backend: **TDD Iron Law** (nunca escrever código sem um teste que falhe antes) e o uso de **Git Worktrees** para paralelismo. |
| **Get-Shit-Done (GSD)** | GSD Build | A base do **Context Engineering** (arquivos `.planning/` e `STATE.md`) para persistência de memória. |
| **Spec-Kit** | GitHub Team | A validação do **Spec-Driven Development**. Nenhum código roda sem o PRD/Arquitetura prontos. |
| **Agency-Agents** | Msitarzewski | Ensinou que "Roleplay Raso" falha. Por isso criamos arquivos rígidos em `src/agents/` (Agent Definition Files) com Mindset, SOPs e Anti-patterns claros. |
| **Impeccable** & **Taste-Skill** | P. Bakaus / Leonxlnx | Nossas barreiras Anti-AI Slop. Rejeitamos gradientes roxos, fontes genéricas e espaçamentos ruins. Foco no luxo e "Spatial Design". |
| **Filosofia Emil Kowalski** | Emil Kowal.ski | A espinha dorsal do nosso Agente de Design. Obrigamos o uso de **Spring Physics** (motion fluido) no lugar de transições lineares. |
| **Huashu Design** | Alchaincyf | O foco no *High-Fidelity Prototyping*. Exigimos código HTML/Tailwind nativo que pareça ter saído do Figma desde o primeiro dia. |

---

## 🎒 4. Ecossistema Externo de Skills (Para o Cliente Final)
Durante o `npm install -g`, o instalador do OMA puxa silenciosamente repositórios colossais de skills externas. Quando o usuário digita `/oma-init`, ele ganha todo este arsenal instantaneamente na pasta `.agents/skills/`:

1. **Marketing Skills** (by Corey Haines): 38 skills para SEO, Copywriting, Ads, Email Sequences, CRO.
2. **UI/UX Pro Max** (by NextLevelBuilder): 67 estilos de design, 161 paletas de cores, permitindo a agência gerar sistemas de design inteiros no terminal.
3. **Anthropic Skills** (by Anthropic): Ferramentas corporativas para ler PDFs, DOCX, XLSX e gerar apresentações (PPTX).
4. **Awesome Design MD** (by VoltAgent): 71+ templates de Design Systems reversos (Estilo Vercel, Stripe, Linear, Notion) para a IA usar como âncora.
5. **Antigravity Kit** (by vudovn): Agentes extras, workflows complexos e scripts de validação Python.

---

## 🔒 5. Governança e O que está Exposto no GitHub
O repositório público do GitHub está esterilizado e padronizado:

**O que está Público:**
- `bin/` e `build/`: Os executáveis e instaladores NodeJS.
- `src/skills/`: As lógicas operacionais em Markdown (`oma-executor`, `oma-init`, etc).
- `src/agents/`: As Personas rígidas (Frontend, Backend, Orchestrator, etc).
- `src/templates/`: Arquivos de estado e memória vazios.
- `docs/USER-GUIDE.md` e `README.md`: Documentação com copy otimizado para o usuário.
- `.github/ISSUE_TEMPLATE`: Formulários estruturados para report de bugs da comunidade.
- `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`: Boas práticas de open-source.

**O que está Privado / Local (Não vai para o Github):**
- `opencode-vanilla-config.json`: Configurações de API e preferência de LLM do ambiente do criador.
- `.agent/rules/AI_SELF_CORRECTION_PROTOCOL.md`: O arquivo de "aprendizado de máquina" local onde a IA armazena os erros cometidos durante o desenvolvimento para não repeti-los.
- Logs e dumps de depuração.

> **Resumo Final:** O OMA Framework é uma obra-prima arquitetural que mescla DevOps, Product Management, Design Engineering e Prompt Engineering em um ecossistema offline-first, seguro e hiper-eficiente. Ele automatiza as melhores práticas do mundo de desenvolvimento de software em uma interface de terminal simples e invisível.