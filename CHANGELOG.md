# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste formato.
Baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [4.1.1] - 2026-06-15

### Fixed
- Removidas referencias operacionais a nomes legados; `oma-init` agora aponta para `npm install -g onemanagency@latest`.
- `oma install` agora pode rodar repetidamente sem falhar no backup por `SCRIPTS_DIR` inexistente.
- Parser da CLI aceita flags nos formatos `--only=codex` e `--only codex`.
- Deteccao de `~/.gemini` agora configura Gemini CLI e Antigravity de forma consistente.
- Executor agora carrega personas por `Agent:` a partir de `.agents/agents/`, `~/.oma/agents/` ou `src/agents/` no repo OMA.
- Pacote NPM deixa de incluir docs internas/ignoradas e publica apenas docs publicas/core.

### Changed
- `oma-init`, `client-onboarding`, `oma-executor` e `oma-verify-work` alinhados a stack canonica zero-key de 5 MCPs.
- Scripts Python de validacao passam a ser tratados como opcionais quando existirem no projeto.
- Adicionada suite `node:test` cobrindo reinstall, parser de flags e deteccao Gemini/Antigravity.

## [4.1.0] - 2026-05-13

### Added
- Playbooks F-I: Script de Dados/ETL (F), Mobile App/Expo (G), Chatbot WhatsApp (H), Hibrido/Monorepo (I)
- Novos specialist agents: security-auditor, seo-specialist, mcp-builder, orchestrator
- Agent system enhancement com frontmatter estruturado

### Changed
- README atualizado com novos agents, playbooks, progressive disclosure e eval harness

### Fixed
- Playbook J (Laravel Enterprise): agents e skills corrigidos para alinhar com padrao A-I
- Removidas referencias `[cite: XX]` que nao faziam parte do padrao OMA

## [4.0.2] - 2026-05-06

### Fixed
- YAML frontmatter: aspas em valores para evitar erros de parsing com `:` em oma-executor, oma-design-review, oma-ceo-review

## [4.0.1] - 2026-05-01

### Changed
- Refactor: Progressive Disclosure e modularizacao de CLIs globais

### Removed
- Documento de market research nao autorizado do repositorio publico
- Script de dev commitado acidentalmente

## [4.0.0] - 2026-04-28

### Added
- **PIV Loop** (Plan, Implement, Validate) — isolamento de contexto por fase
- **Review Triad** — CEO, Eng, Design review antes da execucao
- **Eval Harness** (LLM-as-a-Judge) em oma-verify-work para QA autonomo
- Agent Definition Files com 15 personas em 4 categorias
- Auto-injecao de MCPs Zero-Config (Playwright, Fetch, Memory, Context7)
- Session HANDOFF protocol (Anti-LiTM)
- Frontend specialist com Framer Motion spring physics e Huashu prototyping
- Deteccao automatica de IDEs: Claude Code, Cursor, Windsurf, Cline, Aider, Roo Code, Hermes, OpenClaw
- CLI global via `npm install -g onemanagency`
- Slash commands intuitivos (`/oma-init` em vez de `skill(name="oma-init")`)

### Changed
- Rebrand completo para "OneManAgency (OMA)"
- Package name alterado para `onemanagency` (unscoped)
- Estrutura do repo reorganizada: `src/`, `build/`, `install/`, `docs/`
- README reescrito com copywriting e marketing psychology

### Removed
- Referencias legadas ao nome anterior do projeto
- Configs locais de ambiente do repositorio publico
- `.npmrc` do tracking (prevencao de token leaks)

### Security
- Hardening de seguranca nos instaladores
- Correcao de paths obsoletos e gaps estruturais

---

## Como atualizar este changelog

1. Use [Conventional Commits](https://www.conventionalcommits.org/) nos commits:
   - `feat:` → ### Added
   - `fix:` → ### Fixed
   - `docs:` → ### Changed (documentacao)
   - `chore:` → ### Changed (manutencao)
   - `refactor:` → ### Changed
   - `perf:` → ### Changed (performance)
   - `BREAKING CHANGE:` → ### Changed (com nota de breaking)
2. Antes de `npm publish`, adicione uma nova versao no topo
3. Commit com `docs: update CHANGELOG for vX.Y.Z`
