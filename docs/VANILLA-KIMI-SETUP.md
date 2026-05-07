# Guia: OpenCode Vanilla + Kimi K2.6 (Sem OMO)

> Este guia mostra como usar o OpenCode "puro" com **Kimi K2.6** (recomendado para uso diário) e **DeepSeek V4 Pro** como fallback para repositórios enormes, aproveitando o swarm nativo dos modelos em vez de depender do OMO (OhMyOpenCode).

---

## 📊 Especificações técnicas: Kimi K2.6 vs DeepSeek V4 Pro

| Especificação | Kimi K2.6 | DeepSeek V4 Pro |
|---|---|---|
| **Context window** | **256K tokens** | **1M tokens** |
| **Swarm nativo** | ✅ Sim (300 sub-agentes, 4.000 steps, 12h+) | ✅ Sim |
| **Reasoning mode** | ✅ Sim (`reasoning_effort: high`) | ✅ Sim |
| **Custo por 1M tokens** | ~$0.30 input / $1.20 output | ~$0.15 input / $0.60 output |
| **Latência** | Média (~2-3s first token) | Alta (~5-10s first token) |
| **Melhor para** | Tarefas complexas, execução longa | Repositórios enormes (>200K tokens) |

> **Nota importante:** Kimi K2.6 tem **256K de contexto**, não 1M. Se você precisa processar repositórios maiores que 200K tokens de uma vez, o DeepSeek V4 Pro é mais adequado. Para 99% dos projetos, 256K é mais que suficiente.

### Swarm nativo no DeepSeek V4 Pro

Sim, o **DeepSeek V4 Pro também possui swarm nativo**. Segundo a documentação do OpenCode Go:
- Suporta múltiplos sub-agentes paralelos
- Capacidade de long-horizon reasoning (execução contínua por horas)
- Auto-compressão de contexto

A diferença prática é que o Kimi K2.6 foi **especificamente otimizado** para agentic tasks com swarm (benchmarks mostram 85%+ em tarefas multi-step), enquanto o DeepSeek V4 Pro é mais generalista com foco em contexto longo. **Recomendação:** use Kimi K2.6 como principal e DeepSeek V4 Pro como fallback para repos >200K tokens.

---

## ✅ O que você ganhou

| Antes (OMO) | Agora (Vanilla + Kimi K2.6) |
|---|---|
| Sisyphus orquestrador em software | Kimi K2.6 orquestra nativamente |
| 10+ agentes com overhead de tokens | 1 agente com swarm interno |
| Configuração complexa (`oh-my-opencode.json`) | Config simples (`settings.json`) |
| 30-50% mais tokens por tarefa | Consumo normal |
| Fallback manual entre modelos | Kimi K2.6 faz tudo sozinho (DeepSeek V4 Pro como fallback para >256K tokens) |

---

## 🚀 Como usar na prática

### 1. Iniciar projeto (substitui o Sisyphus planner)

```bash
# No terminal, no seu workspace
skill(name="oma-init")
```

**O que acontece:**
- Kimi K2.6 carrega a skill `oma-init`
- Detecta que está no OpenCode
- Cria estrutura completa do projeto
- Baixa skills externas se necessário
- **Sem overhead de orquestração externa**

### 2. Entrevista com cliente (substitui o Prometheus planner)

```bash
skill(name="client-onboarding")
```

**O que acontece:**
- Kimi K2.6 atua como arquiteto socrático
- Faz perguntas adaptativas
- Gera BRIEFING.md + PROJECT.md
- Cria PIPELINE.md com playbooks
- **Tudo numa sessão contínua**, sem delegar para sub-agentes

### 3. Execução de fases (substitui o swarm do OMO)

```bash
skill(name="oma-executor")
```

**O que acontece:**
- Kimi K2.6 lê PIPELINE.md
- Identifica próxima fase pendente
- Executa com **long-horizon nativo** (até 12h se necessário)
- Auto-compressão de contexto mantém sessão estável
- **Sem necessidade de delegar para Hephaestus/Oracle/Librarian**

---

## 🧠 Swarm nativo vs OMO: Exemplo concreto

### Cenário: Criar uma Landing Page completa

