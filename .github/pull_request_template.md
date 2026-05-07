## O que este PR resolve?
<!-- Descreva de forma clara e concisa qual problema este Pull Request resolve ou qual feature ele adiciona. -->
<!-- Ex: "Resolve o problema de perda de contexto no executor criando um fallback no HANDOFF.md" -->
Closes # (número da issue, se houver)

## Tipo de Mudança
<!-- Marque a opção apropriada com um [x] -->
- [ ] 🐛 Bug fix (correção de falha que não quebra funcionalidades existentes)
- [ ] ✨ New feature (nova funcionalidade que não quebra funcionalidades existentes)
- [ ] 💥 Breaking change (correção ou feature que forçará os usuários a mudarem a forma como usam o sistema)
- [ ] 📝 Documentação (atualizações no README, guias, etc)

## 🛡️ Checklist de Qualidade (Padrão OMA)
<!-- Para mantermos a excelência do framework, certifique-se de que seu código atende aos nossos critérios. -->
- [ ] **Filosofia Context Engineering:** Nenhuma lógica nova depende exclusivamente da "memória do chat". Tudo que é vital foi persistido em disco.
- [ ] **TDD Iron Law (Backend/Lógica):** Se alterou o orquestrador ou core skills de lógica, o código foi escrito focado em passar em testes ou resolver um edge case claro.
- [ ] **Anti-AI Slop (Design/Frontend):** Se alterou agentes de UI/UX, as diretrizes de motion (springs), espaçamento intencional e combate a gradientes genéricos foram mantidas.
- [ ] Testei minhas alterações localmente rodando a agência em um projeto de teste.
- [ ] Atualizei a documentação e os metadados (versão/changelog) da Skill caso tenha alterado o arquivo `SKILL.md`.

## Observações Adicionais
<!-- Qualquer instrução especial para quem for revisar o código, screenshots (se alterou UI), ou dúvidas que ficaram. -->
