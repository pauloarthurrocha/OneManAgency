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
*   **Não-Destrutivo:** O sistema **NUNCA** sobrescreve skills existentes nestas pastas. Se uma skill com o mesmo nome já existir, ela é preservada para respeitar customizações do usuário.

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
