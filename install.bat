@echo off
chcp 65001 >nul
echo =========================================
echo     巴菲特知识库安装脚本 (Windows)
echo =========================================
echo.

REM 检查是否安装了7-Zip
where 7z >nul 2>nul
if %errorlevel% neq 0 (
    echo 检查到未安装7-Zip
    echo 请从 https://www.7-zip.org/ 下载并安装
    echo.
    echo 或者使用系统自带的解压工具：
    echo 1. 右键点击压缩包
    echo 2. 选择"全部解压缩..."
    echo 3. 选择解压目录
    echo.
    pause
    exit /b 1
)

REM 解压缩
echo 正在解压缩...
if exist "buffett-knowledge-base.zip" (
    7z x -y "buffett-knowledge-base.zip" >nul
    echo ✅ 解压缩完成
) else (
    echo ❌ 未找到 buffett-knowledge-base.zip 文件
    echo 请确保压缩包在当前目录下
    echo.
    pause
    exit /b 1
)

REM 创建桌面快捷方式
echo.
set /p create_shortcut="是否创建桌面快捷方式？ (Y/N): "
if /i "%create_shortcut%"=="Y" (
    echo 创建桌面快捷方式...
    
    REM 创建VBS脚本创建快捷方式
    echo Set WshShell = CreateObject("WScript.Shell") > create_shortcut.vbs
    echo Set oShellLink = WshShell.CreateShortcut(WshShell.SpecialFolders("Desktop") ^& "\巴菲特知识库.lnk") >> create_shortcut.vbs
    echo oShellLink.TargetPath = "%cd%uffett-knowledge-base\index.html" >> create_shortcut.vbs
    echo oShellLink.WindowStyle = 1 >> create_shortcut.vbs
    echo oShellLink.Description = "沃伦·巴菲特投资智慧库" >> create_shortcut.vbs
    echo oShellLink.Save >> create_shortcut.vbs
    
    cscript //nologo create_shortcut.vbs
    del create_shortcut.vbs
    
    echo ✅ 已创建桌面快捷方式
)

REM 创建开始菜单快捷方式
echo.
set /p create_startmenu="是否创建开始菜单快捷方式？ (Y/N): "
if /i "%create_startmenu%"=="Y" (
    echo 创建开始菜单快捷方式...
    
    REM 创建开始菜单目录
    if not exist "%APPDATA%\Microsoft\Windows\Start Menu\Programs\巴菲特知识库" (
        mkdir "%APPDATA%\Microsoft\Windows\Start Menu\Programs\巴菲特知识库"
    )
    
    echo Set WshShell = CreateObject("WScript.Shell") > create_startmenu.vbs
    echo Set oShellLink = WshShell.CreateShortcut(WshShell.SpecialFolders("StartMenu") ^& "\Programs\巴菲特知识库\巴菲特知识库.lnk") >> create_startmenu.vbs
    echo oShellLink.TargetPath = "%cd%uffett-knowledge-base\index.html" >> create_startmenu.vbs
    echo oShellLink.WindowStyle = 1 >> create_startmenu.vbs
    echo oShellLink.Description = "沃伦·巴菲特投资智慧库" >> create_startmenu.vbs
    echo oShellLink.Save >> create_startmenu.vbs
    
    cscript //nologo create_startmenu.vbs
    del create_startmenu.vbs
    
    echo ✅ 已创建开始菜单快捷方式
)

REM 显示使用说明
echo.
echo =========================================
echo           安装完成！
echo =========================================
echo.
echo 使用方法：
echo 1. 进入解压后的文件夹：
echo    cd buffett-knowledge-base
echo.
echo 2. 打开知识库：
echo    双击 index.html 文件
echo    或右键点击，选择"打开方式"，选择浏览器
echo.
echo 3. 开始学习：
echo    - 浏览核心概念
echo    - 查看投资案例
echo    - 阅读股东信件
echo    - 使用搜索功能
echo.
echo 4. 离线使用：
echo    所有内容都已包含在本地，无需网络连接
echo.
echo 5. 快速访问：
echo    - 桌面快捷方式
echo    - 开始菜单快捷方式
echo.
echo =========================================
echo    📚 祝您学习愉快！📚
echo =========================================
echo.
pause
