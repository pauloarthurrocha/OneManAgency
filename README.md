# Agencia AI Adaptavel — Skills

> **Repo:** github.com/pauloarthurrocha/agencia-ai-adaptavel-skills
> **Visibilidade:** Privado
> **Formato:** Agent Skills (SKILL.md)

---

## 🎯 Proposito

Este repositorio contem as skills internas da Agencia AI Adaptavel. Sao instrucoes especializadas que nossos agentes de codigo usam para executar o workflow de 7 fases.

---

## 📦 Skills Disponiveis

| Skill | Versao | Descricao |
|---|---|---|
| `agencia-init` | v2.3 | Inicializacao de projetos com Context Engineering, deteccao cross-IDE, auto-install de skills externos e MCPs |
| `agencia-executor` | v2.0 | Executor automatico do workflow de 7 fases com carregamento inteligente de skills |

---

## 🚀 Como Usar

### Em um projeto novo

```bash
# Via git clone (fallback)
git clone https://github.com/pauloarthurrocha/agencia-ai-adaptavel-skills.git
```

Ou usar o `agencia-init` que baixa automaticamente:
```bash
skill(name="agencia-init")
```

---

## 🔄 Fluxo Completo (Como as Skills Se Conectam)

```
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 0: Usuario abre pasta vazia em qualquer IDE              │
│  (OpenCode, Claude, Antigravity, Codex, Cursor)                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 1: skill(name="agencia-init")                            │
│                                                                  │
│  • Detecta IDE automaticamente (ls ~/.opencode/, ~/.claude/,    │
│    ~/.gemini/, ~/.codex/, ~/.cursor/)                           │
│                                                                  │
│  • Instala skills externos (com fallback inteligente):          │
│    ├─ Antigravity Kit  → npx @vudovn/ag-kit init                │
│    ├─ Marketing Skills → skills add coreyhaines31/marketingskills│
│    └─ Design Skills    → skills add nextlevelbuilder/ui-ux-pro-max│
│                          skills add anthropics/skills/frontend-design│
│                          skills add Leonxlnx/taste-skill        │
│                          skills add vercel-labs/agent-skills    │
│                          skills add Dammyjay93/interface-design │
│                                                                  │
│  • Cria estrutura cross-IDE:                                    │
│    ├─ .agents/skills/     ← Skills da agencia (repo-scoped)    │
│    ├─ .claude/skills/     ← Copia para Claude Code             │
│    ├─ .codex/skills/      ← Copia para Codex                   │
│    └─ .gemini/antigravity/skills/ ← Copia p/ Antigravity       │
│                                                                  │
│  • Cria arquivos de contexto:                                   │
│    ├─ AGENTS.md           ← Protocolos universais              │
│    ├─ CLAUDE.md           ← Copia de AGENTS.md (Claude Code)   │
│    ├─ .mcp.json           ← MCPs: Brave, Playwright, Firecrawl │
│    ├─ .agent/rules/PROJECT.md ← Fonte canonica do projeto      │
│    ├─ .planning/STATE.md  ← Estado atual                       │
│    ├─ .planning/discovery-notes.md ← Memoria dinamica          │
│    ├─ .planning/CHANGELOG_LLM.md   ← Changelog para IAs        │
│    └─ .planning/CONTEXT_SNIPPET.md ← Snippet para IAs externas │
│                                                                  │
│  • Git init + .gitignore + .env.local template                  │
│                                                                  │
│  • Commit inicial com TUDO                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 2: skill(name="agencia-executor")                        │
│                                                                  │
│  • Detecta IDE novamente (ACTIVE_TOOL)                          │
│  • Le .planning/STATE.md para saber a fase atual               │
│  • Detecta fase automaticamente (BRIEFING.md existe? etc.)     │
│  • Carrega skills da fase (prioridade: repo → tool → global)   │
│  • Pergunta ao usuario antes de executar                        │
│  • Executa a fase com skills carregadas                         │
│  • Apos concluir: atualiza STATE.md + discovery-notes.md       │
│    + CHANGELOG_LLM.md                                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PASSO 3: Usuario troca de IDE (ex: OpenCode → Codex)          │
│                                                                  │
│  • Abre mesmo projeto no Codex                                  │
│  • Codex le .codex/skills/ (copiados do repo)                  │
│  • Le .planning/STATE.md → sabe que esta na Fase 2             │
│  • Le .planning/discovery-notes.md → regras aprendidas         │
│  • Continua de onde parou!                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔒 Privacidade

Este repositorio e **privado**. Nao compartilhe skills externamente sem autorizacao.
