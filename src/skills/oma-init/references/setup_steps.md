# Setup Steps (OMA Init)

Este arquivo contém o roteiro técnico (Step 1 a Step 14) que o agente `oma-init` deve executar para inicializar o projeto.

### Step 1: Descobrir o IDE Ativo

Execute comandos no terminal para detectar qual IDE chamou o script (útil se você puder executar bash e injetar `echo $TERM_PROGRAM`).
Geralmente, o agente já sabe por onde foi invocado. Defina a variável local `IDE_NOME`.

### Step 2: Checar se a pasta está vazia

Verifique se a pasta já tem arquivos (ignorando pastas ocultas como `.git`). 
Se não estiver, avise o cliente, mas prossiga.

### Step 3: Propagação de Skills (Cross-IDE)

Para garantir continuidade entre IDEs, criar pasta `.agents/skills` local e copiar os arquivos.
Se as skills não estiverem no cache global em `~/.oma/skills`, crie pastas em branco e avise.

### Step 4: Clonar Skills Externas

```bash
# 1. Awesome Design MD
mkdir -p .agents/design-library

# 2. Marketing Skills
mkdir -p .agents/skills

# 3. UI/UX Pro Max (Via Oficial CLI)
npx -y uipro-cli init --ai "$IDE_NOME" --global 2>/dev/null

# 4. Anthropic Skills
mkdir -p .agents/skills

# 5. Antigravity Kit (Via Oficial CLI)
npx -y @vudovn/ag-kit init --force --quiet 2>/dev/null
```

### Step 5: Arquivos de IDE (CLAUDE.md / GEMINI.md / .cursor/rules)

O `AGENTS.md` será criado via cópia no Step 9. Depois disso:
- Copie `AGENTS.md` para `CLAUDE.md` e `GEMINI.md`.
- Copie `AGENTS.md` para `.cursor/rules/project.mdc`.

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
- `AGENTS.md.template` → `./AGENTS.md`
- `PROJECT.md.template` → `./.agent/rules/PROJECT.md`
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