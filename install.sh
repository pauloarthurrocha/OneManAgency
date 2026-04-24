#!/bin/bash
# ═══════════════════════════════════════════════════════
# Agencia AI Adaptável — Instalador Universal (Unix)
# ═══════════════════════════════════════════════════════

set -e

REPO_URL="https://github.com/pauloarthurrocha/agencia-ai-adaptavel-skills.git"
INSTALL_DIR="$HOME/.agencia-ai"
GLOBAL_SKILLS_DIR="$INSTALL_DIR/skills"
VERSION="3.0.0"

echo "🚀 Agencia AI Adaptável — Instalador v$VERSION"
echo ""

# ── Verificar dependências ──
command -v git >/dev/null 2>&1 || { echo "❌ Git é obrigatório. Instale: https://git-scm.com/"; exit 1; }

# ── Detectar IDE instalada ──
IDE=""
[ -d "$HOME/.opencode" ] && IDE="opencode"
[ -d "$HOME/.claude" ] && IDE="claude"
[ -d "$HOME/.gemini" ] && IDE="antigravity"
[ -d "$HOME/.codex" ] && IDE="codex"
[ -d "$HOME/.cursor" ] && IDE="cursor"

if [ -n "$IDE" ]; then
  echo "✅ IDE detectada: $IDE"
else
  echo "⚠️ Nenhuma IDE detectada. Skills serão instaladas globalmente."
fi

# ── Clonar ou atualizar repo ──
if [ -d "$INSTALL_DIR/.git" ]; then
  echo "📦 Atualizando instalação existente..."
  cd "$INSTALL_DIR"
  git pull --ff-only
else
  echo "📦 Clonando repositório..."
  # Guarda contra path vazio ou perigoso
  if [ -z "$INSTALL_DIR" ] || [ "$INSTALL_DIR" = "/" ] || [ "$INSTALL_DIR" = "$HOME" ]; then
    echo "❌ Path de instalação inválido: '$INSTALL_DIR'"
    exit 1
  fi
  rm -rf "$INSTALL_DIR"
  git clone --depth 1 "$REPO_URL" "$INSTALL_DIR"
  if [ ! -d "$INSTALL_DIR/.git" ]; then
    echo "❌ Falha ao clonar repositório. Verifique sua conexão."
    exit 1
  fi
fi

# ── Instalar skills globais ──
echo "📂 Instalando skills em $GLOBAL_SKILLS_DIR..."
mkdir -p "$GLOBAL_SKILLS_DIR"

# Copiar skills core
for skill in agencia-init agencia-executor client-onboarding pipeline-generator agencia-verify-work skill-creator; do
  if [ -d "$INSTALL_DIR/$skill" ]; then
    rm -rf "$GLOBAL_SKILLS_DIR/$skill"
    cp -r "$INSTALL_DIR/$skill" "$GLOBAL_SKILLS_DIR/"
    echo "  ✅ $skill"
  fi
done

# Copiar templates
if [ -d "$INSTALL_DIR/templates" ]; then
  rm -rf "$GLOBAL_SKILLS_DIR/templates"
  cp -r "$INSTALL_DIR/templates" "$GLOBAL_SKILLS_DIR/"
  echo "  ✅ templates"
fi

# ── Instalar skills externas (Marketing) ──
echo ""
echo "📦 Instalando skills externas..."

