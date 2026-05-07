# Guia de Setup: Roo Code + OneManAgency

Este guia explica como integrar o **Roo Code** (extensão para VS Code) com o ecossistema da OneManAgency.

---

## 🧐 O que é o Roo Code?

O **Roo Code** é uma extensão poderosa para o VS Code que permite a execução de agentes de IA diretamente no seu editor. 

### Diferença entre Roo Code e Antigravity Nativo
- **Antigravity Nativo:** É o nosso ambiente customizado e otimizado para máxima performance e integração profunda com nossos protocolos.
- **Roo Code:** É uma camada sobre o VS Code. Ele oferece a flexibilidade do VS Code com a inteligência dos nossos agentes, sendo ideal para quem prefere manter seu fluxo de trabalho tradicional no editor da Microsoft.

---

## 🚀 Instalação das Skills no Roo Code

O instalador da Agência (`install.sh` ou `install.ps1`) já tenta detectar o Roo Code automaticamente. Se você já rodou o instalador, as skills devem estar em `~/.roo/skills/`.

### Passo a Passo Manual (se necessário):
1. Certifique-se de que o Roo Code está instalado no seu VS Code.
2. Copie as skills da pasta global para a pasta do Roo Code:
   ```bash
   # Linux/macOS
   cp -r ~/.oma/skills/* ~/.roo/skills/
   
   # Windows (PowerShell)
   xcopy /E /I $HOME\.oma\skills\* $HOME\.roo\skills\
   ```
3. Reinicie o VS Code ou recarregue a janela.

---

## 🛠 Configuração de MCPs

O Roo Code utiliza arquivos de configuração específicos para MCPs (Model Context Protocol).

1. No seu projeto, a skill `oma-init` criará um arquivo `.roo/mcp.json`.
2. Se você precisar configurar MCPs globais para o Roo Code, edite o arquivo:
   - **Windows:** `%APPDATA%\Code\User\globalStorage\roovscode.roo-ignore\settings\mcp_settings.json`
   - **macOS/Linux:** `~/.roo/mcp_settings.json` (ou similar dependendo da versão)

> 💡 **Dica:** O `oma-init` automatiza essa configuração para você dentro do escopo do projeto.

---

## 🎭 Modos Customizados (.roomodes)

O Roo Code suporta "Custom Modes", que permitem definir comportamentos específicos para o agente.

1. A Agência fornece um arquivo `.roomodes` otimizado.
2. Ao rodar `skill(name="oma-init")`, este arquivo será copiado para a raiz do seu projeto.
3. Isso habilitará modos como **Orchestrator**, **Frontend Specialist**, etc., diretamente no dropdown de modos do Roo Code.

---

## 🏁 Dicas de Uso

### Como usar as skills
No chat do Roo Code, você pode invocar nossas skills da mesma forma que em outras IDEs:

```text
skill(name="oma-init")
```

Isso iniciará o processo de configuração do projeto, detectando que você está no VS Code/Roo Code e aplicando as configurações pertinentes.

### Fluxo Recomendado
1. **Init:** `skill(name="oma-init")`
2. **Onboarding:** `skill(name="client-onboarding")`
3. **Execução:** `skill(name="oma-executor")`

---

## ❓ Troubleshooting Comum

### As skills não aparecem no Roo Code
- Verifique se os arquivos `.md` estão na pasta `~/.roo/skills/`.
- Certifique-se de que a opção de "Enable Skills" está ativa nas configurações do Roo Code.

### Erro ao carregar MCPs
- O Roo Code é rigoroso com o formato JSON. Verifique se o `.roo/mcp.json` não possui vírgulas sobrando ou erros de sintaxe.
- Verifique os logs de saída (Output) do VS Code selecionando "Roo Code" no dropdown.

### Conflito de Atalhos
- Se o Roo Code entrar em conflito com outras extensões, você pode ajustar os Keybindings nas configurações do VS Code.

---

*OneManAgency — Potencializando seu desenvolvimento no VS Code com Roo Code.*
