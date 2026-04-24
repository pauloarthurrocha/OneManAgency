#Requires -Version 5.1
# ═══════════════════════════════════════════════════════
# Agencia AI Adaptável — Instalador Universal (Windows)
# ═══════════════════════════════════════════════════════

$ErrorActionPreference = "Stop"

$REPO_URL = "https://github.com/pauloarthurrocha/agencia-ai-adaptavel-skills.git"
$INSTALL_DIR = "$env:USERPROFILE\.agencia-ai"
$GLOBAL_SKILLS_DIR = "$INSTALL_DIR\skills"
$VERSION = "3.0.0"

Write-Host "🚀 Agencia AI Adaptável — Instalador v$VERSION" -ForegroundColor Cyan
Write-Host ""

# ── Verificar dependências ──
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git é obrigatório. Instale: https://git-scm.com/" -ForegroundColor Red
    exit 1
}

# ── Detectar IDE instalada ──
$IDE = @()
if (Test-Path "$env:USERPROFILE\.opencode") { $IDE += "opencode" }
if (Test-Path "$env:USERPROFILE\.claude") { $IDE += "claude" }
if (Test-Path "$env:USERPROFILE\.gemini") { $IDE += "antigravity" }
if (Test-Path "$env:USERPROFILE\.codex") { $IDE += "codex" }
if (Test-Path "$env:USERPROFILE\.cursor") { $IDE += "cursor" }

if ($IDE.Count -gt 0) {
    Write-Host "✅ IDE(s) detectada(s): $($IDE -join ', ')" -ForegroundColor Green
} else {
    Write-Host "⚠️ Nenhuma IDE detectada. Skills serão instaladas globalmente." -ForegroundColor Yellow
}

# ── Clonar ou atualizar repo ──
if (Test-Path "$INSTALL_DIR\.git") {
    Write-Host "📦 Atualizando instalação existente..." -ForegroundColor Blue
    Set-Location $INSTALL_DIR
    git pull --ff-only
} else {
    Write-Host "📦 Clonando repositório..." -ForegroundColor Blue
    if (Test-Path $INSTALL_DIR) {
        Remove-Item -Recurse -Force $INSTALL_DIR
    }
    git clone --depth 1 $REPO_URL $INSTALL_DIR
}

# ── Instalar skills globais ──
Write-Host "📂 Instalando skills em $GLOBAL_SKILLS_DIR..." -ForegroundColor Blue
New-Item -ItemType Directory -Force -Path $GLOBAL_SKILLS_DIR | Out-Null

$coreSkills = @("agencia-init", "agencia-executor", "client-onboarding", "pipeline-generator", "agencia-verify-work")
foreach ($skill in $coreSkills) {
    $source = "$INSTALL_DIR\$skill"
    $dest = "$GLOBAL_SKILLS_DIR\$skill"
    if (Test-Path $source) {
        if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
        Copy-Item -Recurse $source $dest
        Write-Host "  ✅ $skill" -ForegroundColor Green
    }
}

# Copiar templates
if (Test-Path "$INSTALL_DIR\templates") {
    $templatesDest = "$GLOBAL_SKILLS_DIR\templates"
    if (Test-Path $templatesDest) { Remove-Item -Recurse -Force $templatesDest }
    Copy-Item -Recurse "$INSTALL_DIR\templates" $templatesDest
    Write-Host "  ✅ templates" -ForegroundColor Green
}

# ── Criar cópias por IDE (Windows não suporta symlink bem) ──
function Install-ForIde {
    param($idePath, $ideName)
    
    if (Test-Path $idePath) {
        $skillsPath = "$idePath\skills"
        New-Item -ItemType Directory -Force -Path $skillsPath | Out-Null
        
        # Limpar e recriar
        Get-ChildItem $skillsPath -Directory | Remove-Item -Recurse -Force
        
        foreach ($skillDir in Get-ChildItem $GLOBAL_SKILLS_DIR -Directory) {
            $target = "$skillsPath\$($skillDir.Name)"
            Copy-Item -Recurse $skillDir.FullName $target
        }
        
        Write-Host "  📂 $ideName → $skillsPath" -ForegroundColor Green
    }
}

