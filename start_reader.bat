@echo off
REM pindah ke folder tempat file ini berada
cd /d "%~dp0"

REM jalankan server Node di background (window akan diminimalkan jika dibuka manual)
start "" /min node app.cjs

REM tunggu 2 detik supaya server siap
timeout /t 2 /nobreak >nul

REM buka index.html di browser default
start "" index.html