MARKETING_TMP="/tmp/marketingskills-install"
rm -rf "$MARKETING_TMP"
if git clone --depth 1 "https://github.com/coreyhaines31/marketingskills.git" "$MARKETING_TMP" 2>/dev/null; then
  if [ -d "$MARKETING_TMP/skills" ]; then
    for skill_dir in "$MARKETING_TMP/skills"/*; do
      if [ -d "$skill_dir" ]; then
        skill_name=$(basename "$skill_dir")
        if [ ! -d "$GLOBAL_SKILLS_DIR/$skill_name" ]; then
          cp -r "$skill_dir" "$GLOBAL_SKILLS_DIR/"
          echo "  ✅ $skill_name (marketing)"
        fi
      fi
    done
  fi
  rm -rf "$MARKETING_TMP"
else
  echo "  ⚠️  Marketing skills não disponível (offline?)"
fi

# ── Criar symlink por IDE ──
install_for_ide() {
  local ide_path=$1
  local ide_name=$2
  
  if [ -d "$ide_path" ]; then
    mkdir -p "$ide_path/skills"
    
    # Limpar symlinks antigos quebrados
    find "$ide_path/skills" -type l ! -exec test -e {} \; -delete 2>/dev/null || true
    
    # Criar symlinks (apenas para skills que não existem ainda)
    local copied=0
    for skill_dir in "$GLOBAL_SKILLS_DIR"/*; do
      if [ -d "$skill_dir" ]; then
        local skill_name=$(basename "$skill_dir")
        local target="$ide_path/skills/$skill_name"
        if [ ! -e "$target" ]; then
          ln -sf "$skill_dir" "$target" 2>/dev/null || true
          copied=$((copied + 1))
        fi
      fi
    done
    
    local total=$(ls -1 "$ide_path/skills" 2>/dev/null | wc -l)
    echo "  🔗 $ide_name: $copied novas | $total total → $ide_path/skills/"
  fi
}

install_for_ide "$HOME/.claude" "Claude Code"
install_for_ide "$HOME/.opencode" "OpenCode"
install_for_ide "$HOME/.codex" "Codex"
install_for_ide "$HOME/.cursor" "Cursor"
install_for_ide "$HOME/.gemini/antigravity" "Antigravity"

# ── Criar comando global (opcional) ──
BIN_DIR="$HOME/.local/bin"
mkdir -p "$BIN_DIR"

cat > "$BIN_DIR/agencia-ai" << 'EOF'
#!/bin/bash
# CLI da Agencia AI Adaptável

AGENCIA_HOME="${AGENCIA_HOME:-$HOME/.agencia-ai}"
SKILLS_DIR="$AGENCIA_HOME/skills"

show_help() {
  echo "Agencia AI Adaptável — CLI v3.0"
  echo ""
  echo "Uso: agencia-ai <comando>"
  echo ""
  echo "Comandos:"
  echo "  init [pasta]     Inicializa projeto novo (padrão: pasta atual)"
  echo "  doctor           Diagnostica instalação"
  echo "  update           Atualiza skills da agência"
  echo "  version          Mostra versão"
  echo ""
  echo "Variáveis de ambiente:"
  echo "  AGENCIA_HOME     Diretório de instalação (padrão: ~/.agencia-ai)"
}

cmd_init() {
  local target_dir="${1:-.}"
  target_dir=$(cd "$target_dir" && pwd)
  
  echo "🏗️  Inicializando projeto em $target_dir..."
  
  # Carregar skill agencia-init
  INIT_SKILL="$SKILLS_DIR/agencia-init/SKILL.md"
  if [ ! -f "$INIT_SKILL" ]; then
    echo "❌ Skill agencia-init não encontrada em $SKILLS_DIR"
    echo "   Rode: agencia-ai update"
    exit 1
  fi
  
  # Executar init (delega para a skill)
  echo "📖 Skill carregada: $INIT_SKILL"
  echo "   Execute no seu IDE: skill(name='agencia-init')"
  echo ""
  echo "   Ou manualmente:"
  echo "   1. Copiar templates de $SKILLS_DIR/templates/"
  echo "   2. Copiar skills de $SKILLS_DIR/ para .agents/skills/"
}

cmd_doctor() {
  echo "🔍 Diagnóstico da Agencia AI Adaptável"
  echo ""
  echo "Diretório de instalação: $AGENCIA_HOME"
  echo "Skills disponíveis:"
  
  if [ -d "$SKILLS_DIR" ]; then
    for skill in "$SKILLS_DIR"/*; do
      if [ -d "$skill" ]; then
        echo "  ✅ $(basename "$skill")"
      fi
    done
  else
    echo "  ❌ Nenhuma skill encontrada"
  fi
  
  echo ""
  echo "IDEs detectadas:"
  [ -d "$HOME/.claude" ] && echo "  ✅ Claude Code"
  [ -d "$HOME/.opencode" ] && echo "  ✅ OpenCode"
  [ -d "$HOME/.codex" ] && echo "  ✅ Codex"
  [ -d "$HOME/.cursor" ] && echo "  ✅ Cursor"
  [ -d "$HOME/.gemini" ] && echo "  ✅ Antigravity"
}

cmd_update() {
  echo "🔄 Atualizando Agencia AI..."
  cd "$AGENCIA_HOME"
  git pull --ff-only
  
  # Reinstalar skills
  echo "🔄 Reinstalando skills..."
  for skill in "$AGENCIA_HOME"/*; do
    if [ -d "$skill" ] && [ -f "$skill/SKILL.md" ]; then
      local name=$(basename "$skill")
      local skill_dest="$SKILLS_DIR/$name"
      # Guarda contra path vazio
      if [ -z "$skill_dest" ] || [ "$skill_dest" = "/" ] || [ "$skill_dest" = "$HOME" ]; then
        echo "⚠️  Pulando skill com path inválido: $name"
        continue
      fi
      rm -rf "$skill_dest"
      cp -r "$skill" "$SKILLS_DIR/"
      echo "  ✅ $name"
    fi
  done
  
  echo ""
  echo "✅ Atualização concluída!"
}

cmd_version() {
  echo "Agencia AI Adaptável v3.0.0"
  echo "Home: $AGENCIA_HOME"
}

# ── Main ──
case "${1:-help}" in
  init) cmd_init "${2:-.}" ;;
  doctor) cmd_doctor ;;
  update) cmd_update ;;
  version|--version|-v) cmd_version ;;
  help|--help|-h) show_help ;;
  *) echo "Comando desconhecido: $1"; show_help; exit 1 ;;
esac
EOF

chmod +x "$BIN_DIR/agencia-ai"

# ── Adicionar ao PATH se necessário ──
if [[ ":$PATH:" != *":$BIN_DIR:"* ]]; then
  echo ""
  echo "⚠️  $BIN_DIR não está no PATH."
  echo "   Adicione ao seu ~/.bashrc ou ~/.zshrc:"
  echo "   export PATH=\"\$PATH:$BIN_DIR\""
fi

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "Próximos passos:"
echo "  1. Reinicie seu terminal (ou rode: source ~/.bashrc)"
echo "  2. Verifique: agencia-ai doctor"
echo "  3. Inicie projeto: agencia-ai init"
echo ""
echo "Ou em qualquer IDE: skill(name='agencia-init')"
