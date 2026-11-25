@echo off
setlocal
set "EXE=%~dp0src-tauri\target\release\starlight.exe"
if not exist "%EXE%" (
  echo Building Starlight release binary...
  set "RUSTFLAGS=-Lnative=D:\tools\xwin\crt\lib\x86_64 -Lnative=D:\tools\xwin\sdk\lib\ucrt\x86_64 -Lnative=D:\tools\xwin\sdk\lib\um\x86_64"
  set "RC=D:\tools\llvm\bin\llvm-rc.exe"
  set "RC_x86_64_pc_windows_msvc=D:\tools\llvm\bin\llvm-rc.exe"
  pushd "%~dp0src-tauri"
  cargo build --release
  if errorlevel 1 (
    popd
    pause
    exit /b 1
  )
  popd
)
start "" "%EXE%" --wallpaper
