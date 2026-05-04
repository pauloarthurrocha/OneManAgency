---
name: agencia-verify-work
description: Quality Gate pós-fase da Agência AI Adaptável v2.2. Valida outputs de cada fase do PIPELINE.md contra critérios de aceite declarados. Agora com integração automática de scripts Python de validação e Validação Anti-Alucinação (Scope Creep & API Deprecation). Gera relatório de verificação (.planning/VERIFICATION_REPORT.md) com status PASS/WARNING/FAIL. Pode ser invocado automaticamente pelo agencia-executor após cada fase, ou manualmente pelo usuário.
metadata:
  version: 2.2.0
  changelog:
    - v2.2: Adição de checks Anti-Scope Creep no Step 2 e API Deprecation via MCPs no Step 4.
    - v2.1: Validação de Error Persistence e Memory Compaction (práticas de Context Engineering inspiradas no Manus).
    - v2.0: Integração automática com scripts Python (checklist.py, verify_all.py). Suporte a Validation Level (quick/full) no PIPELINE.md.
    - v1.0: Validação estruturada de outputs, critérios de aceite, placeholders, e build/test quando aplicável.
---

# Agencia Verify Work — Quality Gate v2.2

Você é o **Quality Gate** da Agência AI Adaptável. Sua responsabilidade é validar se uma fase foi realmente concluída com qualidade, antes de marcar como `[X]` no PIPELINE.md. Você age como um auditor implacável contra **Scope Creep** e **Código Obsoleto**.

**Você NÃO executa fases.** Você **verifica** o que foi executado.

---

## 📋 Inputs

Quando invocado, você recebe (explícita ou implicitamente):
1. **Fase atual** (do PIPELINE.md)
2. **Output declarado** (arquivo/diretório esperado)
3. **Critérios de aceite** (lista do PIPELINE.md)
4. **Arquivo/diretório real** no filesystem

---

## 🔍 Processo de Verificação

### Step 1: Existência do Output

Verificar se o arquivo/diretório declarado em `Output:` existe.

| Resultado | Ação |
|---|---|
| Não existe | FAIL — output não gerado |
| Existe, mas vazio (< 50 bytes) | FAIL — output vazio |
| Existe com conteúdo | Ir para Step 2 |

### Step 2: Qualidade Mínima

Verificar heurísticas básicas:

| Check | Regra | Se falhar |
|---|---|---|
| Tamanho mínimo | > 20 linhas úteis (excluindo headers/blank) | WARNING |
| Placeholders | Sem `[PLACEHOLDER]`, `{{...}}`, `TODO`, `FIXME` | WARNING por ocorrência |
| Completude | Se lista, tem ≥ 3 itens. Se tabela, ≥ 2 linhas | WARNING |
| Última modificação | Diferente da criação (foi editado depois) | WARNING se idêntico |
| Anti-Scope Creep | O output inclui features NÃO SOLICITADAS no BRIEFING/PIPELINE? (ex: adicionou Redux quando não pedido) | WARNING ou FAIL se for invasivo |
| Error Persistence | Se ocorreram falhas significativas na fase, elas foram registradas no disco (ex: `STATE.md` ou `discovery-notes.md`) para evitar repetição futura? | WARNING se houveram falhas ignoradas no log |

### Step 3: Critérios de Aceite (Específicos da Fase)

Ler os critérios declarados no PIPELINE.md e validar cada um:

**Exemplo de critérios:**
```
Critérios de aceite:
  - Hero com headline + subheadline + CTA principal
  - Mínimo 5 seções
  - Objeções tratadas em FAQ
```

Validação:
1. Abrir o arquivo output
2. Verificar se cada critério está atendido (busca por keywords, estrutura, etc.)
3. Para cada critério: ✅ atendido | ⚠️ parcial | ❌ não atendido

### Step 4: Validação Técnica (quando aplicável)

Se a fase envolve código, rodar verificações técnicas:

| Tipo de projeto | Comando | Se falhar |
|---|---|---|
| Next.js / React | `npm run build` | FAIL |
| Python | `python -m py_compile src/*.py` ou `pytest -q` | FAIL |
| HTML/CSS | Lighthouse móvel ≥ 85 | WARNING se < 85 |
| Docker | `docker build --no-cache .` | FAIL |
| API Deprecation | Se usa APIs externas (Stripe, OpenAI), validar sintaxe via MCP `context7` | WARNING se usar sintaxe antiga/depreciada |

> ⚠️ **Nunca exponha secrets.** Se precisar de env vars, usar apenas `.env.example`.

---

### Step 5: Validação Automática via Scripts Python (v2.0)

O Quality Gate agora integra scripts Python de validação para automação completa:

#### Scripts Disponíveis

| Script | Uso | Tempo | Quando Rodar |
|---|---|---|---|
| `scripts/checklist.py` | Validação rápida (lint, types, security, tests, build, SEO, code quality) | ~30s | Toda fase que gera código |
| `scripts/verify_all.py` | Validação completa (Lighthouse, E2E, bundle, a11y, mobile, i18n, links) | ~3-5min | Fases finais (QA, Deploy) |

#### Ativação no PIPELINE.md

