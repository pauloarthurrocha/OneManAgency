# 🚀 Super Planejamento de Evolução: OneManAgency v4.0 (Padrão Vale do Silício)

Este documento consolida as melhores práticas das maiores referências open-source em Engenharia Agêntica atuais (GStack por Garry Tan, Superpowers por Obra, e AI-Transformation-Workshop por Cole Medin) para elevar o sistema da **OneManAgency** ao estado da arte do mercado global.

## 🎯 Onde Estamos vs. Onde o Mercado Está

**O que a Agência faz muito bem hoje:**
- Onboarding de cliente (`client-onboarding`) extremamente robusto.
- Geração de Pipeline (`pipeline-generator`) e execução por fases (`oma-executor`).
- Validação pós-fase (`oma-verify-work`) com scripts locais.
- Arquitetura Shift-Left (Deploy primeiro) e Context Engineering distribuído (STATE.md, PROJECT.md).

**Onde estão os Gaps (baseado no GStack, Superpowers e Cole Medin):**
1. **Ausência do Ciclo PIV Estrito (Plan, Implement, Validate):** Atualmente, nossa execução não limpa o contexto adequadamente entre as fases. Cole Medin provou que planejar e codar na mesma janela de contexto causa alucinações (LiTM).
2. **Falta de TDD (Test-Driven Development) Raiz:** Superpowers nos ensina que agents devem seguir RED-GREEN-REFACTOR. Escrever um teste que falha, vê-lo falhar, e só depois escrever o código para passá-lo.
3. **Ausência de Múltiplos Revisores Sêniores no Planejamento (Estilo GStack):** Antes de codar, falta uma "revisão de CEO" para desafiar o escopo (cortar features inúteis) e uma "revisão de Eng Manager" para travar a arquitetura.
4. **Sem Loop de Evolução do Sistema (System Evolution/Learn):** Cole Medin e GStack (/retro, /learn) exigem que cada bug corrigido seja avaliado para virar uma nova regra no `PROJECT.md` ou `AGENTS.md`. Nossos agentes corrigem bugs, mas não aprendem com eles para as próximas execuções.

---

## 🛠️ Plano de Ação: As 5 Novas Features Arquiteturais

### 1. Implementação do Loop PIV (Plan, Implement, Validate) e Isolamento de Contexto
**Ação:** Refatorar o `oma-executor`.
- **Como será:** Quando o executor puxar uma fase de código do `PIPELINE.md`, ele deve obrigar o isolamento. Ele vai gerar um "Plano de Implementação" atômico e instruirá o usuário a dar `/clear` ou abrir nova aba para a execução pura. Sub-agentes farão pesquisa em paralelo, mas a implementação terá um contexto limpo apenas com o Plano.

### 2. Fluxo TDD Obrigatório (Red-Green-Refactor)
**Ação:** Criar o workflow `.agent/workflows/tdd.md` e integrar ao `oma-executor`.
- **Como será:** Toda nova feature Backend/Lógica deverá seguir o ciclo de Superpowers. 
  1. Agente escreve o teste (ex: Vitest/Playwright).
  2. Executa o teste (que deve falhar).
  3. Escreve a implementação mínima para o teste passar.
  4. Refatora o código (DRY).

### 3. A Tríade de Revisão no Planejamento (GStack Inspired)
**Ação:** Criar novos workflows/skills que atuem como personas após o `client-onboarding` e antes de gerar código.
- `/plan-ceo-review` (Momus em modo CEO): Desafia o escopo. Procura o MVP de "10 estrelas" e remove complexidades que não dão ROI (ex: "precisamos mesmo de Redis agora?").
- `/plan-eng-review` (Atlas em modo Tech Lead): Trava diagramas de fluxo de dados, state machines e edge cases ANTES do código.
- `/plan-design-review` (Prometheus em modo Designer): Valida o `DESIGN.md` contra alucinações de IA (AI slop detection) como cantos super-arredondados e gradientes roxos genéricos.

### 4. Evolução Contínua do Sistema (System Evolution)
**Ação:** Criar a skill `system-retro` (ou `agencia-learn`).
- **Como será:** No final de cada milestone ou após corrigir um bug complexo, o agente analisa a sessão: "Qual erro de contexto causou essa falha?". Ele então atualiza o `PROJECT.md` (regras locais) ou o `SKILL-REGISTRY.md` automaticamente para que o erro não se repita. A infraestrutura aprende.

### 5. Suporte a Git Worktrees para Execução Paralela
**Ação:** Adicionar capacidade de branching paralelo no `oma-executor`.
- **Como será:** Inspirado pelo Superpowers (`using-git-worktrees`), para acelerar a execução, a agência poderá "spawnar" subagentes em worktrees separadas (ex: um fazendo frontend do dashboard, outro fazendo a API do painel). Ao final, o Momus (QA) faz a revisão de código e junta na branch principal.

---

## 📋 Como vamos implementar (Cronograma de Modificações)

**Passo 1:** Ler e higienizar os arquivos base (`client-onboarding/SKILL.md` e `oma-executor/SKILL.md`) sem sobrescrever.
**Passo 2:** Modificar o `client-onboarding` para emitir o PRD e invocar automaticamente a tríade de revisão (CEO/Eng/Design).
**Passo 3:** Modificar o `oma-executor` para incorporar o fluxo TDD e o reset de contexto do PIV Loop.
**Passo 4:** Criar a skill de `system-retro` para a fase final do Pipeline.
**Passo 5:** Atualizar a documentação (README) para anunciar a v4.0 com Arquitetura PIV, TDD Nativo e System Evolution.

> **Status Atual:** Aguardando aprovação para iniciarmos as leituras dos arquivos da Agência e aplicarmos as mudanças arquiteturais passo a passo, garantindo que nada seja quebrado.
