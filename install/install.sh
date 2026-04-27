#!/bin/bash
# ═══════════════════════════════════════════════════════
# Agencia AI Adaptável — Bootstrap Installer (Unix)
# ═══════════════════════════════════════════════════════
#
# This bootstrap clones the repository and delegates installation
# to build/postinstall.js. It also symlinks the CLI into ~/.local/bin.
#
# curl -fsSL https://raw.githubusercontent.com/pauloarthurrocha/agencia-ai-adaptavel-skills/main/install/install.sh | bash

set -e

REPO_URL="https://github.com/pauloarthurrocha/agencia-ai-adaptavel-skills.git"
INSTALL_DIR="$HOME/.agencia-ai"
BIN_DIR="$HOME/.local/bin"

echo "🚀 Agencia AI Adaptável — Bootstrap Installer"
echo ""

# ── Check dependencies ──
command -v git >/dev/null 2>&1 || { echo "❌ Git is required. Install: https://git-scm.com/"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ Node.js >= 18 is required. Install: https://nodejs.org/"; exit 1; }

# ── Detect installed IDEs ──
IDE=""
[ -d "$HOME/.opencode" ] && IDE="$IDE opencode"
[ -d "$HOME/.claude" ] && IDE="$IDE claude"
[ -d "$HOME/.gemini" ] && IDE="$IDE antigravity"
[ -d "$HOME/.codex" ] && IDE="$IDE codex"
[ -d "$HOME/.cursor" ] && IDE="$IDE cursor"
[ -d "$HOME/.roo" ] && IDE="$IDE roo"

if [ -n "$IDE" ]; then
  echo "✅ IDE(s) detected:$IDE"
else
  echo "⚠️ No IDE detected. Skills will be installed globally only."
fi

# ── Clone or update repository ──
if [ -d "$INSTALL_DIR/.git" ]; then
  echo "📦 Updating repository..."
  cd "$INSTALL_DIR"
  git pull --ff-only
else
  echo "📦 Cloning repository..."
  if [ -z "$INSTALL_DIR" ] || [ "$INSTALL_DIR" = "/" ] || [ "$INSTALL_DIR" = "$HOME" ]; then
    echo "❌ Invalid install path: '$INSTALL_DIR'"
    exit 1
  fi
  rm -rf "$INSTALL_DIR"
  git clone --depth 1 "$REPO_URL" "$INSTALL_DIR"
  if [ ! -d "$INSTALL_DIR/.git" ]; then
    echo "❌ Failed to clone repository. Check your connection."
    exit 1
  fi
fi

# ── Read version ──
VERSION="unknown"
if [ -f "$INSTALL_DIR/package.json" ]; then
  VERSION=$(node -p "require('$INSTALL_DIR/package.json').version" 2>/dev/null || echo "unknown")
  echo "✅ Version: $VERSION"
fi

# ── Delegate to Node installer ──
cd "$INSTALL_DIR"
echo "🔧 Running installer..."
node build/postinstall.js

# ── Create global command (symlink) ──
mkdir -p "$BIN_DIR"

if [ -f "$INSTALL_DIR/bin/agencia-ai.js" ]; then
  rm -f "$BIN_DIR/agencia-ai"
  ln -sf "$INSTALL_DIR/bin/agencia-ai.js" "$BIN_DIR/agencia-ai"
  chmod +x "$BIN_DIR/agencia-ai"
  echo "🔗 Created: $BIN_DIR/agencia-ai"
fi

# ── Add to PATH if needed ──
if [[ ":$PATH:" != *":$BIN_DIR:"* ]]; then
  echo ""
  echo "⚠️  $BIN_DIR is not in your PATH."
  echo "   Add this to your ~/.bashrc or ~/.zshrc:"
  echo "   export PATH=\"\$PATH:$BIN_DIR\""
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "  1. Restart your terminal (or: source ~/.bashrc)"
echo "  2. Verify: agencia-ai doctor"
echo "  3. Create project: mkdir my-project && cd my-project"
echo "  4. In your IDE: skill(name='agencia-init')"
echo ""