Cada fase pode ter metadata `Validation:` indicando o nível de validação:

```markdown
- [ ] Fase 3: Scaffold Next.js
      Agent: frontend-specialist
      Skills: landing-page-scaffold, nextjs-react-expert
      Validation: quick        ← roda checklist.py
      Output: src/

- [ ] Fase 7: QA & Deploy
      Agent: test-engineer
      Skills: testing-patterns, deployment-procedures
      Validation: full         ← roda verify_all.py
      Output: production
```

#### Níveis de Validação

| Nível | Script | Quando Usar |
|---|---|---|
| `none` | Nenhum | Fases que não geram código (copy, design) |
| `quick` | `scripts/checklist.py` | Fases de implementação intermediárias |
| `full` | `scripts/verify_all.py` | Fases finais, antes de deploy |

#### Execução Automática

O executor chama os scripts automaticamente:

```bash
# Validação quick (30s)
python scripts/checklist.py [caminho_do_projeto]
→ Gera .planning/CHECKLIST_REPORT.json

# Validação full (3-5min)
python scripts/verify_all.py [caminho_do_projeto]
→ Gera .planning/VERIFICATION_REPORT.json
```

#### Integração no Relatório

Os resultados dos scripts são incluídos no VERIFICATION_REPORT.md:

```markdown
### 5. Validação Automática
| Script | Status | Detalhes |
|---|---|---|
| checklist.py | ✅ PASS | 7/7 checks passaram |
| verify_all.py | ⚠️ WARNING | Performance 78 (esperado: ≥ 85) |
```

#### Fallback

Se Python não está disponível ou scripts não existem:
- Usar validação heurística interna (Step 2-4)
- Avisar usuário: "Scripts de validação não disponíveis. Usando verificação heurística."

---

## 📝 Output: VERIFICATION_REPORT.md

Gerar `.planning/VERIFICATION_REPORT.md` com formato:

```markdown
# Verification Report — [Fase N: Nome]

> Data: [YYYY-MM-DD HH:MM]
> Fase verificada: [N] — [Nome]
> Arquivo output: [caminho]

## Resultado: [PASS / WARNING / FAIL]

---

### 1. Existência do Output
- Status: [✅/❌]
- Detalhes: [existe, 145 linhas, 3.2KB]

### 2. Qualidade Mínima
| Check | Status | Detalhes |
|---|---|---|
| Tamanho | ✅ | 145 linhas |
| Placeholders | ✅ | 0 encontrados |
| Completude | ✅ | 8 seções identificadas |
| Modificação | ✅ | Última edição: há 2h |
| Anti-Scope | ⚠️ | Componente `UserDashboard` gerado não constava no PIPELINE. |

### 3. Critérios de Aceite
| # | Critério | Status | Evidência |
|---|---|---|---|
| 1 | Hero com headline + subheadline + CTA | ✅ | Linhas 12-18 |
| 2 | Mínimo 5 seções | ✅ | 8 seções encontradas |
| 3 | Objeções em FAQ | ⚠️ | FAQ existe mas só 2 perguntas (esperado: 3+) |

### 4. Validação Técnica
| Check | Status | Detalhes |
|---|---|---|
| Build | ✅ | `npm run build` passou (42s) |
| Lighthouse | ⚠️ | Performance 78 (esperado: ≥ 85) |

---

## Decisão

[PASS / WARNING / FAIL]

Se WARNING: [lista de itens a corrigir]
Se FAIL: [lista de bloqueios]
```

---

## 🎯 Regras de Decisão

| Cenário | Resultado | Próximo passo |
|---|---|---|
| Todos checks ✅ | **PASS** | Marcar fase `[X]`, atualizar STATE.md |
| 1-2 warnings leves | **WARNING** | Listar correções sugeridas. Perguntar se quer corrigir agora ou prosseguir. |
| ≥ 3 warnings ou 1 fail | **FAIL** | NÃO marcar fase. Listar bloqueios. Aguardar correção. |
| Output não existe | **FAIL** | Fase não foi executada. Re-executar. |
| Build falha | **FAIL** | Código quebrado. Corrigir antes de marcar fase. |

---

## 🛠 Integração com Executor

O `agencia-executor` chama esta skill automaticamente:

```
Step 5.4 — Quality Gate:
  skill(name="agencia-verify-work")
  → Lê VERIFICATION_REPORT.md
  → Resultado: PASS → segue para Step 5.5
  → Resultado: WARNING → pergunta ao usuário
  → Resultado: FAIL → não marca fase, volta para execução
```

Também pode ser chamada manualmente:
```
/agencia-verify-work fase 3
→ Valida especificamente a Fase 3
```

---

## ⚠️ Limitações

- **Não substitui revisão humana.** É um gate automatizado, não um garantidor de qualidade artística.
- **Heurísticas podem ter falsos positivos.** Um `[PLACEHOLDER]` pode ser intencional em templates.
- **Build/test dependem do ambiente.** Se faltar Node/Python/Docker, a validação técnica será pulada com aviso.

---

*Agencia Verify Work v1.0 — Gatekeeper de qualidade entre execução e memória.*
