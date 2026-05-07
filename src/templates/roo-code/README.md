# Templates Roo Code — OneManAgency

Este diretório contém os templates de configuração para otimizar o uso do **Roo Code** dentro do workflow da Agência.

## 🚀 Como Usar

### 1. Configuração de MCPs
O arquivo `mcp.json` contém os servidores MCP essenciais (Brave Search, Playwright, Firecrawl, etc.).

- **Opção Local (Recomendado):** Copie o conteúdo de `mcp.json` para um arquivo chamado `.roo/mcp.json` na raiz do seu projeto.
- **Opção Global:** Adicione as configurações ao seu arquivo global em `~/.roo/mcp_settings.json`.

### 2. Modos Customizados (Agentes)
O arquivo `roomodes` mapeia os agentes especializados da Agência para modos nativos do Roo Code.

- **Instalação:** Copie o arquivo `roomodes` para a raiz do seu projeto e renomeie-o para `.roomodes`.
- **Ativação:** Após copiar o arquivo, o Roo Code detectará automaticamente os novos modos (Orchestrator, Frontend, Backend, etc.) no seletor de modos.

### 3. Ativação dos Modos
Uma vez que o arquivo `.roomodes` esteja na raiz do projeto:
1. Abra o seletor de modos no Roo Code.
2. Você verá os novos agentes disponíveis.
3. Selecione o agente correspondente à fase atual do seu `PIPELINE.md`.

---

## 📁 Arquivos neste diretório
- `mcp.json`: Template de configuração dos servidores MCP.
- `roomodes`: Definição dos modos customizados (YAML).
- `README.md`: Este guia de instruções.
