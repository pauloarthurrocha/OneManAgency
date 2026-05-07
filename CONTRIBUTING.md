# Contributing to OneManAgency (OMA Framework)

First off, thanks for taking the time to contribute! OMA is built for solo developers and tech leads who want to scale their output without scaling their team.

## How can you contribute?

### 1. Reporting Bugs
- Use the issue tracker to report bugs.
- Describe the bug clearly: what did you expect to happen, and what actually happened?
- Include your OS, the IDE you are using (Claude Code, Cursor, OpenCode, etc.), and the exact command that failed.

### 2. Suggesting Enhancements
- Have an idea for a new Agent Persona or a better context-engineering pattern? We'd love to hear it.
- Open an issue using the "Feature Request" label.
- Explain the "Why": How does this solve a real problem (like Context Rot or Scope Creep)?

### 3. Pull Requests
- Keep PRs small and focused on a single change.
- If you're adding a new Agent Persona in `src/agents/`, make sure it follows the standard format: `Identity & Mindset`, `Core Capabilities`, `SOP`, and `Expected Outputs`.
- Test your changes locally before submitting. Run `npm run install-global` locally to see if it installs correctly.

## Philosophy

Please read the `README.md` and understand the core philosophy before contributing:
- We prefer **Context Engineering** (writing to disk) over large prompt chains.
- We hate "AI Slop". If you are contributing to a design agent, focus on high-fidelity, tasteful UI principles.
- **TDD is the Iron Law** for backend agents. Do not PR changes that remove the TDD requirement from the executor.

Thanks for helping make OMA better for everyone!