// 巴菲特知识库 - 主JavaScript文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航栏切换
    initNavToggle();
    
    // 初始化回到顶部按钮
    initBackToTop();
    
    // 初始化平滑滚动
    initSmoothScroll();
    
    // 初始化卡片悬停效果
    initCardHover();
    
    // 显示加载完成提示
    showLoadComplete();
});

// 导航栏切换功能
function initNavToggle() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // 切换图标
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 点击导航链接后关闭移动菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}

// 回到顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // 滚动时显示/隐藏按钮
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // 点击回到顶部
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果不是内部锚点，不处理
            if (href === '#' || href.startsWith('#!')) return;
            
            // 如果是页面内锚点
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offset = 80; // 导航栏高度偏移
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// 卡片悬停效果增强
function initCardHover() {
    const cards = document.querySelectorAll('.nav-card, .featured-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// 显示加载完成提示
function showLoadComplete() {
    // 检查是否已经显示过提示
    if (!sessionStorage.getItem('buffettSiteLoaded')) {
        // 创建提示消息
        const message = document.createElement('div');
        message.className = 'load-complete-message';
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.3s ease-out;
            ">
                <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
                <span>网站加载完成！共186个页面已就绪</span>
            </div>
        `;
        
        document.body.appendChild(message);
        
        // 3秒后移除提示
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => message.remove(), 300);
        }, 3000);
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // 标记为已显示
        sessionStorage.setItem('buffettSiteLoaded', 'true');
    }
}

// 页面性能监控
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`巴菲特知识库加载完成，用时: ${loadTime}ms`);
    
    // 预加载重要页面
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            preloadImportantPages();
        });
    }
});

// 预加载重要页面
function preloadImportantPages() {
    const importantPages = [
        'concepts/内在价值.html',
        'berkshire/1977.html',
        'companies/可口可乐.html',
        'people/查理·芒格.html'
    ];
    
    importantPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
}

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + F 聚焦搜索
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchLink = document.querySelector('a[href="search.html"]');
        if (searchLink) {
            window.location.href = 'search.html';
        }
    }
    
    // ESC 关闭移动菜单
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const navToggle = document.getElementById('navToggle');
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
});

// 页面离开提示（可选，避免误关闭）
window.addEventListener('beforeunload', function(e) {
    if (document.querySelector('.content-viewer')?.classList.contains('active')) {
        e.preventDefault();
        e.returnValue = '您正在阅读内容，确定要离开吗？';
    }
});

// 离线状态检测
window.addEventListener('online', function() {
    console.log('网络已连接');
});

window.addEventListener('offline', function() {
    console.log('网络已断开，但网站内容仍可离线使用');
    
    // 显示离线提示
    const offlineNotice = document.createElement('div');
    offlineNotice.className = 'offline-notice';
    offlineNotice.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #f59e0b;
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9998;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: slideIn 0.3s ease-out;
        ">
            <i class="fas fa-wifi-slash"></i>
            <span>当前处于离线状态，所有内容仍可正常访问</span>
        </div>
    `;
    document.body.appendChild(offlineNotice);
    
    setTimeout(() => {
        offlineNotice.remove();
    }, 5000);
});

// 复制内容到剪贴板功能
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('内容已复制到剪贴板');
        }).catch(err => {
            console.error('复制失败:', err);
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showToast('内容已复制到剪贴板');
    } catch (err) {
        console.error('复制失败:', err);
        showToast('复制失败，请手动复制');
    }
    document.body.removeChild(textarea);
}

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

// 添加动画样式
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        10% { opacity: 1; transform: translateX(-50%) translateY(0); }
        90% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(toastStyle);

// 页面主题切换（可选功能）
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('buffettTheme', newTheme);
    
    showToast(`已切换至${newTheme === 'dark' ? '深色' : '浅色'}主题`);
}

// 初始化主题
function initTheme() {
    const savedTheme = localStorage.getItem('buffettTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// 页面加载时初始化主题
initTheme();