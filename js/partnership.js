// 合伙人信页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题
    initTheme();
    
    // 初始化时间线动画
    initTimeline();
    
    // 初始化PDF卡片交互
    initPDFCards();
    
    // 初始化快速访问卡片
    initAccessCards();
    
    // 初始化滚动效果
    initScrollEffects();
    
    // 添加下载统计
    initDownloadTracking();
});

// 主题初始化
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // 检查本地存储的主题偏好
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    // 主题切换事件
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
    });
}

function updateThemeIcon(theme, icon) {
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// 时间线动画 - 增强版
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // 为每个时间线项目设置CSS自定义属性
    timelineItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
        
        // 添加年份元素的悬停效果
        const yearElement = item.querySelector('.timeline-year');
        if (yearElement) {
            yearElement.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
                this.style.boxShadow = '0 12px 35px rgba(66, 153, 225, 0.5)';
            });
            
            yearElement.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.boxShadow = '0 8px 25px rgba(66, 153, 225, 0.3)';
            });
        }
        
        // 添加内容区域的悬停效果
        const contentElement = item.querySelector('.timeline-content');
        if (contentElement) {
            contentElement.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
                this.style.borderLeftColor = '#68d391';
            });
            
            contentElement.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                this.style.borderLeftColor = '#4299e1';
            });
        }
    });
    
    // 创建观察器用于滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 获取项目索引
                const index = Array.from(timelineItems).indexOf(entry.target);
                
                // 设置动画延迟
                entry.target.style.transitionDelay = `${index * 0.15}s`;
                
                // 触发动画
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 如果有年份元素，添加脉冲效果
                const yearElement = entry.target.querySelector('.timeline-year');
                if (yearElement) {
                    setTimeout(() => {
                        yearElement.style.animation = 'pulseYear 1s ease-in-out';
                    }, index * 100 + 300);
                }
                
                // 停止观察
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -150px 0px'
    });
    
    // 初始化时间线项目状态
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(item);
    });
    
    // 动态添加动画关键帧
    if (!document.getElementById('timeline-animations')) {
        const style = document.createElement('style');
        style.id = 'timeline-animations';
        style.textContent = `
            @keyframes pulseYear {
                0% { 
                    box-shadow: 0 8px 25px rgba(66, 153, 225, 0.3);
                    transform: scale(1);
                }
                50% { 
                    box-shadow: 0 12px 35px rgba(66, 153, 225, 0.6), 
                                0 0 20px rgba(104, 211, 145, 0.4);
                    transform: scale(1.05);
                }
                100% { 
                    box-shadow: 0 8px 25px rgba(66, 153, 225, 0.3);
                    transform: scale(1);
                }
            }
            
            .timeline-year {
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .timeline-content {
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
        `;
        document.head.appendChild(style);
    }
}

// PDF卡片交互
function initPDFCards() {
    const pdfCards = document.querySelectorAll('.pdf-card');
    const downloadButtons = document.querySelectorAll('.pdf-download-btn');
    
    // 卡片悬停效果
    pdfCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 下载按钮点击效果
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // 记录下载事件
            const fileName = this.getAttribute('href').split('/').pop();
            trackDownload(fileName);
        });
    });
}

// 快速访问卡片交互
function initAccessCards() {
    const accessCards = document.querySelectorAll('.access-card');
    
    accessCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// 滚动效果
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // 高亮当前导航
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // 平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// 下载跟踪
function initDownloadTracking() {
    // 从本地存储获取下载统计
    let downloadStats = JSON.parse(localStorage.getItem('downloadStats') || '{}');
    
    // 更新页面上的下载计数
    updateDownloadCounts(downloadStats);
}

function trackDownload(fileName) {
    let downloadStats = JSON.parse(localStorage.getItem('downloadStats') || '{}');
    
    // 更新统计
    if (!downloadStats[fileName]) {
        downloadStats[fileName] = 0;
    }
    downloadStats[fileName]++;
    
    // 保存到本地存储
    localStorage.setItem('downloadStats', JSON.stringify(downloadStats));
    
    // 更新页面显示
    updateDownloadCounts(downloadStats);
    
    // 显示下载提示
    showDownloadToast(fileName);
}

function updateDownloadCounts(stats) {
    const totalDownloads = Object.values(stats).reduce((sum, count) => sum + count, 0);
    
    // 更新统计卡片（如果有的话）
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const label = card.querySelector('.stat-label').textContent;
        if (label.includes('下载') || label.includes('Download')) {
            const numberElement = card.querySelector('.stat-number');
            numberElement.textContent = totalDownloads;
        }
    });
}

function showDownloadToast(fileName) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'download-toast';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>已开始下载: ${fileName}</span>
    `;
    
    // 添加样式
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 3秒后移除
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 年份高亮效果
function highlightCurrentYear() {
    const timelineYears = document.querySelectorAll('.timeline-year');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    timelineYears.forEach(yearElement => {
        const year = parseInt(yearElement.textContent);
        if (year === currentYear) {
            yearElement.style.background = '#3498db';
            yearElement.style.color = 'white';
            yearElement.style.boxShadow = '0 0 20px rgba(52, 152, 219, 0.5)';
        }
    });
}

// 页面加载完成后执行
window.addEventListener('load', function() {
    // 高亮当前年份
    highlightCurrentYear();
    
    // 添加打印样式
    addPrintStyles();
    
    // 初始化分享功能
    initShareButtons();
});

// 打印样式
function addPrintStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            .navbar, .footer, .theme-toggle, .pdf-download-btn, .timeline-link {
                display: none !important;
            }
            
            .timeline::before {
                display: none;
            }
            
            .timeline-item {
                break-inside: avoid;
            }
            
            .pdf-card, .guide-card {
                box-shadow: none !important;
                border: 1px solid #ccc !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// 分享功能
function initShareButtons() {
    // 创建分享按钮（如果需要）
    const shareSection = document.querySelector('.quick-access');
    
    if (shareSection && navigator.share) {
        const shareCard = document.createElement('a');
        shareCard.className = 'access-card';
        shareCard.href = '#';
        shareCard.innerHTML = `
            <i class="fas fa-share-alt"></i>
            <h3>分享页面</h3>
            <p>分享给朋友或同事</p>
        `;
        
        shareCard.addEventListener('click', async function(e) {
            e.preventDefault();
            
            try {
                await navigator.share({
                    title: document.title,
                    text: '查看巴菲特的合伙人信(1956-1964)',
                    url: window.location.href
                });
            } catch (err) {
                console.log('分享取消或出错:', err);
            }
        });
        
        shareSection.querySelector('.access-grid').appendChild(shareCard);
    }
}

// 页面性能监控
function initPerformanceMonitoring() {
    // 记录页面加载时间
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`页面加载时间: ${pageLoadTime}ms`);
        
        // 如果加载时间过长，给出优化建议
        if (pageLoadTime > 3000) {
            console.warn('页面加载较慢，建议优化图片和脚本');
        }
    });
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    
    // 友好的错误提示
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('图片加载失败:', e.target.src);
    }
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + F 搜索
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        window.location.href = 'search.html';
    }
    
    // Ctrl/Cmd + D 下载
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        window.location.href = 'download.html';
    }
    
    // 空格键暂停/继续时间线动画
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            const isPaused = timeline.style.animationPlayState === 'paused';
            timeline.style.animationPlayState = isPaused ? 'running' : 'paused';
        }
    }
});

// 初始化性能监控
initPerformanceMonitoring();