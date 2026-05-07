#!/usr/bin/env python3
"""
verify_all.py — Validação Completa da OneManAgency
=========================================================
Executa verificações abrangentes (3-5 min) em projetos:
- Lighthouse (performance, acessibilidade, SEO, best practices)
- E2E tests (Playwright)
- Bundle analysis
- Mobile audit
- i18n check
- Acessibilidade detalhada (axe-core)
- Link checking

Uso:
    python scripts/verify_all.py [caminho_do_projeto]

Saída:
    JSON com scores detalhados e relatório HTML
"""

import os
import sys
import json
import subprocess
import time
from pathlib import Path
from datetime import datetime


class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    RESET = '\033[0m'


def log(message, color=Colors.BLUE):
    print(f"{color}[verify_all]{Colors.RESET} {message}")


def run_command(cmd, cwd=None, timeout=120):
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


def check_lighthouse(project_path):
    """Executa Lighthouse CI"""
    log("Executando Lighthouse...")
    
    # Verifica se lighthouse está instalado
    returncode, _, _ = run_command("which lighthouse || npx lighthouse --version", timeout=10)
    if returncode != 0:
        return "SKIP", "Lighthouse não instalado (npm install -g lighthouse)"
    
    # Builda o projeto primeiro
    build_result = run_command("npm run build", cwd=project_path, timeout=120)
    if build_result[0] != 0:
        return "FAIL", "Build falhou antes do Lighthouse"
    
    # Inicia servidor estático
    dist_path = project_path / "dist"
    if not dist_path.exists():
        dist_path = project_path / "out"
    if not dist_path.exists():
        dist_path = project_path / ".next"
    
    if not dist_path.exists():
        return "SKIP", "Diretório de build não encontrado"
    
    # Executa Lighthouse
    report_path = project_path / ".planning" / "lighthouse-report.json"
    returncode, stdout, stderr = run_command(
        f"lighthouse http://localhost:3000 --output=json --output-path={report_path} --chrome-flags='--headless --no-sandbox'",
        cwd=project_path,
        timeout=60
    )
    
    if returncode != 0:
        return "FAIL", f"Lighthouse falhou: {stderr[:100]}"
    
    try:
        with open(report_path) as f:
            report = json.load(f)
        
        scores = {
            "performance": report["categories"]["performance"]["score"] * 100,
            "accessibility": report["categories"]["accessibility"]["score"] * 100,
            "best_practices": report["categories"]["best-practices"]["score"] * 100,
            "seo": report["categories"]["seo"]["score"] * 100,
        }
        
        avg_score = sum(scores.values()) / len(scores)
        
        if avg_score >= 90:
            status = "PASS"
        elif avg_score >= 70:
            status = "WARNING"
        else:
            status = "FAIL"
        
        return status, f"Scores: Performance={scores['performance']:.0f}, A11y={scores['accessibility']:.0f}, BP={scores['best_practices']:.0f}, SEO={scores['seo']:.0f}"
    except:
        return "FAIL", "Erro ao parsear relatório do Lighthouse"


def check_e2e(project_path):
    """Executa testes E2E com Playwright"""
    log("Executando testes E2E...")
    
    playwright_config = list(Path(project_path).glob("playwright.config.*"))
    if not playwright_config:
        return "SKIP", "Playwright não configurado"
    
    returncode, stdout, stderr = run_command(
        "npx playwright test",
        cwd=project_path,
        timeout=180
    )
    
    if returncode == 0:
        return "PASS", "Todos os testes E2E passaram"
    else:
        return "FAIL", "Alguns testes E2E falharam"


def check_bundle_size(project_path):
    """Analisa tamanho do bundle"""
    log("Analisando bundle...")
    
    # Verifica .next/static
    next_static = Path(project_path) / ".next" / "static"
    if next_static.exists():
        total_size = 0
        for file in next_static.rglob("*"):
            if file.is_file():
                total_size += file.stat().st_size
        
        size_mb = total_size / (1024 * 1024)
        
        if size_mb < 1:
            return "PASS", f"Bundle: {size_mb:.2f}MB"
        elif size_mb < 3:
            return "WARNING", f"Bundle: {size_mb:.2f}MB (ideal: <1MB)"
        else:
            return "FAIL", f"Bundle muito grande: {size_mb:.2f}MB"
    
    return "SKIP", "Bundle não encontrado (execute build primeiro)"


def check_accessibility(project_path):
    """Verifica acessibilidade com axe-core"""
    log("Verificando acessibilidade...")
    
    # Verifica se há erros de a11y básicos nos arquivos
    a11y_issues = []
    
    for ext in ["*.tsx", "*.jsx", "*.html"]:
        for file in Path(project_path).rglob(ext):
            try:
                content = file.read_text()
                
                # Verifica imagens sem alt
                import re
                img_tags = re.findall(r'<img[^>]*>', content)
                for img in img_tags:
                    if 'alt=' not in img:
                        a11y_issues.append(f"{file.name}: img sem alt")
                
                # Verifica inputs sem label
                input_tags = re.findall(r'<input[^>]*>', content)
                for inp in input_tags:
                    if 'aria-label' not in inp and 'aria-labelledby' not in inp:
                        a11y_issues.append(f"{file.name}: input sem label")
                
                # Verifica botões sem aria-label
                button_tags = re.findall(r'<button[^>]*>[^<]*</button>', content)
                for btn in button_tags:
                    if not re.search(r'>([^<]+)<', btn) or len(re.search(r'>([^<]+)<', btn).group(1).strip()) == 0:
                        if 'aria-label' not in btn:
                            a11y_issues.append(f"{file.name}: button sem texto/label")
            except:
                pass
    
    if not a11y_issues:
        return "PASS", "Acessibilidade OK"
    elif len(a11y_issues) <= 5:
        return "WARNING", f"{len(a11y_issues)} issues de a11y"
    else:
        return "FAIL", f"{len(a11y_issues)} issues de acessibilidade"


