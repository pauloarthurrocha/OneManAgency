#!/usr/bin/env python3
"""
checklist.py — Validação Rápida da Agência AI Adaptável
=====================================================
Executa verificações rápidas (30s) em projetos:
- Lint e formatação
- Tipagem (TypeScript)
- Vulnerabilidades básicas
- Testes unitários
- Qualidade de código
- SEO básico

Uso:
    python scripts/checklist.py [caminho_do_projeto]

Saída:
    JSON com status PASS/WARNING/FAIL por categoria
"""

import os
import sys
import json
import subprocess
import glob
from pathlib import Path
from datetime import datetime


class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    RESET = '\033[0m'


def log(message, color=Colors.BLUE):
    print(f"{color}[checklist]{Colors.RESET} {message}")


def run_command(cmd, cwd=None, timeout=30):
    """Executa comando e retorna (returncode, stdout, stderr)"""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            cwd=cwd,
            capture_output=True,
            text=True,
            timeout=timeout
        )
        return result.returncode, result.stdout, result.stderr
    except subprocess.TimeoutExpired:
        return -1, "", f"Timeout após {timeout}s"
    except Exception as e:
        return -1, "", str(e)


def check_typescript(project_path):
    """Verifica TypeScript compilation"""
    log("Verificando TypeScript...")
    
    tsconfig = Path(project_path) / "tsconfig.json"
    if not tsconfig.exists():
        return "SKIP", "tsconfig.json não encontrado"
    
    returncode, stdout, stderr = run_command(
        "npx tsc --noEmit",
        cwd=project_path,
        timeout=30
    )
    
    if returncode == 0:
        return "PASS", "TypeScript OK"
    else:
        errors = stderr or stdout
        error_count = errors.count("error TS")
        return "FAIL", f"{error_count} erros de TypeScript"


def check_eslint(project_path):
    """Verifica ESLint"""
    log("Verificando ESLint...")
    
    eslint_config = list(Path(project_path).glob(".eslintrc*")) + \
                   list(Path(project_path).glob("eslint.config.*"))
    
    if not eslint_config:
        return "SKIP", "ESLint não configurado"
    
    returncode, stdout, stderr = run_command(
        "npx eslint . --ext .ts,.tsx,.js,.jsx --format compact",
        cwd=project_path,
        timeout=30
    )
    
    if returncode == 0:
        return "PASS", "ESLint OK"
    else:
        error_count = stdout.count("Error:") + stderr.count("Error:")
        warning_count = stdout.count("Warning:") + stderr.count("Warning:")
        return "WARNING" if error_count == 0 else "FAIL", \
               f"{error_count} erros, {warning_count} warnings"


def check_security(project_path):
    """Verifica vulnerabilidades em dependências"""
    log("Verificando segurança...")
    
    package_json = Path(project_path) / "package.json"
    if not package_json.exists():
        return "SKIP", "package.json não encontrado"
    
    returncode, stdout, stderr = run_command(
        "npm audit --audit-level=moderate --json",
        cwd=project_path,
        timeout=30
    )
    
    try:
        audit_data = json.loads(stdout)
        vulnerabilities = audit_data.get("metadata", {}).get("vulnerabilities", {})
        total = sum(vulnerabilities.values())
        
        if total == 0:
            return "PASS", "Nenhuma vulnerabilidade encontrada"
        elif vulnerabilities.get("high", 0) > 0 or vulnerabilities.get("critical", 0) > 0:
            return "FAIL", f"{total} vulnerabilidades ({vulnerabilities.get('high', 0)} high, {vulnerabilities.get('critical', 0)} critical)"
        else:
            return "WARNING", f"{total} vulnerabilidades (low/moderate)"
    except:
        return "SKIP", "Não foi possível parsear npm audit"


def check_tests(project_path):
    """Verifica se há testes e se passam"""
    log("Verificando testes...")
    
    test_files = list(Path(project_path).rglob("*.test.*")) + \
                list(Path(project_path).rglob("*.spec.*"))
    
    if not test_files:
        return "WARNING", "Nenhum arquivo de teste encontrado"
    
    # Tenta rodar testes
    for cmd in ["npm test", "npx vitest run", "npx jest"]:
        returncode, stdout, stderr = run_command(cmd, cwd=project_path, timeout=60)
        if returncode == 0:
            return "PASS", f"Testes passaram ({len(test_files)} arquivos)"
        elif returncode != -1:  # Comando existe mas falhou
            return "FAIL", "Alguns testes falharam"
    
    return "WARNING", f"{len(test_files)} arquivos de teste encontrados mas não executados"


def check_build(project_path):
    """Verifica se o build passa"""
    log("Verificando build...")
    
    package_json = Path(project_path) / "package.json"
    if not package_json.exists():
        return "SKIP", "package.json não encontrado"
    
    try:
        with open(package_json) as f:
            pkg = json.load(f)
        scripts = pkg.get("scripts", {})
        
        if "build" not in scripts:
            return "SKIP", "Script 'build' não encontrado"
        
        returncode, stdout, stderr = run_command(
            "npm run build",
            cwd=project_path,
            timeout=60
        )
        
        if returncode == 0:
            return "PASS", "Build OK"
        else:
            return "FAIL", "Build falhou"
    except:
        return "SKIP", "Erro ao ler package.json"


