#Requires -Version 5.1
# ═══════════════════════════════════════════════════════
# Agencia AI Adaptável — Instalador Universal (Windows)
# ═══════════════════════════════════════════════════════

$ErrorActionPreference = "Stop"

$REPO_URL = "https://github.com/pauloarthurrocha/agencia-ai-adaptavel-skills.git"
$INSTALL_DIR = "$env:USERPROFILE\.agencia-ai"
$GLOBAL_SKILLS_DIR = "$INSTALL_DIR\skills"

# Versao sera lida do package.json apos o clone. Placeholder inicial.
$VERSION = "unknown"

Write-Host "🚀 Agencia AI Adaptável — Instalador" -ForegroundColor Cyan
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
    # Guarda contra path vazio ou perigoso
    if ([string]::IsNullOrEmpty($INSTALL_DIR) -or $INSTALL_DIR -eq "C:\\" -or $INSTALL_DIR -eq $env:USERPROFILE) {
        Write-Host "❌ Path de instalação inválido: '$INSTALL_DIR'" -ForegroundColor Red
        exit 1
    }
    if (Test-Path $INSTALL_DIR) {
        Remove-Item -Recurse -Force $INSTALL_DIR
    }
    git clone --depth 1 $REPO_URL $INSTALL_DIR
    if (!(Test-Path "$INSTALL_DIR\.git")) {
        Write-Host "❌ Falha ao clonar repositório. Verifique sua conexão." -ForegroundColor Red
        exit 1
    }
}

# Ler versao do package.json (fonte unica de verdade)
if (Test-Path "$INSTALL_DIR\package.json") {
    try {
        $pkg = Get-Content "$INSTALL_DIR\package.json" -Raw | ConvertFrom-Json
        $VERSION = $pkg.version
        Write-Host "✅ Versão detectada: $VERSION" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Falha ao ler versão do package.json; usando 'unknown'" -ForegroundColor Yellow
    }
}

# ── Instalar skills globais ──
Write-Host "📂 Instalando skills em $GLOBAL_SKILLS_DIR..." -ForegroundColor Blue
New-Item -ItemType Directory -Force -Path $GLOBAL_SKILLS_DIR | Out-Null

$coreSkills = @("agencia-init", "agencia-executor", "client-onboarding", "pipeline-generator", "agencia-verify-work", "skill-creator")
foreach ($skill in $coreSkills) {
    $source = "$INSTALL_DIR\src\skills\$skill"
    $dest = "$GLOBAL_SKILLS_DIR\$skill"
    if (Test-Path $source) {
        if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
        Copy-Item -Recurse $source $dest
        Write-Host "  ✅ $skill" -ForegroundColor Green
    }
}

# Copiar templates (src/templates/)
if (Test-Path "$INSTALL_DIR\src\templates") {
    $templatesDest = "$INSTALL_DIR\templates"
    if (Test-Path $templatesDest) {
        if ([string]::IsNullOrEmpty($templatesDest) -or $templatesDest -eq "C:\\" -or $templatesDest -eq $env:USERPROFILE) {
            Write-Host "⚠️  Pulando templates com path inválido" -ForegroundColor Yellow
        } else {
            Remove-Item -Recurse -Force $templatesDest
        }
    }
    Copy-Item -Recurse "$INSTALL_DIR\src\templates" $templatesDest
    Write-Host "  ✅ templates" -ForegroundColor Green
}

# Copiar agents, presets, scripts de src/
$GLOBAL_DIR = "$INSTALL_DIR"
$foldersToCopy = @("agents", "presets", "scripts")
foreach ($folder in $foldersToCopy) {
    $source = "$INSTALL_DIR\src\$folder"
    $dest = "$GLOBAL_DIR\$folder"
    if (Test-Path $source) {
        if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
        Copy-Item -Recurse $source $dest
        Write-Host "  ✅ $folder" -ForegroundColor Green
    }
}

# ── Instalar skills externas (Marketing, etc.) ──
Write-Host ""
Write-Host "📦 Instalando skills externas..." -ForegroundColor Blue

# Marketing Skills
try {
    $marketingTmp = "$env:TEMP\marketingskills-install"
    if (Test-Path $marketingTmp) { Remove-Item -Recurse -Force $marketingTmp }
    git clone --depth 1 "https://github.com/coreyhaines31/marketingskills.git" $marketingTmp 2>$null
    if (Test-Path "$marketingTmp\skills") {
        $mSkills = Get-ChildItem "$marketingTmp\skills" -Directory
        foreach ($skill in $mSkills) {
            $dest = "$GLOBAL_SKILLS_DIR\$($skill.Name)"
            if (-not (Test-Path $dest)) {
                Copy-Item -Recurse $skill.FullName $dest
                Write-Host "  ✅ $($skill.Name) (marketing)" -ForegroundColor Green
            }
        }
    }
} catch {
    Write-Host "  ⚠️  Marketing skills não disponível (offline?)" -ForegroundColor Yellow
}

# ── Instalar Antigravity Kit ──
Write-Host ""
Write-Host "📦 Instalando Antigravity Kit..." -ForegroundColor Blue

