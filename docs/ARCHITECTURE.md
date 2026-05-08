# Arquitetura de Instalação e Distribuição

Este documento descreve a arquitetura de três camadas do sistema **OneManAgency**, garantindo portabilidade, persistência e execução cross-IDE.

## 🏗️ As 3 Camadas de Skills

O sistema organiza as skills e recursos em três níveis de profundidade, permitindo que a inteligência do sistema esteja disponível globalmente, mas seja customizável por projeto.

### Camada 1: SSoT Global (Single Source of Truth)
**Local:** `~/.oma/`

Esta é a fonte única de verdade do sistema. É populada automaticamente pelo script `build/installer.js` durante o `postinstall` do pacote npm ou manualmente via comando CLI.

*   **Conteúdo:**
    *   `skills/` — 9 skills core OMA (oma-init, oma-executor, client-onboarding, oma-ceo-review, oma-eng-review, oma-design-review, pipeline-generator, oma-verify-work, oma-release-manager)
    *   `agents/` — 15 personas (frontend/backend/database/devops/security/seo/test-engineer/copywriter/design-specialist/orchestrator + code-reviewer/accessibility-auditor/performance-engineer/reality-checker/mcp-builder)
    *   `templates/` — context engineering templates (AGENTS, PROJECT, STATE, discovery-notes, CHANGELOG_LLM, CONTEXT_SNIPPET)
    *   `scripts/` — Python validation scripts (checklist.py, verify_all.py)
    *   `external/` — repos clonados via git no install: awesome-design-md, marketing-skills, anthropic-skills
*   **Ferramentas Globais Complementares:** Além do diretório `~/.oma/`, o instalador garante que CLIs globais de terceiros (como `uipro-cli` para o UI/UX Pro Max e `@vudovn/ag-kit` para o Antigravity Kit) estejam instalados no sistema via NPM para serem injetados nos projetos de forma contextualizada.
*   **Propósito:** Armazenar a versão canônica de todos os recursos da agência + skills externas curadas.
*   **Atualização:** Sobrescrita apenas por novas versões do pacote ou comandos explícitos (`oma update`).

### Camada 2: Propagação para IDEs
**Locais:**
*   `~/.claude/skills/`
*   `~/.cursor/skills/`
*   `~/.opencode/skills/`
*   `~/.codex/skills/`
*   `~/.gemini/antigravity/skills/`
*   `~/.gemini/skills/`

O instalador detecta quais IDEs estão presentes no sistema e propaga as skills da Camada 1 para as pastas de skills específicas de cada ferramenta.

*   **Idempotência:** Pode ser executado múltiplas vezes sem efeitos colaterais.
*   **Não-Destrutivo para skills de terceiros:** O sistema **NUNCA** sobrescreve skills existentes nestas pastas que não pertençam à Agência AI. Skills core da agência são atualizadas (substituídas) para garantir consistência de versão. Skills instaladas por outros meios são preservadas.

### Camada 3: Projeto Local (Repo do Cliente)
**Locais:** `.agents/skills/`, `.claude/skills/`, `.codex/skills/`, etc.

Esta camada é criada pela skill `oma-init` dentro do repositório do projeto.

*   **Persistência:** Estas pastas são commitadas no Git do projeto.
*   **Continuidade:** Permite que diferentes desenvolvedores (ou o mesmo desenvolvedor em máquinas diferentes) tenham acesso às mesmas skills do projeto, independentemente da instalação global.
*   **Prioridade:** As IDEs priorizam as skills encontradas dentro da pasta do projeto.

---

## 🔄 Fluxo de Instalação

O processo de instalação segue um fluxo automatizado para garantir que o sistema esteja pronto para uso imediatamente após o download.

```text
[npm install] ou [install.sh/ps1]
       │
       ▼
[postinstall] ──► [node build/postinstall.js]
                       │
                       ▼
             [build/installer.js]
                       │
       ┌───────────────┴───────────────┐
       │                               │
       ▼                               ▼
[Camada 1: SSoT]                [Camada 2: IDEs]
(~/.oma/)                (~/.claude/skills/...)
Popula recursos                 Detecta IDEs e copia
globais do sistema              skills (sem sobrescrever)
```

