# start.ps1 — Khởi động prototype AI Travel Planner (Day 18 / Day 20)
# Cách dùng:  Bấm chuột phải > "Run with PowerShell"  hoặc chạy:  ./start.ps1
# Tuỳ chọn:   ./start.ps1 -Port 9000

param(
    [int]$Port = 8080
)

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

# Tìm Python (python hoặc py)
$python = $null
foreach ($cmd in @("python", "py")) {
    if (Get-Command $cmd -ErrorAction SilentlyContinue) { $python = $cmd; break }
}
if (-not $python) {
    Write-Host "[!] Khong tim thay Python. Cai dat tai https://www.python.org/downloads/" -ForegroundColor Red
    exit 1
}

$url = "http://localhost:$Port"
Write-Host "[*] Khoi dong server tai $url (Ctrl+C de dung)..." -ForegroundColor Cyan

# Mo browser sau 1 giay (server chay o foreground ben duoi)
Start-Job -ScriptBlock { Start-Sleep -Seconds 1; Start-Process $using:url } | Out-Null

& $python -m http.server $Port
