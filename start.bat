@echo off
echo ===================================================
echo      Starting Mesdaq AI System
echo ===================================================

:: 1. Start Backend API in a new window
echo [1/2] Launching Backend Server...
start "Mesdaq Backend (Do Not Close)" cmd /k "cd /d C:\Users\C-LAB\Pictures\mesdaq && uvicorn main:app --reload --host 127.0.0.1 --port 8000"

:: Wait 5 seconds for backend to initialize
timeout /t 5 >nul

:: 2. Start Frontend in a new window
echo [2/2] Launching Frontend Interface...
cd /d "C:\Users\C-LAB\Pictures\mesdaq\mesdaq-main"
start "Mesdaq Frontend (Do Not Close)" cmd /k "npm run dev"

echo.
echo ===================================================
echo System should now be running!
echo.
echo 1. Backend Status: http://127.0.0.1:8000/docs
echo 2. Frontend Access: URL shown in the 'Mesdaq Frontend' window (usually http://localhost:8080)
echo.
echo NOTE: Keep the two new black command windows OPEN.
echo ===================================================
pause
