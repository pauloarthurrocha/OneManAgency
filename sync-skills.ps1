# sync-skills.ps1 - Sincroniza skills do repo GitHub para SSoT + Claude Code
# Uso: .\sync-skills.ps1 (executar apos git pull)

$ErrorActionPreference = "Stop"
$source = $PSScriptRoot
$ssot = "$env:USERPROFILE\.claude\shared\agencia-adaptavel\skills"
$claude = "$env:USERPROFILE\.claude\skills"

Write-Host ""
Write-Host "Sincronizando skills da agencia..." -ForegroundColor Cyan

$skills = @("agencia-init", "agencia-executor")

foreach ($skill in $skills) {
    $sourceFile = Join-Path $source "$skill\SKILL.md"
    
    if (-not (Test-Path $sourceFile)) {
        Write-Host "  SKIP: $skill nao encontrado no repo" -ForegroundColor Yellow
        continue
    }

    $sourceSize = (Get-Item $sourceFile).Length

    # 1. Atualizar SSoT
    $ssotDir = Join-Path $ssot $skill
    $ssotTarget = Join-Path $ssotDir "SKILL.md"
    if (-not (Test-Path $ssotDir)) {
        New-Item -ItemType Directory -Path $ssotDir -Force | Out-Null
    }
    Copy-Item $sourceFile $ssotTarget -Force
    Write-Host "  OK SSoT: $skill ($sourceSize bytes)" -ForegroundColor Green

    # 2. Atualizar Claude Code (flat)
    $claudeDir = Join-Path $claude $skill
    $claudeTarget = Join-Path $claudeDir "SKILL.md"
    if (-not (Test-Path $claudeDir)) {
        New-Item -ItemType Directory -Path $claudeDir -Force | Out-Null
    }
    Copy-Item $sourceFile $claudeTarget -Force
    Write-Host "  OK Claude: $skill ($sourceSize bytes)" -ForegroundColor Green
}

# Verificar versoes
Write-Host ""
Write-Host "Versoes instaladas:" -ForegroundColor Cyan
foreach ($skill in $skills) {
    $file = Join-Path $ssot "$skill\SKILL.md"
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match 'version:\s*(.+)') {
            $ver = $Matches[1].Trim()
            Write-Host "  $skill : v$ver" -ForegroundColor White
        }
    }
}

Write-Host ""
Write-Host "Sincronizacao completa! Antigravity atualiza via junction." -ForegroundColor Green