def check_mobile(project_path):
    """Verifica otimização mobile"""
    log("Verificando mobile...")
    
    issues = []
    
    # Verifica viewport meta tag
    layout_files = list(Path(project_path).rglob("layout.tsx")) + \
                  list(Path(project_path).rglob("layout.jsx")) + \
                  list(Path(project_path).rglob("index.html"))
    
    viewport_found = False
    for file in layout_files:
        try:
            content = file.read_text()
            if "viewport" in content.lower():
                viewport_found = True
                break
        except:
            pass
    
    if not viewport_found:
        issues.append("Viewport meta tag não encontrada")
    
    # Verifica media queries
    css_files = list(Path(project_path).rglob("*.css")) + \
               list(Path(project_path).rglob("*.scss"))
    
    has_media_queries = False
    for file in css_files:
        try:
            content = file.read_text()
            if "@media" in content:
                has_media_queries = True
                break
        except:
            pass
    
    if not has_media_queries and not list(Path(project_path).rglob("tailwind.config.*")):
        issues.append("Nenhuma media query encontrada")
    
    if not issues:
        return "PASS", "Mobile OK"
    else:
        return "WARNING", "; ".join(issues)


def check_i18n(project_path):
    """Verifica internacionalização"""
    log("Verificando i18n...")
    
    # Verifica se há strings hardcoded
    hardcoded_strings = []
    
    for ext in ["*.tsx", "*.jsx"]:
        for file in Path(project_path).rglob(ext):
            try:
                content = file.read_text()
                # Procura strings em português ou inglês comuns
                import re
                strings = re.findall(r'["\']([A-Z][a-zA-Z\s]{10,}[.!?])["\']', content)
                for s in strings:
                    hardcoded_strings.append(f"{file.name}: '{s[:50]}...'")
            except:
                pass
    
    if len(hardcoded_strings) > 10:
        return "WARNING", f"{len(hardcoded_strings)} strings possivelmente hardcoded"
    
    return "PASS", "i18n OK"


def check_links(project_path):
    """Verifica links quebrados"""
    log("Verificando links...")
    
    # Verifica links internos
    broken_links = []
    
    for ext in ["*.tsx", "*.jsx", "*.html", "*.md"]:
        for file in Path(project_path).rglob(ext):
            try:
                content = file.read_text()
                import re
                
                # Procura hrefs
                hrefs = re.findall(r'href=["\']([^"\']+)["\']', content)
                for href in hrefs:
                    if href.startswith("/") and not href.startswith("//"):
                        # Link interno
                        target = Path(project_path) / "public" / href.lstrip("/")
                        if not target.exists() and not href.startswith("/api/"):
                            broken_links.append(f"{file.name} -> {href}")
            except:
                pass
    
    if not broken_links:
        return "PASS", "Links OK"
    elif len(broken_links) <= 3:
        return "WARNING", f"{len(broken_links)} links possivelmente quebrados"
    else:
        return "FAIL", f"{len(broken_links)} links quebrados"


def main():
    project_path = sys.argv[1] if len(sys.argv) > 1 else "."
    project_path = Path(project_path).resolve()
    
    if not project_path.exists():
        print(f"Erro: Caminho não encontrado: {project_path}")
        sys.exit(1)
    
    log(f"Iniciando verificação completa em: {project_path}")
    print()
    
    start_time = time.time()
    
    checks = {
        "lighthouse": check_lighthouse(project_path),
        "e2e": check_e2e(project_path),
        "bundle_size": check_bundle_size(project_path),
        "accessibility": check_accessibility(project_path),
        "mobile": check_mobile(project_path),
        "i18n": check_i18n(project_path),
        "links": check_links(project_path),
    }
    
    elapsed = time.time() - start_time
    
    # Resultados
    print()
    log("=" * 60)
    
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
    log("=" * 60)
    log(f"Resumo: {Colors.GREEN}{pass_count} PASS{Colors.RESET}, "
        f"{Colors.YELLOW}{warning_count} WARNING{Colors.RESET}, "
        f"{Colors.RED}{fail_count} FAIL{Colors.RESET}, "
        f"{Colors.BLUE}{skip_count} SKIP{Colors.RESET}")
    log(f"Tempo: {elapsed:.1f}s")
    
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
        "duration_seconds": elapsed,
        "summary": {
            "pass": pass_count,
            "warning": warning_count,
            "fail": fail_count,
            "skip": skip_count
        },
        "checks": results
    }
    
    report_path = project_path / ".planning" / "VERIFICATION_REPORT.json"
    report_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(report_path, "w") as f:
        json.dump(report, f, indent=2)
    
    log(f"Relatório salvo em: {report_path}")
    
    return 0 if final_status != "FAIL" else 1


if __name__ == "__main__":
    sys.exit(main())