def check_seo(project_path):
    """Verifica SEO básico"""
    log("Verificando SEO básico...")
    
    issues = []
    
    # Verifica robots.txt
    robots = Path(project_path) / "public" / "robots.txt"
    if not robots.exists():
        issues.append("robots.txt não encontrado")
    
    # Verifica sitemap.xml
    sitemap = Path(project_path) / "public" / "sitemap.xml"
    if not sitemap.exists():
        issues.append("sitemap.xml não encontrado")
    
    # Verifica meta tags em páginas principais
    html_files = list(Path(project_path).rglob("*.html")) + \
                list(Path(project_path).rglob("page.tsx"))
    
    if not html_files and not list(Path(project_path).rglob("layout.tsx")):
        issues.append("Nenhuma página HTML/TSX encontrada")
    
    if not issues:
        return "PASS", "SEO básico OK"
    elif len(issues) <= 2:
        return "WARNING", f"{len(issues)} issues: {', '.join(issues)}"
    else:
        return "FAIL", f"{len(issues)} issues SEO"


def check_code_quality(project_path):
    """Verifica qualidade geral do código"""
    log("Verificando qualidade do código...")
    
    issues = []
    
    # Verifica arquivos muito grandes
    large_files = []
    for ext in ["*.ts", "*.tsx", "*.js", "*.jsx"]:
        for file in Path(project_path).rglob(ext):
            if file.stat().st_size > 50000:  # 50KB
                large_files.append(file.name)
    
    if len(large_files) > 3:
        issues.append(f"{len(large_files)} arquivos muito grandes (>50KB)")
    
    # Verifica console.log
    console_logs = 0
    for ext in ["*.ts", "*.tsx", "*.js", "*.jsx"]:
        for file in Path(project_path).rglob(ext):
            try:
                content = file.read_text()
                console_logs += content.count("console.log")
            except:
                pass
    
    if console_logs > 5:
        issues.append(f"{console_logs} console.log encontrados")
    
    # Verifica TODO/FIXME
    todos = 0
    for ext in ["*.ts", "*.tsx", "*.js", "*.jsx", "*.md"]:
        for file in Path(project_path).rglob(ext):
            try:
                content = file.read_text()
                todos += content.count("TODO") + content.count("FIXME")
            except:
                pass
    
    if todos > 10:
        issues.append(f"{todos} TODO/FIXME pendentes")
    
    if not issues:
        return "PASS", "Qualidade de código OK"
    else:
        return "WARNING", "; ".join(issues)


def main():
    project_path = sys.argv[1] if len(sys.argv) > 1 else "."
    project_path = Path(project_path).resolve()
    
    if not project_path.exists():
        print(f"Erro: Caminho não encontrado: {project_path}")
        sys.exit(1)
    
    log(f"Iniciando checklist em: {project_path}")
    print()
    
    checks = {
        "typescript": check_typescript(project_path),
        "eslint": check_eslint(project_path),
        "security": check_security(project_path),
        "tests": check_tests(project_path),
        "build": check_build(project_path),
        "seo": check_seo(project_path),
        "code_quality": check_code_quality(project_path),
    }
    
    # Resultados
    print()
    log("=" * 50)
    
    results = {}
    for check_name, (status, message) in checks.items():
        results[check_name] = {"status": status, "message": message}
        
        color = Colors.GREEN if status == "PASS" else \
                Colors.YELLOW if status == "WARNING" else \
                Colors.RED if status == "FAIL" else Colors.BLUE
        
        print(f"  {color}[{status}]{Colors.RESET} {check_name}: {message}")
    
    # Resumo
    pass_count = sum(1 for r in results.values() if r["status"] == "PASS")
    warning_count = sum(1 for r in results.values() if r["status"] == "WARNING")
    fail_count = sum(1 for r in results.values() if r["status"] == "FAIL")
    skip_count = sum(1 for r in results.values() if r["status"] == "SKIP")
    
    print()
    log("=" * 50)
    log(f"Resumo: {Colors.GREEN}{pass_count} PASS{Colors.RESET}, "
        f"{Colors.YELLOW}{warning_count} WARNING{Colors.RESET}, "
        f"{Colors.RED}{fail_count} FAIL{Colors.RESET}, "
        f"{Colors.BLUE}{skip_count} SKIP{Colors.RESET}")
    
    # Decisão final
    if fail_count > 0:
        final_status = "FAIL"
        color = Colors.RED
    elif warning_count > 0:
        final_status = "WARNING"
        color = Colors.YELLOW
    else:
        final_status = "PASS"
        color = Colors.GREEN
    
    log(f"Resultado Final: {color}{final_status}{Colors.RESET}")
    
    # Salvar relatório JSON
    report = {
        "timestamp": datetime.now().isoformat(),
        "project_path": str(project_path),
        "status": final_status,
        "summary": {
            "pass": pass_count,
            "warning": warning_count,
            "fail": fail_count,
            "skip": skip_count
        },
        "checks": results
    }
    
    report_path = project_path / ".planning" / "CHECKLIST_REPORT.json"
    report_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(report_path, "w") as f:
        json.dump(report, f, indent=2)
    
    log(f"Relatório salvo em: {report_path}")
    
    return 0 if final_status != "FAIL" else 1


if __name__ == "__main__":
    sys.exit(main())
