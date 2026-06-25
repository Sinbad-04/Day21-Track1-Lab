@echo off
REM start.bat - Khoi dong prototype AI Travel Planner (Day 18 / Day 20)
REM Cach dung: bam dup file nay, hoac chay "start.bat" trong cmd
REM Tuy chon port: start.bat 9000

setlocal
cd /d "%~dp0"

set PORT=%1
if "%PORT%"=="" set PORT=8080

where python >nul 2>nul
if %errorlevel%==0 (
    set PY=python
) else (
    where py >nul 2>nul
    if %errorlevel%==0 (
        set PY=py
    ) else (
        echo [!] Khong tim thay Python. Cai dat tai https://www.python.org/downloads/
        pause
        exit /b 1
    )
)

echo [*] Khoi dong server tai http://localhost:%PORT% (Ctrl+C de dung)...
start "" "http://localhost:%PORT%"
%PY% -m http.server %PORT%
endlocal