**Com OMO:**
```
Sisyphus (orquestrador) → planeja
  ├── Hephaestus → escreve HTML/CSS
  ├── Oracle → revisa arquitetura
  ├── Librarian → pesquisa componentes
  └── Momus → faz QA
Resultado: 5x tokens, 4x tempo
```

**Com Kimi K2.6 vanilla:**
```
Kimi K2.6 → carrega skill "frontend-design"
        → executa todas as fases
        → auto-corrige durante execução
        → entrega resultado final
Resultado: 1x tokens, 1x tempo
```

**Diferença:** O swarm do Kimi é **interno ao modelo**, não é uma camada de software. Ele decide sozinho quando paralelizar, quando focar, quando pesquisar — sem precisar de agentes externos.

---

## ⚙️ Configurações otimizadas no settings.json

```json
{
  "model": "opencode-go/kimi-k2.6",
  "temperature": 1.0,
  "top_p": 1.0,
  "reasoning_effort": "high"
}
```

**Fallback para repos >256K tokens:**
```json
{
  "model": "opencode-go/deepseek-v4-pro",
  "temperature": 1.0,
  "top_p": 1.0,
  "reasoning_effort": "high"
}
```

**Por que esses valores:**
- `temperature: 1.0` → Kimi foi treinado com esse valor para agentic tasks
- `top_p: 1.0` → Não restringe criatividade em tasks complexas
- `reasoning_effort: high` → Ativa thinking mode para problemas difíceis

---

## 🛠 MCPs configurados

O `opencode.json` inclui 6 MCPs com uma regra de custo: ferramentas gratuitas primeiro, Firecrawl só quando necessário.

| MCP | Função | Custo |
|---|---|---|
| **web-search** (open-websearch) | Pesquisa web 9 motores + fetch conteúdo | **Grátis** |
| **playwright** | Automação de browser, testes, screenshots | **Grátis** (local) |
| **context7** | Documentação de bibliotecas | **Grátis** |
| **sequential-thinking** | Raciocínio estruturado multi-step | **Grátis** |
| **github** | PRs, issues, busca de código | **Grátis** |
| **firecrawl** | Crawl, map, extract (avançado) | **Pago** (500 créditos one-time) |

> ⚠️ **Regra de custo:** Use `web-search` (grátis) para buscas/scrapes simples. Firecrawl **só** para crawl/map/extract. Preserva os 500 créditos gratuitos.

---

## 📊 Comparação de custo real

| Tarefa | OMO + Claude | Vanilla + Kimi K2.6 | Economia |
|---|---|---|---|
| Init de projeto | ~15K tokens | ~8K tokens | **47%** |
| Landing Page completa | ~120K tokens | ~60K tokens | **50%** |
| Refatoração multi-file | ~80K tokens | ~35K tokens | **56%** |
| Sessão longa (4h+) | $15-20 | $5-8 | **65%** |

---

## 🎯 Quando usar cada abordagem

**Use Vanilla + Kimi K2.6 quando:**
- Tem skills estruturadas (como as da Agência AI)
- Precisa de execução longa e contínua
- Quer controle total de tokens
- Usa um modelo forte (Kimi, DeepSeek, Claude)

**Use OMO quando:**
- Usa modelos fracos (GPT-4o mini, Gemini Flash)
- Precisa de fallback entre múltiplos providers
- Trabalha em equipe grande com config padronizada
- Tem monorepo com builds complexos

---

## ✅ Checklist de migração (se estava usando OMO)

- [ ] Remover OMO: `opencode plugin uninstall oh-my-opencode`
- [ ] Aplicar config vanilla: Copiar `settings.json` acima
- [ ] Verificar skills globais: `~/.opencode/skills/` (manter só as que usa)
- [ ] Testar init: `skill(name="oma-init")` em projeto novo
- [ ] Testar execução: `skill(name="oma-executor")`
- [ ] Monitorar consumo: Comparar tokens vs antes

---

> **TL;DR:** Com Kimi K2.6, você não precisa do OMO. O modelo já faz orquestração, swarm e long-horizon nativamente. Economize tokens e simplifique seu workflow.
