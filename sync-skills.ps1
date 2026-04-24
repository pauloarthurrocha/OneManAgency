# sync-skills.ps1 - Sincroniza skills do repo para todos os IDEs
# Uso: .\sync-skills.ps1 (executar apos git pull)
# REGRA: NUNCA deleta skills existentes. Apenas adiciona/atualiza skills do repo.

$ErrorActionPreference = "Stop"
$source = $PSScriptRoot

# Diretorios de destino
$targets = @{
    "SSoT"        = "$env:USERPROFILE\.agencia-ai\skills"
    "Claude"      = "$env:USERPROFILE\.claude\skills"
    "OpenCode"    = "$env:USERPROFILE\.opencode\skills"
    "Antigravity" = "$env:USERPROFILE\.gemini\antigravity\skills"
}

Write-Host ""
Write-Host "=== SINCRONIZANDO SKILLS DA AGENCIA ===" -ForegroundColor Cyan
Write-Host "Regra: Adicionar/Atualizar apenas. NUNCA deletar skills existentes." -ForegroundColor Gray
Write-Host ""

# Detectar todas as skills no repo (diretorios com SKILL.md)
$repoSkills = Get-ChildItem $source -Directory | Where-Object { 
    Test-Path (Join-Path $_.FullName "SKILL.md") 
} | Select-Object -ExpandProperty Name

Write-Host "Skills encontradas no repo: $($repoSkills.Count)" -ForegroundColor White
foreach ($s in $repoSkills) { Write-Host "  📦 $s" -ForegroundColor Gray }
Write-Host ""

# Sincronizar cada skill para todos os targets
foreach ($skill in $repoSkills) {
    $sourceFile = Join-Path $source "$skill\SKILL.md"
    $sourceSize = (Get-Item $sourceFile).Length
    
    foreach ($target in $targets.GetEnumerator()) {
        $targetName = $target.Key
        $targetPath = $target.Value
        $targetDir = Join-Path $targetPath $skill
        $targetFile = Join-Path $targetDir "SKILL.md"
        
        # Criar diretorio se nao existir
        if (-not (Test-Path $targetDir)) {
            New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        }
        
        # Copiar skill (sobrescreve apenas se diferente)
        if (-not (Test-Path $targetFile) -or 
            (Get-Item $sourceFile).LastWriteTime -gt (Get-Item $targetFile).LastWriteTime) {
            Copy-Item $sourceFile $targetFile -Force
            Write-Host "  ✅ $targetName`: $skill" -ForegroundColor Green
        } else {
            Write-Host "  ⚡ $targetName`: $skill (ja atual)" -ForegroundColor DarkGray
        }
    }
}

# Verificar versoes
Write-Host ""
Write-Host "=== VERSOES INSTALADAS ===" -ForegroundColor Cyan
foreach ($skill in $repoSkills) {
    $file = Join-Path $targets["SSoT"] "$skill\SKILL.md"
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match 'version:\s*(.+)') {
            $ver = $Matches[1].Trim()
            Write-Host "  $skill : v$ver" -ForegroundColor White
        }
    }
}

# Resumo final
Write-Host ""
Write-Host "=== RESUMO ===" -ForegroundColor Cyan
foreach ($target in $targets.GetEnumerator()) {
    $count = (Get-ChildItem $target.Value -Directory -ErrorAction SilentlyContinue).Count
    Write-Host "  $($target.Key): $count skills totais" -ForegroundColor Green
}

Write-Host ""
Write-Host "Sincronizacao completa! Skills existentes preservadas." -ForegroundColor Green
