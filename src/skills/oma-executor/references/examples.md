# OMA Executor - Referências e Exemplos

## 7. Exemplos (Few-Shot)

### Exemplo 1 — Novo projeto (sem PIPELINE.md)

**User:** Execute a próxima fase.
**AI:** Lê `.planning/PIPELINE.md`.
Arquivo não existe ou está vazio (status "Vazio").
**Output:**
```
⏸️ O projeto ainda não possui um PIPELINE.md estruturado.
O PIPELINE é o mapa dinâmico de desenvolvimento que define as fases, agentes e skills necessárias.

Você precisa acionar o Arquiteto Socrático primeiro:
1. Digite `/client-onboarding` para definir escopo e stack
2. Ou, se já tem as regras no projeto, chame o `/pipeline-generator`

Deseja que eu acione o `/client-onboarding` para você agora?
```

### Exemplo 2 — Retomando (fase 3 pendente)

**User:** /oma-executor
**AI:** Lê `.planning/PIPELINE.md`. Fases 1 e 2 estão com `[X]`. Fase 3 está com `- [ ] Fase 3: Scaffold Database`. Skills: `database-design`.
Lê `.planning/STATE.md`. Última fase: Fase 2.
**Output:**
```
⏳ **Onde Paramos:**
A última execução foi a Fase 2 (Auth config). Tudo verde.

🚀 **Próxima Fase: Fase 3 — Scaffold Database**
- Skills ativadas: database-design
- Arquivos esperados: prisma/schema.prisma

Posso executar a Fase 3 agora? [Y/n]
```

### Exemplo 3 — Arquivos incompletos (Pre-execution fail)

**User:** Execute a Fase 4 (Core feature).
**AI:** Lê PIPELINE.md. Fase 4 exige `.planning/UI-SPEC.md` e `.planning/PRD.md`.
Verifica arquivos. `UI-SPEC.md` não existe.
**Output:**
```
⚠️ **Arquivos Ausentes!**
A Fase 4 requer definições prévias que não foram geradas:
- ❌ `.planning/UI-SPEC.md` não encontrado.

Se pularmos isso, o código será gerado às cegas (AI Slop). Você precisa voltar e executar o `/gsd-ui-phase` (ou `/oma-design-review`) primeiro.

Posso executar o agente de Design para gerar o UI-SPEC agora?
```

## 9. Orchestration Protocol (Experimento v3.4)

Quando a fase do PIPELINE incluir `Orchestration: true` e listar múltiplos agentes, o `oma-executor` não roda as tarefas ele mesmo. Ele delega.

### Step 1 — Decomposição
O executor divide a fase em subtarefas:
- Subtarefa A — Frontend (Agente: frontend-specialist)
- Subtarefa B — Backend (Agente: backend-specialist)
- Subtarefa C — Database (Agente: database-architect)

### Step 2 — Execução em Waves e Git Worktrees (Execução Paralela Segura)
Inspirado na arquitetura Superpowers, quando lidamos com grandes refatorações ou multi-agentes simultâneos, evite poluir a branch principal. O executor deve isolar a execução:
- Se a complexidade for média/alta, o executor spawnará uma nova **Git Worktree** (uma branch isolada em uma pasta separada) para o agente trabalhar.
- Cada subagente trabalha no seu Worktree, previnindo conflitos de arquivo.

### Step 3 — Sincronização
Após cada wave, verificar outputs e integração (em `.planning/ORCHESTRATION.md`).

### Step 4 — Consolidação
Combinar todos os outputs e executar Quality Gate final.

## 10. Integração por IDE (enxuto)

Cross-IDE funciona porque `.planning/` e `.agents/skills/` são commitados no repo. Qualquer IDE que abrir o projeto lê esses dois caminhos.

| IDE | Lê skills de | Lê contexto de |
|---|---|---|
| Claude Code | `.claude/skills/` → `.agents/skills/` → `~/.claude/skills/` | `CLAUDE.md` + `.planning/` |
| OpenCode | `.agents/skills/` → `~/.opencode/skills/` | `AGENTS.md` + `.planning/` |
| Antigravity | `.gemini/antigravity/skills/` → `.agents/skills/` | `AGENTS.md` + `.planning/` |
| Codex | `.codex/skills/` → `.agents/skills/` → `~/.codex/skills/` | `AGENTS.md` + `.planning/` |
| Cursor | `.agents/skills/` → `~/.cursor/skills/` | `AGENTS.md` + `.cursorrules` + `.planning/` |
| Roo Code | `.roo/skills/` → `.agents/skills/` → `~/.roo/skills/` | `AGENTS.md` + `.planning/` |
