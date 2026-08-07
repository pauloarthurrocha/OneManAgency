# Setup Steps (OMA Init)

Este arquivo contém o roteiro técnico (Step 1 a Step 14) que o agente `oma-init` deve executar para inicializar o projeto.

### Step 1: Descobrir o IDE Ativo

Execute comandos no terminal para detectar qual IDE chamou o script (útil se você puder executar bash e injetar `echo $TERM_PROGRAM`).
Geralmente, o agente já sabe por onde foi invocado. Defina a variável local `IDE_NOME`.

### Step 2: Checar se a pasta está vazia

Verifique se a pasta já tem arquivos (ignorando pastas ocultas como `.git`). 
Se não estiver, avise o cliente, mas prossiga.

### Step 3: Propagação de Skills (Cross-IDE)

Para garantir continuidade entre IDEs:
- Crie `.agents/skills` e copie todo conteúdo de `~/.oma/skills`.
- Crie `.agents/agents` e copie todo conteúdo de `~/.oma/agents`.
- Se `~/.oma/skills` ou `~/.oma/agents` não existirem, crie as pastas locais vazias e avise: o usuário precisa rodar `oma install`.
- Use ferramentas nativas de filesystem da IDE ou Node.js (`fs.cpSync`) para funcionar em Windows, macOS e Linux. Não dependa de `cp`, `mkdir -p` ou redirecionamentos Bash.

### Step 4: Clonar Skills Externas

Sincronize o cache global baixado pelo installer:
- `~/.oma/external/awesome-design-md` → `.agents/design-library`
- diretórios dentro de `~/.oma/external/*` que contenham `SKILL.md` → `.agents/skills/<nome-da-skill>`

Depois rode CLIs opcionais, se disponíveis:
```bash
npx -y uipro-cli init --ai ACTIVE_IDE --global
npx -y @vudovn/ag-kit init --force --quiet
```

Substitua `ACTIVE_IDE` por `claude`, `codex`, `cursor`, `antigravity`, `gemini-cli`, `roo`, `opencode` ou `generic`. Se o comando falhar por rede ou pacote ausente, avise e continue com o cache offline.

### Step 5: Arquivos de IDE (CLAUDE.md / GEMINI.md / .cursor/rules)

O `AGENTS.md` será criado via cópia no Step 9. Depois disso:
- Copie `AGENTS.md` para `CLAUDE.md` e `GEMINI.md`.
- Copie `AGENTS.md` para `.cursor/rules/project.mdc`.
- Se o projeto usar Codex, mantenha `AGENTS.md` na raiz; se usar Windsurf/Cline/Roo, preserve também `.agents/skills` e `.agents/agents` como fonte cross-IDE.

### Step 6: Configurar MCPs (Zero-Config)

Crie o arquivo `.mcp.json` na raiz:
```json
{
  "mcpServers": {
    "context7": { "command": "npx", "args": ["-y", "@upstash/context7-mcp"] },
    "sequential-thinking": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"] },
    "playwright": { "command": "npx", "args": ["-y", "@executeautomation/playwright-mcp-server"] },
    "memory": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-memory"] },
    "fetch": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-fetch"] }
  }
}
```

### Step 7: Git Init

Execute `git init` e mude a branch padrão para `main`.

### Step 8: .gitignore

Crie `.gitignore`:
```gitignore
node_modules/
.env*
!.env.example
.DS_Store
dist/
build/
```

### Step 9: Context Engineering (Copiar Templates Globais)

Copie da pasta `~/.oma/templates/`:
- `AGENTS.md.template` → `./AGENTS.md` (Fonte Única da Verdade contendo Stack do Projeto + Protocolos Universais)
- `PROJECT.md.template` → `./.agents/rules/PROJECT.md` (Alias/Playbook adicional)
- `STATE.md.template` → `./.planning/STATE.md`
- `discovery-notes.md.template` → `./.planning/discovery-notes.md`
- `CHANGELOG_LLM.md.template` → `./.planning/CHANGELOG_LLM.md`
- `CONTEXT_SNIPPET.md.template` → `./.planning/CONTEXT_SNIPPET.md`

### Step 10: Graphify Init (Opcional)

Se existir, instancie graphify no projeto.

### Step 11: Inicializar Templates de Estado

Substitua placeholders no `STATE.md`, `discovery-notes.md` e `CONTEXT_SNIPPET.md` com data atual e nome da pasta.

### Step 12: Criar PIPELINE.md vazio

Crie `.planning/PIPELINE.md` com status Vazio para aguardar o client-onboarding.

### Step 13: Preparar README.md

Crie o `README.md` vazio com referências à stack.

### Step 14: Commit Inicial

```bash
git add .
git commit -m "chore(init): onemanagency scaffold"
```
