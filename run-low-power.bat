@echo off
setlocal
cd /d "%~dp0"

echo Stopping old AdAlchemy dev processes...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.Name -match 'node|npm' -and $_.CommandLine -like '*commercial-adalchemy*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"

echo.
echo Starting AdAlchemy in low-power mode...
echo Open http://localhost:3000 if the browser does not open automatically.
start "" "http://localhost:3000"
npm run dev
