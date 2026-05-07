# 📘 OMA Framework — User Guide

Bem-vindo. Se você está aqui, é porque você quer focar no que importa (o produto) e deixar a IA lidar com o peso do desenvolvimento. Mas você também não quer abrir mão do controle arquitetural.

Este guia é como um manual de sobrevivência de como usar o **OneManAgency (OMA)** na sua IDE.

---

## ⚡ 1. Instalação & Setup

O OMA é um pacote global do Node.js. O script de instalação faz o trabalho sujo de detectar quais ferramentas você já tem (Claude Code, Cursor, OpenCode, Codex, Windsurf, Aider, Roo, Goose, Hermes Agent, OpenClaw) e injeta o cérebro lá.

### Pré-requisitos
- Node.js >= 18
- Git (usado como fallback para baixar alguns recursos offline)

### Instalando na sua máquina
```bash
npm install -g @pauloarthurrocha/onemanagency
```

Para confirmar se deu tudo certo:
```bash
oma doctor
```

---

## 🚀 2. Como usar o OMA no dia a dia (Ciclo E2E)

Nós não começamos abrindo um arquivo `.tsx` ou `.py`. O OMA te força a ser um Product Manager primeiro. 

### Passo 1: O Terreno
Crie uma pasta vazia. Abra ela no seu terminal com a sua IA ligada e rode:
```bash
/oma-init
```
*O que acontece:* Ele vai montar os arquivos ocultos que o OMA usa para ter "memória de longo prazo" (`STATE.md`, diretórios escondidos). 

### Passo 2: A Entrevista
A própria IA vai emendar para o próximo passo.
*O que acontece:* Ela vira seu "co-founder" chato. Ela vai perguntar o que você quer construir e vai ativamente tentar cortar as features malucas que você propor. Responda as perguntas dela no chat até chegarem a um consenso.
- **Entregável:** Ela vai gerar um `.planning/BRIEFING.md` lindão.

### Passo 3: Os Advogados do Diabo
O Briefing não vai direto pra fábrica. Ele passa por 3 auditorias automatizadas:
1. **CEO Review:** Valida se a ideia dá dinheiro/valor. Gera o `PRD.md` (Product Requirements Document).
2. **Eng Review:** Pensa em como a infra cai e como o banco conecta. Gera o `ARCHITECTURE.md`.
3. **Design Review:** Garante que o frontend não vai parecer feito num bootcamp em 2018. Define motion e cores em `UI-SPEC.md`.

### Passo 4: O Sprint
O `pipeline-generator` quebra esse monolito em tarefas de no máximo 2 horas. Ele cria o seu roteiro no `PIPELINE.md`.

### Passo 5: Mãos na Massa (O PIV Loop)
Chegou a hora de codar. Você aciona o `oma-executor`. 
A IA vai ler o Pipeline, bolar o plano de ataque e gerar um `HANDOFF.md`.
**Aí ela para.** Ela vai te pedir para dar um `/clear` no chat. 

**Faça isso. Confie no método.**
Quando você limpa o chat e diz "resume", a IA nasce de novo. Mas como ela é configurada pelo OMA, ela olha para os arquivos invisíveis, lembra de tudo, e começa a programar com a mente 100% livre.
O Especialista Backend vai rodar TDD e não vai aceitar commitar sem teste.

### Passo 6: QA e Lançamento
O `oma-verify-work` age como seu testador e te enche o saco se algo quebrar.
Quando acabar, o `oma-release-manager` limpa a casa, escreve um README pro usuário e diz: *Pode lançar.*

---

## 🛠️ Dica de Ouro: Cross-IDE

Sabe quando você começa um app no terminal do Claude Code de manhã, mas à tarde prefere abrir a interface gráfica do Cursor ou do Windsurf porque precisa ver o código?

**Com o OMA, você não perde o contexto.**
Como o `oma-init` jogou toda a inteligência e memória do projeto em pastas físicas dentro do seu repositório (ex: `.agents/skills`), o Cursor vai abrir o projeto e já vai enxergar o `STATE.md` e o `HANDOFF.md`.

É só falar pro Cursor: *"Continue de onde eu parei"* e ele vai pegar o bonde exatamente do ponto que o Claude Code deixou de manhã.

Aproveite a autonomia. E não pule os testes!
