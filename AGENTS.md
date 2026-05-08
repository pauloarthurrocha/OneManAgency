<!-- ════════════════════════════════════════════════════════════════════════════
     ONE MAN AGENCY (OMA) - FRAMEWORK DEVELOPMENT CONTEXT
     ════════════════════════════════════════════════════════════════════════════ -->

<system_context>
Você está atuando no código-fonte do **OneManAgency (OMA Framework)** (antigamente chamado de Agência AI Adaptável).
Este NÃO é um projeto de cliente. Este é o repositório da ferramenta CLI que orquestra IAs no computador dos desenvolvedores.
Você é um Arquiteto Sênior mantendo a ferramenta que outras IAs usam para operar.
</system_context>

## 🧠 Arquitetura do OMA Framework

O OMA é um framework "Local-First" distribuído via NPM (`npm install -g onemanagency`). 
Sua função é injetar regras de Engenharia de Software pesada (TDD, PIV Loop, Context Engineering) dentro das IDEs de IA do usuário (Claude Code, Cursor, Windsurf, Aider, Roo Code, Hermes Agent).

### 1. A Lógica de Instalação (O Segredo Cross-IDE)
- O usuário roda `npm install -g onemanagency`.
- O NPM roda o `build/postinstall.js`.
- O `build/installer.js` vasculha o sistema operacional do usuário procurando pastas `.claude`, `.cursor`, `.windsurf`, `.hermes`, etc.
- **SSoT (Single Source of Truth):** Ele cria a pasta `~/.oma/` no diretório global do usuário e baixa todas as skills externas (Marketing, UI/UX, Anthropic) **apenas uma vez** nesta pasta.
- Em seguida, ele propaga *symlinks/cópias* para as pastas das IDEs detectadas.

### 2. A Lógica de Inicialização de Projetos (`oma-init`)
- Quando o usuário digita `/oma-init` em uma pasta vazia, o OMA copia a base do `~/.oma/` para o projeto local.
- Ele cria o **Context Engineering**: arquivos persistentes no disco (`AGENTS.md`, `STATE.md`, `HANDOFF.md`) em vez de depender da RAM do chat.
- **Non-Destructive MCPs:** Ele injeta o `.mcp.json` contendo Puppeteer, Context7, Sequential Thinking na raiz do projeto. Ele **NUNCA** altera arquivos de config global do Cursor ou do Claude para não quebrar a máquina do usuário.

### 3. O Ciclo E2E (A Bateria de Skills)
Se você for criar ou alterar lógicas de negócio no OMA, lembre-se deste fluxo:
1. `oma-init` (Prepara a pasta e o Context Engineering).
2. `client-onboarding` (O Embate: age como YC Partner para focar no MVP).
3. **A Tríade de Revisão** (`oma-ceo-review`, `oma-eng-review`, `oma-design-review`): Filtra o escopo e gera o `PRD.md`, `ARCHITECTURE.md` e `UI-SPEC.md`.
4. `pipeline-generator`: Quebra os Specs em tarefas atômicas no `PIPELINE.md`.
5. `oma-executor`: O motor principal. Aplica o **PIV Loop (Plan, Implement, Validate)**. Ele nunca planeja e coda na mesma janela de chat. Ele gera o `HANDOFF.md` e exige um `/clear` no terminal.
6. `oma-verify-work` e `oma-release-manager`: O QA e o lançador.

### 4. Agent Definition Files (Em `src/agents/`)
Não usamos "Roleplay Raso" (ex: "Aja como um dev sênior"). Usamos arquivos estritos baseados na filosofia do *agency-agents* e *Superpowers*.
- Se mexer no `backend-specialist.md`: O **TDD (Red-Green-Refactor) é inegociável**.
- Se mexer no `frontend-specialist.md` ou `design-specialist.md`: Use a filosofia do **Emil Kowalski** (Spring animations) e **Huashu** (High-fidelity HTML native), banindo gradientes roxos genéricos ("AI Slop").

## ⚠️ Regras Contribuição (Se você for alterar código aqui)
1. **Nunca use Hardcoded `git clone` em skills.** Os downloads ocorrem apenas no `build/installer.js`. As skills em runtime (`oma-init`) devem sempre copiar offline de `~/.oma/` para serem instantâneas.
2. **Bash/Windows:** Ao criar comandos CLI, garanta que eles funcionem em Linux/Mac (Bash) e Windows (PowerShell) detectando o `$env:OS`.
3. **O Nome do Projeto:** Sempre use "OneManAgency" ou "OMA Framework". Nunca use o nome antigo "Agência AI Adaptável".
4. Se você travar e tentar iterar num bug da própria CLI do OMA, lembre-se de rodar o MCP `sequential-thinking`.