Install-ForIde "$env:USERPROFILE\.claude" "Claude Code"
Install-ForIde "$env:USERPROFILE\.opencode" "OpenCode"
Install-ForIde "$env:USERPROFILE\.codex" "Codex"
Install-ForIde "$env:USERPROFILE\.cursor" "Cursor"
Install-ForIde "$env:USERPROFILE\.gemini\antigravity" "Antigravity"

# ── Criar função PowerShell global ──
$PROFILE_DIR = Split-Path $PROFILE -Parent
if (!(Test-Path $PROFILE_DIR)) {
    New-Item -ItemType Directory -Force -Path $PROFILE_DIR | Out-Null
}

$agenciaFunction = @"
# Agencia AI Adaptável — Funções globais
`$AGENCIA_HOME = `$env:AGENCIA_HOME
if (!`$AGENCIA_HOME) { `$AGENCIA_HOME = "$INSTALL_DIR" }
`$SKILLS_DIR = "`$AGENCIA_HOME\skills"

function agencia-ai {
    param([Parameter(ValueFromRemainingArguments=`$true)] `$args)
    
    `$cmd = `$args[0]
    `$arg1 = `$args[1]
    
    switch (`$cmd) {
        "init" {
            `$target = if (`$arg1) { `$arg1 } else { "." }
            Write-Host "🏗️  Inicializando projeto em `$target..." -ForegroundColor Cyan
            Write-Host "   Execute no IDE: skill(name='agencia-init')" -ForegroundColor Gray
            Write-Host "   Skills disponíveis em: `$SKILLS_DIR" -ForegroundColor Gray
        }
        "doctor" {
            Write-Host "🔍 Diagnóstico da Agencia AI" -ForegroundColor Cyan
            Write-Host "Home: `$AGENCIA_HOME" -ForegroundColor Gray
            Write-Host "Skills:" -ForegroundColor Gray
            if (Test-Path `$SKILLS_DIR) {
                Get-ChildItem `$SKILLS_DIR -Directory | ForEach-Object { Write-Host "  ✅ `$(`$_.Name)" -ForegroundColor Green }
            }
        }
        "update" {
            Write-Host "🔄 Atualizando..." -ForegroundColor Cyan
            Set-Location `$AGENCIA_HOME
            git pull --ff-only
            Write-Host "✅ Atualizado!" -ForegroundColor Green
        }
        "version" { Write-Host "Agencia AI v$VERSION" }
        default {
            Write-Host "Uso: agencia-ai <init|doctor|update|version>" -ForegroundColor Yellow
        }
    }
}
"@

# Adicionar ao profile se não existir
if (!(Select-String -Path $PROFILE -Pattern "function agencia-ai" -ErrorAction SilentlyContinue)) {
    Add-Content -Path $PROFILE -Value "`n$agenciaFunction`n"
    Write-Host "✅ Função 'agencia-ai' adicionada ao PowerShell profile" -ForegroundColor Green
}

# ── Criar atalho no PATH (opcional) ──
$BIN_DIR = "$env:LOCALAPPDATA\AgenciaAI\bin"
New-Item -ItemType Directory -Force -Path $BIN_DIR | Out-Null

$wrapperScript = @"
@echo off
powershell -Command "agencia-ai %*"
"@
Set-Content -Path "$BIN_DIR\agencia-ai.cmd" -Value $wrapperScript

# Adicionar ao PATH do usuário
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$BIN_DIR*") {
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$BIN_DIR", "User")
    Write-Host "📂 $BIN_DIR adicionado ao PATH" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Instalação concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "  1. Reinicie o PowerShell (ou rode: . `$PROFILE)" -ForegroundColor White
Write-Host "  2. Verifique: agencia-ai doctor" -ForegroundColor White
Write-Host "  3. Inicie projeto: agencia-ai init" -ForegroundColor White
Write-Host ""
Write-Host "Ou em qualquer IDE: skill(name='agencia-init')" -ForegroundColor Gray
