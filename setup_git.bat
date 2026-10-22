@echo off
echo ========================================================
echo   Running SCM Automated Git History Generator
echo ========================================================
powershell -ExecutionPolicy Bypass -File "%~dp0generate_git_history.ps1"
pause
