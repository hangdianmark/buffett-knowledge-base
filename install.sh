#!/bin/bash
# 巴菲特知识库安装脚本
# 适用于Windows、macOS和Linux

echo "========================================="
echo "   巴菲特知识库安装脚本"
echo "========================================="
echo ""

# 检查操作系统
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="Linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macOS"
elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    OS="Windows"
else
    OS="未知"
fi

echo "检测到操作系统: $OS"
echo ""

# 检查必要工具
echo "检查必要工具..."
if command -v unzip &> /dev/null; then
    echo "✅ 已安装: unzip"
else
    echo "❌ 未安装: unzip"
    echo "请先安装unzip工具"
    if [[ "$OS" == "macOS" ]]; then
        echo "运行: brew install unzip"
    elif [[ "$OS" == "Linux" ]]; then
        echo "运行: sudo apt-get install unzip  # Ubuntu/Debian"
        echo "或运行: sudo yum install unzip     # CentOS/RHEL"
    fi
    exit 1
fi

# 解压缩
echo ""
echo "正在解压缩..."
if [ -f "buffett-knowledge-base.zip" ]; then
    unzip -q buffett-knowledge-base.zip
    echo "✅ 解压缩完成"
else
    echo "❌ 未找到 buffett-knowledge-base.zip 文件"
    echo "请确保压缩包在当前目录下"
    exit 1
fi

# 创建桌面快捷方式（可选）
echo ""
read -p "是否创建桌面快捷方式？ (y/N): " create_shortcut
if [[ "$create_shortcut" == "y" || "$create_shortcut" == "Y" ]]; then
    if [[ "$OS" == "Linux" ]]; then
        # Linux桌面快捷方式
        cat > ~/Desktop/巴菲特知识库.desktop << EOF
[Desktop Entry]
Type=Application
Name=巴菲特知识库
Comment=沃伦·巴菲特投资智慧库
Exec=xdg-open "$(pwd)/buffett-knowledge-base/index.html"
Icon=
Terminal=false
Categories=Education;Finance;
EOF
        chmod +x ~/Desktop/巴菲特知识库.desktop
        echo "✅ 已创建Linux桌面快捷方式"
        
    elif [[ "$OS" == "macOS" ]]; then
        # macOS应用程序
        APP_DIR="$HOME/Applications/巴菲特知识库.app"
        mkdir -p "$APP_DIR/Contents/MacOS"
        mkdir -p "$APP_DIR/Contents/Resources"
        
        # 创建Info.plist
        cat > "$APP_DIR/Contents/Info.plist" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>巴菲特知识库</string>
    <key>CFBundleIconFile</key>
    <string></string>
    <key>CFBundleIdentifier</key>
    <string>org.buffett-knowledge-base</string>
    <key>CFBundleName</key>
    <string>巴菲特知识库</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.12</string>
    <key>CFBundleURLTypes</key>
    <array/>
</dict>
</plist>
EOF
        
        # 创建启动脚本
        cat > "$APP_DIR/Contents/MacOS/巴菲特知识库" << EOF
#!/bin/bash
open "$(pwd)/buffett-knowledge-base/index.html"
EOF
        chmod +x "$APP_DIR/Contents/MacOS/巴菲特知识库"
        echo "✅ 已创建macOS应用程序"
        
    elif [[ "$OS" == "Windows" ]]; then
        # Windows快捷方式（需要PowerShell）
        if command -v powershell &> /dev/null; then
            powershell -Command "
                \$WshShell = New-Object -comObject WScript.Shell
                \$Shortcut = \$WshShell.CreateShortcut("$env:USERPROFILE\Desktop\巴菲特知识库.lnk")
                \$Shortcut.TargetPath = "$(pwd)\buffett-knowledge-base\index.html"
                \$Shortcut.Save()
            "
            echo "✅ 已创建Windows桌面快捷方式"
        else
            echo "⚠️  无法创建Windows快捷方式，请手动创建"
        fi
    fi
fi

# 显示使用说明
echo ""
echo "========================================="
echo "          安装完成！"
echo "========================================="
echo ""
echo "使用方法："
echo "1. 进入解压后的文件夹:"
echo "   cd buffett-knowledge-base"
echo ""
echo "2. 打开知识库："
echo "   双击 index.html 文件"
echo "   或运行: open index.html (macOS)"
echo "   或运行: xdg-open index.html (Linux)"
echo "   或拖拽到浏览器中打开"
echo ""
echo "3. 开始学习："
echo "   - 浏览核心概念"
echo "   - 查看投资案例"
echo "   - 阅读股东信件"
echo "   - 使用搜索功能"
echo ""
echo "4. 离线使用："
echo "   所有内容都已包含在本地，无需网络连接"
echo ""
echo "========================================="
echo "   📚 祝您学习愉快！📚"
echo "========================================="
