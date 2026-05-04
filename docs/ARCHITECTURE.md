# Arquitetura de Instalação e Distribuição

Este documento descreve a arquitetura de três camadas do sistema **Agência AI Adaptável**, garantindo portabilidade, persistência e execução cross-IDE.

## 🏗️ As 3 Camadas de Skills

O sistema organiza as skills e recursos em três níveis de profundidade, permitindo que a inteligência do sistema esteja disponível globalmente, mas seja customizável por projeto.

### Camada 1: SSoT Global (Single Source of Truth)
**Local:** `~/.agencia-ai/`

Esta é a fonte única de verdade do sistema. É populada automaticamente pelo script `build/installer.js` durante o `postinstall` do pacote npm ou manualmente via comando CLI.

*   **Conteúdo:** `skills/`, `agents/`, `presets/`, `scripts/`, `templates/`.
*   **Propósito:** Armazenar a versão canônica de todos os recursos da agência.
*   **Atualização:** Sobrescrita apenas por novas versões do pacote ou comandos explícitos de update.

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

Esta camada é criada pela skill `agencia-init` dentro do repositório do projeto.

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
(~/.agencia-ai/)                (~/.claude/skills/...)
Popula recursos                 Detecta IDEs e copia
globais do sistema              skills (sem sobrescrever)
```

1.  **npm install:** O usuário instala o pacote `@pauloarthurrocha/agencia-ai-adaptavel`.
2.  **postinstall:** O hook de instalação do npm dispara o script de post-instalação.
3.  **installer.js:** O motor de instalação popula a Camada 1 e, em seguida, varre o sistema em busca de IDEs compatíveis para popular a Camada 2.

---

## 🛠️ Gerenciamento via CLI

O CLI `agencia-ai` oferece controle granular sobre este processo através de flags:

*   `--only <ide>`: Propaga skills apenas para uma IDE específica (ex: `--only claude`).
*   `--exclude <ide>`: Ignora IDEs específicas durante a propagação.
*   `--dry-run`: Simula a instalação e mostra o relatório do que seria feito, sem alterar arquivos.

Comando principal:
```bash
agencia-ai install-global [--only|--exclude|--dry-run]
```

---

## 🧠 Responsabilidades: CLI vs Skill

É fundamental entender a separação de papéis no sistema:

*   **CLI (`agencia-ai`):** Responsável pela infraestrutura global. Instala o sistema, gerencia a SSoT e propaga skills para as IDEs. **O CLI nunca cria arquivos dentro de projetos.**
*   **Skill (`agencia-init`):** Responsável pela infraestrutura do projeto. É executada de dentro de uma IDE e cria a estrutura de pastas, arquivos de contexto e a Camada 3 de skills. **A skill nunca instala nada fora do repositório do projeto.**

Esta separação garante que o sistema seja leve, seguro e não interfira com arquivos globais do usuário de forma inesperada.

---

## 🧰 Stack de MCPs (Model Context Protocol)

A Agência AI Adaptável utiliza uma stack de 6 MCPs otimizada para custo zero no dia a dia, com Firecrawl reservado apenas para operações avançadas.

### MCPs Gratuitos (uso diário)

| MCP | Pacote | Função |
|---|---|---|
| **web-search** | `open-websearch@latest` | Pesquisa web multi-engine (9 motores: Bing, DuckDuckGo, Brave, Exa, etc.) + fetch de conteúdo. Sem API key. |
| **playwright** | `@playwright/mcp` | Automação de browser local (Chromium). Testes, screenshots, páginas JS-renderizadas. Zero custo. |
| **context7** | Remote `mcp.context7.com/mcp` | Documentação atualizada de bibliotecas e frameworks. Rate limit gratuito. |
| **sequential-thinking** | `@modelcontextprotocol/server-sequential-thinking` | Raciocínio estruturado para problemas complexos (arquitetura, debug, algoritmos). |
| **github** | `@modelcontextprotocol/server-github` | PRs, issues, busca de código. Usa token do `gh` CLI. |

### MCP Pago (uso reservado)

| MCP | Pacote | Função | Quando usar |
|---|---|---|---|
| **firecrawl** | `firecrawl-mcp` | Crawl multi-página, map de URLs, extração estruturada | Só quando `web-search` não cobre |

### Regra de Prioridade

```
1. web-search (grátis) → busca web + fetch de páginas
2. playwright (grátis) → páginas com JS pesado, screenshots
3. context7 (grátis) → documentação de libs
4. firecrawl (pago) → APENAS crawl/map/extract
```

### Arquivos de Configuração

| Arquivo | Local | Propósito |
|---|---|---|
| `opencode.json` | `~/.config/opencode/` | Config oficial MCPs + modelo (OpenCode) |
| `settings.json` | `~/.opencode/` | System prompt + instruções (OpenCode) |
| `mcp.json` | `.roo/mcp.json` | MCPs para Roo Code |
| `opencode-vanilla-config.json` | Projeto | Template de referência |