1.  **npm install:** O usuário instala o pacote `@pauloarthurrocha/onemanagency`.
2.  **postinstall:** O hook de instalação do npm dispara o script de post-instalação.
3.  **installer.js:** O motor de instalação popula a Camada 1 e, em seguida, varre o sistema em busca de IDEs compatíveis para popular a Camada 2.

---

## 🛠️ Gerenciamento via CLI

O CLI `oma` oferece controle granular sobre este processo através de flags:

*   `--only <ide>`: Propaga skills apenas para uma IDE específica (ex: `--only claude`).
*   `--exclude <ide>`: Ignora IDEs específicas durante a propagação.
*   `--dry-run`: Simula a instalação e mostra o relatório do que seria feito, sem alterar arquivos.

Comando principal:
```bash
oma install [--only|--exclude|--dry-run]
```

---

## 🧠 Responsabilidades: CLI vs Skill

É fundamental entender a separação de papéis no sistema:

*   **CLI (`oma`):** Responsável pela infraestrutura global. Instala o sistema, gerencia a SSoT e propaga skills para as IDEs. **O CLI nunca cria arquivos dentro de projetos.**
*   **Skill (`oma-init`):** Responsável pela infraestrutura do projeto. É executada de dentro de uma IDE e cria a estrutura de pastas, arquivos de contexto e a Camada 3 de skills. **A skill nunca instala nada fora do repositório do projeto.**

Esta separação garante que o sistema seja leve, seguro e não interfira com arquivos globais do usuário de forma inesperada.

---

## 🧰 Stack de MCPs (Model Context Protocol)

A OneManAgency utiliza uma stack de 6 MCPs otimizada para custo zero no dia a dia, com Firecrawl reservado apenas para operações avançadas.

### Stack Canônica Zero-API (injetada pelo `oma-init` em `.mcp.json`)

| MCP | Pacote | Função |
|---|---|---|
| **context7** | `@upstash/context7-mcp` | Docs atualizadas de libs/frameworks. Anti-código-depreciado. Rate limit gratuito. |
| **sequential-thinking** | `@modelcontextprotocol/server-sequential-thinking` | Raciocínio estruturado passo-a-passo (debug, arquitetura, algoritmos). |
| **playwright** | `@executeautomation/playwright-mcp-server` | Browser automation local (Chromium). Screenshots, scraping, páginas JS. |
| **memory** | `@modelcontextprotocol/server-memory` | Knowledge graph persistente entre sessões. |
| **fetch** | `@modelcontextprotocol/server-fetch` | HTTP/JSON simples (read-only). |

**Por que essa stack?** Todos rodam via `npx` sem nenhuma variável de ambiente. O usuário roda `/oma-init` e em segundos a IA tem: docs atualizadas, raciocínio estruturado, browser, memória persistente e HTTP. Zero atrito de onboarding.

### MCPs Opcionais (com API key — adicionar manualmente)

| MCP | Pacote | Função | Quando usar |
|---|---|---|---|
| **brave-search** | `@brave/brave-search-mcp-server` | Pesquisa web | Research de mercado profundo |
| **firecrawl** | `firecrawl-mcp` | Crawl multi-página | Quando playwright não escala |
| **github** | `@modelcontextprotocol/server-github` | PRs, issues, busca de código | Workflows automatizados de PR |

### Arquivos de Configuração

| Arquivo | Local | Propósito |
|---|---|---|
| `opencode.json` | `~/.config/opencode/` | Config oficial MCPs + modelo (OpenCode) |
| `settings.json` | `~/.opencode/` | System prompt + instruções (OpenCode) |
| `mcp.json` | `.roo/mcp.json` | MCPs para Roo Code |
| `opencode-vanilla-config.json` | Projeto | Template de referência |
