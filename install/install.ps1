#Requires -Version 5.1
# ═══════════════════════════════════════════════════════
# OneManAgency — Bootstrap Installer (Windows)
# ═══════════════════════════════════════════════════════
#
# This bootstrap clones the repository and delegates installation
# to build/postinstall.js. It also sets up the PowerShell function
# and PATH wrapper so `oma` works from any terminal.
#
# irm https://raw.githubusercontent.com/pauloarthurrocha/OneManAgency/main/install/install.ps1 | iex

$ErrorActionPreference = "Stop"

$REPO_URL = "https://github.com/pauloarthurrocha/OneManAgency.git"
$INSTALL_DIR = "$env:USERPROFILE\.oma"

Write-Host "🚀 OneManAgency — Bootstrap Installer" -ForegroundColor Cyan
Write-Host ""

# ── Check dependencies ──
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is required. Install: https://git-scm.com/" -ForegroundColor Red
    exit 1
}
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js >= 18 is required. Install: https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# ── Detect installed IDEs ──
$IDE = @()
if (Test-Path "$env:USERPROFILE\.opencode") { $IDE += "opencode" }
if (Test-Path "$env:USERPROFILE\.claude") { $IDE += "claude" }
if (Test-Path "$env:USERPROFILE\.gemini") { $IDE += "gemini-cli"; $IDE += "antigravity" }
if (Test-Path "$env:USERPROFILE\.codex") { $IDE += "codex" }
if (Test-Path "$env:USERPROFILE\.cursor") { $IDE += "cursor" }
if (Test-Path "$env:USERPROFILE\.roo") { $IDE += "roo" }

if ($IDE.Count -gt 0) {
    Write-Host "✅ IDE(s) detected: $($IDE -join ', ')" -ForegroundColor Green
} else {
    Write-Host "⚠️ No IDE detected. Skills will be installed globally only." -ForegroundColor Yellow
}

# ── Clone or update repository ──
if (Test-Path "$INSTALL_DIR\.git") {
    Write-Host "📦 Updating repository..." -ForegroundColor Blue
    Set-Location $INSTALL_DIR
    git pull --ff-only
} else {
    Write-Host "📦 Cloning repository..." -ForegroundColor Blue
    if ([string]::IsNullOrEmpty($INSTALL_DIR) -or $INSTALL_DIR -eq "C:\\" -or $INSTALL_DIR -eq $env:USERPROFILE) {
        Write-Host "❌ Invalid install path: '$INSTALL_DIR'" -ForegroundColor Red
        exit 1
    }
    if (Test-Path $INSTALL_DIR) {
        Remove-Item -Recurse -Force $INSTALL_DIR
    }
    git clone --depth 1 $REPO_URL $INSTALL_DIR
    if (!(Test-Path "$INSTALL_DIR\.git")) {
        Write-Host "❌ Failed to clone repository. Check your connection." -ForegroundColor Red
        exit 1
    }
}

# ── Read version ──
$VERSION = "unknown"
if (Test-Path "$INSTALL_DIR\package.json") {
    try {
        $pkg = Get-Content "$INSTALL_DIR\package.json" -Raw | ConvertFrom-Json
        $VERSION = $pkg.version
        Write-Host "✅ Version: $VERSION" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Failed to read version from package.json" -ForegroundColor Yellow
    }
}

# ── Delegate to Node installer ──
Set-Location $INSTALL_DIR
Write-Host "🔧 Running installer..." -ForegroundColor Blue
node build/postinstall.js

# ── Create PowerShell function (delegates to Node CLI) ──
$PROFILE_DIR = Split-Path $PROFILE -Parent
if (!(Test-Path $PROFILE_DIR)) {
    New-Item -ItemType Directory -Force -Path $PROFILE_DIR | Out-Null
}
# Ensure $PROFILE file exists before attempting to read/write
if (!(Test-Path $PROFILE)) {
    New-Item -ItemType File -Force -Path $PROFILE | Out-Null
}

$omaFunction = @'
# OneManAgency — Global function (auto-generated)
function oma {
    param([Parameter(ValueFromRemainingArguments=$true)] $args)
    $OMA_HOME = if ($env:OMA_HOME) { $env:OMA_HOME } else { "' + $INSTALL_DIR + '" }
    & node "$OMA_HOME\bin\oma.js" @args
}
'@

if (!(Select-String -Path $PROFILE -Pattern "function oma" -ErrorAction SilentlyContinue)) {
    Add-Content -Path $PROFILE -Value "`n$omaFunction`n"
    Write-Host "✅ PowerShell function 'oma' added to profile" -ForegroundColor Green
}

# ── Create .cmd wrapper in PATH ──
$BIN_DIR = "$env:LOCALAPPDATA\OneManAgency\bin"
New-Item -ItemType Directory -Force -Path $BIN_DIR | Out-Null

$wrapperCmd = @"
@echo off
node "$INSTALL_DIR\bin\oma.js" %*
"@
Set-Content -Path "$BIN_DIR\oma.cmd" -Value $wrapperCmd

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$BIN_DIR*") {
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$BIN_DIR", "User")
    Write-Host "📂 Added to PATH: $BIN_DIR" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Restart PowerShell (or run: . `$PROFILE)" -ForegroundColor White
Write-Host "  2. Verify: oma doctor" -ForegroundColor White
Write-Host "  3. Create project: mkdir my-project && cd my-project" -ForegroundColor White
Write-Host "  4. In your IDE: skill(name='oma-init')" -ForegroundColor Gray
Write-Host ""
