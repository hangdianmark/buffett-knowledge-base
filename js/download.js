// 巴菲特知识库 - 下载功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initDownloadButtons();
    initVersionSelectors();
    updateDownloadStats();
});

// 初始化下载按钮
function initDownloadButtons() {
    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', function() {
            const version = this.getAttribute('data-version');
            handleDownload(version);
        });
    });
}

// 处理下载
function handleDownload(version) {
    // 显示下载确认对话框
    showDownloadModal(version);
}

// 显示下载确认对话框
function showDownloadModal(version) {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const versionInfo = getVersionInfo(version);
    
    modal.innerHTML = `
        <div class="download-dialog" style="
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        ">
            <div class="dialog-header" style="
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
            ">
                <div class="dialog-icon" style="
                    width: 48px;
                    height: 48px;
                    background: ${versionInfo.color};
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.5rem;
                ">
                    <i class="${versionInfo.icon}"></i>
                </div>
                <div>
                    <h2 style="margin: 0; color: #1a365d;">${versionInfo.title}</h2>
                    <p style="margin: 0.25rem 0 0; color: #718096; font-size: 0.875rem;">${versionInfo.subtitle}</p>
                </div>
            </div>
            
            <div class="dialog-content" style="margin-bottom: 1.5rem;">
                <div class="download-info" style="
                    background: #f7fafc;
                    border-radius: 8px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                ">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="color: #718096;">文件大小:</span>
                        <span style="font-weight: 600; color: #1a365d;">${versionInfo.size}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="color: #718096;">文件格式:</span>
                        <span style="font-weight: 600; color: #1a365d;">${versionInfo.format}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #718096;">更新日期:</span>
                        <span style="font-weight: 600; color: #1a365d;">${versionInfo.date}</span>
                    </div>
                </div>
                
                <div class="download-options" style="margin-bottom: 1rem;">
                    <h3 style="font-size: 1rem; margin-bottom: 0.5rem; color: #4a5568;">选择下载方式:</h3>
                    <div class="option-buttons" style="display: flex; gap: 0.5rem;">
                        <button class="option-btn direct" style="
                            flex: 1;
                            padding: 0.75rem;
                            background: #1a365d;
                            color: white;
                            border: none;
                            border-radius: 6px;
                            font-weight: 600;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.5rem;
                        ">
                            <i class="fas fa-download"></i>
                            直接下载
                        </button>
                        <button class="option-btn torrent" style="
                            flex: 1;
                            padding: 0.75rem;
                            background: #f7fafc;
                            color: #1a365d;
                            border: 1px solid #e2e8f0;
                            border-radius: 6px;
                            font-weight: 600;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.5rem;
                        ">
                            <i class="fas fa-magnet"></i>
                            Torrent
                        </button>
                    </div>
                </div>
                
                <div class="download-steps" style="
                    background: #fffaf0;
                    border: 1px solid #fed7aa;
                    border-radius: 8px;
                    padding: 1rem;
                    font-size: 0.875rem;
                    color: #92400e;
                ">
                    <strong style="display: block; margin-bottom: 0.25rem;">
                        <i class="fas fa-lightbulb"></i> 使用提示:
                    </strong>
                    ${versionInfo.tips}
                </div>
            </div>
            
            <div class="dialog-footer" style="
                display: flex;
                justify-content: flex-end;
                gap: 0.75rem;
            ">
                <button class="cancel-btn" style="
                    padding: 0.5rem 1rem;
                    background: #f7fafc;
                    color: #4a5568;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    font-weight: 500;
                    cursor: pointer;
                ">
                    取消
                </button>
                <button class="confirm-btn" style="
                    padding: 0.5rem 1.5rem;
                    background: #1a365d;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                ">
                    <i class="fas fa-download"></i>
                    开始下载
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // 事件处理
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    modal.querySelector('.confirm-btn').addEventListener('click', () => {
        startDownload(version);
        showDownloadProgress(version);
        modal.remove();
        style.remove();
    });
    
    modal.querySelector('.option-btn.direct').addEventListener('click', () => {
        modal.querySelector('.confirm-btn').textContent = '开始下载 (直接)';
    });
    
    modal.querySelector('.option-btn.torrent').addEventListener('click', () => {
        modal.querySelector('.confirm-btn').textContent = '获取种子文件';
    });
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

// 获取版本信息
function getVersionInfo(version) {
    const versions = {
        standard: {
            title: '标准版',
            subtitle: '完整的HTML网站格式',
            icon: 'fas fa-file-archive',
            color: '#1a365d',
            size: '12 MB',
            format: 'ZIP压缩包',
            date: '2026-04-04',
            tips: '下载后解压，双击 index.html 即可开始使用。'
        },
        mobile: {
            title: '移动版',
            subtitle: '优化移动端体验',
            icon: 'fas fa-mobile-alt',
            color: '#2c5282',
            size: '8 MB',
            format: 'ZIP压缩包',
            date: '2026-04-04',
            tips: '专为手机和平板优化，在移动设备上体验更佳。'
        },
        ebook: {
            title: '电子书版',
            subtitle: '支持离线阅读器',
            icon: 'fas fa-wifi-slash',
            color: '#c6a052',
            size: '15 MB',
            format: 'EPUB/MOBI/PDF',
            date: '2026-04-04',
            tips: '包含三种格式，可在Kindle、iPad等设备上阅读。'
        }
    };
    
    return versions[version] || versions.standard;
}

// 开始下载
function startDownload(version) {
    // 在实际应用中，这里会触发文件下载
    // 由于我们是在本地文件系统，这里只模拟下载过程
    
    const filename = getDownloadFilename(version);
    showToast(`开始下载: ${filename}`);
    
    // 模拟下载进度
    simulateDownload(version);
    
    // 记录下载统计
    recordDownload(version);
}

// 获取下载文件名
function getDownloadFilename(version) {
    const filenames = {
        standard: 'buffett-knowledge-base-standard-2026-04-04.zip',
        mobile: 'buffett-knowledge-base-mobile-2026-04-04.zip',
        ebook: 'buffett-knowledge-base-ebook-2026-04-04.zip'
    };
    
    return filenames[version] || filenames.standard;
}

// 模拟下载过程
function simulateDownload(version) {
    // 在实际应用中，这里会处理真实的文件下载
    // 这里只显示一个进度提示
    
    setTimeout(() => {
        showToast('下载完成！文件已保存到您的下载文件夹。');
        updateDownloadStats();
    }, 2000);
}

// 显示下载进度
function showDownloadProgress(version) {
    const progress = document.createElement('div');
    progress.className = 'download-progress';
    progress.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        min-width: 300px;
    `;
    
    const versionInfo = getVersionInfo(version);
    
    progress.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
            <div style="
                width: 32px;
                height: 32px;
                background: ${versionInfo.color};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            ">
                <i class="${versionInfo.icon}"></i>
            </div>
            <div style="flex: 1;">
                <div style="font-weight: 600; color: #1a365d;">正在下载 ${versionInfo.title}</div>
                <div style="font-size: 0.75rem; color: #718096;">${getDownloadFilename(version)}</div>
            </div>
        </div>
        <div class="progress-bar" style="
            height: 4px;
            background: #e2e8f0;
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        ">
            <div class="progress-fill" style="
                height: 100%;
                background: ${versionInfo.color};
                width: 0%;
                transition: width 0.3s ease;
            "></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #718096;">
            <span class="progress-text">准备下载...</span>
            <span class="progress-percent">0%</span>
        </div>
    `;
    
    document.body.appendChild(progress);
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // 模拟进度更新
    let percent = 0;
    const progressFill = progress.querySelector('.progress-fill');
    const progressText = progress.querySelector('.progress-text');
    const progressPercent = progress.querySelector('.progress-percent');
    
    const interval = setInterval(() => {
        percent += Math.random() * 10 + 5;
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);
            
            progressText.textContent = '下载完成！';
            progressPercent.textContent = '100%';
            progressFill.style.width = '100%';
            
            // 3秒后移除进度条
            setTimeout(() => {
                progress.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    progress.remove();
                    style.remove();
                }, 300);
            }, 3000);
        } else {
            progressFill.style.width = percent + '%';
            progressPercent.textContent = Math.round(percent) + '%';
            
            const statuses = ['正在连接...', '下载中...', '处理文件...'];
            if (percent < 30) progressText.textContent = statuses[0];
            else if (percent < 70) progressText.textContent = statuses[1];
            else progressText.textContent = statuses[2];
        }
    }, 200);
    
    // 点击关闭
    progress.addEventListener('click', () => {
        clearInterval(interval);
        progress.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            progress.remove();
            style.remove();
        }, 300);
    });
}

// 记录下载统计
function recordDownload(version) {
    let downloads = JSON.parse(localStorage.getItem('buffettDownloads') || '{}');
    
    if (!downloads[version]) {
        downloads[version] = 0;
    }
    
    downloads[version]++;
    localStorage.setItem('buffettDownloads', JSON.stringify(downloads));
}

// 更新下载统计显示
function updateDownloadStats() {
    const downloads = JSON.parse(localStorage.getItem('buffettDownloads') || '{}');
    const total = Object.values(downloads).reduce((sum, count) => sum + count, 0);
    
    // 在实际应用中，这里可以更新页面上的统计数据
    if (total > 0) {
        console.log(`总下载次数: ${total}`);
    }
}

// 初始化版本选择器
function initVersionSelectors() {
    // 如果有版本选择器，这里可以添加相关功能
    const versionSelectors = document.querySelectorAll('.version-selector');
    if (versionSelectors.length > 0) {
        versionSelectors.forEach(selector => {
            selector.addEventListener('change', function() {
                const selectedVersion = this.value;
                updateVersionInfo(selectedVersion);
            });
        });
    }
}

// 更新版本信息显示
function updateVersionInfo(version) {
    const versionInfo = getVersionInfo(version);
    
    // 更新页面上的版本信息显示
    const infoElements = document.querySelectorAll('.version-info');
    infoElements.forEach(element => {
        if (element.dataset.type === 'size') {
            element.textContent = versionInfo.size;
        } else if (element.dataset.type === 'format') {
            element.textContent = versionInfo.format;
        } else if (element.dataset.type === 'date') {
            element.textContent = versionInfo.date;
        }
    });
}

// 显示提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #1a365d;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: fadeInOut 3s ease-in-out;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 添加上下文相关的下载按钮（如果页面中有特定元素）
function initContextualDownloads() {
    // 检查页面中是否有需要下载的特定内容
    const contentDownloads = document.querySelectorAll('[data-download-content]');
    
    contentDownloads.forEach(element => {
        element.addEventListener('click', function() {
            const contentId = this.getAttribute('data-download-content');
            downloadSpecificContent(contentId);
        });
    });
}

// 下载特定内容
function downloadSpecificContent(contentId) {
    // 这里可以处理特定内容的下载
    // 例如：单个概念页面、特定的股东信等
    
    showToast(`正在下载 ${contentId} 内容...`);
    
    // 模拟下载
    setTimeout(() => {
        showToast(`${contentId} 已下载完成！`);
    }, 1500);
}

// 初始化下载历史查看器（如果需要）
function initDownloadHistory() {
    const historyBtn = document.getElementById('viewDownloadHistory');
    if (historyBtn) {
        historyBtn.addEventListener('click', showDownloadHistory);
    }
}

// 显示下载历史
function showDownloadHistory() {
    const downloads = JSON.parse(localStorage.getItem('buffettDownloads') || '{}');
    
    if (Object.keys(downloads).length === 0) {
        showToast('暂无下载记录');
        return;
    }
    
    let historyText = '下载历史:\n';
    Object.entries(downloads).forEach(([version, count]) => {
        const versionInfo = getVersionInfo(version);
        historyText += `${versionInfo.title}: ${count} 次\n`;
    });
    
    alert(historyText);
}

// 页面卸载前的清理
window.addEventListener('beforeunload', function() {
    // 清理临时状态
    const progressElements = document.querySelectorAll('.download-progress');
    progressElements.forEach(element => element.remove());
});