try {
    $agKitTmp = "$env:TEMP\antigravity-kit-install"
    if (Test-Path $agKitTmp) { Remove-Item -Recurse -Force $agKitTmp }
    git clone --depth 1 "https://github.com/vudovn/antigravity-kit.git" $agKitTmp 2>$null
    if (Test-Path "$agKitTmp\.agent") {
        $agKitDest = "$INSTALL_DIR\antigravity-kit"
        if (Test-Path $agKitDest) { Remove-Item -Recurse -Force $agKitDest }
        New-Item -ItemType Directory -Path $agKitDest -Force | Out-Null
        
        # Copiar agentes
        robocopy "$agKitTmp\.agent\agents" "$agKitDest\agents" /E /NFL /NDL /NJH /NJS | Out-Null
        $agentCount = (Get-ChildItem "$agKitDest\agents" -File -ErrorAction SilentlyContinue).Count
        Write-Host "  ✅ $agentCount agentes" -ForegroundColor Green
        
        # Copiar workflows
        robocopy "$agKitTmp\.agent\workflows" "$agKitDest\workflows" /E /NFL /NDL /NJH /NJS | Out-Null
        $workflowCount = (Get-ChildItem "$agKitDest\workflows" -File -ErrorAction SilentlyContinue).Count
        Write-Host "  ✅ $workflowCount workflows" -ForegroundColor Green
        
        # Copiar shared (UI/UX Pro Max)
        robocopy "$agKitTmp\.agent\.shared" "$agKitDest\shared" /E /NFL /NDL /NJH /NJS | Out-Null
        Write-Host "  ✅ UI/UX Pro Max completo" -ForegroundColor Green
        
        # Copiar scripts
        robocopy "$agKitTmp\.agent\scripts" "$agKitDest\scripts" /E /NFL /NDL /NJH /NJS | Out-Null
        Write-Host "  ✅ Scripts Python" -ForegroundColor Green
        
        # Copiar configs
        Copy-Item "$agKitTmp\.agent\ARCHITECTURE.md" "$agKitDest\ARCHITECTURE.md" -ErrorAction SilentlyContinue
        Copy-Item "$agKitTmp\.agent\mcp_config.json" "$agKitDest\mcp_config.json" -ErrorAction SilentlyContinue
        Write-Host "  ✅ Configs" -ForegroundColor Green
    }
} catch {
    Write-Host "  ⚠️  Antigravity Kit não disponível (offline?)" -ForegroundColor Yellow
}

# ── Criar cópias por IDE (Windows não suporta symlink bem) ──
function Install-ForIde {
    param($idePath, $ideName)
    
    if (Test-Path $idePath) {
        $skillsPath = "$idePath\skills"
        New-Item -ItemType Directory -Force -Path $skillsPath | Out-Null
        
        if ([string]::IsNullOrEmpty($skillsPath) -or $skillsPath -eq "C:\\" -or $skillsPath -eq $env:USERPROFILE) {
            Write-Host "⚠️  Pulando $ideName com path inválido" -ForegroundColor Yellow
            return
        }
        
        # Adicionar/atualizar skills (NUNCA deletar existentes)
        $copied = 0
        foreach ($skillDir in Get-ChildItem $GLOBAL_SKILLS_DIR -Directory) {
            $target = "$skillsPath\$($skillDir.Name)"
            if (-not (Test-Path $target)) {
                Copy-Item -Recurse $skillDir.FullName $target
                $copied++
            }
        }
        
        $total = (Get-ChildItem $skillsPath -Directory).Count
        Write-Host "  📂 $ideName`: $copied novas | $total total → $skillsPath" -ForegroundColor Green
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

$agenciaFunction = @'
# Agencia AI Adaptável — Funções globais
$AGENCIA_HOME = $env:AGENCIA_HOME
if (!$AGENCIA_HOME) { $AGENCIA_HOME = "' + $INSTALL_DIR + '" }
$SKILLS_DIR = "$AGENCIA_HOME\skills"

function agencia-ai {
    param([Parameter(ValueFromRemainingArguments=$true)] $args)
    
    $cmd = $args[0]
    $arg1 = $args[1]
    
    switch ($cmd) {
        "init" {
            $target = if ($arg1) { $arg1 } else { "." }
            Write-Host "🏗️  Inicializando projeto em $target..." -ForegroundColor Cyan
            Write-Host "   Execute no IDE: skill(name='agencia-init')" -ForegroundColor Gray
            Write-Host "   Skills disponíveis em: $SKILLS_DIR" -ForegroundColor Gray
        }
        "doctor" {
            Write-Host "🔍 Diagnóstico da Agencia AI" -ForegroundColor Cyan
            Write-Host "Home: $AGENCIA_HOME" -ForegroundColor Gray
            Write-Host "Skills:" -ForegroundColor Gray
            if (Test-Path $SKILLS_DIR) {
                Get-ChildItem $SKILLS_DIR -Directory | ForEach-Object { Write-Host "  ✅ $($_.Name)" -ForegroundColor Green }
            }
        }
        "update" {
            Write-Host "🔄 Atualizando..." -ForegroundColor Cyan
            Set-Location $AGENCIA_HOME
            git pull --ff-only
            Write-Host "✅ Atualizado!" -ForegroundColor Green
        }
        "version" { Write-Host "Agencia AI v' + $VERSION + '" }
        default {
            Write-Host "Uso: agencia-ai <init|doctor|update|version>" -ForegroundColor Yellow
        }
    }
}
'@

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
